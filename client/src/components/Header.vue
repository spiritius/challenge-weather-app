<template>
  <div class="flex gap-4 items-center">
    <a :href="baseUrl"><img src="../assets/images/logo.svg" alt="Logo" /></a>
  </div>
</template>

<script setup lang="ts">
const baseUrl = import.meta.env.BASE_URL;
</script>
