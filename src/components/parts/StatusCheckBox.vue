<script setup lang="ts">
import { reactive, onBeforeUpdate } from 'vue'
import { mdiCheckboxBlankOutline, mdiPencilBoxOutline, mdiCheckboxMarked } from '@mdi/js'
import SvgIcon from '@/components/parts/SvgIcon.vue'
import type { StatusItemInterface } from '@/interface/StatusItem'

interface Props {
  value: number
}
interface Emits {
  (e: 'update:value', value: number): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const statusOptions: StatusItemInterface[] = reactive([
  { name: 'ready', value: 0, path: mdiCheckboxBlankOutline, color: '#473e30' },
  { name: 'doing', value: 1, path: mdiPencilBoxOutline, color: '#1976d2' },
  { name: 'done', value: 2, path: mdiCheckboxMarked, color: '#388e3c' },
])
const getStatus = (value: number) => {
  const status = statusOptions.find((option) => option.value === value)
  if (status === null || status === undefined) {
    return statusOptions[0]
  }
  return status
}
const getColor = (value: number) => {
  const status = getStatus(value)
  return status.color
}

let selectStatus: StatusItemInterface = getStatus(props.value)
const getClass = () => {
  return 'check-box ' + selectStatus.name
}
const onClick = () => {
  const nextStatus = getStatus(selectStatus.value + 1)
  emit('update:value', nextStatus.value)
}

onBeforeUpdate(() => {
  selectStatus = getStatus(props.value)
})
</script>

<template>
  <div :class="getClass()" @click="onClick">
    <SvgIcon :path="selectStatus.path" :size="30" type="mdi" />
  </div>
</template>

<style scoped>
.check-box {
  border-radius: 16px;
  transition: .3s;
  padding: 2px;
}
/* 直接切り替えだと上手くいかなかった；； */
.check-box.ready svg {
  color: v-bind(getColor(0));
}
.check-box.ready:hover {
  background: v-bind(getColor(0) + '30');
}

.check-box.doing svg {
  color: v-bind(getColor(1));
}
.check-box.doing:hover {
  background: v-bind(getColor(1) + '30');
}

.check-box.done svg {
  color: v-bind(getColor(2));
}
.check-box.done:hover {
  background: v-bind(getColor(2) + '30');
}
</style>