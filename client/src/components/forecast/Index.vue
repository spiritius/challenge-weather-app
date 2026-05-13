<template>
  <div class="grid">
    <div class="flex flex-col gap-6">
      <Today :forecast="forecast" />
      <Daily :forecast="forecast" />
    </div>
    <Hourly :forecast="forecast" />
  </div>
</template>

<script setup lang="ts">
import { ForecastResponse } from "@/services/api";
import Daily from "./Daily.vue";
import Hourly from "./Hourly.vue";
import Today from "./Today.vue";

defineProps<{ forecast: ForecastResponse }>();
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
