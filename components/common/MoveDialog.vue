<template>
  <v-dialog
    v-model="_open"
    hide-overlay
    transition="fade-transition"
    width="320"
  >
    <v-card color="white" outlined class="px-3 px-md-4 py-6 text-center">
      <!-- 閉じるボタン -->
      <v-btn absolute icon top right @click="_open = false"
        ><v-icon>mdi-close</v-icon></v-btn
      >

      <div class="my-8 text-h6">
        プレイ中のゲームを終了してモードを切り替えますか？
      </div>

      <v-row justify="center">
        <!-- キャンセルボタン -->
        <v-col cols="5">
          <v-btn
            color="grey darken-2"
            dark
            class="my-auto"
            @click="_open = false"
          >
            <span class="text-button">キャンセル </span>
          </v-btn>
        </v-col>

        <!-- 切替えるボタン -->
        <v-col cols="5">
          <v-btn color="red" dark class="my-auto" @click="move"
            ><span class="text-button">切り替える</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from '@vue/composition-api';

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void;
  (e: 'move'): void;
  (e: 'cancel'): void;
}>();

const _open = computed({
  get: () => props.open,
  set: (val: boolean) => {
    if (!val) {
      emit('cancel');
    }
    emit('update:open', val);
  },
});

const move = () => {
  _open.value = false;
  emit('move');
};
</script>
