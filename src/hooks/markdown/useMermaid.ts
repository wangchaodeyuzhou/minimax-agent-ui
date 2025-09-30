import { ref, nextTick, computed } from 'vue'

export function useMermaid() {
  const mermaidRef = ref<HTMLElement>()
  const isLoading = ref(false)
  const error = ref<string>()

  const renderMermaid = async (code: string) => {
    if (!mermaidRef.value) return

    try {
      isLoading.value = true
      error.value = undefined

      // Dynamically import mermaid to avoid bundling it if not used
      const mermaid = await import('mermaid')

      // Ensure next DOM tick so ref is available
      await nextTick()

      // Initialize mermaid with sensible defaults if available
      try {
        const initOptions: any = { startOnLoad: false, htmlLabels: true, securityLevel: 'loose' }
        // Use any cast to avoid strict type issues across mermaid versions
        const m: any = mermaid
        if (m?.default && typeof m.default.initialize === 'function') {
          m.default.initialize(initOptions)
        } else if (typeof m.initialize === 'function') {
          m.initialize(initOptions)
        }
      } catch (initErr) {
        // non-fatal, but keep a console notice
        console.warn('Mermaid initialize warning:', initErr)
      }

      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      mermaidRef.value.id = id

      // Render - support different mermaid module shapes / versions
      let svg = ''
      try {
        // debug: log code to help diagnosing rendering issues (visible in browser console)
        if (code.length < 2000) {
          console.debug('Rendering mermaid code:', code)
        }
        const m: any = mermaid
        if (m?.default && typeof m.default.render === 'function') {
          const res: any = await m.default.render(id, code)
          svg = typeof res === 'string' ? res : (res?.svg ?? res?.svgCode ?? res?.output ?? '')
        } else if (typeof m.render === 'function') {
          const res: any = await m.render(id, code)
          svg = typeof res === 'string' ? res : (res?.svg ?? res?.svgCode ?? res?.output ?? '')
        } else {
          throw new Error('Unsupported mermaid API: render not found')
        }
      } catch (renderErr) {
        // Re-throw so outer catch can handle uniformly
        throw renderErr
      }

      mermaidRef.value.innerHTML = svg
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to render diagram'
      console.error('Mermaid rendering error:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    mermaidRef,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    renderMermaid,
  }
}
