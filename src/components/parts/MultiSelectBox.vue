<script setup lang="ts">
import { computed } from 'vue'
import VueMultiselect from 'vue-multiselect'
import type { TagItemInterface } from '@/interface/TagItem'

interface Props {
  value: Array<TagItemInterface>,
  options: Array<TagItemInterface>,
}

interface Emits {
  (e: 'update:value', value: Array<TagItemInterface>): void
  (e: 'addTag', value: TagItemInterface): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const computedValue = computed({
  get: () => {
    return props.value
  },
  set: (value) => {
    console.log(value)
    emit('update:value', value)
  },
})

const addTag = (newVal: string) => {
  const newTag: TagItemInterface = {
    name: newVal,
    code: newVal.substring(0, 2) + Math.floor((Math.random() * 10000000))
  }
  computedValue.value.push(newTag)
  emit('addTag', newTag)
}
</script>

<template>
  <div class="multi-select">
    <VueMultiselect
      v-model="computedValue"
      :options="options"
      :multiple="true"
      :taggable="true"
      tag-placeholder=""
      placeholder=""
      label="name"
      track-by="code"
      style="width: 100%;"
      @tag="addTag"
    />
  </div>
</template>

<style>
.multi-select {
  width: 100%;
}

.multiselect__tag {
  background: #5b7b70ba !important;
}
.multiselect__tag-icon::after {
  color: #31433c !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
