<template>
  <v-btn color="success" class="ml-12 font-weight-bold" @click="emit('next')">
    次へ
  </v-btn>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'next'): void;
}>();
</script>
