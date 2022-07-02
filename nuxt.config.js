import colors from 'vuetify/es5/util/colors';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: '清一色待ち当て特訓',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '麻雀の清一色の待ち牌を当てるゲーム',
      },
      { name: 'format-detection', content: 'telephone=no' },

      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: '清一色待ち当て特訓',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://chin-itsu.mega-yadoran.jp',
      },
      { hid: 'og:title', property: 'og:title', content: '清一色待ち当て特訓' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '麻雀の清一色の待ち牌を当てるゲーム',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://chin-itsu.mega-yadoran.jp/logo.png',
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@giga_yadoran' },
      {
        name: 'twitter:description',
        content: '麻雀の清一色の待ち牌を当てるゲーム',
      },
      { name: 'twitter:title', content: '清一色待ち当て特訓' },
      {
        name: 'twitter:image',
        content: 'https://chin-itsu.mega-yadoran.jp/logo.png',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/common', '@/plugins/composition-api'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '@/components/',
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    ['@nuxt/typescript-build', { typeCheck: false }],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
    'unplugin-vue2-script-setup/nuxt',
    'nuxt-typed-vuex',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      babelrc: false,
      compact: false,
    },
    transpile: [/typed-vuex/],
  },
};
