<template>
  <div class="mermaid-block" ref="mermaidRef">
    <div v-if="isLoading" class="loading">
      Rendering diagram...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, defineEmits } from 'vue'
import { useMermaid } from '@/hooks/markdown/useMermaid.ts'

interface Props {
  code: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  mounted: [component: any]
}>()

const { mermaidRef, isLoading, error, renderMermaid } = useMermaid()

onMounted(async () => {
  await renderMermaid(props.code)
  emit('mounted', { $el: mermaidRef.value })
})
</script>