<template>
  <img :src="imgPath" />
</template>
<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api';

const props = defineProps<{
  type: 'man' | 'pin' | 'sou';
  num: number;
}>();

const imgRoot = '/tile';
const imgPath = computed(
  () => imgRoot + '/' + props.type + '/' + props.num.toString() + '.png'
);
</script>

<style scoped>
img {
  width: 100%;
}
</style>
