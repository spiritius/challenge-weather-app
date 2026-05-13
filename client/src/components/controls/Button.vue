<template>
  <button
    class="button"
    :class="`button--${variant}`"
    :type="type"
    :disabled="disabled"
  >
    <span v-if="$slots.icon" class="button__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <span class="button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    variant?: "primary" | "secondary";
  }>(),
  {
    type: "button",
    disabled: false,
    variant: "primary",
  }
);
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease,
    color 180ms ease, opacity 180ms ease;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.button--primary {
  background-color: var(--color-blue-500);
  color: var(--color-white);
}

.button--secondary {
  background-color: var(--element-bg);
  color: var(--color-gray-100);
  border-color: var(--element-border);
}

.button__icon {
  display: inline-flex;
  flex-shrink: 0;
}

.button__content {
  display: inline-flex;
  align-items: center;
}
</style>
