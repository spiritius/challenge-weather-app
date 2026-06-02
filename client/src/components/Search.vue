<template>
  <div ref="root" class="search">
    <div class="search__input">
      <Input
        v-model="searchQuery"
        @keyup.enter="trySearch"
        placeholder="Search for a place"
      >
        <template #icon>
          <img :src="SearchIcon" alt="" />
        </template>
      </Input>

      <div v-if="isOpen" class="search__results">
        <div
          v-for="item in searchResults"
          @click="onResultClick(item)"
          :key="item.id"
          class="search__results_item transition-colors"
        >
          <span class="text-white me-1">{{ item.name }}</span>
          {{ item.admin1 }},
          {{ item.country }}
        </div>
      </div>
    </div>
    <Button @click="trySearch" :disabled="isLoading">
      <template v-if="isLoading">
        <img :src="loadIcon" alt="" class="animate-spin" />
      </template>
      <template v-else>Search</template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Input from "@/components/controls/Input.vue";
import Button from "@/components/controls/Button.vue";
import SearchIcon from "@/assets/images/icon-search.svg";
import api from "@/services/api";
import type { LocationSearchResult } from "@/services/types";
import loadIcon from "@/assets/images/icon-loading.svg";

const emit = defineEmits(["onSearchResult"]);

const root = ref<HTMLElement | null>(null);
const isLoading = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const searchQuery = ref<string>("");
const searchResults = ref<LocationSearchResult[]>([]);

const trySearch = async () => {
  try {
    isLoading.value = true;
    searchResults.value =
      (await api.searchLocations(searchQuery.value)).results ?? [];
    isOpen.value = searchResults.value.length > 0;
  } catch {
    searchResults.value = [];
    isOpen.value = false;
  } finally {
    isLoading.value = false;
  }
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
    isOpen.value = false;
  }
};

const onResultClick = (location: LocationSearchResult) => {
  emit("onSearchResult", location);
  isOpen.value = false;
  searchQuery.value = "";
};

onMounted(() => {
  window.addEventListener("click", handleWindowClick);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", handleWindowClick);
});
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 450px;
    flex-direction: row;
    margin: 0 auto;
  }

  &__input {
    position: relative;
    width: 100%;
  }

  &__results {
    position: absolute;
    z-index: 2;
    width: 100%;
    top: calc(100% + 0.25rem);
    padding: 0.25rem;
    border-radius: var(--radius-md);
    background: var(--element-color);
    border: 1px solid var(--element-border);
    font-size: var(--text-xs);
    max-height: 300px;
    overflow-y: auto;
    color: var(--color-gray-400);

    &_item {
      display: flex;
      padding: 0.25rem;
      border-radius: var(--radius-sm);
      background: transparent;
      cursor: pointer;

      &:hover {
        background: var(--element-bg);
      }
    }
  }
}
</style>
