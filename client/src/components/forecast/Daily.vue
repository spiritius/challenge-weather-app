<template>
  <div>
    <h4 class="text-lg font-bold text-white">Daily forecast</h4>
  </div>
</template>

<script setup lang="ts">
import { ForecastResponse } from "@/services/api";

const props = defineProps<{
  forecast: ForecastResponse;
}>();
</script>

<style scoped></style>
