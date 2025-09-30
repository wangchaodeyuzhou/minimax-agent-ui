<template>
  <div
    class="chat-container h-full overflow-hidden md:px-[0] relative transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,0)] min-w-full md:min-w-[432px] md:max-w-[800px]"
    style="width: 60%;"
  >
    <div class="w-full max-auto h-full overflow-hidden flex flex-col">
      <div class="relative flex-1 overflow-hidden flex flex-col">
        <ChatPage />
        <ChatAreaText />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatAreaText from '@/components/core/chatAreaText.vue'
import ChatPage from '@/components/core/chatPage.vue'
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
}
</style>
