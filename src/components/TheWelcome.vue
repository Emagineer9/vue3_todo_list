<script setup lang="ts">
import { computed } from 'vue'
import { mdiAccount } from '@mdi/js'
import SvgIcon from './parts/SvgIcon.vue'
import WelcomeItem from './WelcomeItem.vue'

const mdiAccountIcon = computed(() => { //2
  return mdiAccount
})
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <svg-icon type="mdi" :path="mdiAccountIcon"></svg-icon>
    </template>
    <template #heading>Community</template>

    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>
</template>
