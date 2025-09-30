<script setup lang="ts">
import { ref } from 'vue'
import ChatCore from '@/components/core/chatCore.vue'
import StudioContainer from '@/components/core/studioContainer.vue'
import { useResizableSplitter } from '@/hooks/resize/useResizeableSplitter.ts'
const containerRef = ref<HTMLElement | null>(null)
const { leftPercent, rightPercent, isDragging, onMouseDown } =
  useResizableSplitter(() => containerRef.value, {
    defaultPercent: 40,
    minPercent: 20,
    maxPercent: 70
  })
</script>

<template>
  <div class="flex-1 min-h-full overflow-hidden flex flex-col">
    <div id="scroll_wrap" class="content_wrap flex-1 overflow-y-auto overflow-x-hidden hide-scroll">
      <main class="flex h-full flex-col px-0 md:px-4">
        <div class="chat-page w-full flex-1 flex py-[20px] pt-[4px] overflow-hidden relative" ref="containerRef">
          <ChatCore class="h-full" :style="{ flexBasis: leftPercent + '%' }" />
          <div
            class="resizer hidden md:flex"
            :class="{ dragging: isDragging }"
            @mousedown="onMouseDown"
          >
            <div class="resizer-handle"></div>
          </div>
          <StudioContainer
            class="h-full"
            :style="{ flexBasis: rightPercent + '%' }"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.resizer {
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background-color: transparent;
  position: relative;
  z-index: 10;
  display: -moz-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 12px;
}

.resizer:hover,
.resizer.dragging {
  background: #3b82f6;
  opacity: 1;
}

.resizer-handle {
  width: 2px;
  flex: 1;
  margin: 29px -3px 20px 0;
  background-color: transparent;
  border-radius: 1px;
  opacity: .3;
  transition: all .2s ease;
  transform-origin: center;
}

.resizer:hover .resizer-handle,
.resizer.dragging .resizer-handle {
  transform: scaleX(1.5);
  background: #3b82f6; /* blue-500 */
}
body.dragging {
  cursor: col-resize !important;
  user-select: none !important;
}
</style>