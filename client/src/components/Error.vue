<template>
  <div
    class="flex flex-col gap-4 text-center items-center max-w-[400px] m-auto"
  >
    <img :src="ErrorIcon" alt="Error" class="w-10 h-10" />
    <h2 class="text-white text-3xl font-bold">Something went wrong</h2>
    <p>
      We couldn't connect to the server (API error). Please try again in a few
      moments.
    </p>
    <Button @click="$emit('onRetry')" variant="secondary">
      <template #icon><img :src="RetryIcon" alt="" /></template>
      Retry
    </Button>
  </div>
</template>

<script setup>
import Button from "./controls/Button.vue";
import ErrorIcon from "@/assets/images/icon-error.svg";
import RetryIcon from "@/assets/images/icon-retry.svg";
</script>

<style lang="scss" scoped></style>
