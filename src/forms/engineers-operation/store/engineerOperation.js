import { getKartablBuildingExecRep, getEngineersReports } from 'src/services/eng'
import { getStore } from 'ui-security'

export default {
  namespaced: true,

  state: {
    kartableRows: [],
    reports: [],
    rowKey: 'NidRef',
    selectedExecRep: null
  },

  getters: {
    kartableRows: (state) => state.kartableRows,
    reports: (state) => state.reports,
    rowKey: (state) => state.rowKey,
    selectedExecRep: (state) => state.selectedExecRep
  },

  mutations: {
    setKartableValue (state, rows) {
      state.kartableRows = rows.map((row, rowNumber) =>
        Object.freeze({ ...row, rowNumber: rowNumber + 1 })
      )
    },
    setEngineersReports (state, reports) {
      state.reports = reports
    },

    setSelectedExecRep (state, payload) {
      state.selectedExecRep = payload
    }
  },

  actions: {
    async fetchEngineersReports (
      { commit }
    ) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await getEngineersReports()
          commit(
            'setEngineersReports',
            data.GetEngineersReportsResult?.EngineersReports?.Reports || null
          )
          return resolve(
            data.GetEngineersReportsResult?.EngineersReports?.Reports || null
          )
        } catch (ex) {
          return reject(ex)
        }
      })
    },
    async fetchKartableRows (
      { commit },
      {
        // eslint-disable-next-line camelcase
        CI_Years: pCI_Year,
        NidWorkitem: pNidWorkItem,
        isShowConfirmed: pShowConfirmed
      }
    ) {
      return new Promise(async (resolve, reject) => {
        try {
          const store = getStore()
          const { data } = await getKartablBuildingExecRep({
            pCI_Year,
            pNidEngineer: store.getters['authorize/userId'],
            pNidWorkItem,
            pShowConfirmed
          })
          commit(
            'setKartableValue',
            data.GetKartabl_BuildingExecRepResult.Kartabl_BuildingExecRep
          )
          return resolve(
            data.GetKartabl_BuildingExecRepResult.Kartabl_BuildingExecRep
          )
        } catch (ex) {
          return reject(ex)
        }
      })
    },

    setSelectedExecRep ({ commit, state }, payload) {
      commit('setSelectedExecRep', payload)
    }
  }
}
