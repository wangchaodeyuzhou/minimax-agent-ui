<script setup lang="ts">
import MessageContainer from '@/components/chat/MessageContainer.vue'
</script>

<template>
  <div class="chat-page w-full flex-1 flex overflow-hidden relative">
    <div class="chat-container h-full overflow-hidden md:px-[0] relative transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,0)] flex-1 md:min-w-[432px] md:max-w-[800px]">
      <div class="w-full h-full overflow-hidden flex flex-col">
        <div class="flex justify-between items-center my-[10px] w-full truncate">
          <div class="pr-[8px] flex items-center relative z-[1] flex-1 min-w-0">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1 overflow-x-auto scrollbar-hide w-full">
                <div
                  class="group/chatTab relative px-2 max-w-[140px] leading-[32px] flex items-center text-[15px] font-[400] rounded-lg cursor-pointer text-col_text00 font-[500]"
                >
                  <span class="truncate max-w-[140px]"
                    >使用 vue + ts + tailwindcss
                    实现上面的UI样式组件，请尽可能的还原上面的样式效果</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end items-center flex-none relative z-[2]">
            <div
              class="cursor-pointer w-[fit-content] mb-[20px] text-[14px] leading-[18px] md:mb-[0px] text-col_text06 flex items-center justify-center gap-[2px] px-[16px] py-[5px] rounded-[8px] min-w-[60px] border-col_line00 md:hover:bg-col_bg12 border bg-transparent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.418 11.5474C10.418 8.92735 11.653 6.71607 14.9402 6.24362L12.7259 5.09998"
                  stroke="white"
                  stroke-width="1.2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M10.418 11.5474C10.418 8.92735 11.653 6.71607 14.9402 6.24362L12.7259 5.09998"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M15.1537 10.0513V14.7474C15.1537 15.1892 14.7955 15.5474 14.3537 15.5474H5.8C5.35817 15.5474 5 15.1892 5 14.7474V5.93367C5 5.49184 5.35817 5.13367 5.8 5.13367H9.94642"
                  stroke="white"
                  stroke-width="1.2"
                ></path>
                <path
                  d="M15.1537 10.0513V14.7474C15.1537 15.1892 14.7955 15.5474 14.3537 15.5474H5.8C5.35817 15.5474 5 15.1892 5 14.7474V5.93367C5 5.49184 5.35817 5.13367 5.8 5.13367H9.94642"
                  stroke="currentColor"
                  stroke-width="1.2"
                ></path>
              </svg>
              分享
            </div>
          </div>
        </div>
        <div class="relative flex-1 overflow-hidden flex flex-col">
          <div class="relative flex-1 overflow-hidden">
            <MessageContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
}
</style>
