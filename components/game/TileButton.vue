<template>
  <button @click="handleClick">
    <Tile :type="props.type" :num="props.num" />
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  type: 'man' | 'pin' | 'sou';
  num: number;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>
