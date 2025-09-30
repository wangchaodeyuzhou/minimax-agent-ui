<template>
  <div 
    v-if="rightPanelVisible" 
    class="flex flex-col bg-background border-l border-border"
    :style="{ width: activePanel.width + 'px' }"
  >
    <!-- 面板标签栏 -->
    <div class="flex items-center border-b border-border bg-muted/30">
      <div class="flex-1 flex items-center">
        <button
          v-for="panelType in availablePanels"
          :key="panelType"
          @click="setActivePanelType(panelType)"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors relative"
          :class="{
            'text-primary border-primary': activePanelType === panelType,
            'text-muted-foreground border-transparent hover:text-foreground': activePanelType !== panelType
          }"
        >
          <div class="flex items-center gap-2">
            <!-- 面板图标 -->
            <svg v-if="panelType === 'processes'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <svg v-else-if="panelType === 'files'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <svg v-else-if="panelType === 'tools'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
            
            <span>{{ getPanelTitle(panelType) }}</span>
            
            <!-- 状态指示器 -->
            <div 
              v-if="getPanelBadge(panelType)" 
              class="w-2 h-2 bg-red-500 rounded-full animate-pulse"
              :title="getPanelBadge(panelType)"
            ></div>
          </div>
          
          <!-- 运行进程数量徽章 -->
          <div 
            v-if="panelType === 'processes' && runningProcesses.length > 0" 
            class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
          >
            {{ runningProcesses.length }}
          </div>
        </button>
      </div>
      
      <!-- 面板操作按钮 -->
      <div class="flex items-center gap-1 px-2">
        <!-- 最小化按钮 -->
        <button
          @click="togglePanelMinimized(activePanelType)"
          class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          :title="activePanel.minimized ? '展开' : '最小化'"
        >
          <svg v-if="activePanel.minimized" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12l-1.411-1.411L16 8l-4 4 1.411 1.411L16 16l4-4z" />
          </svg>
        </button>
        
        <!-- 关闭按钮 -->
        <button
          @click="toggleRightPanel"
          class="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="关闭面板"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 面板内容区域 -->
    <div 
      class="flex-1 overflow-hidden"
      :class="{ 'h-0': activePanel.minimized }"
    >
      <Transition name="panel" mode="out-in">
        <ProcessPanel 
          v-if="activePanelType === 'processes' && !activePanel.minimized"
          @close="hidePanel('processes')"
        />
        <FilePanel 
          v-else-if="activePanelType === 'files' && !activePanel.minimized"
          @close="hidePanel('files')"
        />
        <ToolPanel 
          v-else-if="activePanelType === 'tools' && !activePanel.minimized"
          @close="hidePanel('tools')"
        />
        <SettingsPanel 
          v-else-if="activePanelType === 'settings' && !activePanel.minimized"
          @close="hidePanel('settings')"
        />
      </Transition>
    </div>
    
    <!-- 拖拽调整面板宽度 -->
    <div 
      class="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/20 transition-colors group"
      @mousedown="startResize"
    >
      <div class="w-0.5 h-full bg-border group-hover:bg-primary/50 transition-colors"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePanelStore, useProcessStore } from '@/stores'
import ProcessPanel from './ProcessPanel.vue'
import FilePanel from './FilePanel.vue'

// 使用 Store
const panelStore = usePanelStore()
const processStore = useProcessStore()

const { 
  rightPanelVisible, 
  activePanelType, 
  activePanel, 
  panels 
} = storeToRefs(panelStore)

const { runningProcesses } = storeToRefs(processStore)

// 方法
const { 
  toggleRightPanel, 
  setActivePanelType, 
  hidePanel, 
  updatePanelWidth,
  togglePanelMinimized 
} = panelStore

// 可用面板类型
const availablePanels = computed(() => ['processes', 'files', 'tools', 'settings'])

// 获取面板标题
const getPanelTitle = (type: string) => {
  const titles = {
    processes: '进程',
    files: '文件',
    tools: '工具',
    settings: '设置'
  }
  return titles[type as keyof typeof titles] || type
}

// 获取面板徽章
const getPanelBadge = (type: string) => {
  if (type === 'processes' && runningProcesses.value.length > 0) {
    return `${runningProcesses.value.length} 个进程正在运行`
  }
  return null
}

// 面板宽度调整
const isResizing = ref(false)
const startX = ref(0)
const startWidth = ref(0)

const startResize = (e: MouseEvent) => {
  isResizing.value = true
  startX.value = e.clientX
  startWidth.value = activePanel.value.width
  
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.body.style.userSelect = 'none'
  document.body.style.cursor = 'col-resize'
}

const handleResize = (e: MouseEvent) => {
  if (!isResizing.value) return
  
  const deltaX = startX.value - e.clientX
  const newWidth = startWidth.value + deltaX
  updatePanelWidth(activePanelType.value, newWidth)
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.body.style.userSelect = ''
  document.body.style.cursor = ''
}

// 组件销毁时清理事件监听器
onUnmounted(() => {
  if (isResizing.value) {
    stopResize()
  }
})

// 简单的工具面板和设置面板组件（占位符）
const ToolPanel = {
  template: `
    <div class="h-full flex flex-col bg-background border-l border-border">
      <div class="flex items-center justify-between p-4 border-b border-border">
        <h3 class="font-semibold text-foreground">工具箱</h3>
        <button @click="$emit('close')" class="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="flex-1 p-4 text-center text-muted-foreground">
        工具功能即将推出...
      </div>
    </div>
  `,
  emits: ['close']
}

const SettingsPanel = {
  template: `
    <div class="h-full flex flex-col bg-background border-l border-border">
      <div class="flex items-center justify-between p-4 border-b border-border">
        <h3 class="font-semibold text-foreground">设置</h3>
        <button @click="$emit('close')" class="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="flex-1 p-4 text-center text-muted-foreground">
        设置功能即将推出...
      </div>
    </div>
  `,
  emits: ['close']
}
</script>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition: all 0.2s ease;
}

.panel-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.panel-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>