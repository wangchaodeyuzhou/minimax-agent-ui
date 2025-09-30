<template>
  <div class="flex flex-col h-full bg-background">
    <!-- 聊天消息区域 -->
    <div class="flex-1 overflow-y-auto" ref="messagesContainer">
      <div class="max-w-4xl mx-auto">
        <!-- 欢迎界面 -->
        <div v-if="!currentConversation || currentMessages.length === 0" class="h-full flex items-center justify-center">
          <div class="text-center space-y-6 p-8">
            <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Zap class="w-8 h-8 text-primary" />
            </div>
            <div class="space-y-2">
              <h2 class="text-2xl font-semibold text-foreground">Welcome to MiniMax Agent</h2>
              <p class="text-muted-foreground max-w-md">
                Your intelligent AI assistant is ready to help. Start a conversation by typing a message below.
              </p>
            </div>
            
            <!-- 建议问题 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <button
                v-for="suggestion in suggestions"
                :key="suggestion"
                @click="handleSuggestion(suggestion)"
                class="p-4 text-left border border-border rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div class="flex items-start gap-3">
                  <MessageCircle class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span class="text-sm">{{ suggestion }}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 消息列表 -->
        <div v-else class="space-y-6 p-6">
          <MessageItem
            v-for="message in currentMessages"
            :key="message.id"
            :message="message"
            @retry="handleRetry"
            @copy="handleCopy"
            @delete="handleDeleteMessage"
          />
          
          <!-- AI 打字指示器 -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="max-w-xs md:max-w-2xl">
              <div class="bg-chat-assistant rounded-2xl px-4 py-3 shadow-sm">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot class="w-4 h-4 text-primary" />
                  </div>
                  <div class="typing-indicator">
                    <div class="typing-dot" style="--delay: 0ms"></div>
                    <div class="typing-dot" style="--delay: 150ms"></div>
                    <div class="typing-dot" style="--delay: 300ms"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部输入区域 -->
    <div class="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <MessageInput
        @send="handleSendMessage"
        @file-upload="handleFileUpload"
        :disabled="isLoading || isTyping"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { useAppStore, useConversationStore } from '@/stores'
import { scrollToBottom, copyToClipboard } from '@/utils'
import MessageItem from './MessageItem.vue'
import MessageInput from './MessageInput.vue'
import { Zap, MessageCircle, Bot } from 'lucide-vue-next'

// 使用 store
const appStore = useAppStore()
const conversationStore = useConversationStore()

// 组件状态
const messagesContainer = ref<HTMLElement>()

// 计算属性
const currentConversation = computed(() => conversationStore.currentConversation)
const currentMessages = computed(() => conversationStore.currentMessages)
const isLoading = computed(() => conversationStore.isLoading)
const isTyping = computed(() => appStore.isTyping)

// 建议问题
const suggestions = [
  "Help me write a Python script for data analysis",
  "Explain the latest trends in artificial intelligence",
  "Create a marketing strategy for a tech startup",
  "Debug this JavaScript code for me"
]

// 方法
const handleSendMessage = async (content: string, files?: File[]) => {
  if (!content.trim() && (!files || files.length === 0)) return
  
  // 如果没有当前对话，创建一个新的
  if (!currentConversation.value) {
    conversationStore.createConversation()
  }
  
  // 添加用户消息
  const userMessage = conversationStore.addMessage({
    type: 'user',
    content: content.trim(),
  })
  
  // 滚动到底部
  await nextTick()
  if (messagesContainer.value) {
    scrollToBottom(messagesContainer.value)
  }
  
  // 模拟 AI 响应
  simulateAIResponse(content.trim())
}

const simulateAIResponse = async (userMessage: string) => {
  try {
    appStore.isTyping = true
    
    // 模拟响应延迟
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    
    // 生成 AI 响应
    const responses = [
      "I understand you need help with that. Let me provide you with a detailed solution.",
      "That's an interesting question! Here's what I think about it:",
      "I can definitely help you with this. Let me break it down step by step:",
      "Great question! Based on my knowledge, here's what I would suggest:",
      "I'd be happy to assist you with that. Here's my analysis:"
    ]
    
    const response = responses[Math.floor(Math.random() * responses.length)]
    const detailedResponse = `${response}\n\n` + generateDetailedResponse(userMessage)
    
    // 添加 AI 响应消息
    conversationStore.addMessage({
      type: 'assistant',
      content: detailedResponse,
    })
    
    // 滚动到底部
    await nextTick()
    if (messagesContainer.value) {
      scrollToBottom(messagesContainer.value)
    }
    
  } catch (error) {
    console.error('Error generating AI response:', error)
    
    // 添加错误消息
    conversationStore.addMessage({
      type: 'assistant',
      content: "I apologize, but I encountered an error while processing your request. Please try again.",
    })
  } finally {
    appStore.isTyping = false
  }
}

