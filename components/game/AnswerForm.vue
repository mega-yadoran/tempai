<template>
  <div>
    <v-row justify="center" align="center" class="my-2">
      <div>待ち牌を全て選んでください</div>

      <!-- 各種ボタン -->
      <slot name="button" />
    </v-row>

    <div class="answer_area">
      <!-- 答えの待ち牌の選択ボタン -->
      <TileButton
        v-for="i in 9"
        :key="i"
        :type="props.type"
        :num="i"
        class="tile my-4"
        :class="props.selectedTiles.includes(i) ? 'tile__selected' : ''"
        @click="changeSelect(i)"
      />

      <!-- 正解マーク -->
      <img v-show="isCorrect" src="/correct.png" class="result_mark" />

      <!-- 不正解マーク -->
      <img v-show="isIncorrect" src="/incorrect.png" class="result_mark" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedTiles: number[];
  type: String;
  isInputable: Boolean;
  isCorrect: Boolean;
  isIncorrect: Boolean;
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
.answer_area {
  position: relative;

  .result_mark {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 150%;
    opacity: 0.5;
    transform: translate(-50%, -50%);
  }
}

.tile {
  width: 8.5%;
  margin: 0 3px;
  opacity: 0.25;

  &__selected {
    opacity: 1;
  }
}
</style>
