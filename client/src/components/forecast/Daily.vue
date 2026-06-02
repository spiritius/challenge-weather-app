<template>
  <div class="daily">
    <h4 class="text-lg font-bold text-white">Daily forecast</h4>
    <div class="daily__grid">
      <div v-for="day in days" :key="day.time" class="card text-xs p-2">
        <div class="text-center text-white">{{ date(day.time) }}</div>
        <WeatherIcon
          v-if="day.weatherCode !== undefined"
          :code="day.weatherCode"
          class="mx-auto mt-2"
        />
        <div class="flex justify-between mt-2">
          <div v-if="day.max !== undefined" class="text-white">
            {{ day.max }}&deg;
          </div>
          <div v-if="day.min !== undefined" class="text-gray-400">
            {{ day.min }}&deg;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Daily } from "@/services/types";
import WeatherIcon from "../shared/WeatherIcon.vue";
import { formatWeekday } from "@/utils/formatDate";

const props = defineProps<{
  daily: Daily;
}>();

const days = computed(() =>
  props.daily.time.map((time, index) => ({
    time,
    weatherCode: props.daily.weather_code?.[index],
    max: props.daily.temperature_2m_max?.[index],
    min: props.daily.temperature_2m_min?.[index],
  }))
);

const date = (dailyDate: string) => {
  return formatWeekday(dailyDate);
};
</script>

<style scoped lang="scss">
.daily {
  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-top: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(7, 1fr);
    }
  }
}
</style>
