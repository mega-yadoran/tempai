<template>
  <div>
    <Tile
      v-for="(tile, i) in tiles"
      :key="i"
      :type="props.type"
      :num="tile"
      class="tile"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from '@nuxtjs/composition-api';
const props = defineProps({
  type: { type: String as PropType<'man' | 'pin' | 'sou'>, required: true },
  tiles: { type: Array as PropType<Number[]>, required: true },
});
</script>

<style scoped>
.tile {
  width: 7%;
}
</style>
