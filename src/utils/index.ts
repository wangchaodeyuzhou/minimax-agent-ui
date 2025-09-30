// 时间格式化
export const formatTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return date.toLocaleDateString()
}

// 生成随机ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

// 复制到剪贴板
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 兼容旧版本浏览器
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
      return true
    }
  } catch (error) {
    console.error('Failed to copy text: ', error)
    return false
  }
}

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 检查是否为移动设备
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// 深度克隆对象
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any
  if (typeof obj === 'object') {
    const clonedObj = {} as any
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

// Markdown 渲染辅助函数
export const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// 高亮代码块中的语言
export const detectLanguage = (code: string): string => {
  const patterns: Record<string, RegExp> = {
    javascript: /\b(function|const|let|var|=>|console\.log)\b/,
    typescript: /\b(interface|type|enum|namespace|implements)\b/,
    python: /\b(def|import|from|class|if __name__|print)\b/,
    java: /\b(public|private|class|interface|extends|implements)\b/,
    cpp: /\b(#include|using namespace|cout|cin)\b/,
    csharp: /\b(using|namespace|public|private|class|interface)\b/,
    go: /\b(package|import|func|type|struct)\b/,
    rust: /\b(fn|let|mut|struct|enum|impl)\b/,
    php: /<\?php|<\?=/,
    ruby: /\b(def|class|module|require|include)\b/,
    swift: /\b(func|var|let|class|struct|enum)\b/,
    kotlin: /\b(fun|val|var|class|interface|object)\b/,
    sql: /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|JOIN)\b/i,
    html: /<[^>]+>/,
    css: /\{[^}]*\}|\.[a-zA-Z][a-zA-Z0-9_-]*\s*\{/,
    json: /^\s*\{[\s\S]*\}\s*$/,
    xml: /<\?xml|<[a-zA-Z][^>]*>/,
    yaml: /^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:/m,
    markdown: /^#+\s|^\*\s|\[.*\]\(.*\)/m,
    bash: /^\$\s|#!/,
  }

  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(code)) {
      return lang
    }
  }
  
  return 'text'
}

// 滚动到底部
export const scrollToBottom = (element: HTMLElement, smooth = true): void => {
  element.scrollTo({
    top: element.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto'
  })
}

// 获取随机颜色
export const getRandomColor = (): string => {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
    '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}