<script setup lang="ts">
import { onBeforeMount, reactive, nextTick, inject } from 'vue'
import type { VueCookies } from 'vue-cookies'
import { mdiDelete, mdiContentSave, mdiShapeSquareRoundedPlus } from '@mdi/js'
import TaskCard from './parts/TaskCard.vue'
import MultiSelectBox from './parts/MultiSelectBox.vue'
import SvgIcon from '@/components/parts/SvgIcon.vue'
import StatusCheckBox from '@/components/parts/StatusCheckBox.vue'
import type { TaskItemInterface } from '@/interface/TaskItem'
import type { TagItemInterface } from '@/interface/TagItem'

const $cookies = inject<VueCookies>('$cookies')
const TEXTAREA_ROW = 3

const props = defineProps<{
  isLoading: Boolean,
}>();

const emit = defineEmits<{
  (e: 'startLoading'): void
  (e: 'stopLoading'): void
}>()

let tagOptions: TagItemInterface[] = reactive([])
let taskItems: TaskItemInterface[] = reactive([])

onBeforeMount(() => {
  emit('startLoading')
  /** Cookieからデータ取得 */
  const cookieTagOptions = $cookies?.get('tagOptions')
  if (null !== cookieTagOptions && undefined !== cookieTagOptions) {
    tagOptions = cookieTagOptions
  }
  const cookieTaskOptions = $cookies?.get('taskItems')
  if (null !== cookieTaskOptions && undefined !== cookieTaskOptions) {
    taskItems = cookieTaskOptions
  }
  resetOptions()
  emit('stopLoading')
})

/** イベント系 */
let pressTimer: any = null
const switchingEditTask = (index: any) => {
  nextTick(() => {
    emit('startLoading')
    taskItems[index].isEdit = !taskItems[index].isEdit
    updateTaskItems()
    emit('stopLoading')
  })
}
const startPress = (index: any) => {
  pressTimer = setTimeout(() => {
    switchingEditTask(index)
  }, 1000)
}
const endPress = () => {
  if (!pressTimer) return
  clearTimeout(pressTimer)
  pressTimer = null
}

/** methods */
/**
 * タスク削除
 * @param index 
 */
const deleteItem = (index: any) => {
  nextTick(() => {
    emit('startLoading')
    taskItems.splice(index, 1)
    updateTaskItems()
    emit('stopLoading')
  })
}

/**
 * タスク追加
 */
const addTask = () => {
  const date = getNowDateStr()
  const newVal:TaskItemInterface = {
    id: `${taskItems.length + 1}`,
    tags: [],
    text: '',
    status: 0,
    isEdit: true,
    createDate: date,
    updateDate: date
  }
  nextTick(() => {
    emit('startLoading')
    taskItems.push(newVal)
    updateTaskItems()
    emit('stopLoading')
  })
}

const getNowDateStr = () => {
  const createDate = new Date()
  const date = `${createDate.getFullYear()}-${createDate.getMonth()+1}-${createDate.getDate()} ${ createDate.getHours()}:${ createDate.getMinutes()}`
  return date
}

/**
 * taskItems[index].status更新
 * @param index 
 * @param value
 */
const updateStatus = (index: any, value: number) => {
  nextTick(() => {
    emit('startLoading')
    taskItems[index].status = value
    taskItems[index].updateDate = getNowDateStr()
    updateTaskItems()
    emit('stopLoading')
  })
}

/**
 * taskItems[index].tags更新
 * @param index 
 * @param value TagItemInterface[]
 */
const updateTags = (index: any, value: TagItemInterface[]) => {
  nextTick(() => {
    emit('startLoading')
    taskItems[index].tags = value
    taskItems[index].updateDate = getNowDateStr()
    updateTaskItems()
    emit('stopLoading')
  })
}

/**
 * タグを追加してtagOptionsとtaskItems[index]を保存
 * @param index 
 * @param value TagItemInterface
 */
