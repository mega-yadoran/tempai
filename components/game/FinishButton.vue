<template>
  <div>
    <v-btn color="error" class="font-weight-bold" @click="open = true">
      終了
    </v-btn>

    <v-dialog
      v-model="open"
      hide-overlay
      transition="fade-transition"
      width="320"
    >
      <v-card color="white" outlined class="px-3 px-md-4 py-6 text-center">
        <!-- 閉じるボタン -->
        <v-btn absolute icon top right @click="open = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >

        <div class="my-8 text-h6">終了して結果を表示しますか？</div>

        <v-row justify="center">
          <!-- キャンセルボタン -->
          <v-col cols="5">
            <v-btn
              color="grey darken-2"
              dark
              class="my-auto"
              @click="open = false"
            >
              <span class="text-button">キャンセル </span>
            </v-btn>
          </v-col>

          <!-- 降参ボタン -->
          <v-col cols="5">
            <v-btn
              width="100"
              color="red"
              dark
              class="my-auto"
              @click="onFinishButton"
              ><span class="text-button">終了 </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/composition-api';

const open = ref(false);

const emit = defineEmits<{
  (e: 'finish'): void;
}>();

const onFinishButton = () => {
  open.value = false;
  emit('finish');
};
</script>
