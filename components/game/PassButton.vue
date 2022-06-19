<template>
  <div>
    <v-btn small class="ml-2 ml-sm-6" @click="open = !props.disabled">
      <span class="font-weight-bold">パス</span>
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

        <div class="mt-8 text-h6">問題をパスしますか？</div>
        <div class="mb-8">(残り時間が10秒減ります)</div>

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

          <!-- パスボタン -->
          <v-col cols="5">
            <v-btn color="red" dark class="my-auto px-8" @click="oPassButton"
              ><span class="font-weight-bold">パス </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/composition-api';

const props = defineProps<{
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: 'pass'): void;
}>();

const open = ref(false);

const oPassButton = () => {
  open.value = false;
  emit('pass');
};
</script>
