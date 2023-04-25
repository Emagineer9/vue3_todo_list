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
    <div class="flex" style="padding-bottom: 20px;">
      <div class="status align-items">
        <slot name="status"></slot>
      </div>
      <div class="text align-items">
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
}
.text{
  width: 100%;
  padding: 10px;
}
</style>
