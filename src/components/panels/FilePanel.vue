<template>
  <div class="h-full flex flex-col bg-background border-l border-border">
    <!-- 面板头部 -->
    <div class="flex items-center justify-between p-4 border-b border-border">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
        </svg>
        <h3 class="font-semibold text-foreground">文件管理</h3>
        <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          {{ files.length }}
        </span>
      </div>
      
      <div class="flex items-center gap-2">
        <button 
          @click="clearAllFiles"
          class="text-xs text-muted-foreground hover:text-foreground transition-colors"
          :disabled="files.length === 0"
          title="清空所有文件"
        >
          清空
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
    
    <!-- 搜索和过滤 -->
    <div class="p-3 border-b border-border">
      <div class="relative mb-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索文件..."
          class="w-full pl-8 pr-4 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
        <svg class="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <div class="flex gap-2">
        <button 
          @click="filterType = 'all'"
          :class="filterType === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'"
          class="px-3 py-1 text-xs rounded-md transition-colors"
        >
          全部
        </button>
        <button 
          @click="filterType = 'generated'"
          :class="filterType === 'generated' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'"
          class="px-3 py-1 text-xs rounded-md transition-colors"
        >
          生成的
        </button>
        <button 
          @click="filterType = 'folders'"
          :class="filterType === 'folders' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'"
          class="px-3 py-1 text-xs rounded-md transition-colors"
        >
          文件夹
        </button>
      </div>
    </div>
    
    <!-- 文件列表 -->
    <div class="flex-1 overflow-y-auto scrollbar-thin">
      <div v-if="filteredFiles.length === 0" class="p-6 text-center text-muted-foreground">
        <div class="w-12 h-12 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </div>
        <p>{{ searchQuery ? '没有找到匹配的文件' : '暂无文件' }}</p>
      </div>
      
      <div v-else class="space-y-1 p-2">
        <div 
          v-for="file in filteredFiles" 
          :key="file.id"
          class="p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer group"
          @click="selectFile(file)"
          :class="{ 'border-primary bg-primary/5': selectedFileId === file.id }"
        >
          <div class="flex items-start gap-3">
            <!-- 文件图标 -->
            <div class="flex-shrink-0 mt-0.5">
              <div v-if="file.type === 'folder'" class="w-5 h-5 text-blue-500">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z"/>
                </svg>
              </div>
              <div v-else class="w-5 h-5" :class="getFileIconClass(file.extension || '')">
                <svg v-if="isCodeFile(file.extension)" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
                <svg v-else-if="isImageFile(file.extension)" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <svg v-else-if="isDocumentFile(file.extension)" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <svg v-else fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
            </div>
            
            <!-- 文件信息 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <h4 class="text-sm font-medium text-foreground truncate">{{ file.name }}</h4>
                <span v-if="file.isGenerated" class="px-1.5 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                  生成
                </span>
              </div>
              
              <div class="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{{ file.path }}</span>
                <span v-if="file.size">{{ formatFileSize(file.size) }}</span>
                <span>{{ formatTime(file.lastModified) }}</span>
              </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="flex items-center gap-1">
                <button 
                  @click.stop="downloadFile(file)"
                  class="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                  title="下载"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                </button>
                <button 
                  @click.stop="deleteFile(file)"
                  class="p-1 hover:bg-muted rounded text-muted-foreground hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  title="删除"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 文件内容预览 -->
          <div v-if="selectedFileId === file.id && file.content && showPreview" class="mt-3 pt-3 border-t border-border">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-foreground">预览</span>
              <button 
                @click="showPreview = false"
                class="text-xs text-muted-foreground hover:text-foreground"
              >
                隐藏预览
              </button>
            </div>
            <div class="bg-muted/50 rounded-md p-3 max-h-48 overflow-y-auto scrollbar-thin">
              <pre class="text-xs whitespace-pre-wrap text-foreground">{{ file.content.slice(0, 1000) }}{{ file.content.length > 1000 ? '\n...' : '' }}</pre>
            </div>
          </div>
          
          <div v-else-if="selectedFileId === file.id && file.content" class="mt-3 pt-3 border-t border-border">
            <button 
              @click="showPreview = true"
              class="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              显示预览
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部统计 -->
    <div class="p-3 border-t border-border bg-muted/50">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <div class="text-sm font-medium text-foreground">{{ files.length }}</div>
          <div class="text-xs text-muted-foreground">总文件</div>
        </div>
        <div>
          <div class="text-sm font-medium text-green-600 dark:text-green-400">{{ generatedFiles.length }}</div>
          <div class="text-xs text-muted-foreground">已生成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFileStore } from '@/stores'

// 定义事件
defineEmits<{
  close: []
}>()

// 使用 Store
const fileStore = useFileStore()
const { files, selectedFileId, generatedFiles } = storeToRefs(fileStore)

// 本地状态
const searchQuery = ref('')
const filterType = ref<'all' | 'generated' | 'folders'>('all')
const showPreview = ref(false)

// 计算属性
const filteredFiles = computed(() => {
  let result = files.value

  // 根据过滤器类型过滤
  if (filterType.value === 'generated') {
    result = result.filter(f => f.isGenerated)
  } else if (filterType.value === 'folders') {
    result = result.filter(f => f.type === 'folder')
  }

  // 根据搜索查询过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(f => 
      f.name.toLowerCase().includes(query) || 
      f.path.toLowerCase().includes(query)
    )
  }

  // 按修改时间排序
  return result.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
})

// 方法
const selectFile = (file: any) => {
  fileStore.selectFile(selectedFileId.value === file.id ? '' : file.id)
  showPreview.value = false
}

const deleteFile = (file: any) => {
  if (confirm(`确定要删除文件 "${file.name}" 吗？`)) {
    fileStore.deleteFile(file.id)
  }
}

const clearAllFiles = () => {
  if (confirm('确定要清空所有文件吗？此操作不可撤销。')) {
    fileStore.clearFiles()
  }
}

const downloadFile = (file: any) => {
  // 创建下载链接
  const content = file.content || ''
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const getFileIconClass = (extension: string) => {
  if (isCodeFile(extension)) return 'text-blue-500'
  if (isImageFile(extension)) return 'text-green-500'
  if (isDocumentFile(extension)) return 'text-orange-500'
  return 'text-gray-500'
}

const isCodeFile = (extension?: string) => {
  if (!extension) return false
  const codeExtensions = ['js', 'ts', 'vue', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'h', 'css', 'scss', 'less', 'html', 'xml', 'json', 'yaml', 'yml', 'md', 'php', 'rb', 'go', 'rs', 'swift', 'kt']
  return codeExtensions.includes(extension.toLowerCase())
}

const isImageFile = (extension?: string) => {
  if (!extension) return false
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico']
  return imageExtensions.includes(extension.toLowerCase())
}

const isDocumentFile = (extension?: string) => {
  if (!extension) return false
  const docExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf']
  return docExtensions.includes(extension.toLowerCase())
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return date.toLocaleDateString('zh-CN')
}
</script>