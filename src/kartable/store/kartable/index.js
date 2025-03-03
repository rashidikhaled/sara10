import { convertStringToNosaziCodeObject } from "../../utils/nosaziCodeOperation"

export default {
  namespaced: false,

  state: {
    kartableState: {},
    filter: null,
    selectedNidTask: "",
    selectedDistrict: 1,
    selectedRequestPasokhgo: null,
    selectedNidEngineer: null,
    selectedRequest: null
  },

  getters: {
    selectedNidTask: (state) => state.selectedNidTask,
    kartableState: (state) => state.kartableState,
    selectedRequestPasokhgo: (state) => state.selectedRequestPasokhgo,
    selectedNidEngineer: (state) => state.selectedNidEngineer,
    selectedDistrict: (state) => state.selectedDistrict,
    filter: (state) => state.filter,
    selectedRequest: (state) => state.selectedRequest
  },

  mutations: {
    setSelectedNidTask (state, payload) {
      state.selectedNidTask = payload
    },
    setSelectedRequestPasokhgo (state, payload) {
      state.selectedRequestPasokhgo = payload
    },
    setSelectedNidEngineer (state, payload) {
      state.selectedNidEngineer = payload
    },
    setKartableState (state, payload) {
      state.kartableState = payload
    },
    setFilter (state, payload) {
      state.filter = payload
    },
    setSelectedRequest (state, payload) {
      const d = convertStringToNosaziCodeObject(payload.BizCode).District
      const District =
        payload && payload.BizCode
          ? d === 0 ? 1 : d
          : 1
      // console.log('setSelectedRequest', District)
      state.selectedRequest = payload
      state.selectedDistrict = District
    }
  },

  actions: {
    clearKartableState ({ commit }) {
      commit("setKartableState", {})
    },
    setSelectedNidTask ({ commit }, payload) {
      commit("setSelectedNidTask", payload)
    },
    setFilter ({ commit }, payload) {
      commit("setFilter", payload)
    },
    setKartableState ({ commit }, payload) {
      commit("setKartableState", payload)
    },
    /** *********** */
    setSelectedRequestPasokhgo ({ commit, state }, payload) {
      commit("setSelectedRequestPasokhgo", payload)
    },
    setSelectedNidEngineer ({ commit, state }, payload) {
      commit("setSelectedNidEngineer", payload)
    },
    clearSelectedRequestPasokhgo ({ commit }) {
      commit("setSelectedRequestPasokhgo", null)
    },
    setSelectedRequest ({ commit }, payload) {
      commit("setSelectedRequest", payload)
    }
  }
}
