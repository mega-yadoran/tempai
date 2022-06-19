<template>
  <v-row justify="center" class="my-8">
    <v-btn color="primary" class="font-weight-bold mx-4" @click="emit('judge')">
      決定
    </v-btn>
  </v-row>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'judge'): void;
}>();
</script>
