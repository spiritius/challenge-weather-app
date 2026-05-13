<template>
  <div>
    <h5>Hourly forecast</h5>
  </div>
</template>

<script setup lang="ts">
import { ForecastResponse } from "@/services/api";

const props = defineProps<{
  forecast: ForecastResponse;
}>();
</script>

<style scoped></style>
