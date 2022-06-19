<template>
  <div class="text-center">
    <!-- 問題数表示 -->
    <QuestionHeader :question-count="score.questionCount">
      <!-- 連鎖数表示 -->
      <template #right>
        <div
          v-if="score.streakCount > 1"
          class="px-4 red--text text-caption text-sm-body-1"
        >
          {{ score.streakCount }}連鎖中！
        </div>
      </template>
    </QuestionHeader>

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
    >
      <template #button>
        <!-- 降参ボタン -->
        <GiveUpButton :disabled="!isInputable" @give-up="giveUp" />
      </template>
    </AnswerForm>

    <!-- 問題に挑戦中は「決定」ボタンを表示 -->
    <JudgeButton v-if="isPlaying()" @judge="judge" />

    <!-- クリア後 or 降参後は「終了」と「次へ」ボタンを表示 -->
    <v-row v-if="isCorrect() || isGiveUp()" justify="center" class="my-8">
      <FinishButton @finish="emit('finish')" />
      <NextButton @next="next" />
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from '@nuxtjs/composition-api';
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

type GameState = 'playing' | 'correct' | 'incorrect' | 'give-up' | 'finished';
const gameState = ref<GameState>('playing');
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
};

setRandomQuestion();

const judge = async () => {
  isInputable.value = false;
  if (arrayEquals(selectedTiles.value, answerTiles.value)) {
    // 正解の場合
    _score.value.clearCount++;
    _score.value.streakCount++;
    if (_score.value.streakCount > _score.value.highestStreakCount) {
      _score.value.highestStreakCount = _score.value.streakCount;
    }
    gameState.value = 'correct';
  } else {
    // 不正解の場合
    _score.value.streakCount = -1;
    gameState.value = 'incorrect';
    await sleep(1000);
    isInputable.value = true;
    gameState.value = 'playing';
  }
};

const giveUp = () => {
  gameState.value = 'give-up';
  _score.value.streakCount = 0;
};

const next = () => {
  _score.value.questionCount++;
  isInputable.value = true;
  gameState.value = 'playing';
  selectedTiles.value = [];
  tileType.value = getRandomTileType(tileType.value);
  [questionTiles.value, answerTiles.value] = getRandomQuestion();
};
</script>
