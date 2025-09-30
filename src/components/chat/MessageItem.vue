<template>
  <div 
    class="flex w-full animate-fade-in"
    :class="{
      'justify-end': message.type === 'user',
      'justify-start': message.type === 'assistant'
    }"
  >
    <div 
      class="flex max-w-xs md:max-w-2xl"
      :class="{
        'flex-row-reverse': message.type === 'user',
        'flex-row': message.type === 'assistant'
      }"
    >
      <!-- 头像 -->
      <div 
        class="flex-shrink-0"
        :class="{
          'ml-3': message.type === 'user',
          'mr-3': message.type === 'assistant'
        }"
      >
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center"
          :class="{
            'bg-primary': message.type === 'user',
            'bg-primary/10': message.type === 'assistant'
          }"
        >
          <User 
            v-if="message.type === 'user'" 
            class="w-5 h-5 text-primary-foreground" 
          />
          <Bot 
            v-else 
            class="w-5 h-5 text-primary" 
          />
        </div>
      </div>
      
      <!-- 消息内容 -->
      <div class="flex-1 min-w-0">
        <div 
          class="rounded-2xl px-4 py-3 shadow-sm group relative"
          :class="{
            'bg-chat-user text-primary-foreground': message.type === 'user',
            'bg-chat-assistant border border-border': message.type === 'assistant'
          }"
        >
          <!-- 消息文本内容 -->
          <div 
            class="prose prose-sm max-w-none"
            :class="{
              'prose-invert': message.type === 'user',
              'dark:prose-invert': message.type === 'assistant'
            }"
          >
            <MessageContent :content="message.content" />
          </div>
          
          <!-- 工具调用展示 -->
          <div v-if="message.toolCalls && message.toolCalls.length > 0" class="mt-4 space-y-2">
            <ToolCallDisplay
              v-for="toolCall in message.toolCalls"
              :key="toolCall.id"
              :tool-call="toolCall"
            />
          </div>
          
          <!-- 消息操作按钮 -->
          <div 
            class="absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
            :class="{
              'right-2': message.type === 'user',
              'left-2': message.type === 'assistant'
            }"
          >
            <!-- 复制按钮 -->
            <button
              @click="handleCopy"
              class="p-1.5 rounded-md bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              title="Copy message"
            >
              <Copy class="w-3 h-3" />
            </button>
            
            <!-- 重新生成按钮 (仅 AI 消息) -->
            <button
              v-if="message.type === 'assistant'"
              @click="handleRetry"
              class="p-1.5 rounded-md bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              title="Regenerate response"
            >
              <RotateCcw class="w-3 h-3" />
            </button>
            
            <!-- 删除按钮 -->
            <button
              @click="handleDelete"
              class="p-1.5 rounded-md bg-background border border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
              title="Delete message"
            >
              <Trash2 class="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <!-- 消息元信息 -->
        <div 
          class="flex items-center gap-2 mt-2 text-xs text-muted-foreground"
          :class="{
            'justify-end': message.type === 'user',
            'justify-start': message.type === 'assistant'
          }"
        >
          <span>{{ formatTime(message.timestamp) }}</span>
          <span v-if="message.type === 'user'" class="flex items-center gap-1">
            <Check class="w-3 h-3" />
            Sent
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '@/types'
import { formatTime } from '@/utils'
import MessageContent from './MessageContent.vue'
import ToolCallDisplay from './ToolCallDisplay.vue'
import { User, Bot, Copy, RotateCcw, Trash2, Check } from 'lucide-vue-next'

// Props
interface Props {
  message: Message
}

const props = defineProps<Props>()

// Emits
interface Emits {
  retry: [messageId: string]
  copy: [content: string]
  delete: [messageId: string]
}

const emit = defineEmits<Emits>()

// 方法
const handleCopy = () => {
  emit('copy', props.message.content)
}

const handleRetry = () => {
  emit('retry', props.message.id)
}

const handleDelete = () => {
  emit('delete', props.message.id)
}
</script>

<style scoped>
/* 消息动画 */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Prose 样式覆盖 */
:deep(.prose) {
  color: inherit;
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4),
:deep(.prose h5),
:deep(.prose h6) {
  color: inherit;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

:deep(.prose h1:first-child),
:deep(.prose h2:first-child),
:deep(.prose h3:first-child),
:deep(.prose h4:first-child),
:deep(.prose h5:first-child),
:deep(.prose h6:first-child) {
  margin-top: 0;
}

:deep(.prose p) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}

:deep(.prose p:first-child) {
  margin-top: 0;
}

:deep(.prose p:last-child) {
  margin-bottom: 0;
}

:deep(.prose ul),
:deep(.prose ol) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}

:deep(.prose li) {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}

:deep(.prose blockquote) {
  margin-top: 1em;
  margin-bottom: 1em;
  border-left: 4px solid rgba(156, 163, 175, 0.5);
  padding-left: 1em;
  font-style: italic;
}

:deep(.prose code) {
  background-color: rgba(156, 163, 175, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 0.875em;
}

:deep(.prose pre) {
  background-color: rgba(156, 163, 175, 0.1);
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 1em;
  margin-bottom: 1em;
}

:deep(.prose pre code) {
  background-color: transparent;
  padding: 0;
}

:deep(.prose a) {
  color: hsl(var(--primary));
  text-decoration: underline;
}

:deep(.prose a:hover) {
  color: hsl(var(--primary));
  opacity: 0.8;
}

:deep(.prose strong) {
  font-weight: 600;
}

:deep(.prose em) {
  font-style: italic;
}

:deep(.prose table) {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
  margin-bottom: 1em;
}

:deep(.prose th),
:deep(.prose td) {
  border: 1px solid rgba(156, 163, 175, 0.3);
  padding: 0.5em;
  text-align: left;
}

:deep(.prose th) {
  background-color: rgba(156, 163, 175, 0.1);
  font-weight: 600;
}

:deep(.prose img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

:deep(.prose hr) {
  border: none;
  border-top: 1px solid rgba(156, 163, 175, 0.3);
  margin: 2em 0;
}
</style>