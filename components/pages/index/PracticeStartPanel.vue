<template>
  <v-card class="px-3 px-sm-8 py-3 py-sm-6 text-center">
    <div class="text-h5">練習モード</div>

    <v-divider class="my-3" />

    <!-- ルール -->
    <ul class="text-left mt-2">
      <li class="my-2">
        清一色のテンパイ形が表示されるので、何待ちか当ててください
      </li>
      <li class="my-2">正解するまで何度でも回答できます</li>
      <li class="my-2">
        どうしてもわからないときは
        <v-btn color="error" x-small><v-icon small>mdi-flag</v-icon></v-btn>
        を押すと答えを見ることができます
      </li>
      <li class="my-2">無限に問題が続くので、気が済むまで練習してください！</li>
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
