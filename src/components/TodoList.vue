<script setup lang="ts">
// import { ref } from 'vue'
// import { mdiAccount } from '@mdi/js'
// import SvgIcon from './parts/SvgIcon.vue'
// import WelcomeItem from './WelcomeItem.vue'
import TaskCard from './parts/TaskCard.vue'
import type { TaskItemInterface } from '@/interface/TaskItem'

const taskItems: TaskItemInterface[] = [
  { id: '1', text: '文字1', tags: ['aaaa', 'bbbb'], status: 'A', isEdit: false },
  { id: '2', text: '文字2', tags: [], status: 'B', isEdit: false },
  { id: '3', text: '文字3', tags: [], status: 'A', isEdit: false },
]

// const mdiAccountIcon = computed(() => {
//   return mdiAccount
// })
</script>

<template>
  <TaskCard v-for="taskItem in taskItems">
    <template #status>
      {{ taskItem.status }}
    </template>
    <template #text>
      {{ taskItem.text }}
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
</style>


  <!-- 
    <WelcomeItem>
      <template #icon>
        <SvgIcon type="mdi" :path="mdiAccountIcon" :size="16" style="color: gray; vertical-align: middle"></SvgIcon>
      </template>
      <template #heading>Community</template>

      <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
      twitter account for latest news in the Vue world.
    </WelcomeItem>
  -->