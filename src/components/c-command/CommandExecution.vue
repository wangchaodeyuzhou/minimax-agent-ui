<template>
  <div>
    <div class="flex flex-row items-center justify-between gap-2 mb-1">
      <div class="flex flex-row items-center gap-2">
        <slot name="icon" />
        <slot name="title" />
        <div v-if="status?.status === 'exited'" class="flex flex-row items-center gap-2 font-mono text-xs">
          <div v-tooltip="exitTooltip">
            <span :class="['rounded-full size-2', status.exitCode === 0 ? 'bg-green-600' : 'bg-red-600']"></span>
          </div>
        </div>
      </div>

      <div class="flex flex-row items-center justify-between gap-2 px-1">
        <div class="flex flex-row items-center gap-1">
          <div v-if="status?.status === 'started'" class="flex flex-row items-center gap-2 font-mono text-xs">
            <div v-if="status.pid" class="whitespace-nowrap">(PID: {{ status.pid }})</div>
            <button
              v-tooltip="t('chat:commandExecution.abort')"
              class="btn-ghost size-icon"
              @click="abort"
            >
              <svg class="size-4"><use xlink:href="#octagon-x" /></svg>
            </button>
          </div>

          <button v-if="output && output.length > 0" class="btn-ghost size-icon" @click="isExpanded = !isExpanded">
            <svg class="size-4 transition-transform duration-300" :class="isExpanded ? 'rotate-180' : ''"><use xlink:href="#chevron-down" /></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-vscode-editor-background border border-vscode-border rounded-xs ml-6 mt-2">
      <div class="p-2">
        <CodeBlock :code="parsedCommand" language="shell" />
        <div :class="['overflow-hidden', isExpanded ? 'max-h-[100%] mt-1 pt-1 border-t border-border/25' : 'max-h-0']">
          <CodeBlock v-if="output && output.length > 0" :code="output" language="log" />
        </div>
      </div>

      <CommandPatternSelector :text="rawText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import CodeBlock from "../chat/CodeBlock.vue"
import CommandPatternSelector from "./CommandPatternSelector.vue"
import { useCommandExecution } from '@/hooks/command/useCommandExecution.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
  executionId: string,
  text?: string,
}>()

const rawText = props.text ?? ""
const textRef = ref(rawText) // Use ref for reactivity if text can change

const {
  isExpanded,
  status,
  output,
  abort,
  parsedCommand
} = useCommandExecution(
  props.executionId,
  textRef,
)

const exitTooltip = computed(() => {
  if (status.value?.status === "exited") {
    return status.value.exitCode === 0
      ? "chat:commandExecution.exitCodeSuccess"
      : `chat:commandExecution.exitCodeError ${status.value.exitCode}`
  }
  return ""
})
</script>

<style scoped>
/* 如需自定义样式请写在此处 */
</style>
