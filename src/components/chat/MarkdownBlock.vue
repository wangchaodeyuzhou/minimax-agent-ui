<template>
  <div class="styled-markdown">
    <div
      ref="markdownRef"
      class="markdown-content"
      v-html="renderedHtml"
    ></div>

    <!-- 动态渲染代码块 -->
    <template v-for="block in codeBlocks" :key="block.element">
      <CodeBlock
        v-if="block.element"
        :code="block.code"
        :language="block.language"
        @mounted="(component) => replaceElement(block.element, component.$el)"
      />
    </template>

    <!-- 动态渲染 Mermaid 图表 -->
    <template v-for="block in mermaidBlocks" :key="block.element">
      <MermaidBlock
        v-if="block.element"
        :code="block.code"
        @mounted="(component) => replaceElement(block.element, component.$el)"
      />
    </template>

    <div v-if="isRendering" class="loading">
      Rendering...
    </div>
    <div v-if="error" class="error">
      Error: {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/hooks/markdown/markdown.css'
import { ref, watch, onMounted, nextTick } from 'vue'
import { useMarkdown } from '@/hooks/markdown/useMarkdown.ts'
import CodeBlock from './CodeBlock.vue'
import MermaidBlock from './MermaidBlock.vue'

interface Props {
  markdown?: string
}

const props = defineProps<Props>()

const renderedHtml = ref('')

const {
  markdownRef,
  isRendering,
  error,
  codeBlocks,
  mermaidBlocks,
  renderMarkdown,
  processRenderedContent
} = useMarkdown({
  enableKatex: true,
  enableTables: true,
  enableMermaid: true
})

const replaceElement = async (placeholder: HTMLElement, newElement: HTMLElement) => {
  await nextTick()
  if (placeholder.parentNode) {
    placeholder.parentNode.replaceChild(newElement, placeholder)
  }
}

const updateContent = async () => {
  if (!props.markdown) {
    renderedHtml.value = ''
    return
  }
  renderedHtml.value = await renderMarkdown(props.markdown)

  // Process the rendered content after DOM update
  await nextTick()
  await processRenderedContent()
}

watch(() => props.markdown, updateContent, { immediate: true })

onMounted(() => {
  updateContent()
})
</script>
