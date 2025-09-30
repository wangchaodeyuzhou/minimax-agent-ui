<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import ChatCore from '@/components/core/chatCore.vue'
import StudioContainer from '@/components/core/studioContainer.vue'
import { useResizableSplitter } from '@/hooks/resize/useResizeableSplitter.ts'

const containerRef = ref<HTMLElement | null>(null)
const leftElRef = ref<HTMLElement | null>(null)
const rightElRef = ref<HTMLElement | null>(null)

const { leftPx, rightPx, isDragging, onMouseDown } = useResizableSplitter(
  () => containerRef.value,
  {
    defaultPercent: 50,
    minPercent: 30,
    maxPercent: 55,
    leftElement: () => leftElRef.value,
    rightElement: () => rightElRef.value,
  },
)

// Keep DOM widths in sync on mount and when computed pixel values change.
watchEffect(() => {
  const l = leftElRef.value
  const r = rightElRef.value
  if (l) l.style.width = leftPx.value + 'px'
  if (r) r.style.width = rightPx.value + 'px'
})
</script>

<template>
  <div class="flex-1 min-h-full overflow-hidden flex flex-col">
    <div id="scroll_wrap" class="content_wrap flex-1 overflow-y-auto overflow-x-hidden hide-scroll">
      <main class="flex h-full flex-col px-0 md:px-4">
        <div
          class="chat-page w-full flex-1 flex py-[20px] pt-[4px] overflow-hidden relative"
          ref="containerRef"
        >
          <div
            ref="leftElRef"
            class="chat-container h-full overflow-hidden md:px-[0] relative transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,0)] md:min-w-[432px] md:max-w-[800px] min-w-0"
            :class="{ 'no-transition': isDragging }"
            :style="{
              width: leftPx + 'px',
            }"
          >
            <ChatCore />
          </div>

          <div
            class="resizer hidden md:flex"
            :class="{ dragging: isDragging }"
            @mousedown="onMouseDown"
          >
            <div class="resizer-handle"></div>
          </div>

          <div
            ref="rightElRef"
            class="studio-container h-full flex overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,0)] min-w-0"
            :class="{ 'no-transition': isDragging }"
            :style="{
              width: rightPx + 'px',
            }"
          >
            <StudioContainer />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content_wrap {
  min-height: 0;
  height: 100%;
  box-sizing: border-box;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 auto;
  will-change: width;
}

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
  opacity: 0.3;
  transition: all 0.2s ease;
  transform-origin: center;
}

.resizer:hover .resizer-handle,
.resizer.dragging .resizer-handle {
  transform: scaleX(1.5);
  background: #3b82f6; /* blue-500 */
}

.studio-container {
  /* ensure studio-container also hints the browser for smoother width changes */
  will-change: width;
}

/* 当拖拽时禁用 transition 来获得更即时、丝滑的宽度变化 */
.no-transition {
  transition: none !important;
}
</style>
