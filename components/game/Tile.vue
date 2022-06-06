<template>
  <img :src="imgPath" />
</template>
<script setup lang="ts">
import { computed, PropType } from '@nuxtjs/composition-api';

const props = defineProps({
  type: { type: String as PropType<'man' | 'pin' | 'sou'>, required: true },
  num: { type: Number, required: true },
});

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
