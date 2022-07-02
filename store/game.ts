import { getterTree, mutationTree } from 'typed-vuex'

export const state = () => ({
  isPlaying: false
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  isPlaying: state => state.isPlaying,
})

export const mutations = mutationTree(state, {
  setIsPlaying(state, isPlaying: boolean): void {
    state.isPlaying = isPlaying
  }
})
