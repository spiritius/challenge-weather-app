<template>
  <button class="button" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }>(),
  {
    type: "button",
    disabled: false,
  }
);
</script>

<style scoped>
.button {
  background-color: var(--color-blue-500);
  color: var(--color-white);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: var(--text-base);
}
</style>
