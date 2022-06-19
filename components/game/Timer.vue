<template>
  <div class="text-h6">{{ convertTime(remainingTime) }}</div>
</template>

<script setup lang="ts">
import { ref } from '@vue/composition-api';
import dayjs from 'dayjs';

const props = defineProps<{
  minutes: number;
}>();

const emit = defineEmits<{
  (e: 'on-end'): void;
}>();

const remainingTime = ref(props.minutes * 60 * 1000);
const timeLimit = ref<dayjs.Dayjs>(dayjs());
let timer: NodeJS.Timer;

const convertTime = (time: number): string => {
  const seconds = Math.max(Math.ceil(time / 1000), 0);
  const m = Math.floor(seconds / 60);
  const s = ('00' + (seconds % 60)).slice(-2);
  return `${m}:${s}`;
};

const checkEnd = () => {
  if (remainingTime.value <= 0) {
    clearInterval(timer);
    emit('on-end');
  }
};

const start = () => {
  timeLimit.value = dayjs().add(remainingTime.value, 'ms');

  // 100msごとにカウントダウン処理を実行
  timer = setInterval(() => {
    const now = dayjs();
    remainingTime.value = timeLimit.value.diff(now, 'ms');
    checkEnd();
  }, 100);
};

const stop = () => {
  // タイマー実行処理を削除
  clearInterval(timer);
};

const consume = (time: number) => {
  remainingTime.value = Math.max(remainingTime.value - time, 0);
  checkEnd();
};

// 親componentから参照できるようにする
defineExpose({
  start,
  stop,
  consume,
});
</script>
