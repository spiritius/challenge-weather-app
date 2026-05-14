<template>
  <div class="grid lg:grid-cols-[1fr_320px] gap-8">
    <div class="flex flex-col gap-6">
      <div class="h-[232px] md:h-[180px]">
        <Skeleton width="100%" height="100%" />
      </div>
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Skeleton v-for="i in 4" :key="i" height="98px" />
      </div>
      <div class="grid grid-cols-3 gap-2 md:grid-cols-7 md:mt-11">
        <Skeleton v-for="i in 7" :key="i" height="106px" />
      </div>
    </div>
    <div class="h-[480px]">
      <Skeleton />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from "@/components/shared/Skeleton.vue";
</script>

<style scoped></style>
