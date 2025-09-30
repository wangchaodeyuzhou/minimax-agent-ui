<template>
  <div class="h-full flex flex-col bg-background border-l border-border">
    <!-- 面板头部 -->
    <div class="flex items-center justify-between p-4 border-b border-border">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse" v-if="runningProcesses.length > 0"></div>
        <div class="w-2 h-2 bg-gray-400 rounded-full" v-else></div>
        <h3 class="font-semibold text-foreground">进程监控</h3>
        <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          {{ runningProcesses.length }}/{{ processes.length }}
        </span>
      </div>
      
      <div class="flex items-center gap-2">
        <button 
          @click="clearCompleted"
          class="text-xs text-muted-foreground hover:text-foreground transition-colors"
          :disabled="completedProcesses.length === 0"
        >
          清空已完成
        </button>
        <button 
          @click="$emit('close')"
          class="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 进程列表 -->
    <div class="flex-1 overflow-y-auto scrollbar-thin">
      <div v-if="processes.length === 0" class="p-6 text-center text-muted-foreground">
        <div class="w-12 h-12 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p>暂无进程</p>
      </div>
      
      <div v-else class="space-y-1 p-2">
        <div 
          v-for="process in recentProcesses" 
          :key="process.id"
          class="p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
          @click="selectProcess(process)"
          :class="{ 'border-primary': selectedProcessId === process.id }"
        >
          <!-- 进程标题和状态 -->
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-foreground truncate">{{ process.name }}</h4>
              <p class="text-xs text-muted-foreground truncate">{{ process.description }}</p>
            </div>
            
            <div class="flex items-center gap-2 ml-2">
              <!-- 状态指示器 -->
              <div class="flex items-center gap-1">
                <div 
                  class="w-2 h-2 rounded-full"
                  :class="{
                    'bg-yellow-500 animate-pulse': process.status === 'pending',
                    'bg-blue-500 animate-pulse': process.status === 'running', 
                    'bg-green-500': process.status === 'completed',
                    'bg-red-500': process.status === 'error',
                    'bg-gray-400': process.status === 'cancelled'
                  }"
                ></div>
                <span 
                  class="text-xs"
                  :class="{
                    'text-yellow-600 dark:text-yellow-400': process.status === 'pending',
                    'text-blue-600 dark:text-blue-400': process.status === 'running',
                    'text-green-600 dark:text-green-400': process.status === 'completed',
                    'text-red-600 dark:text-red-400': process.status === 'error',
                    'text-gray-600 dark:text-gray-400': process.status === 'cancelled'
                  }"
                >
                  {{ getStatusText(process.status) }}
                </span>
              </div>
              
              <!-- 进程类型图标 -->
              <div class="text-muted-foreground">
                <svg v-if="process.type === 'code_generation'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <svg v-else-if="process.type === 'file_operation'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <svg v-else-if="process.type === 'search'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- 进度条 -->
          <div v-if="process.status === 'running' || process.status === 'pending'" class="mb-2">
            <div class="w-full bg-muted rounded-full h-1.5">
              <div 
                class="bg-primary h-1.5 rounded-full transition-all duration-300"
                :style="{ width: process.progress + '%' }"
              ></div>
            </div>
            <div class="flex justify-between items-center mt-1">
              <span class="text-xs text-muted-foreground">{{ process.progress }}%</span>
              <span class="text-xs text-muted-foreground">{{ formatDuration(process.startTime) }}</span>
            </div>
          </div>
          
          <!-- 完成时间或错误信息 -->
          <div v-else class="flex justify-between items-center text-xs text-muted-foreground">
            <span v-if="process.status === 'completed'">
              完成于 {{ formatTime(process.endTime!) }}
            </span>
            <span v-else-if="process.status === 'error'" class="text-red-600 dark:text-red-400">
              {{ process.error || '执行失败' }}
            </span>
            <span v-else>
              取消于 {{ formatTime(process.endTime!) }}
            </span>
            <span>耗时 {{ formatDuration(process.startTime, process.endTime) }}</span>
          </div>
          
          <!-- 详细信息展开 -->
          <div v-if="selectedProcessId === process.id && process.details" class="mt-2 pt-2 border-t border-border">
            <pre class="text-xs text-muted-foreground whitespace-pre-wrap">{{ process.details }}</pre>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部统计 -->
    <div class="p-3 border-t border-border bg-muted/50">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div>
          <div class="text-sm font-medium text-foreground">{{ runningProcesses.length }}</div>
          <div class="text-xs text-muted-foreground">运行中</div>
        </div>
        <div>
          <div class="text-sm font-medium text-green-600 dark:text-green-400">{{ completedProcesses.length }}</div>
          <div class="text-xs text-muted-foreground">已完成</div>
        </div>
        <div>
          <div class="text-sm font-medium text-red-600 dark:text-red-400">{{ failedProcesses.length }}</div>
          <div class="text-xs text-muted-foreground">失败</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProcessStore } from '@/stores'

// 定义事件
defineEmits<{
  close: []
}>()

// 使用 Store
const processStore = useProcessStore()
const { processes, runningProcesses, completedProcesses, failedProcesses, recentProcesses } = storeToRefs(processStore)

// 本地状态
const selectedProcessId = ref<string | null>(null)

// 方法
const selectProcess = (process: any) => {
  selectedProcessId.value = selectedProcessId.value === process.id ? null : process.id
}

const clearCompleted = () => {
  processStore.clearCompletedProcesses()
}

const getStatusText = (status: string) => {
  const statusMap = {
    pending: '等待中',
    running: '运行中',
    completed: '已完成',
    error: '失败',
    cancelled: '已取消'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('zh-CN', { hour12: false, timeStyle: 'medium' })
}

const formatDuration = (startTime: Date, endTime?: Date) => {
  const end = endTime || new Date()
  const duration = Math.floor((end.getTime() - startTime.getTime()) / 1000)
  
  if (duration < 60) return `${duration}秒`
  if (duration < 3600) return `${Math.floor(duration / 60)}分${duration % 60}秒`
  return `${Math.floor(duration / 3600)}时${Math.floor((duration % 3600) / 60)}分`
}
</script>