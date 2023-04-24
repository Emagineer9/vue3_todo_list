<script setup lang="ts">
import { ref } from 'vue'
import { mdiAccount } from '@mdi/js'
// import SvgIcon from './parts/SvgIcon.vue'
// import WelcomeItem from './WelcomeItem.vue'
import TaskCard from './parts/TaskCard.vue'
import type { TaskItemInterface } from '@/interface/TaskItem'

const taskItems: TaskItemInterface[] = [
  { id: 1, text: '文字1', tag: [], status: 'A' },
  { id: 2, text: '文字2', tag: [], status: 'A' },
  { id: 3, text: '文字3', tag: [], status: 'A' },
]

// const mdiAccountIcon = computed(() => {
//   return mdiAccount
// })
</script>

<template>
  <TaskCard v-for="taskItem in taskItems" :taskItem="taskItem"></TaskCard>
</template>

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