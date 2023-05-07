<script setup lang="ts">
import { reactive, onBeforeUpdate, ref } from 'vue'
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

let selectStatus: StatusItemInterface = reactive(getStatus(props.value))
let color = ref(selectStatus.color)

const getClass = () => {
  return 'check-box ' + selectStatus.name
}
const onClick = () => {
  const nextStatus = getStatus(selectStatus.value + 1)
  emit('update:value', nextStatus.value)
}

onBeforeUpdate(() => {
  selectStatus = getStatus(props.value)
  color.value = selectStatus.color
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
.check-box svg {
  color: v-bind(color);
}
.check-box:hover {
  background: v-bind(color + '30');
}
</style>