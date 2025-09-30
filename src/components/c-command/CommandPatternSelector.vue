<!-- src/components/CommandPatternSelector.vue -->
<template>
  <div class="border-t border-vscode-panel-border/50 bg-vscode-sideBar-background/30">
    <button
      @click="isExpanded = !isExpanded"
      class="w-full px-3 py-2 flex items-center justify-between hover:bg-vscode-list-hoverBackground transition-colors"
    >
      <div class="group flex items-center gap-2 cursor-pointer w-full text-left">
        <span :class="['text-sm flex-1 group-hover:opacity-100', isExpanded ? 'opacity-100' : 'opacity-40']">
          <CheckCheck class="inline-block mr-2" /> {{ t("chat:commandExecution.manageCommands") }}
        </span>
        <ChevronUp
          :class="['group-hover:opacity-100 transition-transform', isExpanded ? 'opacity-100' : 'opacity-40 -rotate-180']"
          class="size-4"
        />
      </div>
    </button>

    <div v-if="isExpanded" class="pl-6 pr-2 pt-1 pb-2 space-y-2">
      <div v-for="item in commandPatterns" :key="item.pattern" class="flex items-center gap-2">
        <div class="flex-1">
          <input
            v-if="editing[item.pattern]?.isEditing"
            v-model="editing[item.pattern].value"
            @blur="stopEditing(item.pattern)"
            @keydown.enter.prevent="stopEditing(item.pattern)"
            @keydown.esc.prevent="cancelEditing(item.pattern, item.pattern)"
            class="font-mono text-xs bg-vscode-input-background text-vscode-input-foreground border border-vscode-input-border rounded px-2 py-1.5 w-full focus:outline-0 focus:ring-1 focus:ring-vscode-focusBorder"
            :placeholder="item.pattern"
            autofocus
          />
          <div
            v-else
            @click="startEditing(item.pattern)"
            class="font-mono text-xs text-vscode-foreground cursor-pointer hover:bg-vscode-list-hoverBackground px-2 py-1.5 rounded transition-colors border border-transparent break-all"
            :title="t('chat:commandExecution.editPatternTitle')"
          >
            <span class="break-all">{{ editing[item.pattern]?.value ?? item.pattern }}</span>
            <span v-if="item.description" class="text-vscode-descriptionForeground ml-2">- {{ item.description }}</span>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button
            :class="allowButtonClass(editing[item.pattern]?.value ?? item.pattern)"
            @click="onAllow(editing[item.pattern]?.value ?? item.pattern)"
            :aria-label="getAllowTooltip(editing[item.pattern]?.value ?? item.pattern)"
            class="p-1 rounded transition-all cursor-pointer"
          >
            <Check class="size-3.5" />
          </button>
          <button
            :class="denyButtonClass(editing[item.pattern]?.value ?? item.pattern)"
            @click="onDeny(editing[item.pattern]?.value ?? item.pattern)"
            :aria-label="getDenyTooltip(editing[item.pattern]?.value ?? item.pattern)"
            class="p-1 rounded transition-all cursor-pointer"
          >
            <X class="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import { Check, CheckCheck, ChevronUp, X } from "lucide-vue-next"
import { useCommandPatternSelector } from '@/hooks/command/useCommandPatternSelector.ts'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps<{
  text?: string,
}>()

const isExpanded = ref(false)
const textRef = ref(props.text)
const {
  commandPatterns,
  handleAllowPatternChange,
  handleDenyPatternChange,
  allowButtonClass,
  denyButtonClass,
  getAllowTooltip,
  getDenyTooltip,
} = useCommandPatternSelector(textRef)

const editing = reactive<Record<string, { isEditing: boolean; value: string }>>({})

function startEditing(pattern: string) {
  editing[pattern] = { isEditing: true, value: editing[pattern]?.value ?? pattern }
}

function stopEditing(pattern: string) {
  if (!editing[pattern]) return
  editing[pattern].isEditing = false
}

function cancelEditing(pattern: string, original: string) {
  editing[pattern] = { isEditing: false, value: original }
}

watch(
  () => commandPatterns.value,
  (val) => {
    val.forEach((p) => {
      if (!editing[p.pattern]) editing[p.pattern] = { isEditing: false, value: p.pattern }
    })
  },
  { immediate: true },
)

function onAllow(pattern: string) {
  handleAllowPatternChange(pattern)
}

function onDeny(pattern: string) {
  handleDenyPatternChange(pattern)
}
</script>

<style scoped>
</style>
