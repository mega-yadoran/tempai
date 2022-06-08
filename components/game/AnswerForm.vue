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
  selectedTiles: {
    type: Array as PropType<number[]>,
    required: true,
  },
  isInputable: { type: Boolean, required: true },
  type: { type: String as PropType<'man' | 'pin' | 'sou'>, required: true },
});

const emit = defineEmits<{
  (e: 'update:selectedTiles', value: number[]): void;
}>();

const tiles = ref(
  [...Array(9)].map((_, i) => ({
    num: i + 1,
    selected: i + 1 in props.selectedTiles,
  }))
);

const changeSelect = (num: number) => {
  if (props.isInputable) {
    tiles.value[num - 1].selected = !tiles.value[num - 1].selected;
    emit(
      'update:selectedTiles',
      tiles.value.filter((t) => t.selected).map((t) => t.num)
    );
  }
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
