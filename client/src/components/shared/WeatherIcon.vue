<template>
  <div class="weather-icon" :class="`weather-icon--${size}`">
    <img :src="icon" alt="" />
  </div>
</template>

<script setup lang="ts">
import DrizzleIcon from "@/assets/images/icon-drizzle.webp";
import FogIcon from "@/assets/images/icon-fog.webp";
import OvercastIcon from "@/assets/images/icon-overcast.webp";
import CloudyIcon from "@/assets/images/icon-partly-cloudy.webp";
import RainIcon from "@/assets/images/icon-rain.webp";
import SnowIcon from "@/assets/images/icon-snow.webp";
import StormIcon from "@/assets/images/icon-storm.webp";
import SunnyIcon from "@/assets/images/icon-sunny.webp";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    code: number;
    size?: "md" | "lg";
  }>(),
  {
    size: "md",
  }
);

const CODES = {
  [SunnyIcon]: [0],
  [CloudyIcon]: [1, 2],
  [OvercastIcon]: [3],
  [FogIcon]: [45, 48],
  [DrizzleIcon]: [51, 53, 55, 56, 57],
  [RainIcon]: [61, 63, 65, 66, 67, 80, 81, 82],
  [SnowIcon]: [71, 73, 75, 77, 85, 86],
  [StormIcon]: [95, 96, 99],
} satisfies Record<string, number[]>;

const icon = computed(() => {
  const iconEntry = Object.entries(CODES).find(([, codes]) =>
    codes.includes(props.code)
  );

  return iconEntry?.[0] ?? SunnyIcon;
});
</script>

<style scoped lang="scss">
.weather-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &--md {
    width: 2.5rem;
    height: 2.5rem;
  }

  &--lg {
    width: 5rem;
    height: 5rem;
  }
}
</style>
