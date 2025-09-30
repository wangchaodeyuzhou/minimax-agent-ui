// 消息类型
export interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
  toolCalls?: ToolCall[]
}

// 工具调用类型
export interface ToolCall {
  id: string
  name: string
  arguments: Record<string, any>
  result?: any
  status: 'pending' | 'running' | 'completed' | 'error'
  startTime: Date
  endTime?: Date
  error?: string
}

// 对话类型
export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system'

// 用户类型
export interface User {
  id: string
  name: string
  email?: string
  avatar?: string
}

// 设置类型
export interface Settings {
  theme: Theme
  fontSize: 'small' | 'medium' | 'large'
  sidebarCollapsed: boolean
  enableNotifications: boolean
  enableSounds: boolean
}

// 状态类型
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting'
export type MessageStatus = 'sending' | 'sent' | 'error'

// 进程类型
export interface Process {
  id: string
  name: string
  type: 'code_generation' | 'file_operation' | 'analysis' | 'search' | 'other'
  status: 'pending' | 'running' | 'completed' | 'error' | 'cancelled'
  progress: number // 0-100
  startTime: Date
  endTime?: Date
  description: string
  details?: string
  error?: string
  result?: any
}

// 文件类型
export interface FileItem {
  id: string
  name: string
  path: string
  type: 'file' | 'folder'
  extension?: string
  size?: number
  content?: string
  language?: string
  lastModified: Date
  isGenerated: boolean
  parent?: string
}

// 功能面板类型
export type PanelType = 'processes' | 'files' | 'tools' | 'settings'

export interface PanelState {
  type: PanelType
  visible: boolean
  width: number
  minimized: boolean
}