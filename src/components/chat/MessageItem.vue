<script setup lang="ts">
import ThinkContainer from '@/components/chat/ThinkContainer.vue'
import ToolMessage from '@/components/chat/ToolMessage.vue'
import MessageContent from '@/components/chat/MessageContent.vue'
import { defineProps } from 'vue'
import { type AttachFileInfo, MessageItemTypes } from '@/components/chat/types.ts'
import FileUtil from '@/utils/fileUtil.ts'

defineProps<{
  messageType: string
  attachments?: AttachFileInfo[]
  thinkTime?: string
  thinkContent?: string
  markdownContent?: string
  toolMessageTitle?: string
  toolMessageDesc?: string
  toolMessageIsComplete?: boolean
}>()
</script>

<template>
  <template v-if="messageType === MessageItemTypes.Assistant">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start"></div>
    </div>
    <div class="relative flex flex-col message text-pretty received mb-[12px]">
      <div class="mb-[8px]">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16"
            cy="16"
            r="15.6"
            fill="white"
            stroke="#EAEAEA"
            stroke-width="0.8"
          ></circle>
          <path
            d="M16.0287 19.7163C16.1098 19.9762 16.3862 20.121 16.647 20.0403C16.9077 19.9595 17.0531 19.6839 16.972 19.4241L13.9368 9.69329C13.6532 8.78389 12.6798 8.27381 11.7673 8.55652C10.8549 8.83923 10.3431 9.8095 10.6268 10.7189L14.2923 22.4711C14.4145 22.8625 14.1946 23.2793 13.8019 23.401C13.4091 23.5228 12.9909 23.3037 12.8688 22.9121L10.517 15.372C10.2333 14.4626 9.25983 13.9524 8.3474 14.2351C7.43497 14.5178 6.9232 15.4881 7.20685 16.3976L8.20362 19.5933C8.32572 19.9848 8.10588 20.4015 7.71313 20.5233C7.32038 20.645 6.90219 20.4259 6.78009 20.0344L6.41887 18.8762C6.33782 18.6165 6.06129 18.4715 5.80059 18.5523C5.5399 18.633 5.39452 18.9087 5.47556 19.1686L5.83679 20.3267C6.12045 21.236 7.09394 21.7461 8.00637 21.4634C8.91881 21.1807 9.43058 20.2105 9.14692 19.301L8.15015 16.1053C8.02805 15.7138 8.24789 15.2971 8.64064 15.1754C9.03341 15.0536 9.45158 15.2728 9.57368 15.6643L11.9255 23.2044C12.2092 24.1138 13.1827 24.6239 14.0952 24.3411C15.0076 24.0584 15.5193 23.0883 15.2356 22.1788L11.5701 10.4266C11.448 10.0352 11.6678 9.61839 12.0606 9.49669C12.4533 9.375 12.8715 9.59411 12.9936 9.98556L16.0287 19.7163Z"
            fill="black"
          ></path>
          <path
            d="M22.5475 9.83501C21.6351 10.1177 21.1232 11.088 21.4069 11.9974L23.3714 18.2957C23.4935 18.6872 23.2736 19.1039 22.8809 19.2256C22.4882 19.3474 22.07 19.1283 21.9479 18.7367L18.6697 8.22649C18.386 7.31708 17.4125 6.80701 16.5001 7.08973C15.5876 7.37244 15.0759 8.34271 15.3595 9.2521L19.521 22.594C19.643 22.9855 19.4232 23.4023 19.0304 23.5239C18.6377 23.6457 18.2196 23.4265 18.0974 23.0352L17.5824 21.3838C17.5014 21.1239 17.2248 20.9791 16.9641 21.0599C16.7035 21.1406 16.5581 21.4163 16.6391 21.6761L17.1541 23.3273C17.4378 24.2368 18.4113 24.7469 19.3237 24.4642C20.2361 24.1815 20.7479 23.2112 20.4643 22.3018L16.3028 8.95983C16.1808 8.56838 16.4006 8.15158 16.7933 8.0299C17.1861 7.9082 17.6042 8.1273 17.7264 8.51876L21.0045 19.0291C21.2882 19.9384 22.2617 20.4486 23.1742 20.1659C24.0866 19.8832 24.5984 18.9129 24.3147 18.0034L22.3502 11.7051C22.2282 11.3137 22.448 10.8969 22.8408 10.7752C23.2334 10.6535 23.6516 10.8726 23.7738 11.2641L25.4951 16.7829C25.5762 17.0427 25.8527 17.1877 26.1134 17.1068C26.3742 17.026 26.5195 16.7504 26.4384 16.4906L24.7171 10.9718C24.4334 10.0624 23.4599 9.55231 22.5475 9.83501Z"
            fill="black"
          ></path>
          <path
            d="M16.0287 19.7163C16.1098 19.9762 16.3862 20.121 16.647 20.0403C16.9077 19.9595 17.0531 19.6839 16.972 19.4241L13.9368 9.69329C13.6532 8.78389 12.6798 8.27381 11.7673 8.55652C10.8549 8.83923 10.3431 9.8095 10.6268 10.7189L14.2923 22.4711C14.4145 22.8625 14.1946 23.2793 13.8019 23.401C13.4091 23.5228 12.9909 23.3037 12.8688 22.9121L10.517 15.372C10.2333 14.4626 9.25983 13.9524 8.3474 14.2351C7.43497 14.5178 6.9232 15.4881 7.20685 16.3976L8.20362 19.5933C8.32572 19.9848 8.10588 20.4015 7.71313 20.5233C7.32038 20.645 6.90219 20.4259 6.78009 20.0344L6.41887 18.8762C6.33782 18.6165 6.06129 18.4715 5.80059 18.5523C5.5399 18.633 5.39452 18.9087 5.47556 19.1686L5.83679 20.3267C6.12045 21.236 7.09394 21.7461 8.00637 21.4634C8.91881 21.1807 9.43058 20.2105 9.14692 19.301L8.15015 16.1053C8.02805 15.7138 8.24789 15.2971 8.64064 15.1754C9.03341 15.0536 9.45158 15.2728 9.57368 15.6643L11.9255 23.2045C12.2092 24.1138 13.1827 24.6239 14.0952 24.3411C15.0076 24.0584 15.5193 23.0883 15.2356 22.1788L11.5701 10.4266C11.448 10.0352 11.6678 9.61839 12.0606 9.49669C12.4533 9.375 12.8715 9.59411 12.9936 9.98556L16.0287 19.7163Z"
            stroke="black"
            stroke-width="0.333913"
          ></path>
          <path
            d="M22.5475 9.83501C21.6351 10.1177 21.1232 11.088 21.4069 11.9974L23.3714 18.2957C23.4935 18.6872 23.2736 19.1039 22.8809 19.2256C22.4882 19.3474 22.07 19.1283 21.9479 18.7367L18.6697 8.22649C18.386 7.31708 17.4125 6.80701 16.5001 7.08973C15.5876 7.37244 15.0759 8.34271 15.3595 9.2521L19.521 22.594C19.643 22.9855 19.4232 23.4023 19.0304 23.5239C18.6377 23.6457 18.2196 23.4265 18.0974 23.0352L17.5824 21.3838C17.5014 21.1239 17.2248 20.9791 16.9641 21.0599C16.7035 21.1406 16.5581 21.4163 16.6391 21.6761L17.1541 23.3273C17.4378 24.2368 18.4113 24.7469 19.3237 24.4642C20.2361 24.1815 20.7479 23.2112 20.4643 22.3018L16.3028 8.95983C16.1808 8.56838 16.4006 8.15158 16.7933 8.0299C17.1861 7.9082 17.6042 8.1273 17.7264 8.51876L21.0045 19.0291C21.2882 19.9384 22.2617 20.4486 23.1741 20.1659C24.0866 19.8832 24.5984 18.9129 24.3147 18.0034L22.3502 11.7051C22.2282 11.3137 22.448 10.8969 22.8408 10.7752C23.2334 10.6535 23.6516 10.8726 23.7738 11.2641L25.4951 16.7829C25.5762 17.0427 25.8527 17.1877 26.1134 17.1068C26.3741 17.026 26.5195 16.7504 26.4384 16.4906L24.7171 10.9718C24.4334 10.0624 23.4599 9.55231 22.5475 9.83501Z"
            stroke="black"
            stroke-width="0.333913"
          ></path>
        </svg>
      </div>
      <MessageContent :markdown-content="markdownContent">
        <template #think>
          <ThinkContainer :time="thinkTime">
            <div v-html="thinkContent"></div>
          </ThinkContainer>
        </template>
      </MessageContent>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start"></div>
    </div>
    <div class="relative flex flex-col message text-pretty received">
      <div class="message-content text-pretty mb-[16px] cursor-pointer">
        <ToolMessage
          :title="toolMessageTitle"
          :desc="toolMessageDesc"
          :is-complete="toolMessageIsComplete"
        >
          <template #icon>
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9972 11.25V3.82146C14.9972 3.56505 14.7893 3.35718 14.5329 3.35718H3.39007C3.14379 3.35718 2.92578 3.57519 2.92578 3.82146V11.25C2.92578 11.4963 3.14379 11.7143 3.39007 11.7143H14.5329C14.7792 11.7143 14.9972 11.4963 14.9972 11.25Z"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6.17578 14.0358H11.7472"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7.10379 6.14307L5.71094 7.53592L7.10379 8.92878"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M10.8184 6.14307L12.2112 7.53592L10.8184 8.92878"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </template>
        </ToolMessage>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-start">
        <div
          class="md:hover:bg-col_bg03 flex min-h-7 min-w-7 items-center justify-center rounded-[8px] cursor-pointer text-col_text02 mr-[8px]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3.9834"
              y="6.41992"
              width="8.69922"
              height="10.252"
              rx="1"
              stroke="white"
              stroke-width="1.5"
            ></rect>
            <rect
              x="3.9834"
              y="6.41992"
              width="8.69922"
              height="10.252"
              rx="1"
              stroke="#A9A9A9"
              stroke-width="1.5"
            ></rect>
            <path
              d="M7.31708 4.56622V3.99919C7.31708 3.44691 7.76479 2.99919 8.31708 2.99919H15.0163C15.5686 2.99919 16.0163 3.44691 16.0163 3.99919V12.2511C16.0163 12.8034 15.5686 13.2511 15.0163 13.2511H14.3129"
              stroke="white"
              stroke-width="1.5"
            ></path>
            <path
              d="M7.31708 4.56622V3.99919C7.31708 3.44691 7.76479 2.99919 8.31708 2.99919H15.0163C15.5686 2.99919 16.0163 3.44691 16.0163 3.99919V12.2511C16.0163 12.8034 15.5686 13.2511 15.0163 13.2511H14.3129"
              stroke="#A9A9A9"
              stroke-width="1.5"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div
      v-if="attachments && attachments?.length > 0"
      class="flex flex-wrap gap-[8px] sent bg-transparent justify-end mb-[10px]"
    >
      <div
        v-for="(item, index) in attachments"
        :key="index"
        class="border-col_line00 relative flex w-[240px] flex-shrink-0 justify-between items-center overflow-hidden break-all rounded-[12px] border p-1 pr-[8px] md:bg-col_fill03 pr-3 md:hover:bg-col_bg00 cursor-pointer"
      >
        <div class="file-display group flex items-center overflow-hidden gap-[6px] cursor-pointer">
          <div class="file-icon h-[36px] w-[36px] rounded-[8px] overflow-hidden">
            <img :src="FileUtil.isImage(item.name) ? item.url : FileUtil.GetIcon(item.name)"
                 class="w-full h-full object-contain"  alt="foundNot"/>
          </div>
          <div class="flex flex-col flex-1 truncate">
            <div class="truncate">{{item.name}}</div>
          </div>
          <div
            class="md:hover:bg-col_bg03 flex min-h-7 min-w-7 items-center justify-center rounded-[8px] cursor-pointer ml-1 h-6 w-6 bg-white hover:bg-white border border-col_line00 rounded-[6px] max-w-6 max-h-6 items-center justify-center hidden group-hover:flex"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.785 7.3C13.9389 7.49195 14.0242 7.74134 14.0242 7.99992C14.0242 8.2585 13.9389 8.50788 13.785 8.69984C12.81 9.8803 10.5907 12.1785 7.99995 12.1785C5.40923 12.1785 3.18995 9.8803 2.21494 8.69984C2.06095 8.50788 1.97571 8.2585 1.97571 7.99992C1.97571 7.74134 2.06095 7.49195 2.21494 7.3C3.18995 6.11953 5.40923 3.82129 7.99995 3.82129C10.5907 3.82129 12.81 6.11953 13.785 7.3Z"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7.99997 9.85686C9.02564 9.85686 9.85711 9.02539 9.85711 7.99972C9.85711 6.97405 9.02564 6.14258 7.99997 6.14258C6.97429 6.14258 6.14282 6.97405 6.14282 7.99972C6.14282 9.02539 6.97429 9.85686 7.99997 9.85686Z"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="relative group mb-[8px]">
      <div
        class="flex flex-col message text-pretty text-[15px] selection:bg-[#458EDB] sent max-w-[85%] md:max-w-[55%]"
      >
        <div
          class="message-content relative text-pretty leading-[25.5px] text-[15px] text-col_text05 cursor-default mb-[0px]"
        >
          <div class="whitespace-pre-wap">{{ markdownContent }}</div>
        </div>
      </div>
      <div class="h-[32px] w-full"></div>
      <div class="absolute bottom-[0px] right-[0px] flex gap-1">
        <div
          class="md:hover:bg-col_bg03 flex min-h-7 min-w-7 items-center justify-center rounded-[8px] cursor-pointer text-col_text02"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3.9834"
              y="6.41992"
              width="8.69922"
              height="10.252"
              rx="1"
              stroke="white"
              stroke-width="1.5"
            ></rect>
            <rect
              x="3.9834"
              y="6.41992"
              width="8.69922"
              height="10.252"
              rx="1"
              stroke="#A9A9A9"
              stroke-width="1.5"
            ></rect>
            <path
              d="M7.31708 4.56622V3.99919C7.31708 3.44691 7.76479 2.99919 8.31708 2.99919H15.0163C15.5686 2.99919 16.0163 3.44691 16.0163 3.99919V12.2511C16.0163 12.8034 15.5686 13.2511 15.0163 13.2511H14.3129"
              stroke="white"
              stroke-width="1.5"
            ></path>
            <path
              d="M7.31708 4.56622V3.99919C7.31708 3.44691 7.76479 2.99919 8.31708 2.99919H15.0163C15.5686 2.99919 16.0163 3.44691 16.0163 3.99919V12.2511C16.0163 12.8034 15.5686 13.2511 15.0163 13.2511H14.3129"
              stroke="#A9A9A9"
              stroke-width="1.5"
            ></path>
          </svg>
        </div>
        <div
          class="md:hover:bg-col_bg03 flex min-h-7 min-w-7 items-center justify-center rounded-[8px] cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.66669 6.83334L3.13636 7.36367L2.60603 6.83334L3.13636 6.30301L3.66669 6.83334ZM7.62502 16.2917C7.21081 16.2917 6.87502 15.9559 6.87502 15.5417C6.87502 15.1275 7.21081 14.7917 7.62502 14.7917L7.62502 16.2917ZM7.62502 10.7917L7.09469 11.322L3.13636 7.36367L3.66669 6.83334L4.19702 6.30301L8.15535 10.2613L7.62502 10.7917ZM3.66669 6.83334L3.13636 6.30301L7.09469 2.34468L7.62502 2.87501L8.15535 3.40534L4.19702 7.36367L3.66669 6.83334ZM3.66669 6.83334L3.66669 6.08334L11.9792 6.08334L11.9792 6.83334L11.9792 7.58334L3.66669 7.58334L3.66669 6.83334ZM11.9792 15.5417L11.9792 16.2917L7.62502 16.2917L7.62502 15.5417L7.62502 14.7917L11.9792 14.7917L11.9792 15.5417ZM16.3334 11.1875L17.0834 11.1875C17.0834 14.0065 14.7981 16.2917 11.9792 16.2917L11.9792 15.5417L11.9792 14.7917C13.9697 14.7917 15.5834 13.178 15.5834 11.1875L16.3334 11.1875ZM11.9792 6.83334L11.9792 6.08334C14.7981 6.08334 17.0834 8.36855 17.0834 11.1875L16.3334 11.1875L15.5834 11.1875C15.5834 9.19698 13.9697 7.58334 11.9792 7.58334L11.9792 6.83334Z"
              fill="#A9A9A9"
            ></path>
          </svg>
        </div>
        <div
          class="md:hover:bg-col_bg03 flex min-h-7 min-w-7 items-center justify-center rounded-[8px] cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.0336 3.43373C13.3502 2.75031 12.2421 2.75031 11.5587 3.43372L3.73589 11.2565C3.40538 11.587 3.22083 12.036 3.22335 12.5034L3.24291 16.1179C3.2481 17.077 4.02434 17.8532 4.98345 17.8584L8.59783 17.8779C9.06522 17.8804 9.51419 17.6959 9.84469 17.3654L17.6675 9.54253C18.3509 8.85912 18.3509 7.75108 17.6675 7.06766L14.0336 3.43373ZM12.6194 4.49439C12.717 4.39675 12.8753 4.39675 12.9729 4.49439L16.6069 8.12832C16.7045 8.22595 16.7045 8.38424 16.6069 8.48187L15.5069 9.58187L11.5194 5.59438L12.6194 4.49439ZM10.4587 6.65504L4.79655 12.3172C4.74934 12.3644 4.72297 12.4286 4.72333 12.4953L4.74288 16.1098C4.74363 16.2468 4.85452 16.3577 4.99153 16.3584L8.60591 16.3779C8.67268 16.3783 8.73682 16.3519 8.78403 16.3047L14.4462 10.6425L10.4587 6.65504Z"
              fill="var(--col_text02)"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
.message.received {
  background: transparent;
}

.message.sent {
  margin-left: auto;
  padding: 0.5rem 1rem;
  border-radius: 1.2rem;
  background: #5aaaff;
  width: fit-content;
  color: #f8f8f8;
  word-break: break-word;
}

.file-display .file-icon svg {
  height: 100% !important;
  width: 100% !important;
}

.bg-col_fill03 {
  background-color: #f6f7f9 !important;
}

.border-col_line00 {
  --col_line00: #eaeaea;
  border-color: var(--col_line00) !important;
}
</style>
