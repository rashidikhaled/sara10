import Vue from 'vue'
import Vuex from 'vuex'
import responder from './Responder'
import ui from './ui'
import engineer from './engineer'
import engineerOperation from 'src/forms/engineers-operation/store/engineerOperation'
import commission from 'src/forms/commission-menu/store/commissionStore'
import commission77 from 'src/forms/commission77-menu/store/commission77store'
import formLauncher from './formLauncher'
import map from './map'
import archiveApi from './archive-api'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    responder,
    ui,
    engineer,
    engineerOperation,
    commission,
    formLauncher,
    commission77,
    map,
    archiveApi
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: false // process.env.DEV,
})
