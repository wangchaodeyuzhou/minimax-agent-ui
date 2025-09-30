<script setup lang="ts">
import LeftSidebar from '@/components/layout/leftSidebar.vue'
import CoreLayout from '@/components/layout/coreLayout.vue'

</script>

<template>
  <section class="flex h-full w-full flex-row overflow-hidden">
    <section class="sidebar-box relative flex h-[--screen] w-full flex-1 flex-row overflow-hidden">
      <LeftSidebar />
      <div class="flex-1 min-h-full overflow-hidden flex flex-col">
        <CoreLayout />
      </div>
    </section>
  </section>
</template>

<style scoped>
.sidebar-box {
  box-sizing: border-box;
}
</style>

