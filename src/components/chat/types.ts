export enum ItemTypes {
  AssistantMessage = 'assistant_message', // 消息
  Reasoning = 'reasoning', // 思考
  FileChange = 'file_change', // 文件更改
}

export enum MessageItemTypes {
  Assistant = 'assistant',
  User = 'user',
  System = 'system',
  Tool = 'tool',
}

export enum SessionStatus {
  Completed = 'completed',
  InProgress = 'in_progress',
  Failed = 'failed',
}

export interface AttachFileInfo {
  name: string
  url: string
}