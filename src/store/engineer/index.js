import { getFilInfoWithNidProc } from 'src/services/engineers'

export default {
  namespaced: true,
  state: {
    nidFils: {},
    lastRequest: null
  },
  getters: {
    nidFils: state => state.nidFils,
    lastRequest: state => state.lastRequest
  },
  mutations: {
    setNidFil (state, payload) {
      if (!payload || typeof payload !== 'object') return
      state.nidFils = payload
    },
    removeNidFil (state, key) {
      if (!key || !state[key]) return
      delete state[key]
    },
    selectRequest (state, payload) {
      state.lastRequest = payload
    }
  },
  actions: {
    setNidFil ({ commit }, payload) {
      commit('setNidFil', payload)
    },
    selectRequest ({ commit }, payload) {
      // console.log('engineer selected request', payload)
      commit('selectRequest', payload)
    },
    removeNidFil ({ commit }, key) {
      commit('removeNidFil', key)
    },
    async getNidFil ({ commit, state }, { key, request }) {
      return new Promise(async (resolve, reject) => {
        const exist = state.nidFils[key]
        if (exist) return resolve(exist)
        try {
          const { data } = await getFilInfoWithNidProc({
            pRequest: request
          })

          const nidproc = request.NidProc
          const nidfil = data.GetFil_InfoWithNidProcResult && data.GetFil_InfoWithNidProcResult.fil_Info.NIdFil
          // console.log('@getFilInfoWithNidProc', nidfil, 'nidproc', nidproc)
          if (nidfil === '00000000-0000-0000-0000-000000000000') {
            commit('removeNidFil', nidproc)
            resolve({
              nidfil: null
            })
          } else {
            commit('setNidFil', {
              key: nidproc,
              value: nidfil
            })
            return resolve({
              nidfil
            })
          }
        } catch (ex) {
          return reject(ex)
        }
      })
    }
  }
}
