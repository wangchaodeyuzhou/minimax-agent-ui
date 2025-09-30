import { ref, computed, nextTick } from 'vue'
import markdownIt from 'markdown-it'
import katex from '@traptitech/markdown-it-katex'
import { markdownItTable } from "markdown-it-table"
import taskLists from 'markdown-it-task-lists'

export interface UseMarkdownOptions {
  enableKatex?: boolean
  enableTables?: boolean
  enableMermaid?: boolean
  enableTaskLists?: boolean
}

export function useMarkdown(options: UseMarkdownOptions = {}) {
  const {
    enableKatex = true,
    enableTables = true,
    enableMermaid = true,
    enableTaskLists = true
  } = options

  const markdownRef = ref<HTMLElement>()
  const isRendering = ref(false)
  const error = ref<string>()

  // 存储代码块和 mermaid 图表的信息
  const codeBlocks = ref<Array<{ element: HTMLElement, code: string, language: string }>>([])
  const mermaidBlocks = ref<Array<{ element: HTMLElement, code: string }>>([])

  // Initialize markdown-it instance
  const md = computed(() => {
    const instance = new markdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: false,
    })

    // Add plugins
    if (enableKatex) {
      instance.use(katex)
    }
    if (enableTables) {
      instance.use(markdownItTable)
    }

    // Enable task list parsing (e.g. "- [ ] task" or "- [x] done")
    if (enableTaskLists) {
      try {
        instance.use(taskLists, { label: true })
      } catch (e) {
        console.warn('markdown-it-task-lists plugin not available:', e)
      }
    }

    // Custom renderers
    setupCustomRenderers(instance)

    return instance
  })

  const handleLinkClick = (e: MouseEvent, href: string) => {
    const isLocalPath = href?.startsWith('file://') ||
      href?.startsWith('/') ||
      !href?.includes('://')

    if (!isLocalPath) {
      return
    }

    e.preventDefault()
    let filePath = href.replace('file://', '')

    const match = filePath.match(/(.*):(\d+)(-\d+)?$/)
    let values = undefined
    if (match) {
      filePath = match[1]
      values = { line: parseInt(match[2]) }
    }

    if (!filePath.startsWith('/') && !filePath.startsWith('./')) {
      filePath = './' + filePath
    }

    console.log('Opening file:', filePath, values)
  }

  const setupCustomRenderers = (mdInstance: markdownIt) => {
    // Table wrapper renderer
    if (enableTables) {
      const defaultTableOpen = mdInstance.renderer.rules.table_open ||
        ((tokens, idx, options, env, renderer) => renderer.renderToken(tokens, idx, options))

      mdInstance.renderer.rules.table_open = (tokens, idx, options, env, renderer) => {
        return '<div class="table-wrapper">' + defaultTableOpen(tokens, idx, options, env, renderer)
      }

      const defaultTableClose = mdInstance.renderer.rules.table_close ||
        ((tokens, idx, options, env, renderer) => renderer.renderToken(tokens, idx, options))

      mdInstance.renderer.rules.table_close = (tokens, idx, options, env, renderer) => {
        return defaultTableClose(tokens, idx, options, env, renderer) + '</div>'
      }
    }

    // Link renderer with click handling
    const defaultLinkOpen = mdInstance.renderer.rules.link_open ||
      ((tokens, idx, options, env, renderer) => renderer.renderToken(tokens, idx, options))

    mdInstance.renderer.rules.link_open = (tokens, idx, options, env, renderer) => {
      const token = tokens[idx]
      const href = token.attrGet('href')

      if (href) {
        const isLocalPath = href.startsWith('file://') ||
          href.startsWith('/') ||
          !href.includes('://')
        if (isLocalPath) {
          token.attrSet('data-href', href)
          token.attrSet('class', 'local-link')
        }
      }

      return defaultLinkOpen(tokens, idx, options, env, renderer)
    }

    // Code block renderer - 生成占位符，后续处理
    const defaultFence = mdInstance.renderer.rules.fence ||
      ((tokens, idx, options, env, renderer) => renderer.renderToken(tokens, idx, options))

    mdInstance.renderer.rules.fence = (tokens, idx, options, env, renderer) => {
      const token = tokens[idx]
      const info = token.info ? mdInstance.utils.unescapeAll(token.info).trim() : ''
      let langName = info ? info.split(/\s+/g)[0] : 'text'

      // Process language extensions
      if (langName.includes('.')) {
        langName = langName.split('.').slice(-1)[0]
      }

      let code = token.content.trim()

      // 修复第一行可能存在的额外缩进问题
      const lines = code.split('\n')
      if (lines.length > 0 && lines[0].startsWith(' ') || lines[0].startsWith('\t')) {
        // 找到最小的公共缩进
        const nonEmptyLines = lines.filter(line => line.trim().length > 0)
        if (nonEmptyLines.length > 0) {
          const minIndent = Math.min(...nonEmptyLines.map(line => {
            const match = line.match(/^[ \t]*/)
            return match ? match[0].length : 0
          }))

          // 移除所有行的公共缩进
          code = lines.map(line => {
            if (line.trim().length === 0) return line
            return line.substring(minIndent)
          }).join('\n')
        }
      }

      const id = `block-${Math.random().toString(36).substr(2, 9)}`

      if (enableMermaid && langName === 'mermaid') {
        return `<div class="mermaid-wrapper" data-id="${id}" data-code="${encodeURIComponent(code)}"></div>`
      }

      return `<div class="code-wrapper" data-id="${id}" data-code="${encodeURIComponent(code)}" data-language="${langName}"></div>`
    }

    // Image renderer
    const defaultImageRenderer = mdInstance.renderer.rules.image ||
      ((tokens, idx, options, env, renderer) => renderer.renderToken(tokens, idx, options));

    mdInstance.renderer.rules.image = (tokens, idx, options, env, renderer) => {
      const token = tokens[idx];
      token.attrJoin('class', 'markdown-image'); // Add a class for styling
      return defaultImageRenderer(tokens, idx, options, env, renderer);
    };
  }

  const renderMarkdown = async (source: string): Promise<string> => {
    try {
      isRendering.value = true
      error.value = undefined
      return md.value.render(source)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return ''
    } finally {
      isRendering.value = false
    }
  }

  const processRenderedContent = async () => {
    if (!markdownRef.value) return

    await nextTick()

    // 清空之前的记录
    codeBlocks.value = []
    mermaidBlocks.value = []

    // Handle local links
    const localLinks = markdownRef.value.querySelectorAll('a.local-link')
    localLinks.forEach(link => {
      const href = link.getAttribute('data-href')
      if (href) {
        // 移除之前的事件监听器
        const newLink = link.cloneNode(true) as HTMLElement
        link.parentNode?.replaceChild(newLink, link)
        newLink.addEventListener('click', (e) => handleLinkClick(e, href))
      }
    })

    // 收集代码块信息
    const codeWrappers = markdownRef.value.querySelectorAll('.code-wrapper')
    codeWrappers.forEach((wrapper) => {
      const code = decodeURIComponent(wrapper.getAttribute('data-code') || '')
      const language = wrapper.getAttribute('data-language') || 'text'

      codeBlocks.value.push({
        element: wrapper as HTMLElement,
        code,
        language
      })
    })

    // 收集 mermaid 块信息
    if (enableMermaid) {
      const mermaidWrappers = markdownRef.value.querySelectorAll('.mermaid-wrapper')
      mermaidWrappers.forEach((wrapper) => {
        const code = decodeURIComponent(wrapper.getAttribute('data-code') || '')

        mermaidBlocks.value.push({
          element: wrapper as HTMLElement,
          code
        })
      })
    }
  }

  const escapeHtml = (text: string): string => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  return {
    markdownRef,
    isRendering: computed(() => isRendering.value),
    error: computed(() => error.value),
    codeBlocks: computed(() => codeBlocks.value),
    mermaidBlocks: computed(() => mermaidBlocks.value),
    renderMarkdown,
    processRenderedContent,
    handleLinkClick
  }
}
