<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const MIN_ROWS = 2
const message = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const adjustTextareaHeight = () => {
  const el = textareaRef.value
  if (!el) return

  el.style.height = 'auto'

  const styles = window.getComputedStyle(el)
  const minHeight = parseFloat(styles.minHeight) || 0
  const maxHeight = parseFloat(styles.maxHeight) || Number.POSITIVE_INFINITY
  const scrollHeight = el.scrollHeight
  const clampedHeight = Math.min(maxHeight, Math.max(minHeight, scrollHeight))

  el.style.height = `${clampedHeight}px`
  el.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
}

const handleInput = () => {
  adjustTextareaHeight()
}

const handleWindowResize = () => {
  nextTick(adjustTextareaHeight)
}

onMounted(() => {
  nextTick(adjustTextareaHeight)
  window.addEventListener('resize', handleWindowResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize)
})

watch(message, () => nextTick(adjustTextareaHeight))

const isSendEnabled = computed(() => message.value.trim().length > 0)
</script>

<template>
  <div class="chat-area hidden w-full md:block">
    <div class="chat-input-shell">
      <div class="chat-inner">
        <textarea
          ref="textareaRef"
          v-model="message"
          :rows="MIN_ROWS"
          placeholder="请输入你的需求，按「Enter」发送"
          class="chat-textarea"
          @input="handleInput"
        ></textarea>
        <div class="chat-footer">
          <label class="chat-tool" tabindex="0">
            <input accept="" multiple type="file" class="sr-only" />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3682_56652)">
                <path
                  d="M9.45638 13.6142L13.3054 9.76514C13.5786 9.49176 13.5787 9.04823 13.3054 8.77492C13.0662 8.53568 12.6967 8.50634 12.425 8.68584L12.3152 8.77492L8.46615 12.624L8.34669 12.7379C7.0907 13.8724 5.15152 13.8349 3.94108 12.6246C2.69153 11.3751 2.69153 9.34844 3.94108 8.09888L8.97438 3.06558C9.74047 2.29949 10.9829 2.29951 11.7489 3.06558C12.515 3.83168 12.515 5.07406 11.7489 5.84015L6.65695 10.9321C6.42124 11.1675 6.03916 11.1675 5.80345 10.9321C5.56777 10.6965 5.56731 10.3138 5.80276 10.078L9.71049 6.17022C9.98369 5.89684 9.98381 5.45331 9.71049 5.18C9.43716 4.90701 8.99423 4.9076 8.72096 5.18069L4.81323 9.08842C4.03104 9.87097 4.03151 11.1393 4.81392 11.9217C5.59635 12.7038 6.86404 12.7038 7.64649 11.9217L12.7385 6.82968C14.0513 5.51686 14.052 3.38818 12.7392 2.07536C11.4263 0.762546 9.29767 0.763226 7.98485 2.07605L2.95155 7.10935C1.15526 8.90564 1.15526 11.8179 2.95155 13.6142C4.69182 15.3542 7.47958 15.4088 9.28512 13.7771L9.45638 13.6142Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_3682_56652">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </label>
          <div class="chat-footer-spacer"></div>
          <div class="chat-mode-tag">
            <span class="chat-mode-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8522 2.03125L4 10.5H8L7.01531 15.9134C7.01344 15.9241 7.01392 15.935 7.01671 15.9454C7.01951 15.9558 7.02456 15.9655 7.0315 15.9737C7.03844 15.982 7.04711 15.9886 7.0569 15.9931C7.06668 15.9977 7.07734 16 7.08812 16C7.0996 16 7.11091 15.9973 7.12117 15.9921C7.13142 15.987 7.14033 15.9795 7.14719 15.9703L14 7.5H10L10.9894 2.08594C10.9907 2.07515 10.9897 2.06421 10.9865 2.05383C10.9833 2.04345 10.9779 2.03388 10.9707 2.02575C10.9634 2.01762 10.9546 2.01112 10.9447 2.00668C10.9347 2.00224 10.924 1.99996 10.9131 2C10.9012 2.00005 10.8895 2.0029 10.8789 2.00833C10.8683 2.01376 10.8592 2.02161 10.8522 2.03125Z"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <span class="chat-mode-text"> 高效<span class="chat-mode-badge">Free</span> </span>
          </div>
          <button
            id="input-send-icon"
            data-input-icon="true"
            type="button"
            class="chat-send"
            :class="{ 'chat-send--active': isSendEnabled }"
            :disabled="!isSendEnabled"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00166 13.0839V2.6825M8.00166 2.6825L3.28125 6.93367M8.00166 2.6825L12.7221 6.93367"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-area {
  position: relative;
}

.chat-input-shell {
  padding: 1px;
  border-radius: 18px;
  background: linear-gradient(90deg, #8dc5ff 0%, #b2a9ff 100%);
}

.chat-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 17px;
  background: #ffffff;
  padding: 0.8rem;
}

.chat-textarea {
  width: 100%;
  min-height: calc(2 * 1.5em + 18px);
  max-height: calc(8 * 1.5em + 18px);
  padding: 0.5rem;
  font-size: 15px;
  line-height: 1.6;
  border: none;
  resize: none;
  background: transparent;
  color: #1f1f24;
  caret-color: #3daeff;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Inter', sans-serif;
  overflow-y: hidden;
  outline: none;
}

.chat-textarea::-webkit-scrollbar {
  width: 4px;
}

.chat-textarea::-webkit-scrollbar-track {
  background: white;
  cursor: pointer;
}

.chat-textarea::-webkit-scrollbar-thumb {
  background: rgb(221, 221, 221);
}

.chat-textarea::-webkit-scrollbar-thumb:hover {
  background: rgb(170, 170, 170);
}

.chat-textarea::placeholder {
  color: #b7c0d4;
}

.chat-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 32px;
}

.chat-tool {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid #e7ebf5;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(166, 179, 210, 0.22);
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.chat-tool:hover {
  box-shadow: 0 4px 10px rgba(140, 160, 210, 0.26);
  transform: translateY(-1px);
}

.chat-tool input {
  display: none;
}

.chat-footer-spacer {
  flex: 1;
}

.chat-mode-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #1f1f24;
}

.chat-mode-icon {
  color: #252525;
  display: inline-flex;
  align-items: center;
}

.chat-mode-text {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.chat-mode-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(61, 174, 255, 0.12);
  color: #3daeff;
  font-size: 12px;
}

.chat-send {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  border: none;
  background: #d8dce5;
  color: #ffffff;
  cursor: not-allowed;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.chat-send--active {
  background: linear-gradient(90deg, #58afff 0%, #6a6dff 100%);
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(112, 150, 255, 0.3);
}

.chat-send--active:hover {
  transform: translateY(-1px);
}

.chat-send:disabled {
  pointer-events: none;
}

@media (max-width: 768px) {
  .chat-area {
    display: none;
  }
}
</style>
