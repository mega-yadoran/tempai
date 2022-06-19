<template>
  <v-row align="center">
    <v-col>
      <slot name="left" />
    </v-col>
    <v-col>
      <div class="mt-2 mb-4 text-h5 text-sm-h4">
        第{{ props.questionCount }}問
      </div>
    </v-col>
    <v-col>
      <slot name="right" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const props = defineProps<{
  questionCount: number;
}>();
</script>
