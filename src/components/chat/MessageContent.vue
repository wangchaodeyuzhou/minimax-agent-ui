<template>
  <div class="message-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'

// 导入常用语言
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'

// 注册语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('css', css)
hljs.registerLanguage('html', html)
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)

// Props
interface Props {
  content: string
}

const props = defineProps<Props>()

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
})

// 自定义渲染器
const renderer = new marked.Renderer()

// 自定义代码块渲染
renderer.code = function(code, language, escaped) {
  const lang = language || 'plaintext'
  const highlighted = hljs.getLanguage(lang) 
    ? hljs.highlight(code, { language: lang }).value 
    : escapeHtml(code)
  
  return `<pre class="hljs"><code class="hljs language-${lang}">${highlighted}</code></pre>`
}

// 自定义链接渲染（添加 target="_blank"）
renderer.link = function(href, title, text) {
  const titleAttr = title ? ` title="${title}"` : ''
  return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`
}

// 自定义段落渲染
renderer.paragraph = function(text) {
  return `<p>${text}</p>`
}

// 自定义列表渲染
renderer.list = function(body, ordered, start) {
  const type = ordered ? 'ol' : 'ul'
  const startAttr = (ordered && start !== 1) ? ` start="${start}"` : ''
  return `<${type}${startAttr} class="list">${body}</${type}>`
}

renderer.listitem = function(text) {
  return `<li class="list-item">${text}</li>`
}

// 自定义表格渲染
renderer.table = function(header, body) {
  return `<table class="table"><thead>${header}</thead><tbody>${body}</tbody></table>`
}

renderer.tablerow = function(content) {
  return `<tr>${content}</tr>`
}

renderer.tablecell = function(content, flags) {
  const type = flags.header ? 'th' : 'td'
  const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`
  return `${tag}${content}</${type}>`
}

// 配置渲染器
marked.use({ renderer })

// 计算属性
const renderedContent = computed(() => {
  try {
    return marked(props.content)
  } catch (error) {
    console.error('Markdown rendering error:', error)
    return escapeHtml(props.content)
  }
})

// 工具函数
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
</script>

<style scoped>
/* 消息内容样式 */
:deep(.message-content) {
  line-height: 1.6;
}

:deep(.message-content p) {
  margin: 0.75em 0;
}

:deep(.message-content p:first-child) {
  margin-top: 0;
}

:deep(.message-content p:last-child) {
  margin-bottom: 0;
}

:deep(.message-content h1),
:deep(.message-content h2),
:deep(.message-content h3),
:deep(.message-content h4),
:deep(.message-content h5),
:deep(.message-content h6) {
  margin: 1.5em 0 0.5em 0;
  font-weight: 600;
}

:deep(.message-content h1:first-child),
:deep(.message-content h2:first-child),
:deep(.message-content h3:first-child),
:deep(.message-content h4:first-child),
:deep(.message-content h5:first-child),
:deep(.message-content h6:first-child) {
  margin-top: 0;
}

:deep(.message-content .list) {
  margin: 1em 0;
  padding-left: 2em;
}

:deep(.message-content .list-item) {
  margin: 0.25em 0;
}

:deep(.message-content blockquote) {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 4px solid rgba(156, 163, 175, 0.5);
  font-style: italic;
  opacity: 0.8;
}

:deep(.message-content code) {
  background-color: rgba(156, 163, 175, 0.15);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}

:deep(.message-content pre) {
  margin: 1em 0;
  border-radius: 8px;
  overflow-x: auto;
}

:deep(.message-content pre code) {
  background-color: transparent;
  padding: 0;
}

:deep(.message-content .hljs) {
  background-color: rgba(156, 163, 175, 0.1) !important;
  padding: 1em;
  border-radius: 8px;
  color: inherit;
}

:deep(.message-content a) {
  color: hsl(var(--primary));
  text-decoration: underline;
  text-underline-offset: 2px;
}

:deep(.message-content a:hover) {
  opacity: 0.8;
}

:deep(.message-content .table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  border: 1px solid rgba(156, 163, 175, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

:deep(.message-content .table th),
:deep(.message-content .table td) {
  padding: 0.75em;
  text-align: left;
  border-bottom: 1px solid rgba(156, 163, 175, 0.2);
}

:deep(.message-content .table th) {
  background-color: rgba(156, 163, 175, 0.1);
  font-weight: 600;
}

:deep(.message-content .table tr:last-child th),
:deep(.message-content .table tr:last-child td) {
  border-bottom: none;
}

:deep(.message-content img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 0.5em 0;
}

:deep(.message-content hr) {
  border: none;
  border-top: 1px solid rgba(156, 163, 175, 0.3);
  margin: 2em 0;
}

:deep(.message-content strong) {
  font-weight: 600;
}

:deep(.message-content em) {
  font-style: italic;
}
</style>