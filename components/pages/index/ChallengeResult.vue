<template>
  <div class="text-center">
    <div class="text-h5">結果</div>
    <v-card width="400" class="my-4 mx-auto py-4">
      <div>
        <div class="text-h6">正解数</div>
        <div class="mt-2 text-h5 red--text">
          {{ props.score.clearCount }} 問正解
        </div>
      </div>

      <v-divider width="70%" class="my-4 mx-auto" />

      <div class="my-4">
        <div class="text-h6">クラス</div>
        <div class="mt-2 text-h5 red--text">
          {{ level }}
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
import TweetButton from '~/components/common/TweetButton.vue';
const props = defineProps<{
  score: {
    questionCount: number;
    clearCount: number;
    streakCount: number;
    highestStreakCount: number;
    totalCorrectTiles: number;
    life: number;
  };
}>();
const emit = defineEmits<{
  (e: 'restart'): void;
}>();

const levelList = [
  { name: 'ビギナー', point: 50 },
  { name: '中級者', point: 100 },
  { name: '強豪', point: 200 },
  { name: 'プロ', point: 300 },
  { name: '最強位', point: 350 },
  { name: '神', point: 400 },
  { name: '超神', point: 500 },
];

const calculatePoint = (): number => {
  let result = 0;
  result += props.score.clearCount * 10;
  result += props.score.totalCorrectTiles * 5;
  result += (props.score.life - 1) * 10;

  return result;
};

const level = computed(() => {
  return levelList.find((l) => l.point > calculatePoint())?.name ?? '超超神';
});

const shareText = computed(() => {
  return `清一色待ち当て特訓チャレンジで${props.score.clearCount}問正解して「${level.value}」クラスの称号をゲット！`;
});
</script>
