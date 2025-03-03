export default {
  namespaced: true,
  state: {
    allNidRequest: [],
    selectedCommission: null,
    selectedNidRequest: null
  },
  getters: {
    selectedCommission: (state) => state.selectedCommission,
    selectedNidRequest: (state) => state.selectedCommission.NidRequest || "00000000-0000-0000-0000-000000000000",
    selectedAllNidRequest: (state) => state.allNidRequest || []
  },
  mutations: {
    setSelectedCommission77 (state, payload) {
      state.selectedCommission = payload
    },
    setSelectedNidRequest (state, payload) {
      state.selectedNidRequest = payload
    },
    setSelectedAllNidRequest (state, payload) {
      state.allNidRequest = payload
    }
  },
  actions: {
    setSelectedAllNidRequest ({ commit }, payLoad) {
      commit('setSelectedAllNidRequest', payLoad)
    },
    setSelectedCommission77 ({ commit }, payload) {
      commit('setSelectedCommission77', payload)
    }
  }
}
