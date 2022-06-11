<template>
  <div class="text-center">
    <v-row align="center">
      <v-col />

      <v-col>
        <div class="mt-2 mb-4 text-h5 text-sm-h4">第{{ count }}問</div>
      </v-col>

      <v-col>
        <div
          v-if="countStreak > 1"
          class="px-4 red--text text-caption text-sm-body-1"
        >
          {{ countStreak }}連鎖中！
        </div>
      </v-col>
    </v-row>

    <!-- 問題の配牌表示 -->
    <Question :type="tileType" :tiles="questionTiles" />

    <v-divider class="my-4" />

    <!-- 降参後の答え表示 -->
    <Answer v-if="isGiveUp()" :type="tileType" :tiles="answerTiles" />

    <!-- ゲーム中の入力欄 -->
    <AnswerForm
      v-else
      :selected-tiles.sync="selectedTiles"
      :type="tileType"
      :is-inputable="isInputable"
      :is-correct="isCorrect()"
      :is-incorrect="isIncorrect()"
      @give-up="giveUp"
    />

    <!-- 問題に挑戦中は「決定」ボタンを表示 -->
    <v-row v-if="isPlaying()" justify="center" class="my-8">
      <v-btn color="primary" class="font-weight-bold mx-4" @click="judge">
        決定
      </v-btn>
    </v-row>

    <!-- クリア後 or 降参後は「終了」と「次へ」ボタンを表示 -->
    <v-row v-if="isCorrect() || isGiveUp()" justify="center" class="my-8">
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
import {
  TileType,
  getRandomTileType,
  getRandomQuestion,
} from '~/plugins/question';

type GameState = 'playing' | 'correct' | 'incorrect' | 'give-up' | 'finished';
const gameState = ref<GameState>('playing');
const count = ref(1);
const countStreak = ref(0);
const isInputable = ref(true);
const tileType = ref<TileType>(getRandomTileType());
const selectedTiles = ref<number[]>([]);
const questionTiles = ref<number[]>([]);
const answerTiles = ref<number[]>([]);

const isPlaying = () => gameState.value === 'playing';
const isCorrect = () => gameState.value === 'correct';
const isIncorrect = () => gameState.value === 'incorrect';
const isGiveUp = () => gameState.value === 'give-up';

const setRandomQuestion = () => {
  [questionTiles.value, answerTiles.value] = getRandomQuestion();
  console.log(answerTiles.value);
};

setRandomQuestion();

const judge = async () => {
  isInputable.value = false;
  if (arrayEquals(selectedTiles.value, answerTiles.value)) {
    // 正解の場合
    countStreak.value++;
    gameState.value = 'correct';
  } else {
    // 不正解の場合
    countStreak.value = -1;
    gameState.value = 'incorrect';
    await sleep(1000);
    isInputable.value = true;
    gameState.value = 'playing';
  }
};

const giveUp = () => {
  gameState.value = 'give-up';
  countStreak.value = 0;
};

const next = () => {
  count.value++;
  isInputable.value = true;
  gameState.value = 'playing';
  selectedTiles.value = [];
  tileType.value = getRandomTileType(tileType.value);
  [questionTiles.value, answerTiles.value] = getRandomQuestion();
  console.log(answerTiles.value);
};

const finish = () => {
  //
};
</script>
