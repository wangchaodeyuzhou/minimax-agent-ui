import { ref } from "vue"

/**
 * 简单的本地 extension state，项目中你可能会用 provide/inject 或 pinia
 * 替换此处以接入全局状态或从 webview host 获取初始值。
 */
export function useExtensionState() {
  const terminalShellIntegrationDisabled = ref(false)
  const allowedCommands = ref<string[]>([])
  const deniedCommands = ref<string[]>([])

  function setAllowedCommands(list: string[]) {
    allowedCommands.value = list
  }
  function setDeniedCommands(list: string[]) {
    deniedCommands.value = list
  }

  return {
    terminalShellIntegrationDisabled,
    allowedCommands,
    deniedCommands,
    setAllowedCommands,
    setDeniedCommands,
  }
}
