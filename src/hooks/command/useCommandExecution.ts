import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import type { CommandExecutionStatus } from '@/components/types/command.ts'
import { parseCommandAndOutput, safeJsonParse } from '@/utils/command.ts'
import { useExtensionState } from '@/hooks/command/useExtensionState.ts'

export function useCommandExecution(executionId: string, textRef: { value: string | undefined }) {
  const isExpanded = ref(false)
  const streamingOutput = ref('')
  const status = ref<CommandExecutionStatus | null>(null)

  const parsed = computed(() => {
    return parseCommandAndOutput(textRef.value)
  })

  // If shell integration disabled -> default expanded
  const ext = useExtensionState()
  watch(
    () => ext.terminalShellIntegrationDisabled.value,
    (v) => {
      if (v) isExpanded.value = true
    },
    { immediate: true },
  )

  const output = computed(() => {
    return streamingOutput.value || parsed.value.output || ''
  })

  function abort() {
    window.postMessage({ type: 'terminalOperation', terminalOperation: 'abort' }, '*')
  }

  function handleMessage(e: MessageEvent) {
    const message = e.data
    if (message?.type !== 'commandExecutionStatus') return

    // message.text is expected to be JSON string
    const payload = safeJsonParse<Record<string, unknown>>(message.text, null)
    if (!payload) {
      // If parsing failed, log a concise warning with a small snippet to help debugging.
      const snippet =
        typeof message?.text === 'string' ? message.text.slice(0, 200) : String(message?.text)
      // Include executionId so it's easier to correlate logs
      console.warn(
        `useCommandExecution: failed to parse commandExecutionStatus message for executionId=${executionId}, snippet="${snippet}"`,
      )
      return
    }
    if (payload.executionId !== executionId) return

    switch (payload.status) {
      case 'started':
        status.value = payload as CommandExecutionStatus
        break
      case 'output':
        if (typeof (payload as Record<string, unknown>).output === 'string') {
          streamingOutput.value = (payload as Record<string, string>).output
        }
        break
      case 'fallback':
        isExpanded.value = true
        break
      default:
        status.value = payload as CommandExecutionStatus
        break
    }
  }

  onMounted(() => window.addEventListener('message', handleMessage))
  onBeforeUnmount(() => window.removeEventListener('message', handleMessage))

  return {
    isExpanded,
    streamingOutput,
    status,
    output,
    abort,
    parsedCommand: computed(() => parsed.value.command),
  }
}
