<template>
  <div>
    <div class="red--text text-h6">答え</div>
    <div class="mt-4">
      <Tile
        v-for="(tile, i) in tiles"
        :key="i"
        :type="props.type"
        :num="tile"
        class="tile"
      />
    </div>
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
  width: 8.5%;
  margin: 0 3px;
}
</style>
