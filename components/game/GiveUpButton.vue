<template>
  <div>
    <v-btn
      color="error"
      small
      class="ml-2 ml-sm-6"
      @click="open = !props.disabled"
    >
      <v-icon small>mdi-flag</v-icon>
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

        <div class="my-8 text-h6">降参して答えを見ますか？</div>

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
            <v-btn color="red" dark class="my-auto" @click="onGiveUpButton">
              <v-icon class="mr-2">mdi-flag-variant</v-icon
              ><span class="text-button">降参 </span>
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
  (e: 'give-up'): void;
}>();

const open = ref(false);

const onGiveUpButton = () => {
  open.value = false;
  emit('give-up');
};
</script>
