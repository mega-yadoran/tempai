<template>
  <div class="text-center">
    <div class="mt-2 mb-4 text-h5 text-sm-h4">何待ち？</div>
    <Question type="man" :tiles="questionTiles" />

    <v-divider class="my-4" />

    <v-expand-transition>
      <div v-show="!isCorrect">
        <v-row justify="center" class="my-2">
          <div>答えの牌を選んでください</div>

          <v-btn color="error" small class="ml-2" @click="judge">
            <v-icon small>mdi-flag</v-icon>
          </v-btn>
        </v-row>
        <div>↓↓</div>
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <div v-show="isCorrect">
        <div class="text-h5 red--text font-weight-bold">正解！！</div>
      </div>
    </v-expand-transition>

    <div class="answer_area">
      <AnswerForm
        :selected-tiles.sync="selectedTiles"
        type="man"
        :is-inputable="isInputable"
        class="my-6"
      />
      <img v-show="isCorrect" src="/correct.png" class="result_mark" />
      <img v-show="isIncorrect" src="/incorrect.png" class="result_mark" />
    </div>
    <v-row v-if="!isCorrect" justify="center">
      <v-btn
        color="primary"
        :disabled="!isInputable"
        class="font-weight-bold mx-4"
        @click="judge"
      >
        決定
      </v-btn>
    </v-row>

    <v-row v-if="isCorrect" justify="center" class="my-4">
      <v-btn color="error" class="font-weight-bold" @click="finish">
        終了
      </v-btn>

      <v-btn color="success" class="ml-12 font-weight-bold" @click="next">
        次へ
      </v-btn>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@nuxtjs/composition-api';
import { sleep } from '~/plugins/sleep';
import { arrayEquals } from '~/plugins/arrayEquals';
import { getRandomQuestion } from '~/plugins/question';

const isCorrect = ref(false);
const isIncorrect = ref(false);
const isInputable = ref(true);
const selectedTiles = ref<number[]>([]);
const questionTiles = ref<number[]>([]);
const answerTiles = ref<number[]>([]);

const setRandomQuestion = () => {
  [questionTiles.value, answerTiles.value] = getRandomQuestion();
  console.log(answerTiles.value);
};

setRandomQuestion();

const judge = async () => {
  isInputable.value = false;
  if (arrayEquals(selectedTiles.value, answerTiles.value)) {
    isCorrect.value = true;
  } else {
    isIncorrect.value = true;
    await sleep(1000);
    isInputable.value = true;
    isIncorrect.value = false;
  }
};

const next = () => {
  isInputable.value = true;
  isCorrect.value = false;
  isIncorrect.value = false;
  selectedTiles.value = [];
  [questionTiles.value, answerTiles.value] = getRandomQuestion();
  console.log(answerTiles.value);
};

const finish = () => {
  //
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
