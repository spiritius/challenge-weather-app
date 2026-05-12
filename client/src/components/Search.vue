<template>
  <div class="search">
    <Input v-model="searchQuery" placeholder="Search for a place">
      <template #icon>
        <img :src="SearchIcon" alt="" />
      </template>
    </Input>
    <Button @click="trySearch">Search</Button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Input from "@/components/controls/Input.vue";
import Button from "@/components/controls/Button.vue";
import SearchIcon from "@/assets/images/icon-search.svg";

const searchQuery = ref("");

const trySearch = () => {
  console.log("✳️ -> ", searchQuery.value);
};
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
}
</style>
