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
import { TileType } from '../../plugins/question';

const props = defineProps<{
  type: TileType;
  tiles: number[];
}>();
</script>

<style scoped>
.tile {
  width: 7%;
}
</style>
