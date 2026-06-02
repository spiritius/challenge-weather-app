<template>
  <div class="grid">
    <div class="flex flex-col gap-6">
      <Today :forecast="forecast" :city="city" />
      <Daily v-if="daily" :daily="daily" />
    </div>
    <Hourly v-if="hourly" :hourly="hourly" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ForecastResponse } from "@/services/types";
import Daily from "./Daily.vue";
import Hourly from "./Hourly.vue";
import Today from "./Today.vue";

const props = defineProps<{
  forecast: ForecastResponse;
  city: string;
}>();

const daily = computed(() => props.forecast.daily);
const hourly = computed(() => props.forecast.hourly);
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
