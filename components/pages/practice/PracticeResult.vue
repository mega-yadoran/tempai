<template>
  <div class="text-center">
    <div class="text-h5">結果</div>
    <v-card width="400" class="my-4 mx-auto py-4">
      <div>
        <div class="text-h6">正解数</div>
        <div class="mt-2 text-h5 red--text">
          {{ props.score.questionCount }}問中 {{ props.score.clearCount }}問
        </div>
      </div>

      <v-divider width="70%" class="my-4 mx-auto" />

      <div class="my-4">
        <div class="text-h6">最高連鎖数</div>
        <div class="mt-2 text-h5 red--text">
          {{ props.score.highestStreakCount }} 連鎖
        </div>
      </div>

      <v-divider width="70%" class="my-4 mx-auto" />
      <TweetButton :share-text="shareText" />
    </v-card>
    <v-btn color="success" @click="emit('restart')">はじめから</v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/composition-api';

const props = defineProps<{
  score: {
    questionCount: number;
    clearCount: number;
    streakCount: number;
    highestStreakCount: number;
  };
}>();
const emit = defineEmits<{
  (e: 'restart'): void;
}>();

const shareText = computed(() => {
  return `清一色待ち当て特訓練習で${props.score.questionCount}問中${props.score.clearCount}問正解！`;
});
</script>
