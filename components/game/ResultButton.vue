<template>
  <v-btn color="success" class="font-weight-bold" @click="emit('finish')">
    結果を見る
  </v-btn>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'finish'): void;
}>();
</script>
