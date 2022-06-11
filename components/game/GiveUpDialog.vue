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

      <div class="my-8 text-h6">降参して答えを見ますか？</div>

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

        <!-- 降参ボタン -->
        <v-col cols="5">
          <v-btn color="red" dark class="my-auto" @click="onGiveUpButton">
            <v-icon class="mr-2">mdi-flag-variant</v-icon
            ><span class="text-button">降参 </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from '@vue/composition-api';

const props = defineProps<{ open: boolean }>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'give-up'): void;
}>();

const _open = computed({
  get: () => props.open,
  set: (val) => {
    emit('update:open', val);
  },
});
const onGiveUpButton = () => {
  _open.value = false;
  emit('give-up');
};
</script>
