<template>
  <v-btn
    color="blue"
    dark
    class="my-3"
    target="_blank"
    width="120"
    :href="tweetHref"
  >
    <v-icon class="mr-2">mdi-twitter</v-icon
    ><span class="text-button">TWEET</span>
  </v-btn>
</template>

<script setup lang="ts">
import { computed } from '@vue/composition-api';

const props = defineProps<{
  shareText: string;
}>();
const tweetHref = computed(() => {
  const newLine = '%0D%0A';
  return `https://twitter.com/intent/tweet?text=${props.shareText}${newLine}chin-itsu.mega-yadoran.jp/${newLine}&hashtags=清一色待ち当て特訓`;
});
</script>
