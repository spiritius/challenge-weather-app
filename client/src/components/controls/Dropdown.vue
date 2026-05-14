<template>
  <div ref="root" class="dropdown">
    <div class="dropdown__trigger" @click="toggleDropdown">
      <slot name="trigger" :is-open="isOpen" />
    </div>

    <div v-if="isOpen" class="dropdown__content card">
      <button
        v-for="item in content"
        :key="item.id"
        class="dropdown__item text-xs"
        type="button"
        @click="handleItemClick(item)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

type DropdownItem = {
  id: string | number;
  label: string;
};

const props = defineProps<{
  content: DropdownItem[];
}>();

const emit = defineEmits<{
  click: [item: DropdownItem];
}>();

const root = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const closeDropdown = () => {
  isOpen.value = false;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleItemClick = (item: DropdownItem) => {
  emit("click", item);
  closeDropdown();
};

const handleWindowClick = (event: MouseEvent) => {
  if (!root.value) {
    return;
  }

  const target = event.target;
  if (!(target instanceof Node)) {
    return;
  }

  if (!root.value.contains(target)) {
    closeDropdown();
  }
};

onMounted(() => {
  window.addEventListener("click", handleWindowClick);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleWindowClick);
});
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;

  &__trigger {
    width: fit-content;
    cursor: pointer;
  }

  &__content {
    background-color: var(--color-indigo-950);
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    min-width: 100%;
    max-height: 300px;
    overflow: auto;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    z-index: 10;
  }

  &__item {
    width: 100%;
    text-align: left;
    border: 0;
    background: transparent;
    color: var(--color-gray-200);
    border-radius: var(--radius-md);
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    transition: background-color 180ms ease;

    &:hover {
      background-color: rgb(255 255 255 / 0.08);
    }
  }
}
</style>
