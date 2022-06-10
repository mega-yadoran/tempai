<template>
  <v-app>
    <v-toolbar
      color="grey lighten-3"
      flat
      :height="$isSP() ? '45' : '60'"
      extension-height="35"
    >
      <v-container class="text-center px-0">
        <div class="text-h6 text-sm-h4">清一色待ち当て特訓</div>
      </v-container>
      <template #extension>
        <v-tabs centered height="30px">
          <v-tabs-slider color="grey darken-3"></v-tabs-slider>
          <v-tab v-for="item in tabItems" :key="item.href" :to="item.href">
            {{ item.label }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-container>
      <nuxt class="mb-8" />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/composition-api';

const tabItems = [
  { href: '/', label: '練習' },
  { href: '/challenge', label: 'チャレンジ' },
];

onMounted(() => {
  // ダブルタップでの拡大を防止
  document.addEventListener(
    'dblclick',
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );
});
</script>

<style lang="scss" scoped>
.container {
  @media (min-width: 600px) {
    width: 580px;
  }
  .v-btn--active::before {
    display: none;
  }
}

.v-toolbar {
  flex: none;
}
.v-tab.v-tab {
  color: black;
}
</style>
