<template>
  <div class="w-full max-auto h-full overflow-hidden flex flex-col">
    <div class="relative flex-1 overflow-hidden flex flex-col">
      <ChatPage />
      <ChatAreaText />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatAreaText from '@/components/core/chatAreaText.vue'
import ChatPage from '@/components/core/chatPage.vue'
</script>

<style scoped>
</style>
