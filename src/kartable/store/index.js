import Vue from 'vue'
import Vuex from 'vuex'
// grid config modules
import kartable from './kartable'
import formSettings from './formSettings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    kartable,
    formSettings
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: false // process.env.DEV,
})
