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
const props = defineProps<{
  type: 'man' | 'pin' | 'sou';
  tiles: number[];
}>();
</script>

<style scoped>
.tile {
  width: 7%;
}
</style>
