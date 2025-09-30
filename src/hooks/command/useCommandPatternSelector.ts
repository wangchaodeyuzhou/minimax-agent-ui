import { computed } from "vue"
import type { CommandPattern } from "@/components/types/command.ts"
import { parseCommand, extractPatternsFromCommand, parseCommandAndOutput } from "@/utils/command.ts"
import { useExtensionState } from '@/hooks/command/useExtensionState.ts'

export function useCommandPatternSelector(textRef: { value: string | undefined }) {
  const ext = useExtensionState()

  // derive command
  const command = computed(() => {
    return parseCommandAndOutput(textRef.value).command
  })

  const commandPatterns = computed<CommandPattern[]>(() => {
    const allCommands = parseCommand(command.value)
    const allPatterns = new Set<string>()
    allCommands.forEach((cmd) => {
      if (cmd.trim()) allPatterns.add(cmd.trim())
    })
    allCommands.forEach((cmd) => {
      const pats = extractPatternsFromCommand(cmd)
      pats.forEach((p) => allPatterns.add(p))
    })
    return Array.from(allPatterns).map((p) => ({ pattern: p }))
  })

  function handleAllowPatternChange(pattern: string) {
    const isAllowed = ext.allowedCommands.value.includes(pattern)
    const newAllowed = isAllowed
      ? ext.allowedCommands.value.filter((p: string) => p !== pattern)
      : [...ext.allowedCommands.value, pattern]
    const newDenied = ext.deniedCommands.value.filter((p: string) => p !== pattern)
    ext.setAllowedCommands(newAllowed)
    ext.setDeniedCommands(newDenied)
    window.postMessage({ type: "allowedCommands", commands: newAllowed }, "*")
    window.postMessage({ type: "deniedCommands", commands: newDenied }, "*")
  }

  function handleDenyPatternChange(pattern: string) {
    const isDenied = ext.deniedCommands.value.includes(pattern)
    const newDenied = isDenied
      ? ext.deniedCommands.value.filter((p: string) => p !== pattern)
      : [...ext.deniedCommands.value, pattern]
    const newAllowed = ext.allowedCommands.value.filter((p: string) => p !== pattern)
    ext.setAllowedCommands(newAllowed)
    ext.setDeniedCommands(newDenied)
    window.postMessage({ type: "allowedCommands", commands: newAllowed }, "*")
    window.postMessage({ type: "deniedCommands", commands: newDenied }, "*")
  }

  function getPatternStatus(pattern: string) {
    if (ext.allowedCommands.value.includes(pattern)) return "allowed"
    if (ext.deniedCommands.value.includes(pattern)) return "denied"
    return "none"
  }

  function allowButtonClass(pattern: string) {
    const status = getPatternStatus(pattern)
    return status === "allowed" ? "bg-green-500/20 text-green-500 hover:bg-green-500/30" : "text-vscode-descriptionForeground hover:text-green-500 hover:bg-green-500/10"
  }
  function denyButtonClass(pattern: string) {
    const status = getPatternStatus(pattern)
    return status === "denied" ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "text-vscode-descriptionForeground hover:text-red-500 hover:bg-red-500/10"
  }
  function getAllowTooltip(pattern: string) {
    return getPatternStatus(pattern) === "allowed" ? "chat:commandExecution.removeFromAllowed" : "chat:commandExecution.addToAllowed"
  }
  function getDenyTooltip(pattern: string) {
    return getPatternStatus(pattern) === "denied" ? "chat:commandExecution.removeFromDenied" : "chat:commandExecution.addToDenied"
  }

  return {
    commandPatterns,
    handleAllowPatternChange,
    handleDenyPatternChange,
    command,
    getPatternStatus,
    allowButtonClass,
    denyButtonClass,
    getAllowTooltip,
    getDenyTooltip,
  }
}
