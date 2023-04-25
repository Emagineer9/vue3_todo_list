<script setup lang="ts">
import { reactive } from 'vue'
import type { Ref } from 'vue'
// import { mdiAccount } from '@mdi/js'
// import SvgIcon from './parts/SvgIcon.vue'
// import WelcomeItem from './WelcomeItem.vue'
import TaskCard from './parts/TaskCard.vue'
import type { TaskItemInterface } from '@/interface/TaskItem'

const taskItems: TaskItemInterface[] = reactive([
  { id: '1', text: '文字1', tags: ['aaaa', 'bbbb'], status: 'A', isEdit: false },
  { id: '2', text: '文字2', tags: [], status: 'B', isEdit: false },
  { id: '3', text: '文字3', tags: [], status: 'A', isEdit: false },
])

let pressTimer: any = null

/** methods */
const dbClickTaskCard = (index: any) => {
  console.log('dbClickTaskCard')
  taskItems[index].isEdit = !taskItems[index].isEdit
}

const startPress = (index: any) => {
  pressTimer = setTimeout(() => {
    console.log('startPress')
    taskItems[index].isEdit = !taskItems[index].isEdit
  }, 1000)
}

const endPress = () => {
  if (!pressTimer) return
  console.log('endPress')
  clearTimeout(pressTimer)
  pressTimer = null
}

// const mdiAccountIcon = computed(() => {
//   return mdiAccount
// })
</script>

<template>
  <TaskCard
    v-for="(taskItem, index) in taskItems"
    @dblclick="dbClickTaskCard(index)"
    @pointerdown="startPress(index)"
    @pointerup="endPress"
    @pointermove="endPress"
    @pointercancel="endPress"
    @click="endPress"
  >
    <template #status>
      {{ taskItem.status }}
    </template>
    <template #text>
      <template v-if="taskItem.isEdit">
        <textarea v-model="taskItem.text" type="text" class="textbox"></textarea>
      </template>
      <template v-else>
        <span>{{ taskItem.text }}</span>
      </template>
    </template>
    <template #tags>
      <span v-for="tag in taskItem.tags" class="tag">{{ tag }}</span>
    </template>
  </TaskCard>
</template>

<style scoped>
span.tag {
  background-color: #5b7b7033;
  padding: 2px;
  margin: 0 4px;
}

span.tag::before {
  content: '#';
}

textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #cdc4b9;
  border-radius: 3px;
  line-height: 1.7em;
  height: 3em;
}
</style>
