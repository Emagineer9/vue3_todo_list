<script setup lang="ts">
import { reactive } from 'vue'
import TaskCard from './parts/TaskCard.vue'
import MultiSelectBox from './parts/MultiSelectBox.vue'
import type { TaskItemInterface } from '@/interface/TaskItem'
import type { TagItemInterface } from '@/interface/TagItem'

/** データ取得 */
const allTags: Array<String> = ['aaaa', 'bbbb']
const allTask = [
  { id: '1', text: '文字1', tags: ['aaaa', 'bbbb'], status: 'A', isEdit: false },
  { id: '2', text: '文字2', tags: [], status: 'B', isEdit: false },
  { id: '3', text: '文字3', tags: [], status: 'A', isEdit: false },
]

let allTagOptions = reactive(allTags.join().split(',').map((tag) => {
  const item: TagItemInterface = {
    name: tag,
    code: tag.substring(0, 2) + Math.floor((Math.random() * 10000000))
  }
  return item
}))

const createTags = (arr: Array<string>) => {
  return arr.map((value) => {
    const selectOptions = allTagOptions.find((option) => option.name === value)
    if (selectOptions === undefined) {
      const addTag: TagItemInterface = {
        name: value,
        code: value.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      allTagOptions.push(addTag)
      return addTag
    }
    return selectOptions
  })
}
const taskItems: TaskItemInterface[] = reactive(allTask.map((taskItem) => {
  const item: TaskItemInterface = {
    ...taskItem,
    tags: createTags(taskItem.tags)
  }
  return item
}))

/** クリックイベント */
let pressTimer: any = null

const dbClickTaskCard = (index: any) => {
  taskItems[index].isEdit = !taskItems[index].isEdit
}

const startPress = (index: any) => {
  pressTimer = setTimeout(() => {
    taskItems[index].isEdit = !taskItems[index].isEdit
  }, 1000)
}

const endPress = () => {
  if (!pressTimer) return
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
      <template v-if="taskItem.isEdit">
        <MultiSelectBox
          :value="taskItem.tags"
          :options="allTagOptions"
          @addTag="allTagOptions.push($event)"
          @update:value="taskItem.tags = $event"
        />
      </template>
      <template v-else>
        <span v-for="tag in taskItem.tags" class="tag">{{ tag.name }}</span>
      </template>
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
