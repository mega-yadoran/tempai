<template>
  <div class="text-center">
    <div class="my-2 text-h4">何待ち？</div>
    <Question type="man" :tiles="[1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9]" />

    <v-divider class="my-4" />

    <div>答えの牌を選んでください</div>
    <div>↓↓</div>

    <AnswerForm type="man" class="my-4" />

    <v-btn color="primary" class="font-weight-bold">決定</v-btn>
    <!-- <v-btn color="red lighten-2" dark small>
      <v-icon small>mdi-flag</v-icon>
    </v-btn> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
