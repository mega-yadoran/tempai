<template>
  <v-card class="px-3 px-sm-8 py-3 py-sm-6 text-center">
    <div class="text-h5">チャレンジモード</div>

    <v-divider class="my-3" />

    <!-- ルール -->
    <ul class="text-left mt-2">
      <li class="my-2">
        清一色のテンパイ形が表示されるので、何待ちか当ててください
      </li>
      <li class="my-2">３分間でなるべくたくさんの問題に正解してください</li>
      <li class="my-2">３回間違えるとゲームオーバーになります</li>
      <li class="my-2">
        <v-btn small><span class="font-weight-bold">パス</span></v-btn>
        を押すと残り時間を10秒消費してその問題をパスできます
      </li>
    </ul>

    <!-- 開始ボタン -->
    <v-row justify="center" class="mt-4 mb-1">
      <v-btn
        width="100"
        color="green"
        dark
        class="my-auto mx-4"
        @click="onStartButton"
      >
        <span class="text-button">START </span>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'start'): void;
}>();

const onStartButton = () => {
  emit('start');
};
</script>

<style scoped></style>
