<template>
  <v-dialog
    v-model="_open"
    hide-overlay
    transition="fade-transition"
    :width="$isSP() ? '240' : '300'"
  >
    <v-card color="red" dark class="pa-3 pa-md-4 text-center">
      <div class="text-body-1 text-md-h5 font-weight-bold">{{ text }}</div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, watchEffect } from '@vue/composition-api';
const props = defineProps<{
  open: boolean;
  text: string;
}>();

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void;
}>();

const _open = computed({
  get: () => props.open,
  set: (val: boolean) => {
    emit('update:open', val);
  },
});

watchEffect(() => {
  if (_open.value) {
    // 1秒後に自動で閉じる
    setTimeout(() => {
      _open.value = false;
    }, 1000);
  }
});
</script>
