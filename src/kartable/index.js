import KartableBizCode from './partials/KartableBizCode'
import RequestNumberTemplate from './partials/RequestNumberTemplate'
import TaskStatusTemplate from './partials/TaskStatusTemplate'
import KartableStartDateTemplate from './partials/KartableStartDateTemplate'
import KartableTaskStartDateTimeTemplate from './partials/KartableTaskStartDateTimeTemplate'
import KartableRequestStartDateTimeTemplate from './partials/KartableRequestStartDateTimeTemplate'
import KartableCreatedByNameTemplate from './partials/KartableCreatedByNameTemplate'
import KartableAssingToUserNameTemplate from './partials/KartableAssingToUserNameTemplate'
import KartableTaskDescTemplate from './partials/KartableTaskDescTemplate'
import KartableImageTemplate from './partials/KartableImageTemplate'
import MentionCommentsTemplate from './partials/MentionCommentsTemplate'
import OwnerTaskDetailsTemplate from './partials/OwnerTaskDetailsTemplate'
import FinalConfirmLayer from './partials/FinalConfirmLayer'
import NewMapForm from './partials/NewMapForm'
import StatisticReports from './StatisticReports'
import Kartable from './KartableSwitcher'
import KartablePasokhgoo from './KartablePasokhgoo'
import TaskLauncher from './task/TaskLauncher'
import UIncomePayment from './task/UIncomePayment'
import UTechnicalStuff from './task/UTechnicalStuff'
import UArchive from './task/UArchive'

// ag-grid templates
import agTaskTitleTemplate from './kartabl-templates/agTaskTitleTemplate'
import agKartableImageTemplate from './kartabl-templates/agKartableImageTemplate'
import agOwnerTaskDetailsTemplate from './kartabl-templates/agOwnerTaskDetailsTemplate'
import agKartableRequestStartDateTemplate from './kartabl-templates/agKartableRequestStartDateTemplate'
import agKartableCreatedByNameTemplate from './kartabl-templates/agKartableCreatedByNameTemplate'
import agKartableAssingToUserNameTemplate from './kartabl-templates/agKartableAssingToUserNameTemplate'
import agRequestNumberTemplate from './kartabl-templates/agRequestNumberTemplate'
import agTaskStatusTemplate from './kartabl-templates/agTaskStatusTemplate'
import agKartableBizCode from './kartabl-templates/agKartableBizCode'
import agKartableBizCodeFilter from './kartabl-templates/agKartableBizCodeFilter'
import agKartableImageTemplate2 from './kartabl-templates/agKartableImageTemplate2'
import agKartableTaskStartDateTimeTemplate from './kartabl-templates/agKartableTaskStartDateTimeTemplate'
import agKartableRequestStartDateTimeTemplate from './kartabl-templates/agKartableRequestStartDateTimeTemplate'
import agKartableCreatedByNameTemplate2 from './kartabl-templates/agKartableCreatedByNameTemplate2'
import agKartableAssingToUserNameTemplate2 from './kartabl-templates/agKartableAssingToUserNameTemplate2'
import agKartableTaskDescTemplate from './kartabl-templates/agKartableTaskDescTemplate'
import agKartableTaskGroupTitel from './kartabl-templates/agKartableTaskGroupTitel'

import store from './store'
import responderStore from '../store/'
import * as taskServices from './services/task'
import * as kartableServices from './services/kartable'
import * as monitoringServices from './services/monitoring'
import './css/task.scss'

