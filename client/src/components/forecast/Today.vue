<template>
  <div class="flex flex-col gap-6">
    <div class="today">
      <div>
        <h2 class="text-white text-2xl font-bold">{{ city }}</h2>
        <div v-if="date" class="text-sm mt-1">{{ date }}</div>
      </div>
      <div class="flex gap-4 items-center">
        <WeatherIcon
          v-if="weatherCode !== undefined"
          :code="weatherCode"
          size="lg"
        />
        <div class="text-white text-6xl font-semibold">
          {{ forecast.current?.temperature_2m
          }}{{ forecast.current_units?.apparent_temperature }}
        </div>
      </div>
    </div>

    <div class="today__details">
      <div
        v-for="item in details"
        :key="item.label"
        class="today__details_item"
      >
        <div class="text-sm">{{ item.label }}</div>
        <div class="font-semibold text-white text-xl">
          {{ item.value }} {{ item.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ForecastResponse } from "@/services/types";
import WeatherIcon from "@/components/shared/WeatherIcon.vue";
import { formatDate } from "@/utils/formatDate";

const props = defineProps<{
  forecast: ForecastResponse;
  city: string;
}>();

const weatherCode = computed(() => props.forecast.current?.weather_code);

const details = computed(() => [
  {
    label: "Feels like",
    value: props.forecast.current?.apparent_temperature,
    unit: props.forecast.current_units?.apparent_temperature,
  },
  {
    label: "Humidity",
    value: props.forecast.current?.relative_humidity_2m,
    unit: props.forecast.current_units?.relative_humidity_2m,
  },
  {
    label: "Wind",
    value: props.forecast.current?.wind_speed_10m,
    unit: props.forecast.current_units?.wind_speed_10m,
  },
  {
    label: "Precipitation",
    value: props.forecast.current?.precipitation,
    unit: props.forecast.current_units?.precipitation,
  },
]);

const date = computed(() => formatDate(props.forecast.current?.time));
</script>

<style lang="scss" scoped>
.today {
  padding: 2rem;
  min-height: 100px;
  border-radius: var(--radius-xl);
  background: var(--color-indigo-900);
  background: linear-gradient(
    90deg,
    var(--color-indigo-700) 0%,
    var(--color-indigo-900)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    min-height: 180px;
  }

  &__details {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(2, 1fr);

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }

    &_item {
      border-radius: var(--radius-md);
      background-color: var(--element-bg);
      border: 1px solid var(--element-border);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
