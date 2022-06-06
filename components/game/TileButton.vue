<template>
  <button @click="handleClick">
    <Tile :type="props.type" :num="props.num" />
  </button>
</template>
<script setup lang="ts">
import { PropType } from '@nuxtjs/composition-api';

const props = defineProps({
  type: { type: String as PropType<'man' | 'pin' | 'sou'>, required: true },
  num: { type: Number, required: true },
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>
