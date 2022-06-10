<template>
  <v-app>
    <v-toolbar
      color="grey lighten-3"
      flat
      :height="$isSP() ? '45' : '60'"
      extension-height="35"
    >
      <v-container class="d-flex align-center px-0">
        <v-btn icon small @click="howToModalOpen = true">
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
        <v-spacer />

        <span class="text-h6 text-sm-h4">清一色 待ち当て</span>
        <v-spacer></v-spacer>
        <v-btn icon small class="mr-md-2" @click="settingModalOpen = true">
          <v-icon>mdi-cog-outline</v-icon>
        </v-btn>
        <v-btn icon small @click="statisticsModalOpen = true">
          <v-icon>mdi-account</v-icon>
        </v-btn>
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
const tabItems = [
  { href: '/', label: '練習' },
  { href: '/challenge', label: 'チャレンジ' },
];
</script>

<style lang="scss" scoped>
.container {
  @media (min-width: 550px) {
    width: 530px;
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
