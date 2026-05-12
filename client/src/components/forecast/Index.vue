<template>
  <div class="grid">
    <div class="flex flex-col gap-8">
      <Today />
      <Daily />
    </div>
    <Hourly />
  </div>
</template>

<script setup lang="ts">
import Daily from "./Daily.vue";
import Hourly from "./Hourly.vue";
import Today from "./Today.vue";
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 320px;
  }
}
</style>
