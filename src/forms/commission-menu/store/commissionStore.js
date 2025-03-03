import { getKartabl, getCommissionInfoByNidProcAhkam } from 'src/services/commissions'
import { getStore } from 'ui-security'

// eslint-disable-next-line no-unused-vars
function findRowIndex (state, rowId) {
  const rkey = state.kartableRowKey
  const index = state.kartableRows.findIndex(
    (row) => row[rkey].toLowerCase() === rowId.toLowerCase()
  )
  return index
}

export default {
  namespaced: true,
  state: {
    kartableRows: [],
    kartableFilters: [],
    loginHistoryUser: [],
    kartableRowKey: 'NidCommission',
    checkedIds: [],
    selectedRows: [],
    checkedMode: 'multiple', // single, multiple
    expandedIds: [],
    expandMode: 'multiple', // single, multiple
    selectedCommission: null,
    IsKartab: true // طیق زمل مهم قابلیت این وجود دارد هم سلکت کارتابل و هم سلکت کارتابل پاسخگو فرم را لود کنم اما بعضی جا ها بیزینس متفاوتی داره مثل فرم صدور رای و کارشناسی
  },
  getters: {
    kartableRows: (state) => {
      /* return state.kartableRows.map(row => ({
        ...row,
        isChecked: state.checkedIds.includes(row[state.kartableRowKey]),
        isExpanded: state.expandedIds.includes(row[state.kartableRowKey]),
      })) */
      return state.kartableRows
    },
    /* kartableRowsByIds: (state, getters) => {
      return getters.kartableRows.reduce((out, item) => {
        out[item[getters.RowKey]] = Object.freeze(item)
        return out
      }, {})
    }, */
    // selectedItems: (state, getters) => state.kartableRows.filter(row => getters.selectedIds.includes(row.NidCommission)),
    selectedItems: (state) => state.selectedRows,
    kartableFilters: (state) => state.kartableFilters,
    getLoginHistoryUser: (state) => state.loginHistoryUser,
    RowKey: (state) => state.kartableRowKey,
    IsMainCommissionKartab: (state) => state.IsKartab,
    selectedIds: (state) => state.checkedIds || [],
    expandedIds: (state) => state.expandedIds || [],
    selectedCommission: (state) => state.selectedCommission,
    selectedNidProc: (state) => state.selectedCommission.NidProc || "00000000-0000-0000-0000-000000000000"
  },
  mutations: {
    setKartableValue (state, rows) {
      state.kartableRows = rows.map((row, rownumber) =>
        Object.freeze({ ...row, rownumber: rownumber + 1 })
      )
    },
    setKartableFilters (state, rows) {
      state.kartableFilters = rows
    },
    setCheckedRow (state, payLoad) {
      state.checkedIds = payLoad
    },
    setSelectedRows (state, payLoad) {
      state.selectedRows = payLoad
    },
    setloginHistoryUser (state, payLoad) {
      state.loginHistoryUser = payLoad
    },
    // setCheckedRow (state, { id, isChecked }) {
    //   const index = state.checkedIds.indexOf(id)
    //   if (isChecked && index === -1) {
    //     state.checkedIds.push(id)
    //   } else if (!isChecked && index !== -1) {
    //     state.checkedIds.splice(index, 1)
    //   }
    // },

    toggleCheckedRow (state, id) {
      this.commit('setCheckedRow', {
        id,
        isChecked: state.checkedIds.indexOf(id) === -1
      })
    },
    setExpandedRow (state, { id, isExpanded }) {
      if (state.expandMode === 'single') {
        state.expandedIds.length = 0
      }
      const index = state.expandedIds.indexOf(id)
      if (isExpanded && index === -1) {
        state.expandedIds.push(id)
      } else if (!isExpanded && index !== -1) {
        state.expandedIds.splice(index, 1)
      }
    },
    setIsMainCommissionKartab (state, payload) {
      state.IsKartab = payload
    },
    setSelectedCommission (state, payload) {
      state.selectedCommission = payload
    },
    toggleExpandedRow (state, id) {
      this.commit('setExpandedRow', {
        id,
        isExpanded: state.expandedIds.indexOf(id) === -1
      })
    }
  },
  actions: {
    async fetchKartableRows ({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          const store = getStore()
          const { data } = await getKartabl({
            From: 0,
            To: 10000,
            UserID: store.getters['authorize/userId'],
            // eslint-disable-next-line no-undef
            UseGharar: window.getConfigValue('esupParams')?.UseGhararKartabl || false
          })
          // debugger
          let rows = data?.GetKartablResult.map((row, _i) => {
            return {
              ...row,
              isSelected: false,
              Commission: (row.NidTask.toUpperCase() === "8393710A-28D0-45DA-9BFE-95DA0B0049E2" || row.NidTask.toUpperCase === "0793E947-E107-41F3-BDA0-AAC41EE6735D") ? "" : row.Commission
            }
          }) || []
          commit('setKartableValue', rows)
          if (state.IsKartab) {
            commit("setSelectedCommission", rows.find(e => e.NidCommission === state.selectedCommission?.NidCommission) || null)
          }
          // commit("setSelectedCommission", null)
          return resolve(rows)
        } catch (ex) {
          return reject(ex)
        }
      })
    },
    async fetchCommissionInfoByNidProcAhkam ({ commit, getters }) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await getCommissionInfoByNidProcAhkam({
            PRequest: {
              NidProcAhkam: getters["selectedNidProc"]
            }
          })
          return resolve(data)
        } catch (ex) {
          return reject(ex)
        }
      })
    },
    setKartableFilters ({ commit }, payload) {
      commit('setKartableFilters', payload)
    },
    setIsMainCommissionKartab ({ commit }, payload) {
      commit('setIsMainCommissionKartab', payload)
    },
    markAsSelect ({ commit }, id) {
      commit('setCheckedRow', { id, isChecked: true })
    },
    markAsUnSelect ({ commit }, id) {
      commit('setCheckedRow', { id, isChecked: false })
    },

    // setCheckedRow ({ commit }, { id, isChecked }) {
    //   commit('setCheckedRow', { id, isChecked })
    // },
    setCheckedRow ({ commit }, payLoad) {
      commit('setCheckedRow', payLoad)
    },
    setSelectedRows ({ commit }, payLoad) {
      commit('setSelectedRows', payLoad)
    },
    setloginHistoryUser ({ commit }, payLoad) {
      commit('setloginHistoryUser', payLoad)
    },
    expandRow ({ commit }, id) {
      commit('setExpandedRow', { id, isExpanded: true })
    },
    collapseRow ({ commit }, id) {
      commit('setExpandedRow', { id, isExpanded: false })
    },
    setExpandedRow ({ commit }, { id, isExpanded }) {
      commit('setExpandedRow', { id, isExpanded })
    },
    setSelectedCommission ({ commit, state }, payload) {
      commit('setSelectedCommission', payload)
    }
  }
}
