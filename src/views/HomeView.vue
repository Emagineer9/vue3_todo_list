<script setup lang="ts">
import { ref } from 'vue'
import TodoList from '../components/TodoList.vue'
import Loader from '../components/parts/Loader.vue'
let isLoading = ref(true)
</script>

<template>
  <main>
    <TodoList
      v-show="!isLoading"
      :isLoading="isLoading"
      @startLoading="() => isLoading = true"
      @stopLoading="() => isLoading = false"
    />
    <Loader v-show="isLoading" />
  </main>
</template>
