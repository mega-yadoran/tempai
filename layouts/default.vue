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
        <v-tabs v-model="activeTab" centered height="30px">
          <v-tabs-slider color="grey darken-3"></v-tabs-slider>
          <v-tab
            v-for="item in tabItems"
            :key="item.id"
            @click="checkMove(item.id)"
          >
            {{ item.label }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-container>
      <nuxt class="mb-8" />
      <MoveDialog
        :open.sync="openMoveDialog"
        @cancel="resetTabSelect"
        @move="move"
      />
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { useContext, useRouter, useRoute } from '@nuxtjs/composition-api';
import { onMounted, ref } from '@vue/composition-api';

const route = useRoute();
const router = useRouter();
const context = useContext();
const tabItems = [
  { id: 0, href: '/', label: 'チャレンジ' },
  { id: 1, href: '/practice', label: '練習' },
];
const activeTab = ref(
  tabItems.find((t) => t.href === route.value.path)?.id ?? 0
);
const currentTabId = ref(activeTab.value);
const destinationTabId = ref(0);
const openMoveDialog = ref(false);

const checkMove = (tabId: number) => {
  currentTabId.value =
    tabItems.find((t) => t.href === route.value.path)?.id ?? 0;
  if (currentTabId.value !== tabId) {
    destinationTabId.value = tabId;
    if (context.app.$accessor.game.isPlaying) {
      openMoveDialog.value = true;
    } else {
      move();
    }
  }
};

const resetTabSelect = () => {
  activeTab.value = currentTabId.value;
};

const move = () => {
  context.app.$accessor.game.setIsPlaying(false);
  currentTabId.value = destinationTabId.value;
  activeTab.value = currentTabId.value;
  router.push(
    tabItems.find((t) => t.id === destinationTabId.value)?.href ?? '/'
  );
};

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
