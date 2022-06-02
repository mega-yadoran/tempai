import { Plugin } from '@nuxt/types'

const plugin: Plugin = (context, inject) => {

  const isSP = () => {
    return context.$vuetify.breakpoint.name === 'xs';
  }
  inject('isSP', isSP)
}
export default plugin