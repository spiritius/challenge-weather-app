<template>
  <div class="card hourly">
    <div class="flex justify-between items-center">
      <h5 class="font-bold text-white">Hourly forecast</h5>
      <Dropdown :content="daysList" @click="handleDayClick">
        <template #trigger>
          <Button variant="secondary" size="sm">
            {{ activeDay?.label ?? "Select day" }}
          </Button>
        </template>
      </Dropdown>
    </div>
    <div class="hourly__wrapper">
      <div v-for="day in visibleHours" :key="day.date" class="hourly__group">
        <div
          v-for="hour in day.items"
          :key="hour.time"
          class="card text-xs pl-1 pr-2 flex items-center gap-2"
        >
          <WeatherIcon
            v-if="hour.weatherCode !== undefined"
            :code="hour.weatherCode"
          />
          <div>{{ time(hour.time) }}</div>
          <div class="ml-auto">{{ hour.temperature }}&deg;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import WeatherIcon from "@/components/shared/WeatherIcon.vue";
import Dropdown from "@/components/controls/Dropdown.vue";
import Button from "@/components/controls/Button.vue";
import type { Hourly } from "@/services/types";
import { formatTime, formatWeekday } from "@/utils/formatDate";

type DayItem = {
  id: string | number;
  label: string;
};

const props = defineProps<{
  hourly: Hourly;
}>();

const groupedHours = computed(() => {
  const hours = props.hourly.time.map((time, index) => ({
    time,
    date: time.split("T")[0] ?? time,
    weatherCode: props.hourly.weather_code?.[index],
    temperature: props.hourly.temperature_2m?.[index],
  }));

  return hours.reduce<
    Array<{
      date: string;
      items: typeof hours;
    }>
  >((groups, hour) => {
    const lastGroup = groups.at(-1);

    if (!lastGroup || lastGroup.date !== hour.date) {
      groups.push({
        date: hour.date,
        items: [hour],
      });
      return groups;
    }

    lastGroup.items.push(hour);
    return groups;
  }, []);
});

const time = (date: string) => {
  return formatTime(date);
};

const weekday = (date: string) => {
  return formatWeekday(date, "long");
};

const daysList = computed(() => {
  return groupedHours.value.map((item) => {
    return {
      label: weekday(item.date),
      id: item.date,
    };
  });
});

const currentHour = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:00`;
});

const activeDay = ref<DayItem | null>(daysList.value[0] ?? null);

const visibleHours = computed(() => {
  const currentDate = currentHour.value.split("T")[0];
  const selectedHours = activeDay.value
    ? groupedHours.value.filter((day) => day.date === activeDay.value?.id)
    : groupedHours.value;

  return selectedHours.map((day) => {
    if (day.date !== currentDate) {
      return day;
    }

    return {
      ...day,
      items: day.items.filter((hour) => hour.time >= currentHour.value),
    };
  });
});

const handleDayClick = (item: DayItem) => {
  activeDay.value = item;
};
</script>

<style scoped lang="scss">
.hourly {
  padding: 20px;
  height: 100%;
  position: relative;

  &__wrapper {
    margin-top: 1rem;
    height: 390px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__day {
    font-size: 0.875rem;
    font-weight: 700;
  }
}
</style>