const generateDetailedResponse = (userMessage: string): string => {
  // 简单的响应生成逻辑
  const lowerMessage = userMessage.toLowerCase()
  
  if (lowerMessage.includes('python') || lowerMessage.includes('code')) {
    return `Here's a Python example that might help:\n\n\`\`\`python\n# Sample Python code\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\n# Load your data\ndf = pd.read_csv('your_data.csv')\n\n# Basic analysis\nprint(df.describe())\n\n# Create a simple plot\ndf.plot(kind='hist')\nplt.show()\n\`\`\`\n\nThis code demonstrates basic data loading and visualization. You can modify it according to your specific needs.`
  }
  
  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
    return `Artificial Intelligence is rapidly evolving with several key trends:\n\n1. **Large Language Models**: GPT, Claude, and similar models are becoming more capable\n2. **Multimodal AI**: Systems that can process text, images, and audio together\n3. **Edge AI**: Running AI models on local devices for privacy and speed\n4. **AI Safety**: Increasing focus on alignment and responsible AI development\n\nThese developments are shaping how we interact with technology and solve complex problems.`
  }
  
  if (lowerMessage.includes('marketing') || lowerMessage.includes('strategy')) {
    return `Here's a comprehensive marketing strategy framework:\n\n**1. Market Research**\n- Identify target audience\n- Analyze competitors\n- Understand market trends\n\n**2. Value Proposition**\n- Define unique selling points\n- Address customer pain points\n- Position against competitors\n\n**3. Channel Strategy**\n- Digital marketing (SEO, social media, content)\n- Traditional marketing (if applicable)\n- Partnership and referral programs\n\n**4. Metrics & KPIs**\n- Customer acquisition cost\n- Lifetime value\n- Conversion rates\n- Brand awareness\n\nWould you like me to dive deeper into any of these areas?`
  }
  
  return `I've analyzed your request and here are some key points to consider:\n\n• **Understanding the Context**: Your question touches on several important aspects that we should explore further.\n\n• **Practical Solutions**: I can provide specific, actionable steps to help you achieve your goals.\n\n• **Best Practices**: Based on industry standards and proven methodologies.\n\n• **Next Steps**: I recommend we break this down into smaller, manageable tasks.\n\nWould you like me to elaborate on any particular aspect of this topic?`
}

const handleSuggestion = (suggestion: string) => {
  handleSendMessage(suggestion)
}

const handleRetry = (messageId: string) => {
  // TODO: 实现重试逻辑
  console.log('Retry message:', messageId)
}

const handleCopy = async (content: string) => {
  const success = await copyToClipboard(content)
  if (success) {
    // TODO: 显示复制成功通知
    console.log('Copied to clipboard')
  }
}

const handleDeleteMessage = (messageId: string) => {
  if (confirm('Are you sure you want to delete this message?')) {
    // TODO: 实现删除消息逻辑
    console.log('Delete message:', messageId)
  }
}

const handleFileUpload = (files: File[]) => {
  // TODO: 实现文件上传逻辑
  console.log('Upload files:', files)
}

// 监听消息变化，自动滚动到底部
watch(currentMessages, async () => {
  await nextTick()
  if (messagesContainer.value) {
    scrollToBottom(messagesContainer.value, false)
  }
}, { deep: true })
</script>

<style scoped>
/* 打字指示器动画 */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background-color: rgb(156 163 175);
  border-radius: 50%;
  animation: typing 1.5s ease-in-out infinite;
  animation-delay: var(--delay, 0ms);
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-4px);
  }
}

/* 滚动条样式 */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgb(156 163 175 / 0.3) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(156 163 175 / 0.3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175 / 0.5);
}
</style>