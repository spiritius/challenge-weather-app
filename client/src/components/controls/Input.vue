<template>
  <label class="input-field">
    <span v-if="$slots.icon" class="input-field__icon" aria-hidden="true">
      <slot name="icon" />
    </span>

    <input
      v-model="model"
      class="input input-field__control"
      :class="{ 'pl-10!': $slots.icon }"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </label>
</template>

<script setup lang="ts">
const model = defineModel<string>({ default: "" });

withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    type: "text",
    placeholder: "",
    disabled: false,
  }
);
</script>

<style lang="scss" scoped>
.input-field {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  width: 100%;

  &__icon {
    display: inline-flex;
    flex-shrink: 0;
    color: inherit;
    position: absolute;
    top: 0.55rem;
    left: 0.6rem;
  }

  &__control {
    background-color: var(--element-bg);
    color: var(--color-gray-300);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    width: 100%;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}
</style>
