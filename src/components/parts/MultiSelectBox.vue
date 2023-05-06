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
    emit('update:value', value)
  },
})

const addTag = (newVal: string) => {
  const newTag: TagItemInterface = {
    name: newVal,
    code: newVal.substring(0, 2) + Math.floor((Math.random() * 10000000))
  }
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
.multiselect__tags {
  border: 1px solid #cdc4b9 !important;
}
.multiselect__content-wrapper {
  border: 1px solid #cdc4b9 !important;
  border-top: none !important;
}
</style>
