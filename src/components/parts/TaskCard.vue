<script setup lang="ts">
</script>

<template>
  <div class="task-card">
    <div>
      <div class="grid-row">
        <div class="status align-items">
          <slot name="status"></slot>
        </div>
        <div class="text align-items">
          <slot name="text"></slot>
        </div>
      </div>
      <div class="grid-row">
        <div></div>
        <div><slot name="tags"></slot></div>
      </div>
      <div class="text-align-end" style="margin-top: 4px;">
        <slot name="date"></slot>
      </div>
    </div>
    <slot name="button"></slot>
  </div>
</template>

<style scoped>
.task-card {
  display: grid;
  border-bottom: solid;
  border-width: 1px;
  border-color: #cdc4b9;
}
@media (max-width: 1024px) {
  .task-card {
    padding: 20px 10px 10px 4px;
  }
}
@media (min-width: 1024px) {
  .task-card {
    grid-template-columns: auto 100px;
    padding: 20px 30px;
  }
}


.task-card:last-child {
  border-bottom: none;
}

.task-card .grid-row {
  display: grid;
  grid-template-columns: 40px auto;
  margin-bottom: 10px;
}

.text {
  width: 100%;
}
</style>
