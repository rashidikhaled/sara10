import { getTaskInfo } from '../services/task'
import kartableMixin from '../mixins/kartableMixin'
import mapMixin from 'src/mixins/mapMixin'
import { convertStringToNosaziCodeObject } from '../utils/nosaziCodeOperation'
// eslint-disable-next-line camelcase
import { Enum_Black_List_Control } from 'src/config/BLACKLIST_CONSTS'

export default {
  mixins: [kartableMixin, mapMixin],
  data () {
    return {
      taskInfo: null,
      forms: [],
      WNode: null,
      reports: [],
      isLoading: false,
      allowAssign: [],
      allowBack: [],
      blacklistState: {
        stop: false,
        exists: false,
        errors: []
      }
    }
  },
  computed: {
    showAcceptButton () {
      /* if (!this.WNode) return true
      if (this.WNode.AllowNot) */
      return true
    },
    NotAllowSend () {
      return (!!(this.WNode && this.WNode.NotAllowSend)) || (!!(this.taskInfo && this.taskInfo.NotAllowSend))
    }
  },
  methods: {
    ShowWkt () {
      const { BizCode } = this.taskInfo
      this.showCodeOnMap(BizCode)
    },
    async checkBlacklist () {
      return new Promise(async (resolve, reject) => {
        // eslint-disable-next-line no-undef
        const ignoreWorkflowDeffs = (window.getConfigValue('ignoreWorkflowDeffs') || []).map(x => `${x}`.toUpperCase())
        // console.debug('ignoreWorkflowDeffs', ignoreWorkflowDeffs)
        if (ignoreWorkflowDeffs.includes(this.taskInfo.NidWorkflowDeff.toUpperCase())) {
          return resolve({
            stop: false,
            exists: false,
            errors: []
          })
        }
        // eslint-disable-next-line no-undef
        if (!window.getConfigValue('CiCity')) {
          this.showError('کانفیگ CiCity تعریف نشده است.', { title: 'لیست سیاه' })
          return reject([])
        }

        // get NidNosaziCode
        const pNosaziCode = {
          ...convertStringToNosaziCodeObject(
            this.taskInfo.BizCode
          ),
          // eslint-disable-next-line no-undef
          CI_City: parseInt(`${window.getConfigValue('CiCity')}`)
        }
        // const res = await this.$services.SA.getBaseLibInNosaziCode({
        //   pNosaziCode,
        //   pLoadFunc: `Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo`,
        //   pIsLoadDeletedNosaziCode: false
        // }, {
        //   config: { District: pNosaziCode.District }
        // })
        // const result = new ResponseParser(res).get()
        // if (result.hasError) {
        //   this.showError(result.errors.map(x => x.text).join('<br/>'), { title: 'لیست سیاه' })
        //   return reject(result.errors)
        // }
        //
        // const pNidNosaziCode = (result.data.data.ArchiveWrapper && result.data.data.ArchiveWrapper.NidNosaziCode) || result.data.data._NidNosaziCode

        let payload = {
          pNosaziCode,
          pNidWorkflowDeff: this.taskInfo.NidWorkflowDeff
        }
        this.$services.SA.getInBlockListInAllControlNosaziCode(payload, {
          config: { District: pNosaziCode.District }
        }).then(({ data }) => {
          const { InBlackList, ErrorResult } = data
          if (ErrorResult && ErrorResult.BizErrors && ErrorResult.BizErrors.length > 0) {
            // this.showError('خطا در درخواست.')
            this.showError(ErrorResult.BizErrors.map(x => x.ErrorTitel).join('<br/>'), { title: 'لیست سیاه' })
            return reject(ErrorResult.BizErrors)
          } else {
            this.blacklistState.exists = InBlackList.length > 0
            this.blacklistState.errors = InBlackList
            this.blacklistState.stop = InBlackList.map(x => Enum_Black_List_Control[x.EumBlackListControl]).some(s => s.stop)
            return resolve(this.blacklistState)
          }
        }).catch((ex) => {
          console.log(ex)
          if (payload.pNosaziCode.District !== 0 && payload.pNosaziCode.Region !== 0) this.showError('خطا در بررسی لیست سیاه', { title: 'لیست سیاه' })
          return reject([])
        })
      })
    },
    loadTaskInfo () {
      if (!this.selectedNidTask) {
        this.showError('هیچ درخواستی در کارتابل انتخاب نشده است')
        // this.$root.$emit('setForm', 'kartable')
        this.$root.$emit('setCommand', 'form')
        this.$store.dispatch('formLauncher/setForm', { formKey: 'kartable', formName: 'kartable', title: 'کارتابل' })
        this.$store.dispatch('formLauncher/removeForm', 'task')
        // this.$router.replace('/kartable')
        return
      }
      try {
        this.isLoading = true
        this.showLoading()
        getTaskInfo({
          NidTask: this.selectedNidTask
        }).then(({ data }) => {
          if (data.success !== true) {
            return this.showError('اطلاعات تسک دریافت نشد')
          }

          // this.taskInfoData = data.data.TaskInfo || {}
          this.forms = data.data.Forms || []
          this.reports = data.data.Reports || []
          this.WNode = data.data.WNode || {}
          this.taskInfo = data.data.TaskInfo
          this.allowAssign = data.data.AllowAssign
          this.allowBack = data.data.AllowBack
          this.$store.dispatch('formLauncher/updateFormTitle', {
            formKey: 'task',
            title: `گردش کار - ` + this.taskInfo.NidWorkItem
          })

          this.ShowWkt()
          this.checkBlacklist()
        })
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد.')
      } finally {
        this.hideLoading()
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      }
    }
  }
}
