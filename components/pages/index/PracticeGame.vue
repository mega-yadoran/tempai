<template>
  <div class="text-center">
    <div class="my-2 text-h4">何待ち？</div>
    <Question type="man" :tiles="[1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9]" />

    <v-divider class="my-4" />

    <v-expand-transition>
      <div v-show="!isCorrect">
        <div>答えの牌を選んでください</div>
        <div>↓↓</div>
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <div v-show="isCorrect">
        <div class="text-h6 red--text font-weight-bold">正解！！</div>
      </div>
    </v-expand-transition>

    <div class="answer_area">
      <AnswerForm
        :selected-tiles.sync="selectedTiles"
        type="man"
        :is-inputable="isInputable"
        class="my-8"
      />
      <img v-show="isCorrect" src="/correct.png" class="result_mark" />
      <img v-show="isIncorrect" src="/incorrect.png" class="result_mark" />
    </div>
    <v-btn
      color="primary"
      :disabled="!isInputable"
      class="font-weight-bold"
      @click="judge"
    >
      決定
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@nuxtjs/composition-api';
import { sleep } from '~/plugins/sleep';
import { arrayEquals } from '~/plugins/arrayEquals';

const isCorrect = ref(false);
const isIncorrect = ref(false);
const isInputable = ref(true);
const selectedTiles = ref<number[]>([]);

const judge = async () => {
  // 動作テストのため、１・２・３を選んだときに正解表示する
  isInputable.value = false;
  if (arrayEquals(selectedTiles.value, [1, 2, 3])) {
    isCorrect.value = true;
  } else {
    isIncorrect.value = true;
    await sleep(1000);
    isInputable.value = true;
    isIncorrect.value = false;
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
    opacity: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