const addTag = (index: any, value: TagItemInterface) => {
  nextTick(() => {
    emit('startLoading')
    tagOptions.push(value)
    $cookies?.set('tagOptions', tagOptions)
    taskItems[index].tags.push(value)
    taskItems[index].updateDate = getNowDateStr()
    // note: 変更通知
    taskItems[index].tags = [...taskItems[index].tags]
    updateTaskItems()
    emit('stopLoading')
  })
}

/**
 * 選択されていない選択肢は除外してtagOptionsを保存
 */
const resetOptions = () => {
  let taskTags: TagItemInterface[] = []
  let newVal: TagItemInterface[] = []
  if (null !== taskItems && undefined !== taskItems) {
    taskItems.forEach((task) => {
      taskTags = taskTags.concat(task.tags)
    })
    newVal = tagOptions.filter((tag: TagItemInterface) => {
      return taskTags.find((option: TagItemInterface) => {
        return option.name === tag.name && option.code === tag.code
      })
    })
  }
  tagOptions = newVal
  $cookies?.set('tagOptions', tagOptions)
}

/**
 * テキストエリアの高さ
 */
const getTextareaHeight = (index: any) => {
  let length = 1
  const text = taskItems[index].text.match(/\n/g)
  if (text !== null && text !== undefined) {
    length = text.length + 1
  }
  return `height: ${length * TEXTAREA_ROW}em;`
}

/**
 * taskItemsをCookieに保存
 */
const updateTaskItems = () => {
  $cookies?.set('taskItems', taskItems)
}
</script>

<template>
  <div>
    <div>
      <TaskCard
        v-for="(taskItem, index) in taskItems"
        @dblclick="switchingEditTask(index)"
        @pointerdown="startPress(index)"
        @pointerup="endPress"
        @pointermove="endPress"
        @pointercancel="endPress"
        @click="endPress"
      >
        <template #status>
          <StatusCheckBox
            v-if="!props.isLoading"
            :value="taskItem.status"
            @update:value="(value) => updateStatus(index, value)"
          ></StatusCheckBox>
        </template>
        <template #text>
          <template v-if="taskItem.isEdit">
            <textarea
              v-model="taskItem.text"
              :style="getTextareaHeight(index)"
              type="text"
              class="textarea"
              @input="updateTaskItems"
            ></textarea>
          </template>
          <template v-else>
            <span v-text="taskItem.text" class="pre-wrap"></span>
          </template>
        </template>
        <template #tags>
          <template v-if="taskItem.isEdit">
            <MultiSelectBox
              :value="taskItem.tags"
              :options="tagOptions"
              @addTag="(value) => addTag(index, value)"
              @update:value="(value) => updateTags(index, value)"
            />
          </template>
          <template v-else>
            <span v-for="tag in taskItem.tags" class="tag">{{ tag.name }}</span>
          </template>
        </template>
        <template #date>
          {{ taskItem.updateDate }}
        </template>
        <template #button>
          <div
            v-if="!!taskItem && !taskItem.isEdit"
            class="flex btn radius-btn"
          >
            <SvgIcon
              :path="mdiDelete"
              :size="34"
              type="mdi"
              @click="deleteItem(index)"
            />
          </div>
          <div
            v-if="!!taskItem && taskItem.isEdit"
            class="flex btn radius-btn"
          >
            <SvgIcon
              :path="mdiContentSave"
              :size="34"
              type="mdi"
              @click="switchingEditTask(index)"
            />
          </div>
        </template>
      </TaskCard>
    </div>

    <div class="flex btn add-btn" @click="addTask">
      <SvgIcon
        :path="mdiShapeSquareRoundedPlus"
        :size="30"
        type="mdi"
      />
    </div>
  </div>
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

.textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #cdc4b9 !important;
  border-radius: 4px;
  line-height: 1.7em;
  height: 3em;
}
.add-btn {
  margin-top: 10px;
  background-color: #5b7b7010;
  padding: 10px;
}
.add-btn svg {
  margin: auto;
}
</style>
