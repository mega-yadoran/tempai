<template>
  <div>
    <TileButton
      v-for="i in 9"
      :key="i"
      :type="props.type"
      :num="i"
      class="tile"
      :class="props.selectedTiles.includes(i) ? 'tile__selected' : ''"
      @click="changeSelect(i)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedTiles: number[];
  isInputable: Boolean;
  type: String;
}>();

const emit = defineEmits<{
  (e: 'update:selectedTiles', value: number[]): void;
}>();

const changeSelect = (num: number) => {
  if (props.isInputable) {
    if (props.selectedTiles.includes(num)) {
      emit(
        'update:selectedTiles',
        [...props.selectedTiles].filter((n) => n !== num).sort()
      );
    } else {
      emit('update:selectedTiles', [...props.selectedTiles, num].sort());
    }
  }
};
</script>

<style lang="scss" scoped>
.tile {
  width: 8.5%;
  margin: 0 3px;
  opacity: 0.25;

  &__selected {
    opacity: 1;
  }
}
</style>
