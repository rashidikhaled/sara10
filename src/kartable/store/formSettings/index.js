import { getFormValue, saveForm } from '../../services/task'
import { getStore } from 'ui-security'
import { colord } from 'colord'
import { decode, encode, isValid } from 'js-base64'

export default {
  namespaced: true,
  state: {
    primaryColor: null, settings: {}, commissionSettings: {}, nosaziSettings: {}
  },
  getters: {
    primaryColor: state => state.primaryColor && state.primaryColor.baseColor,
    textColor: state => (state.primaryColor && state.primaryColor.textColor) || 'white',
    primaryGradientColor: state => (state.primaryColor && state.primaryColor.gradient) || state.primaryColor.baseColor,
    primaryColorLighten: (state, getters) => colord(getters.primaryColor).lighten(0.1).toHex(),
    primaryColorDarken: (state, getters) => colord(getters.primaryColor).darken(0.05).toHex(),
    settings: state => key => state.settings[key] || []
  },
  mutations: {
    saveSettings (state, { key, value }) {
      if (key === 'primaryColor') {
        if (typeof value === 'string') {
          state.primaryColor = { baseColor: value, gradient: '', textColor: 'white' }
        } else if (typeof value === 'object') {
          state.primaryColor = { baseColor: value.baseColor, gradient: value.gradient, textColor: value.textColor }
        }
      } else if (key === 'commissionSettings') {
        state.commissionSettings = value
      } else {
        state.settings[key] = value
      }
    }
  },
  actions: {
    async saveSettings ({ commit }, { key, value, nidProc = '' }) {
      return new Promise(async (resolve, reject) => {
        try {
          const securityStore = getStore()
          const result = await saveForm({
            FormName: key,
            NidProc: nidProc || securityStore.getters['authorize/user'].NidUser,
            PayLoad:
              window.getConfigValue('security.settingPayloadBase64', true)
                ? encode(JSON.stringify(value))
                : JSON.stringify(value)
          })
          if (result.data.success) {
            commit('saveSettings', { key, value })
            resolve({ ...result.data, value })
          } else {
            reject(new Error(result.data.msg))
          }
        } catch (ex) {
          reject(ex)
        }
      })
    },
    async getSettings ({ state, commit }, { key, nidProc = '', useCache = false, defaultValue }) {
      return new Promise(async (resolve, reject) => {
        let oldValue = null
        if (key === 'primaryColor') {
          oldValue = state.primaryColor
        } else {
          oldValue = state.settings[key]
        }
        if (useCache && (typeof oldValue !== 'boolean' && oldValue)) {
          return resolve(oldValue)
        } else {
          const securityStore = getStore()
          const { data } = await getFormValue({
            FormName: key, NidProc: nidProc || securityStore.getters['authorize/user'].NidUser
          })
          const hasValue = !!(data?.data?.PayLoad)
          let value = defaultValue
          if (hasValue && isValid(data.data.PayLoad)) {
            value = JSON.parse(decode(data.data.PayLoad))
          } else if (hasValue) {
            value = JSON.parse(data.data.PayLoad)
          }
          // console.log('---------------------- hasValue', hasValue, value)
          commit('saveSettings', { key, value })
          return resolve(value)
        }
      })
    }
  }
}