export default {
  install (Vue) {
    Vue.component('kartable', Kartable)
    Vue.component('KartablePasokhgoo', KartablePasokhgoo)
    Vue.component('StatisticReports', StatisticReports)
    Vue.component('task', TaskLauncher)

    Vue.component('kartable-bizcode-template', KartableBizCode)
    Vue.component('kartable-image-template', KartableImageTemplate)
    Vue.component('request-number-template', RequestNumberTemplate)
    Vue.component('task-status-template', TaskStatusTemplate)
    Vue.component('kartable-startdate-template', KartableStartDateTemplate)
    Vue.component('KartableTaskStartDateTimeTemplate', KartableTaskStartDateTimeTemplate)
    Vue.component('KartableRequestStartDateTimeTemplate', KartableRequestStartDateTimeTemplate)
    Vue.component('KartableCreatedByNameTemplate', KartableCreatedByNameTemplate)
    Vue.component('KartableAssingToUserNameTemplate', KartableAssingToUserNameTemplate)
    Vue.component('OwnerTaskDetailsTemplate', OwnerTaskDetailsTemplate)
    Vue.component('KartableTaskDescTemplate', KartableTaskDescTemplate)
    Vue.component('mention-comments-template', MentionCommentsTemplate)
    Vue.component('UIncomePayment', UIncomePayment)
    Vue.component('UTechnicalStuff', UTechnicalStuff)
    Vue.component('UArchive', UArchive)

    Vue.component('FinalConfirmLayer', FinalConfirmLayer)
    Vue.component('NewMapForm', NewMapForm)

    Vue.component('agTaskTitleTemplate', agTaskTitleTemplate)
    Vue.component('agKartableImageTemplate', agKartableImageTemplate)
    Vue.component('agOwnerTaskDetailsTemplate', agOwnerTaskDetailsTemplate)
    Vue.component('agKartableRequestStartDateTemplate', agKartableRequestStartDateTemplate)
    Vue.component('agKartableCreatedByNameTemplate', agKartableCreatedByNameTemplate)
    Vue.component('agKartableAssingToUserNameTemplate', agKartableAssingToUserNameTemplate)
    Vue.component('agRequestNumberTemplate', agRequestNumberTemplate)
    Vue.component('agTaskStatusTemplate', agTaskStatusTemplate)
    Vue.component('agKartableBizCode', agKartableBizCode)
    Vue.component('agKartableBizCodeFilter', agKartableBizCodeFilter)
    Vue.component('agKartableImageTemplate2', agKartableImageTemplate2)
    Vue.component('agKartableTaskStartDateTimeTemplate', agKartableTaskStartDateTimeTemplate)
    Vue.component('agKartableRequestStartDateTimeTemplate', agKartableRequestStartDateTimeTemplate)
    Vue.component('agKartableCreatedByNameTemplate2', agKartableCreatedByNameTemplate2)
    Vue.component('agKartableAssingToUserNameTemplate2', agKartableAssingToUserNameTemplate2)
    Vue.component('agKartableTaskDescTemplate', agKartableTaskDescTemplate)
    Vue.component('agKartableTaskGroupTitel', agKartableTaskGroupTitel)

    Vue.prototype.$stResponder = responderStore
    // window.$stResponder = responderStore
    Vue.prototype.$stKartable = store
    // window.$stKartable = store
    Vue.prototype.$srvWorkflow = { ...taskServices, ...kartableServices, ...monitoringServices }
    Vue.prototype.$hideArchive = function () {
      Vue.prototype.$window.close('ArchivePopup')
    }
    Vue.prototype.$showArchive = function ({ bizcode, title, width, height }) {
      // window.archiveStore.bizCode = bizcode
      const componentProps = {
        // eslint-disable-next-line no-undef
        name: window.getConfigValue('archiveCore').username,
        // eslint-disable-next-line no-undef
        pass: window.getConfigValue('archiveCore').password,
        userLoginId: Vue.prototype.$stSecurity.getters['authorize/userId'],
        userLoginName: Vue.prototype.$stSecurity.getters['authorize/username'],
        class: 'fit',
        bizCode: bizcode
      }
      Vue.prototype.$window.open({
        component: 'ArchiveWrap', // pre-registered vue component
        width: width || 1600,
        height: height || 800,
        minWidth: 1200,
        minHeight: 600,
        title,
        keepAlive: false,
        padding: true,
        componentProps,
        props: componentProps,
        id: 'ArchivePopup'
        // id: 'window1', // window id
        // title: 'پنجره تستی 1',
        // width: '800px',
        // height: '200px',
        // props: { a: 1 }
      })
    }

    Vue.prototype.handleMsg = function (res, defaultMsg = '') {
      let msg = defaultMsg
      console.log('handle msg', res)
      if (res.msg && res.msg !== 'Success') {
        msg = res.msg
      } else if (res.success) {
        msg = 'عملیات با موفقیت انجام شد.'
      } else if (!res.success) msg = 'عملیات به دلیل خطا در سرور متوقف شد.'

      if (msg.indexOf('این درخواست بنا به دلایل زیر قایل به ارسال نمی باشد') > -1) {
        // eslint-disable-next-line no-undef
        msg = msg.replace('این درخواست بنا به دلایل زیر قایل به ارسال نمی باشد', `<strong class="q-mb-sm">${window.getConfigValue('workflowNotSendMsgCaption') || 'این درخواست بنابه دلایل زیر قابل ارسال نمیباشد:'}</strong>`)
      }

      Vue.prototype.$q.dialog({
        html: true,
        title: 'پیغام',
        ok: {
          label: 'بستن'
        },
        persistent: false,
        cancel: false,
        message: (msg || defaultMsg).replace(/\n/g, '<br/>')
      })
    }
  }
}
