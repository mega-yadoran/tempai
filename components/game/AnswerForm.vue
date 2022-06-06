<template>
  <div>
    <TileButton
      v-for="tile in tiles"
      :key="tile.num"
      :type="props.type"
      :num="tile.num"
      class="tile"
      :class="tile.selected ? 'tile__selected' : ''"
      @click="changeSelect(tile.num)"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from '@nuxtjs/composition-api';

const props = defineProps({
  type: { type: String as PropType<'man' | 'pin' | 'sou'>, required: true },
});

const tiles = ref(
  [...Array(9)].map((_, i) => ({ num: i + 1, selected: false }))
);

const changeSelect = (num: number) => {
  tiles.value[num - 1].selected = !tiles.value[num - 1].selected;
};
</script>

<style lang="scss" scoped>
.tile {
  width: 7%;
  margin: 0 3px;
  opacity: 0.25;

  &__selected {
    opacity: 1;
  }
}
</style>
