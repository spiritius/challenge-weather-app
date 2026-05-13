<template>
  <div class="card skeleton" :style="styles"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
  }>(),
  {
    width: "100%",
    height: "100%",
  }
);

const styles = computed(() => {
  return {
    width: props.width,
    height: props.height,
  };
});
</script>

<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgb(255 255 255 / 0.12) 45%,
    rgb(255 255 255 / 0.24) 50%,
    rgb(255 255 255 / 0.12) 55%,
    transparent 100%
  );
  animation: skeleton-shimmer 1.6s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  to {
    transform: translateX(100%);
  }
}
</style>
