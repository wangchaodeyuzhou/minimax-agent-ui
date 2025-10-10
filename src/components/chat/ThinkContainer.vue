<template>
  <div class="think-container last:mb-0 mb-3">
    <div class="flex cursor-pointer items-center transition-colors" @click="toggle">
      <div class="bg-[#F6F7F9] flex h-[35px] text-col_text01 items-center justify-center rounded-[12px] px-[10px] py-[9px]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.63706 3L2.74121 3V13H12.7412L12.7412 8.83332" stroke="#222222" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.24121 7L8.24121 9L12.7412 4" stroke="#3DAEFF" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="square"></path></svg>
        <span class="ml-[6px] text-[14px] text-[#222222]">
          {{ title || "已思考" }}
        </span>
        <span v-if="time" class="text-[14px] text-[#787979] ml-[6px]">
          ({{ time }})
        </span>
        <div class="text-col_text01 ml-[6px] transition-transform duration-300" :class="{ 'rotate-180': expanded }">
          <Icon icon="mdi:chevron-down" class="w-4.3 h-4.3 text-current" aria-hidden="true" />
        </div>
      </div>
    </div>

    <div v-if="expanded" class="text-col_text01 ml-[10px] mt-3 text-[15px]">
      <div class="relative overflow-hidden mt-2">
        <div class="border-col_line01 absolute left-[5px] top-[8px] h-[calc(100%-15px)] w-1 border-l border-dashed"></div>
        <div class="relative pl-5 text-[14px] text-[#333]">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue"
import { Icon } from '@iconify/vue'
interface Props {
  title?: string
  time?: string | number
  defaultExpanded?: boolean
}
const props = defineProps<Props>()
const expanded = ref(props.defaultExpanded)

function toggle() {
  expanded.value = !expanded.value
}
</script>

<style scoped>
.text-col_text01 {
  --col_text01: #7897979;
  color: var(--col_text01) !important;
}

.border-col_line01 {
  --col_line01: #d7d7d7;
  border-color: var(--col_line01) !important;
}
</style>
