<template>
  <div class="message-input-container p-4">
    <div class="max-w-4xl mx-auto">
      <!-- 文件预览区域 -->
      <div v-if="uploadedFiles.length > 0" class="mb-3">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="(file, index) in uploadedFiles"
            :key="index"
            class="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg text-sm"
          >
            <FileText class="w-4 h-4" />
            <span class="truncate max-w-32">{{ file.name }}</span>
            <button
              @click="removeFile(index)"
              class="hover:text-destructive transition-colors"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- 输入框容器 -->
      <div 
        class="relative flex items-end gap-3 bg-background border border-border rounded-2xl p-3 focus-within:border-ring transition-colors"
        :class="{ 'border-ring': isFocused }"
      >
        <!-- 文件上传按钮 -->
        <button
          @click="triggerFileUpload"
          class="flex-shrink-0 p-2 hover:bg-accent hover:text-accent-foreground rounded-xl transition-colors"
          title="Attach files"
          :disabled="disabled"
        >
          <Paperclip class="w-5 h-5" />
        </button>
        
        <!-- 文本输入区域 -->
        <div class="flex-1 min-h-[24px] max-h-32">
          <textarea
            ref="textareaRef"
            v-model="message"
            @keydown="handleKeyDown"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @input="adjustTextareaHeight"
            placeholder="Type a message..."
            class="w-full resize-none bg-transparent border-none outline-none placeholder:text-muted-foreground text-sm leading-6"
            rows="1"
            :disabled="disabled"
          ></textarea>
        </div>
        
        <!-- 发送按钮 -->
        <button
          @click="handleSend"
          :disabled="disabled || (!message.trim() && uploadedFiles.length === 0)"
          class="flex-shrink-0 p-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
          title="Send message"
        >
          <Send class="w-5 h-5" />
        </button>
      </div>
      
      <!-- 底部提示信息 -->
      <div class="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <div class="flex items-center gap-4">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span v-if="message.length > 0">{{ message.length }}/4000</span>
        </div>
        
        <div class="flex items-center gap-2">
          <span v-if="disabled" class="flex items-center gap-1">
            <Loader2 class="w-3 h-3 animate-spin" />
            Processing...
          </span>
        </div>
      </div>
    </div>
    
    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInputRef"
      type="file"
      multiple
      @change="handleFileSelect"
      class="hidden"
      accept=".txt,.md,.json,.csv,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { Send, Paperclip, FileText, X, Loader2 } from 'lucide-vue-next'

// Props
interface Props {
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

// Emits
interface Emits {
  send: [message: string, files?: File[]]
  fileUpload: [files: File[]]
}

const emit = defineEmits<Emits>()

// 组件状态
const message = ref('')
const uploadedFiles = ref<File[]>([])
const isFocused = ref(false)
const textareaRef = ref<HTMLTextAreaElement>()
const fileInputRef = ref<HTMLInputElement>()

// 方法
const handleSend = () => {
  if (props.disabled) return
  
  const content = message.value.trim()
  const files = uploadedFiles.value.length > 0 ? [...uploadedFiles.value] : undefined
  
  if (!content && !files) return
  
  emit('send', content, files)
  
  // 清空输入
  message.value = ''
  uploadedFiles.value = []
  
  // 重置文本框高度
  nextTick(() => {
    adjustTextareaHeight()
    textareaRef.value?.focus()
  })
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSend()
  }
}

const adjustTextareaHeight = () => {
  const textarea = textareaRef.value
  if (!textarea) return
  
  // 重置高度以获取正确的scrollHeight
  textarea.style.height = 'auto'
  
  // 设置新高度（最大5行）
  const lineHeight = 24
  const maxHeight = lineHeight * 5
  const newHeight = Math.min(textarea.scrollHeight, maxHeight)
  
  textarea.style.height = newHeight + 'px'
}

const triggerFileUpload = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  if (files.length === 0) return
  
  // 检查文件大小（最大10MB）
  const maxSize = 10 * 1024 * 1024
  const validFiles = files.filter(file => {
    if (file.size > maxSize) {
      alert(`File ${file.name} is too large. Maximum size is 10MB.`)
      return false
    }
    return true
  })
  
  // 检查文件总数（最大5个）
  const totalFiles = uploadedFiles.value.length + validFiles.length
  if (totalFiles > 5) {
    alert('Maximum 5 files allowed')
    return
  }
  
  // 添加文件
  uploadedFiles.value.push(...validFiles)
  
  // 清空文件输入
  target.value = ''
  
  // 发送文件上传事件
  if (validFiles.length > 0) {
    emit('fileUpload', validFiles)
  }
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}

// 组件挂载时聚焦输入框
onMounted(() => {
  textareaRef.value?.focus()
})
</script>

<style scoped>
/* 文本区域样式 */
textarea {
  field-sizing: content;
}

/* 滚动条样式 */
textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 2px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}

/* 禁用状态样式 */
.message-input-container:has(textarea:disabled) {
  opacity: 0.7;
}

/* 聚焦状态动画 */
.transition-colors {
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}
</style>