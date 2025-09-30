<template>
  <div
    :class="['code-block rounded-lg overflow-hidden shadow-lg border font-mono', themeClass]"
    ref="codeBlockRef"
  >
    <!-- Header -->
    <div class="flex items-center justify-between code-block__header p-1 border-b">
      <div class="flex items-center space-x-2">
        <!-- Language selector -->
        <select
          v-model="selectedLanguage"
          class="code-block__select"
          @change="updateHighlight"
        >
          <option v-for="lang in languages" :key="lang" :value="lang">
            {{ getLanguageDisplayName(lang) }}
          </option>
        </select>
      </div>

      <!-- Copy button -->
      <button
        @click="copyCode"
        class="flex items-center space-x-2 text-9px px-2 py-1.5 rounded-md transition-all duration-200 focus:outline-none"
        :class="{ 'code-block__copy-btn--copied': copied }"
        :disabled="copied"
      >
        <svg v-if="!copied" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
      </button>
    </div>

    <!-- Code content -->
    <div class="relative">
      <div
        ref="codeRenderRef"
        class="code-rows-container text-sm p-3"
        :class="{ selecting: isSelecting }"
        @mousedown="isSelecting = true"
        @mouseup="isSelecting = false"
      >
        <!-- 代码将通过 renderCodeBlock 函数渲染到这里 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineEmits, watch, nextTick } from 'vue'
import { useCodeBlock } from '@/hooks/markdown/useCodeBlock'
import './markdown/codeBlock.css'

interface Props {
  code: string
  language: string
  showLineNumbers?: boolean
  readonly?: boolean
  theme?: 'auto' | 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  showLineNumbers: false,
  readonly: false,
  theme: 'auto',
})

const emit = defineEmits<{
  mounted: [component: { $el: HTMLElement }]
  languageChanged: [language: string]
}>()

const copied = ref(false)
const isLoading = ref(false)
const isSelecting = ref(false)
const selectedLanguage = ref(props.language)
const codeEl = ref<HTMLElement | null>(null)
const codeRenderRef = ref<HTMLElement | null>(null)
const lineHeightPx = ref<number>(20)
const topPadPx = ref<number>(0)
const bottomPadPx = ref<number>(0)

const { codeBlockRef, renderCodeBlock, highlightCode, copyToClipboard } = useCodeBlock()

const themeClass = computed(() => {
  const t = props.theme || 'auto'
  if (t === 'light') return 'code-block--light'
  if (t === 'dark') return 'code-block--dark'
  return ''
})

// 支持的编程语言
const languages = [
  'text',
  'javascript',
  'typescript',
  'python',
  'java',
  'c',
  'cpp',
  'csharp',
  'php',
  'ruby',
  'go',
  'rust',
  'swift',
  'kotlin',
  'scala',
  'html',
  'css',
  'scss',
  'sass',
  'less',
  'json',
  'xml',
  'yaml',
  'markdown',
  'sql',
  'bash',
  'shell',
  'powershell',
  'dockerfile',
  'nginx',
  'apache',
  'vue',
  'react',
  'svelte',
]

// 渲染代码块
const renderCode = async () => {
  if (!codeRenderRef.value) return

  // 如果需要显示行号，按行渲染
  if (props.showLineNumbers) {
    const lines = props.code.split('\n')
    let html = ''

    for (let i = 0; i < lines.length; i++) {
      const highlightedLine = highlightCode(lines[i], selectedLanguage.value)
      html += `
        <div class="code-row">
          <div class="line-number text-sm select-none">${i + 1}</div>
          <div class="code-cell">
            <pre class="code-line"><code class="hljs language-${selectedLanguage.value}">${highlightedLine || '&#8203;'}</code></pre>
          </div>
        </div>
      `
    }
    codeRenderRef.value.innerHTML = html
  } else {
    // 不显示行号时，直接渲染高亮的代码
    const highlightedContent = highlightCode(props.code, selectedLanguage.value)
    codeRenderRef.value.innerHTML = `<pre><code class="hljs language-${selectedLanguage.value}">${highlightedContent}</code></pre>`
  }
}

const copyCode = async () => {
  if (copied.value) return

  const success = await copyToClipboard(props.code)
  if (success) {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

const updateHighlight = async () => {
  isLoading.value = true
  emit('languageChanged', selectedLanguage.value)

  // 等待渲染完成
  setTimeout(async () => {
    await renderCode()
    isLoading.value = false
  }, 100)
}

const getLanguageDisplayName = (lang: string): string => {
  const displayNames: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    csharp: 'C#',
    php: 'PHP',
    ruby: 'Ruby',
    go: 'Go',
    rust: 'Rust',
    swift: 'Swift',
    kotlin: 'Kotlin',
    scala: 'Scala',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    sass: 'SASS',
    less: 'LESS',
    json: 'JSON',
    xml: 'XML',
    yaml: 'YAML',
    markdown: 'Markdown',
    sql: 'SQL',
    bash: 'Bash',
    shell: 'Shell',
    powershell: 'PowerShell',
    dockerfile: 'Dockerfile',
    nginx: 'Nginx',
    apache: 'Apache',
    vue: 'Vue',
    react: 'React',
    svelte: 'Svelte',
    text: 'Plain Text',
  }
  return displayNames[lang] || lang.toUpperCase()
}

// 监听 props.language 变化
watch(
  () => props.language,
  (newLang) => {
    selectedLanguage.value = newLang
  },
  { immediate: true },
)

onMounted(async () => {
  // 确保初始渲染
  await nextTick()
  await renderCode()

  // 保持原有的 codeBlockRef 引用，用于 emit
  if (codeBlockRef.value) {
    emit('mounted', { $el: codeBlockRef.value })
  }
})

// 监听代码和语言变化，重新渲染
watch(
  [() => props.code, () => selectedLanguage.value],
  async () => {
    await renderCode()
    await nextTick()

    // 如果还没有 codeEl，尝试从 codeRenderRef 中查找第一个渲染的 code 元素并使用它来计算样式
    if (!codeEl.value && codeRenderRef.value) {
      const firstCode = codeRenderRef.value.querySelector('.code-line code') as HTMLElement | null
      if (firstCode) {
        codeEl.value = firstCode
      }
    }

    if (codeEl.value) {
      const cs = getComputedStyle(codeEl.value)
      const lh = cs.lineHeight
      if (lh.endsWith('px')) {
        lineHeightPx.value = parseFloat(lh)
      } else {
        const fs = parseFloat(cs.fontSize || '14')
        lineHeightPx.value = Math.round(fs * 1.15)
      }
    }
    if (codeRenderRef.value) {
      const preStyles = getComputedStyle(codeRenderRef.value)
      topPadPx.value = parseFloat(preStyles.paddingTop || '0')
      bottomPadPx.value = parseFloat(preStyles.paddingBottom || '0')
    }
  },
  { immediate: true }
)
</script>
