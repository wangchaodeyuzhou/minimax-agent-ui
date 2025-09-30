<script setup lang="ts">
import { ref, computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  content?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  class?: string
  contentClass?: string
  disabled?: boolean
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  side: 'top',
  disabled: false,
  delay: 200,
})

const isVisible = ref(false)
const timeoutId = ref<number>()

const tooltipClasses = computed(() =>
  cn(
    'absolute z-50 px-2 py-1 text-xs rounded-sm pointer-events-none',
    'bg-vscode-editorHoverWidget-background text-vscode-editorHoverWidget-foreground',
    'border border-vscode-editorHoverWidget-border',
    'shadow-[0_2px_8px_var(--color-vscode-widget-shadow)]',
    'max-w-[300px] break-words text-balance',
    'transition-opacity duration-200',
    {
      'opacity-0': !isVisible.value,
      'opacity-100': isVisible.value,
      // 位置样式
      'bottom-full left-1/2 transform -translate-x-1/2 mb-2': props.side === 'top',
      'top-full left-1/2 transform -translate-x-1/2 mt-2': props.side === 'bottom',
      'right-full top-1/2 transform -translate-y-1/2 mr-2': props.side === 'left',
      'left-full top-1/2 transform -translate-y-1/2 ml-2': props.side === 'right',
    },
    props.contentClass
  )
)

function showTooltip() {
  if (props.disabled) return

  clearTimeout(timeoutId.value)
  timeoutId.value = setTimeout(() => {
    isVisible.value = true
  }, props.delay)
}

function hideTooltip() {
  clearTimeout(timeoutId.value)
  isVisible.value = false
}
</script>

<template>
  <div
    class="relative inline-block"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
    <div :class="class">
      <slot />
    </div>

    <div :class="tooltipClasses">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>