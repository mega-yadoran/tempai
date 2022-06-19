<template>
  <div class="text-center">
    <!-- 問題数表示 -->
    <QuestionHeader :question-count="score.questionCount">
      <!-- 残り時間表示 -->
      <template #left>
        <Timer ref="timerRef" :minutes="3" @on-end="onGameOver" />
      </template>

      <!-- ライフ表示 -->
      <template #right>
        <div class="text-right" style="width: 90px">
          <v-icon class="mr-1">mdi-cards-heart</v-icon> {{ score.life }} / 3
        </div>
      </template>
    </QuestionHeader>

    <!-- 問題の配牌表示 -->
    <Question :type="tileType" :tiles="questionTiles" />

    <v-divider class="my-4" />

    <!-- 降参/ゲームオーバー後の答え表示 -->
    <Answer
      v-if="isPassed() || isFinished()"
      :type="tileType"
      :tiles="answerTiles"
    />

    <!-- ゲーム中の入力欄 -->
    <AnswerForm
      v-else
      :selected-tiles.sync="selectedTiles"
      :type="tileType"
      :is-inputable="isInputable"
      :is-correct="isCorrect()"
      :is-incorrect="isIncorrect()"
    >
      <template #button>
        <!-- パスボタン -->
        <PassButton :disabled="!isInputable" @pass="pass" />
      </template>
    </AnswerForm>

    <!-- 問題に挑戦中は「決定」ボタンを表示 -->
    <v-row v-if="isPlaying()" justify="center" class="my-8">
      <JudgeButton @judge="judge" />
    </v-row>

    <!-- クリア後 or 降参後は「終了」と「次へ」ボタンを表示 -->
    <v-row v-if="isCorrect() || isPassed()" justify="center" class="my-8">
      <FinishButton @finish="emit('finish')" />
      <NextButton @next="next" />
    </v-row>

    <v-row v-if="isFinished()" justify="center" class="my-8">
      <ResultButton @finish="emit('finish')" />
    </v-row>

    <AlertMessage :open.sync="openAlert" text="そこまで！" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from '@nuxtjs/composition-api';
import { sleep } from '~/plugins/sleep';
import { arrayEquals } from '~/plugins/arrayEquals';
import {
  TileType,
  getRandomTileType,
  getRandomQuestion,
} from '~/plugins/question';

type ScoreType = {
  questionCount: number;
  clearCount: number;
  streakCount: number;
  highestStreakCount: number;
  totalCorrectTiles: number;
  life: number;
};
const props = defineProps<{
  score: ScoreType;
}>();
const emit = defineEmits<{
  (e: 'update:score', val: ScoreType): void;
  (e: 'finish'): void;
}>();
const _score = computed({
  get: () => props.score,
  set: (val) => {
    emit('update:score', val);
  },
});

type GameState = 'playing' | 'correct' | 'incorrect' | 'passed' | 'finished';
const gameState = ref<GameState>('playing');
const isInputable = ref(true);
const tileType = ref<TileType>(getRandomTileType());
const selectedTiles = ref<number[]>([]);
const questionTiles = ref<number[]>([]);
const answerTiles = ref<number[]>([]);
const openAlert = ref(false);
const timerRef = ref<InstanceType<typeof Timer>>(null);

const isPlaying = () => gameState.value === 'playing';
const isCorrect = () => gameState.value === 'correct';
const isIncorrect = () => gameState.value === 'incorrect';
const isPassed = () => gameState.value === 'passed';
const isFinished = () => gameState.value === 'finished';

const setRandomQuestion = () => {
  [questionTiles.value, answerTiles.value] = getRandomQuestion();
};

setRandomQuestion();

onMounted(() => {
  // タイマースタート
  timerRef.value.start();
});

const judge = async () => {
  isInputable.value = false;
  if (arrayEquals(selectedTiles.value, answerTiles.value)) {
    // 正解の場合
    timerRef.value.stop();
    _score.value.clearCount++;
    _score.value.streakCount++;
    _score.value.totalCorrectTiles += answerTiles.value.length;
    if (_score.value.streakCount > _score.value.highestStreakCount) {
      _score.value.highestStreakCount = _score.value.streakCount;
    }
    gameState.value = 'correct';
  } else {
    // 不正解の場合
    _score.value.streakCount = -1;
    _score.value.life--;
    gameState.value = 'incorrect';
    await sleep(1000);
    if (_score.value.life === 0) {
      // ライフがなくなったらゲームオーバー
      onGameOver();
    } else {
      isInputable.value = true;
      gameState.value = 'playing';
    }
  }
};

const pass = () => {
  timerRef.value.consume(10000); // 10秒消費
  timerRef.value.stop();
  gameState.value = 'passed';
  _score.value.streakCount = 0;
};

const next = () => {
  _score.value.questionCount++;
  isInputable.value = true;
  gameState.value = 'playing';
  selectedTiles.value = [];
  tileType.value = getRandomTileType(tileType.value);
  [questionTiles.value, answerTiles.value] = getRandomQuestion();
  timerRef.value.start();
};

const onGameOver = async () => {
  isInputable.value = false;
  openAlert.value = true;
  await sleep(1000);
  gameState.value = 'finished';
};
</script>
