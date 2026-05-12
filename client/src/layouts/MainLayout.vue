<template>
  <main>
    <Header />

    <template v-if="">
      <Title />
      <Search />
      <Forecast />
    </template>
  </main>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Search from "@/components/Search.vue";
import Title from "@/components/Title.vue";
import Forecast from "@/components/forecast/Index.vue";
</script>

<style lang="scss" scoped>
main {
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
