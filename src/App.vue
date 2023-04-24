<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { mdiCheckboxMultipleMarked } from '@mdi/js'
import SvgIcon from './components/parts/SvgIcon.vue'

const headerIcon = computed(() => {
  return mdiCheckboxMultipleMarked
})
</script>

<template>
  <header id="header">
    <div class="inner">
      <SvgIcon type="mdi" :path="headerIcon" :size="38" style="color: #4c5d52; vertical-align: middle"></SvgIcon>
      <div class="router-link">
        <nav>
          <RouterLink to="/">Home</RouterLink>
        </nav>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>
