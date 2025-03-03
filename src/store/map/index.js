export default {
  namespaced: true,
  state: {
    lastLocation: {
      NidLayer: null,
      Items: []
    }
  },
  getters: {
    lastLocation: state => ({
      Code: state.lastLocation.Items && state.lastLocation.Items.length > 0 ? state.lastLocation.Items[0].Code : '',
      NidLayer: state.lastLocation.NidLayer,
      Items: state.lastLocation.Items
    }),
    currentCode: (state, getters) => getters['lastLocation']?.Code ?? null
  },
  mutations: {
    setLocation (state, value) {
      state.lastLocation = { ...value }
    }
  },
  actions: {
    setLocation ({ commit }, { NidLayer, Items }) {
      commit('setLocation', { NidLayer, Items })
    }
  }
}
