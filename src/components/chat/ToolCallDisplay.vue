<template>
  <div 
    class="tool-call-display border rounded-lg overflow-hidden"
    :class="{
      'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20': toolCall.status === 'pending',
      'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20': toolCall.status === 'running',
      'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20': toolCall.status === 'completed',
      'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20': toolCall.status === 'error'
    }"
  >
    <!-- 工具调用头部 -->
    <div class="flex items-center justify-between p-3 border-b border-inherit">
      <div class="flex items-center gap-2">
        <!-- 状态图标 -->
        <div class="flex-shrink-0">
          <Clock 
            v-if="toolCall.status === 'pending'"
            class="w-4 h-4 text-yellow-600 dark:text-yellow-400"
          />
          <Loader2 
            v-else-if="toolCall.status === 'running'"
            class="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin"
          />
          <CheckCircle 
            v-else-if="toolCall.status === 'completed'"
            class="w-4 h-4 text-green-600 dark:text-green-400"
          />
          <XCircle 
            v-else-if="toolCall.status === 'error'"
            class="w-4 h-4 text-red-600 dark:text-red-400"
          />
        </div>
        
        <!-- 工具名称 -->
        <div class="flex items-center gap-2">
          <Wrench class="w-4 h-4 text-muted-foreground" />
          <span class="font-medium text-sm">{{ toolCall.name }}</span>
        </div>
      </div>
      
      <!-- 执行时间 -->
      <div class="text-xs text-muted-foreground">
        <span v-if="toolCall.status === 'completed' && duration">
          {{ duration }}ms
        </span>
        <span v-else-if="toolCall.status === 'running'">
          Running...
        </span>
        <span v-else-if="toolCall.status === 'pending'">
          Pending
        </span>
        <span v-else-if="toolCall.status === 'error'">
          Failed
        </span>
      </div>
    </div>
    
    <!-- 工具参数（可折叠）-->
    <div class="border-b border-inherit">
      <button
        @click="toggleArguments"
        class="w-full flex items-center justify-between p-3 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <span class="text-sm font-medium">Arguments</span>
        <ChevronDown 
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': showArguments }"
        />
      </button>
      
      <div v-if="showArguments" class="px-3 pb-3">
        <pre class="text-xs bg-muted rounded p-2 overflow-x-auto"><code>{{ formatJson(toolCall.arguments) }}</code></pre>
      </div>
    </div>
    
    <!-- 执行结果 -->
    <div v-if="toolCall.result || toolCall.error">
      <div class="p-3">
        <div class="flex items-center gap-2 mb-2">
          <Terminal class="w-4 h-4 text-muted-foreground" />
          <span class="text-sm font-medium">
            {{ toolCall.error ? 'Error' : 'Result' }}
          </span>
        </div>
        
        <!-- 错误信息 -->
        <div v-if="toolCall.error" class="text-sm text-red-600 dark:text-red-400">
          {{ toolCall.error }}
        </div>
        
        <!-- 成功结果 -->
        <div v-else-if="toolCall.result" class="space-y-2">
          <!-- 文本结果 -->
          <div v-if="typeof toolCall.result === 'string'" class="text-sm">
            <div class="bg-muted rounded p-2">
              <pre class="whitespace-pre-wrap text-xs">{{ toolCall.result }}</pre>
            </div>
          </div>
          
          <!-- JSON 结果 -->
          <div v-else class="text-sm">
            <pre class="bg-muted rounded p-2 overflow-x-auto text-xs"><code>{{ formatJson(toolCall.result) }}</code></pre>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 加载状态 -->
    <div v-else-if="toolCall.status === 'running'" class="p-3">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 class="w-4 h-4 animate-spin" />
        <span>Executing tool...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ToolCall } from '@/types'
import {
  Clock, Loader2, CheckCircle, XCircle, Wrench, ChevronDown,
  Terminal
} from 'lucide-vue-next'

// Props
interface Props {
  toolCall: ToolCall
}

const props = defineProps<Props>()

// 组件状态
const showArguments = ref(false)

// 计算属性
const duration = computed(() => {
  if (props.toolCall.endTime && props.toolCall.startTime) {
    return props.toolCall.endTime.getTime() - props.toolCall.startTime.getTime()
  }
  return null
})

// 方法
const toggleArguments = () => {
  showArguments.value = !showArguments.value
}

const formatJson = (obj: any): string => {
  try {
    return JSON.stringify(obj, null, 2)
  } catch (error) {
    return String(obj)
  }
}
</script>

<style scoped>
/* 动画效果 */
.transition-transform {
  transition: transform 0.2s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* 代码样式 */
code {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}

pre {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
}
</style>