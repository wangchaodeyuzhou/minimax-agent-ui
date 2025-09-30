import { ref, nextTick } from 'vue'
import { useClipboard } from '@vueuse/core'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export function useCodeBlock() {
  const codeBlockRef = ref<HTMLElement>()
  const { copy, copied, isSupported } = useClipboard()

  const highlightCode = (code: string, language: string): string => {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(code, { language }).value
    }
    return hljs.highlightAuto(code).value
  }

  const renderCodeBlock = async (code: string, language: string) => {
    if (!codeBlockRef.value) return

    await nextTick()

    const highlightedCode = highlightCode(code, language)
    codeBlockRef.value.innerHTML = `
      <pre><code class="hljs language-${language}">${highlightedCode}</code></pre>
    `
  }

  const copyToClipboard = async (code: string): Promise<boolean> => {
    try {
      await copy(code)
      return true
    } catch (err) {
      console.error('Failed to copy code:', err)
      return false
    }
  }

  return {
    codeBlockRef,
    highlightCode,
    renderCodeBlock,
    copyToClipboard,
    copied,
    isSupported
  }
}
