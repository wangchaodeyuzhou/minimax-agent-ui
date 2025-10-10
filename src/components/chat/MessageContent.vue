<script setup lang="ts">
import MarkdownBlock from '@/components/chat/MarkdownBlock.vue'
import { defineProps } from "vue"

interface Props {
  markdownContent?: string
}

defineProps<Props>()
</script>

<template>
  <div class="message-content relative text-pretty leading-[30px] cursor-default text-[17px] text-col_text00 mb-[12px]">
    <div class="matrix-markdown">
      <slot name="think"/>
      <MarkdownBlock :markdown="markdownContent" />
    </div>
  </div>
</template>

<style scoped>
.matrix-markdown {
  display: flex;
  flex-direction: column;
}

.text-col_text00 {
  --col_text00: #222;
  color: var(--col_text00) !important;
}
</style>
