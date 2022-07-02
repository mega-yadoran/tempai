<template>
  <!-- ルール説明画面 -->
  <PracticeStartPanel v-if="state === 'standby'" @start="start" />

  <!-- ゲーム画面 -->
  <PracticeGame
    v-else-if="state === 'game'"
    :score.sync="score"
    @finish="finish"
  />

  <!-- 結果画面 -->
  <PracticeResult v-else :score="score" @restart="restart" />
</template>

<script setup lang="ts">
import { ref, useContext } from '@nuxtjs/composition-api';

const state = ref<'standby' | 'game' | 'result'>('standby');
const context = useContext();

const initialScore = {
  questionCount: 1,
  clearCount: 0,
  streakCount: 0,
  highestStreakCount: 0,
};
const score = ref({ ...initialScore });

const start = () => {
  state.value = 'game';
  context.app.$accessor.game.setIsPlaying(true);
};

const finish = () => {
  state.value = 'result';
  context.app.$accessor.game.setIsPlaying(false);
};

const restart = () => {
  state.value = 'standby';
  score.value = { ...initialScore };
  context.app.$accessor.game.setIsPlaying(false);
};
</script>

<style scoped></style>
