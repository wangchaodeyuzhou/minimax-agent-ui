<template>
  <div v-if="isComplete" class="w-full mb-[20px] mr-[8px]">
    <div class="tool-name w-fit text-[#00B42A] px-[12px] py-[5px] rounded-[14px] bg-[#00B42A14] cursor-pointer mb-[16px] flex items-center gap-[4px]">
      Agent 已完成当前任务<svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      class="rotate-90"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.56244 7.90485C2.25002 7.59243 2.25002 7.08589 2.56244 6.77347L5.29297 4.04295C5.68349 3.65242 6.31665 3.65242 6.70718 4.04295L9.43771 6.77347C9.75013 7.08589 9.75013 7.59242 9.43771 7.90484C9.12529 8.21726 8.61876 8.21726 8.30634 7.90484L6.00007 5.59858L3.69381 7.90485C3.38139 8.21726 2.87486 8.21726 2.56244 7.90485Z"
        fill="currentColor"
        stroke-width="1.5"
      ></path>
    </svg>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-[8px]">
      <div
        class="min-h-[56px] cursor-pointer gap-[8px] flex items-center justify-center text-col_text00 bg-col_bg03 hover:bg-col_bg00 border border-col_line00 rounded-[12px] p-[10px]"
      >
        <div class="tool-call-message-icon h-[16px] w-[16px]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3022_50018)">
              <path
                d="M11.7188 12.5C11.7188 12.7652 11.6134 13.0196 11.4259 13.2071C11.2383 13.3946 10.984 13.5 10.7188 13.5H1.71875C1.45353 13.5 1.19918 13.3946 1.01164 13.2071C0.824107 13.0196 0.71875 12.7652 0.71875 12.5V1.5C0.71875 1.23478 0.824107 0.98043 1.01164 0.792893C1.19918 0.605357 1.45353 0.5 1.71875 0.5H7.30454C7.56975 0.5 7.82411 0.605357 8.01164 0.792893L11.4259 4.20711C11.6134 4.39464 11.7188 4.649 11.7188 4.91421V12.5Z"
                stroke="#222222"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6.77734 6.375H9.27734"
                stroke="#222222"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6.77734 9.84375H9.27734"
                stroke="#222222"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M2.91016 9.78711L3.74805 10.625L5.14453 8.66992"
                stroke="#222222"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M2.91016 6.25586L3.74805 7.09375L5.14453 5.13867"
                stroke="#222222"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3022_50018">
                <rect width="14" height="14" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div class="flex items-center gap-[2px]">
          查看此任务中的所有文件<svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          class="rotate-90"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.56244 7.90485C2.25002 7.59243 2.25002 7.08589 2.56244 6.77347L5.29297 4.04295C5.68349 3.65242 6.31665 3.65242 6.70718 4.04295L9.43771 6.77347C9.75013 7.08589 9.75013 7.59242 9.43771 7.90484C9.12529 8.21726 8.61876 8.21726 8.30634 7.90484L6.00007 5.59858L3.69381 7.90485C3.38139 8.21726 2.87486 8.21726 2.56244 7.90485Z"
            fill="currentColor"
            stroke-width="1.5"
          ></path>
        </svg>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="tool-name text-pretty text-col_text_06 px-[12px] py-[5px] rounded-[14px] bg-[#F6F7F9] border border-[#EAEAEA] w-fit flex gap-[6px] items-center font-[500] text-[13px] leading-[17px] max-w-full overflow-hidden truncate">
    <!-- 图标 -->
    <div
      class="tool-call-message-icon w-[16px] h-[16px] relative flex items-center justify-center text-col_text01"
    >
      <slot name="icon">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.3124 3.38152C10.3613 3.36093 10.414 3.35027 10.4673 3.35027C10.5206 3.35027 10.5734 3.36092 10.6225 3.38159C10.6716 3.40224 10.7161 3.43249 10.7533 3.47055L10.7533 3.47057L10.7564 3.47374L12.0264 4.75374L12.0264 4.75375L12.0297 4.75706C12.0673 4.7943 12.0971 4.83861 12.1174 4.88743C12.1377 4.93601 12.1481 4.98823 12.1481 5.04114C12.1481 5.09406 12.1377 5.14629 12.1174 5.19485C12.0971 5.24368 12.0673 5.28798 12.0297 5.3252L12.0267 5.32824L11.2364 6.12362L9.3798 4.26709L10.1752 3.47676L10.1753 3.47681L10.1812 3.47079C10.2186 3.43252 10.2632 3.40223 10.3122 3.38159L10.3124 3.38152ZM8.52854 5.11289L4.09113 9.52187L3.91174 11.5917L5.98161 11.4123L10.3906 6.97488L8.52854 5.11289ZM10.4673 2.15027C10.2543 2.15027 10.0433 2.1928 9.84683 2.27551L9.84667 2.27558C9.65164 2.35766 9.47501 2.47755 9.32677 2.62815L3.08945 8.8255C2.98879 8.92551 2.92684 9.05796 2.91459 9.19932L2.65459 12.1993C2.63929 12.3758 2.70279 12.5501 2.82808 12.6754C2.95337 12.8007 3.12763 12.8642 3.30415 12.8489L6.30415 12.5889C6.44552 12.5766 6.57796 12.5147 6.67797 12.414L12.8766 6.17536C13.0257 6.02701 13.1441 5.85072 13.225 5.65658C13.3064 5.46143 13.3481 5.25224 13.3481 5.04114C13.3481 4.83003 13.3064 4.62085 13.225 4.4257C13.1441 4.2316 13.0258 4.05536 12.8768 3.90704L11.6097 2.62997C11.461 2.47838 11.2837 2.35788 11.0879 2.27551C10.8914 2.19284 10.6804 2.15027 10.4673 2.15027Z"
            fill="currentColor"
          />
          <path
            d="M6.74805 13.8053H12.748"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </slot>
    </div>

    <span
      class="h-[17px] leading-[17px] text-col_text01 font-[500]"
    >
      {{ title }}
    </span>

    <div v-if="desc" class="text-col_text01 text-pretty text-[12px] font-[400] line-clamp-1 flex-1 break-all">
      {{ desc }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

interface Props {
  title?: string
  desc?: string
  isComplete?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.text-col_text_06 {
  --col_text06: #7897979;
  color: var(--col_text06) !important;
}

.text-col_text01 {
  --col_text01: #7897979;
  color: var(--col_text01) !important;
}

.border-col_line01 {
  --col_line01: #d7d7d7;
  border-color: var(--col_line01) !important;
}
</style>
