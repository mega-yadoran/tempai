<template>
  <PracticeGame v-if="isPlaying" />
  <StartPracticePanel v-else @start="start" />
</template>

<script setup lang="ts">
import { ref } from '@nuxtjs/composition-api';

const isPlaying = ref(false);

const start = () => {
  isPlaying.value = true;
};
</script>

<style scoped></style>
