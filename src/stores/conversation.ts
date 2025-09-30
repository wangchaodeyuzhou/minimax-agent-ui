import { defineStore } from 'pinia'
import type { Conversation, Message, ToolCall } from '@/types'
import { generateId } from '@/utils'

type MessagePayload = Pick<Message, 'type' | 'content'> & Partial<Pick<Message, 'toolCalls'>>

const createMessage = (payload: MessagePayload): Message => ({
  id: generateId(),
  type: payload.type,
  content: payload.content,
  timestamp: new Date(),
  toolCalls: payload.toolCalls ?? [],
})

const createConversation = (title?: string): Conversation => ({
  id: generateId(),
  title: title ?? '新的对话',
  messages: [],
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    conversations: [] as Conversation[],
    currentConversationId: '' as string,
    isLoading: false,
  }),
  getters: {
    currentConversation(state): Conversation | undefined {
      return state.conversations.find((conv) => conv.id === state.currentConversationId)
    },
    currentMessages(state): Message[] {
      return this.currentConversation?.messages ?? []
    },
  },
  actions: {
    createConversation(title?: string) {
      const conv = createConversation(title)
      this.conversations.unshift(conv)
      this.currentConversationId = conv.id
      return conv
    },
    selectConversation(id: string) {
      if (this.currentConversationId === id) return
      const exists = this.conversations.some((conv) => conv.id === id)
      if (exists) {
        this.currentConversationId = id
      }
    },
    deleteConversation(id: string) {
      const index = this.conversations.findIndex((conv) => conv.id === id)
      if (index < 0) return
      this.conversations.splice(index, 1)
      if (this.currentConversationId === id) {
        this.currentConversationId = this.conversations[0]?.id ?? ''
      }
    },
    clearCurrentConversation() {
      if (!this.currentConversation) return
      this.currentConversation.messages = []
      this.currentConversation.updatedAt = new Date()
    },
    addMessage(payload: MessagePayload) {
      let conversation = this.currentConversation
      if (!conversation) {
        conversation = this.createConversation(payload.content.slice(0, 20))
      }
      const message = createMessage(payload)
      conversation.messages.push(message)
      conversation.updatedAt = new Date()
      return message
    },
    updateMessage(id: string, partial: Partial<Message>) {
      const conversation = this.currentConversation
      if (!conversation) return
      const message = conversation.messages.find((msg) => msg.id === id)
      if (!message) return
      Object.assign(message, partial)
      conversation.updatedAt = new Date()
    },
    removeMessage(id: string) {
      const conversation = this.currentConversation
      if (!conversation) return
      const index = conversation.messages.findIndex((msg) => msg.id === id)
      if (index >= 0) {
        conversation.messages.splice(index, 1)
        conversation.updatedAt = new Date()
      }
    },
    importConversations(items: Conversation[]) {
      const normalized = items.map((conv) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        updatedAt: new Date(conv.updatedAt),
        messages: conv.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          toolCalls: (msg.toolCalls ?? []) as ToolCall[],
        })),
      }))
      this.conversations = normalized
      this.currentConversationId = normalized[0]?.id ?? ''
    },
  },
})

