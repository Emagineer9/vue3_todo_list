<script setup lang="ts">
// import type { PropType } from 'vue'
// import type { TaskItemInterface } from '@/interface/TaskItem'

// const props = defineProps({
//   taskItem: {
//     type: Object as PropType<TaskItemInterface>,
//     required: true,
//   },
// })
</script>

<template>
  <div class="task-card">
    <div class="flex">
      <div class="status">
        <slot name="status"></slot>
      </div>
      <div>
        <slot name="text"></slot>
      </div>
    </div>
    <div class="flex">
      <div>
        <slot name="tags"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  padding: 20px 30px;
  border-bottom: solid;
  border-width: 1px;
  border-color: #cdc4b9;
}

.task-card:last-child {
  border-bottom: none;
}

.status {
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>
