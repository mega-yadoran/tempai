<template>
  <button @click="handleClick">
    <Tile :type="props.type" :num="props.num" />
  </button>
</template>
<script setup lang="ts">
import { TileType } from '~/plugins/question';

const props = defineProps<{
  type: TileType;
  num: number;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>
