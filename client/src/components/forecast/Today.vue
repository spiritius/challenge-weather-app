<template>
  <div class="flex flex-col gap-8">
    <div class="today">
      <div>
        <h2 class="text-white text-2xl font-bold">CityName</h2>
        <div class="text-sm mt-1">{{ date }}</div>
      </div>
      <div class="flex gap-8 items-center">
        <div class="w-10 h-10">[icon]</div>
        <div class="text-white text-6xl font-semibold">20&deg;</div>
      </div>
    </div>

    <div class="today__details">
      <div class="today__details_item">
        <div class="text-sm">Feels like</div>
        <div class="font-semibold text-white text-xl">18&deg;</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const date = computed(() => {
  const currentDate = new Date();

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(currentDate);
});
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
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 180px;
  }

  &__details {
    display: grid;
    gap: 1.5rem;
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
