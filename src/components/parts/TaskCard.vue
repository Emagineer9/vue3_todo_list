<script setup lang="ts">
import type { PropType } from 'vue'
import type { TaskItemInterface } from '@/interface/TaskItem'

const props = defineProps({
  taskItem: {
    type: Object as PropType<TaskItemInterface>,
  },
})
</script>

<template>
  <div>
    {{ props.taskItem }}
  </div>
</template>

<style scoped></style>
