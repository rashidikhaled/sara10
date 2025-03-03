import './css/monitoring.scss'
import Monitoring from './Monitoring'

import Avatar from './monitoring-templates/Avatar'
// ag-grid templates
import AgMapActionTypeTemplate from './monitoring-templates/AgMapActionTypeTemplate'
import AgCallbackBtn from './monitoring-templates/AgCallbackBtn'
import AgAvatarGridTemplate from './monitoring-templates/AgAvatarGridTemplate'

export default {
  install (Vue) {
    Vue.component('monitoring', Monitoring)

    Vue.component('Avatar', Avatar)
    // ag-grid templates
    Vue.component('AgMapActionTypeTemplate', AgMapActionTypeTemplate)
    Vue.component('AgCallbackBtn', AgCallbackBtn)
    Vue.component('AgAvatarGridTemplate', AgAvatarGridTemplate)
  }
}
