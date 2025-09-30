<template>
  <div class="w-full">
    <div class="border-l-4 border-gray-300/100 p-2 rounded-md shadow-sm">
      <!-- Header -->
      <div class="flex items-center gap-2 cursor-pointer select-none mb-1" @click="toggle">
        <div class="flex items-center gap-2">
          <Icon
            v-if="completedCount === totalCount && totalCount > 0"
            icon="mdi:check"
            class="h-4 w-4 inline-block text-green-500 dark:text-green-400 mr-1"
          />
          <Icon
            v-else
            icon="mdi:loading"
            class="h-4 w-4 inline-block animate-spin text-blue-500 dark:text-blue-400 mr-1"
          />
          <span class="font-semibold text-sm">任务列表</span>
          <span class="text-xs">({{ completedCount }}/{{ totalCount }})</span>
        </div>
        <Icon
          icon="mdi:chevron-right"
          class="h-4 w-4 transition-transform text-gray-500 dark:text-gray-400 ml-auto"
          :class="{ 'rotate-90': expanded }"
          aria-hidden="true"
        />
      </div>
      <transition name="slide">
        <ul v-show="expanded" class="list-none">
          <li
            v-for="todo in todoList"
            :key="todo.id"
            class="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100/30 dark:hover:bg-gray-800/20"
          >
            <span
              class="w-4 h-4 border rounded-sm inline-flex items-center justify-center flex-shrink-0 mr-2
                     bg-white border-gray-500 dark:border-gray-400"
              :class="{
                'bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600': todo.status === 'completed',
                'bg-orange-500 dark:bg-orange-600 border-orange-500 dark:border-orange-600': todo.status === 'in_progress'
              }"
              aria-hidden="true"
            >
              <Icon v-if="todo.status === 'completed'" icon="mdi:check" class="h-3 w-3 text-white" />
              <Icon v-else-if="todo.status === 'in_progress'" icon="mdi:minus" class="h-3 w-3 text-white" />
            </span>
            <span
              class="flex-1 break-words text-gray-300 dark:text-gray-600"
              :class="{ 'line-through text-gray-500 dark:text-gray-400': todo.status === 'completed' }"
            >
              {{ todo.text }}
            </span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { Icon } from '@iconify/vue'

export interface Todo {
  id: number
  text: string
  status: 'completed' | 'in_progress' | 'not_started'
}

const props = defineProps<{
  todoList: Todo[]
}>()

const expanded = ref(true)

function toggle() {
  expanded.value = !expanded.value
}

const totalCount = computed(() => props.todoList.length)
const completedCount = computed(() => props.todoList.filter((t) => t.status === 'completed').length)
</script>
