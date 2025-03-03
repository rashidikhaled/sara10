// import ResponseParser from 'src/utils/responseParser'
import loaderMixin from './loaderMixin'
import formLauncherMixin from 'src/mixins/formLauncherMixin'
import { createRevisitTree, createTree } from 'src/utils/nosaziCodeOperation' // convertStringToNosaziCodeObject
import logMixin from './logMixin.js'
import ResponseParser from 'src/utils/responseParser'

import { debounce } from 'quasar'

const SECTIONS = ['District', 'Region', 'Block', 'House', 'Building', 'Apartment', 'Shop']
const defaultCode = {
  District: 0, Region: 0, Block: 0, House: 0, Building: 0, Apartment: 0, Shop: 0
}
const defaultCodeString = '0-0-0-0-0-0-0'

export default {
  root: true,
  mixins: [loaderMixin, logMixin, formLauncherMixin],
  data () {
    return {
      isEditable: false, lastDistrict: null
    }
  },
  props: {
    taskInfo: Object,
    forceReadonly: Boolean,
    isSelectFromMenu: {
      type: Boolean, default: true
    },
    isSelectFromWorkflow: Boolean,
    isSelectFromResponder: Boolean,
    isSelectFromGardeshParvandeh: {
      type: Boolean, default: false
    },
    defaultMode: String
  },
  watch: {
    isEditable () {
      if (this.forceReadonly) {
        this.isEditable = false
      }
    },
    forceReadonly () {
      if (this.forceReadonly) {
        this.isEditable = false
      }
    },
    selectedDistrict: {
      handler: debounce(function (newVal) {
        // console.log('watch:::selectedDistrict', newVal, oldVal, this.lastDistrict)
        if (this.lastDistrict !== newVal) {
          this.lastDistrict = newVal
          this.$root.$emit('update:district', newVal)
        }
      }, 10)
    }
    // taskInfo () {
    //   console.log('watch::taskInfo', this.taskInfo)
    // },
    // selectedRequest () {
    //   console.log('watch::selectedRequest', this.selectedRequest)
    // }
  },
  computed: {
    isMamoorBazdid () {
      const ids = window.getConfigValue('MamoorBazdid.groupsId', [])
      return this.currentUser.UserGroups.some(group => ids.includes(group.GroupGuid))
    },
    getApplicationParam () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('esupParams') || {}
    },
    selectedNidTask () {
      return this.$stKartable.getters['selectedNidTask'] || null
    },
    selectedNidProc () {
      return this.selectedRequest && this.selectedRequest.NidProc
    },
    selectedNidFill () {
      return (this.$stKartable.getters['selectedRequestPasokhgo'] && this.$stKartable.getters['selectedRequestPasokhgo'].NIdFil) || null // '262044cf-32a6-40af-84a6-38a74b6ddc45'
      // return null
    },
    selectedNidEngineer () {
      return (this.$stKartable.getters['selectedNidEngineer'] && this.$stKartable.getters['selectedNidEngineer'].NIdEng) || null // '3201d314-45ad-4bc7-85db-b8334d5553f7'
    }, /*
    currentUser () {
      let loggerUser = this.$stSecurity.getters['authorize/loggedUser'] || {}
      return loggerUser
    },
    isAuthenticated () {
      return this.$stSecurity.getters['authorize/isAuthenticated'] || false
    }, */
    selectedRequest () {
      return this.taskInfo || this.$stKartable.getters['selectedRequest']
    },
    mode () {
      return this.isEditable ? 'e' : 'r'
    },
    selectedDistrict () {
      // if (this.taskInfo) {
      //   return this.taskInfo && this.taskInfo.BizCode ? convertStringToNosaziCodeObject(this.taskInfo.BizCode).District : 1
      // }
      return this.$stKartable.getters['selectedDistrict']
    },
    selectedNosaziCode () {
      const {
        BizCode, NosaziCode
      } = this.selectedRequest || {}
      if (BizCode || NosaziCode) {
        return this.convertToNosaziCodeObject(BizCode || NosaziCode)
      }
      return null
    }
  },
  methods: {
    async loadFormSetting (key, {
      nidProc = '', useCache = false, defaultValue
    } = {}) {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch('formSettings/getSettings', {
          key: key, defaultValue, nidProc, useCache
        })
        return settings
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      } finally {
        this.loading = false
      }
    },
    async saveFormSetting (key, value, {
      nidProc = ''
    } = {}) {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch('formSettings/saveSettings', {
          key: key, value, nidProc
        })
        return settings
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      } finally {
        this.loading = false
      }
    },
    logout (force = false) {
      const handler = () => {
        this.$securityEvents.$emit('logout')
      }
      if (force) handler()
      this.showConfirm('آیا مایل خروج از سیستم هستید؟', {
        ok: {
          label: 'بله'
        },
        cancel: {
          label: 'خیر', outline: true, color: 'grey-7'
        }
      }).onOk(handler)
    }, /* getNidUser () {
      const user = this.currentUser
      if (!user) return ''
      return user.GUID || user.NidUser || ''
    },
    getUsername () {
      const user = this.currentUser
      if (!user) return ''
      return user.username || user.UserName || ''
    },
    getUserDisplayName () {
      const user = this.currentUser
      if (!user) return ''
      return user.FullName
    }, */
    isSelectedRequest () {
      if (!this.selectedRequest) {
        this.showError('لطفا یک آیتم از کارتابل انتخاب کنید')
        this.removeActiveForm()

        return false
      }

      return true
    },

    convertToNosaziCodeObject (str = '') {
      if (typeof str === 'object') {
        return {
          ...str
        }
      }
      if (!str) {
        return {
          ...defaultCode
        }
      }
      const split = str.split('-')
      const obj = {}
      SECTIONS.forEach((part, i) => {
        obj[part] = Number(split[i]) || 0
      })
      return obj
    },
    convertToNosaziCodeString (nosaziCode) {
      if (typeof nosaziCode === 'string') return nosaziCode
      if (!nosaziCode) return defaultCodeString
      return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}-${nosaziCode.Building}-${nosaziCode.Apartment}-${nosaziCode.Shop}`
    },
    convertClasseParvandehCodeToString (nosaziCode) {
      if (typeof nosaziCode === 'string') return nosaziCode
      if (!nosaziCode) return defaultCodeString
      return `${nosaziCode.District}-${nosaziCode.Region}-${nosaziCode.Block}-${nosaziCode.House}`
    },
    changeEditable (status) {
      this.isEditable = status
    },
    getResponse (response) {
      return new ResponseParser(response).get()
    },
    createNosaziCodeTree (list) {
      return createTree(list)
    },
    createRevisitTree (list) {
      return createRevisitTree(list)
    },
    setLayout (mode) {
      this.$store.dispatch('ui/setLayoutMode', mode)
    },
    setLayoutSplitterWidth (value) {
      this.setLayout('half')
      this.$store.dispatch('ui/setLayoutWidth', value)
    }, /* setForm (key, props = {}, event = {}) {
      this.$store.dispatch('formLauncher/setForm', {
        formKey: key,
        events: event,
        ...props
      })
      // this.$root.$emit('setForm', key, props, event)
    }, */
    redirectToKartable (props = {}, event = {}) {
      this.setForm({
        formKey: 'system', title: 'کارتابل', formName: 'kartable', props, event
      })
      this.refreshKartable()
      // this.$root.$emit('setForm', 'kartable', { ...(props || {}), q: Date.now() }, event)
    },
    redirectToMap (other) {
      this.setForm({
        formKey: 'map', title: 'نقشه', ...other
      })
      // this.$root.$emit('setForm', 'map', props, event)
    },
    redirectToArchive (other) {
      this.setForm({
        formKey: 'archive', title: 'آرشیو', ...other
      })
      // this.$root.$emit('setForm', 'archive', props, event)
    },
    redirectToLogin (props = {}, event = {}) {
      this.$root.$emit('setCommand', 'login', props, event)
    },
    setCommand (key, args = {}) {
      this.$root.$emit('setCommand', key, args)
    },
    hideSidebar (key) {
      this.$nextTick(async () => {
        await this.$window.close(key)
        await this.removeForm(key)
      })
    },
    refreshKartable () {
      this.$root.$emit('refresh:kartable')
    },
    showSidebar (componentName, opts) {
      const {
        popup = false, title = '', width = 1600, height = 800, ...props
      } = opts

      const formProps = {
        ...props || {}, isSelectFromMenu: true
      }
      const isPopup = popup
      if (!isPopup) {
        this.setForm({
          title,
          formKey: componentName, // formName: componentName,
          props: formProps
        })
        if (formProps && formProps.mode) {
          this.setLayout(formProps.mode)
        }
        return
      }
      this.$window.open({
        component: componentName, // pre-registered vue component
        minWidth: 1200,
        minHeight: 800,
        keepAlive: false,
        padding: false,
        width,
        height,
        title,
        ...formProps,
        id: componentName,
        onResize: () => {
          // this.fixSidebarFormWrapper()
        }
        // id: 'window1', // window id
        // title: 'پنجره تستی 1',
        // width: '800px',
        // height: '200px',
        // props: { a: 1 }
      })

      // this.$nextTick(() => {
      /* setTimeout(() => {
        this.fixSidebarFormWrapper()
      }, 1000) */
      // })
      /* setTimeout(() => {
        this.fixSidebarFormWrapper()
        setTimeout(() => {
          this.fixSidebarFormWrapper()
        }, 3000)
      }, 50) */
    },
    canCloseWindow () {
      if (this.isEditable) {
        this.showError('فرم در حالت ویرایش می باشد.')
        return false
      }
      return true
    },
    fixSidebarFormWrapper () {
      /* try {
        // const el = document.getElementById('task-launcher')
        // const formContainer = document.querySelector('#forms__container')
        const forms = document.querySelectorAll('.ShowModal')
        forms.forEach(w => {
          const formWrapper = w.querySelector('.form-wrapper')
          const boxBody = w.querySelector('.safa-win--inner')
          if (!formWrapper || !boxBody) return
          formWrapper.firstElementChild.style.minHeight = `${boxBody.getBoundingClientRect().height - 33}px`
        })
      } catch (ex) {
        console.debug(ex)
      } */
    },
    async showReport (path, queryParams, printWin = false, cb) { // path, queryParams, printWin=false, cb
      // console.log(item)
      // if (!item.Url) {
      //   this.showSuccess('آدرس گزارش تعریف نشده است.')
      //   return
      // }
      this.loading = true
      try {
        const payLoad = this.buildReportPayload(path, queryParams)
        const { data } = await this.$services.report.setReportParameters(payLoad, {})

        // eslint-disable-next-line no-undef
        /* const baseUrl = window.getConfigValue('systemReportUrl')
        const methodName = 'SetParameters'
        let headers = new Headers()

        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')

        const res = await fetch(appendUrls([baseUrl, methodName]), {
          headers, method: 'POST', body: JSON.stringify(payLoad)
        })
        const result = await res.json() */
        const sessionId = data.SetParametersResult
        if (sessionId) {
          // eslint-disable-next-line no-undef
          const url = `${window.getConfigValue('systemReportViewer')}?SessionId=${sessionId}`
          //  popup.moveTo(0, 0)
          const params = ['height=' + screen.availHeight - 10, 'width=' + screen.availWidth - 10, 'top=300, left=0', 'fullscreen=no' // only works in IE, but here for completeness
          ].join(',')
          const popup = window.open(url, '_blank', params)
          popup.moveTo(0, 0)
          if (printWin) {
            setTimeout(() => {
              console.log('load after timeout')
              popup.focus()
              popup.print()
            }, 12000)
            popup.onafterprint = function () {
              popup.close()
            }
          }
          popup.onload = function () {
            console.log('load popup')
          }
        }
      } finally {
        this.loading = false
      }
      // eslint-disable-next-line no-undef
      // const url = window.getConfigValue('reportUrl')
      // Object.keys(queryParams).forEach(key => {
      //   path += key + ';' + queryParams[key] + ','
      // })
      // path = path.substring(0, path.length - 1)
      // const fullUrl = url + path
      // const params = [
      //   'height=' + screen.height,
      //   'width=' + screen.width,
      //   'fullscreen=yes', // only works in IE, but here for completeness
      //   'resizable'
      // ].join(',')
      // const popup = window.open(fullUrl, '_blank', params)
      // popup.moveTo(0, 0)
    },
    buildReportPayload (path, queryParams) {
      const sessionModel = {}
      // const District = queryParams.District ? queryParams.District : 1
      // const NidUser = this.getNidUser()
      const paramsToReplace = { ...queryParams }
      sessionModel.reportPath = path.replace('&ReportParameter=', '').replace('?ReportPath=', '') // .split('')[0].split('')[1]
      let baseReqQuery = ''
      // item.Url.split('')[1] // this.createReqQuery(item)
      // console.group('::report params::')
      // console.log('report params: ', baseReqQuery)
      for (const pKey in paramsToReplace) {
        baseReqQuery += `${pKey}` + ';' + `${paramsToReplace[pKey]}` + ','
      }
      baseReqQuery = baseReqQuery.substring(0, baseReqQuery.length - 1)
      // console.groupEnd()
      // console.log('baseReqQuery', baseReqQuery)
      sessionModel.parameters = baseReqQuery

      return {
        ...sessionModel
      }
    }
  },
  beforeMount () {
    if (this.defaultMode) {
      this.isEditable = this.defaultMode
    }
  },
  mounted () {
    // console.log('load form')
    this.$nextTick(() => {
      this.$emit('load')
    })
  },
  created () {
    const { formKey, title, name } = this

    if (!formKey || formKey.trim() === '') {
      console.warn(`"form key" not provided in component's data.`)
    }
    if (!title || title.trim() === '') {
      console.warn(`"form title" not provided in component's data.`)
    }
    if (!name || name.trim() === '') {
      console.warn(`"form name" not provided in component's data.`)
    }

    this.title = this.$translate(`forms_${this.name}_title`, this.title ?? '')
  }
}
