<template>
  <fit>
    <safa-status :result="saveResult"/>
    <div class="q-mb-sm">
      <safa-combo
        v-model="results.Zabeteh.CI_PlanType"
        cdcName="CI_PlanType"
        :m="mode"
        ciName="CI_PlanType"
        domainName="CI_SaraM1"
        label="نوع ضابطه"
      />
    </div>
    <safa-tabs
      v-model="activeTab"
      height="100%"
      type="fixed"
      class="fit"
    >
      <template v-slot:tabs>
        <tab-menu name="showZabeteTab" label="ضوابط"/>
        <tab-menu name="showZabeteDetailesTab" label="وقایع نگار و پارامترها"/>
        <tab-menu name="showTarheTafsiliTab" label=" طرح تفصیلی"/>
        <tab-menu name="showCommentTab" label="  توضیحات"/>
        <tab-menu name="showFloorTab" label=" چیدمان در طبقات"/>
      </template>
      <tab-content name="showZabeteTab" title="ضوابط" :padding="false">
        <ZavabetBasedOnRequest :m="m" :results="results" />
      </tab-content>
      <tab-content name="showZabeteDetailesTab" title="وقایع نگار و پارامترها">
        <ZabeteParametersBasedOnRequset :m="m" :results="results"/>
      </tab-content>
      <tab-content name="showTarheTafsiliTab" title="طرح تفصیلی">
        <ZabeteTarheTafsiliBasedOnRequset :m="m" :results="results"/>
      </tab-content>
      <tab-content name="showCommentTab" title="توضیحات">
        <ZabeteCommentBasedOnRequset :m="m" :results="results"/>
      </tab-content>
      <tab-content name="showFloorTab" title="چیدمان در طبقات">
        <ZabeteFloorBasedOnRequset :m="m" :results="results"/>
      </tab-content>
    </safa-tabs>

  </fit>
</template>
<script>
import ZavabetBasedOnRequest from './ZavabetBasedOnRequest.vue'
import ZabeteParametersBasedOnRequset from './ZabeteParametersBasedOnRequset.vue'
import ZabeteTarheTafsiliBasedOnRequset from './ZabeteTarheTafsiliBasedOnRequset.vue'
import ZabeteCommentBasedOnRequset from './ZabeteCommentBasedOnRequset.vue'
import ZabeteFloorBasedOnRequset from './ZabeteFloorBasedOnRequset.vue'
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import messageMixin from 'src/mixins/messageMixin.js'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin, messageMixin],
  data: function () {
    return {
      activeTab: 'showZabeteTab',
      results: {
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        ZabetehParameters: [],
        Zabeteh_Details: [],
        Zabeteh_LogMethod: [],
        Zabeteh: {},
        Base_Using: [],
        Base_Front: [],
        Base_BuildingInfo: [
          {
            height: 0
          }
        ]
      },
      result: null,
      saveResult: null
    }
  },
  components: {
    ZavabetBasedOnRequest,
    ZabeteParametersBasedOnRequset,
    ZabeteTarheTafsiliBasedOnRequset,
    ZabeteCommentBasedOnRequset,
    ZabeteFloorBasedOnRequset
  },
  props: {
    nidNosaziCode: String,
    selectedItem: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    m: {
      type: String,
      default: 'r'
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      let data = {
        pNidZabeteh: this.selectedItem.NidZabeteh,
        pNidNosaziCode: this.nidNosaziCode,
        pNidProc: this.selectedRequest.NidProc,
        pIsLoadDeletedNosaziCode: false
      }
      this.$services.SC.loadZabetehWithChideman(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedItem.NidZabeteh,
              bizCodeTitle: 'NidZabeteh',
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات ضابطه با چیدمان انجام گردید.`
            })
          }
        })
        .catch(e => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeZabeteDetail () {
      return this.results.Zabeteh_Details.map(m => {
        return {
          ...m,
          LogZabeteh: m.LogZabeteh || null,
          Others: m.Others || null,
          Refrence: m.Refrence || null,
          ValueZabetehComments: m.ValueZabetehComments || null
        }
      })
    },
    normalizeBasePlanMosavab () {
      return this.results.Base_PlanMosavab.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBasePlanMojaz () {
      return this.results.Base_PlanMojaz.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBasePlanWork () {
      return this.results.Base_PlanForWork.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null

        }
      })
    },
    save () {
      this.showLoading()
      this.results.Zabeteh_Details = this.normalizeZabeteDetail()
      this.results.Base_PlanMosavab = this.normalizeBasePlanMosavab()
      this.results.Base_PlanMojaz = this.normalizeBasePlanMojaz()
      this.results.Base_PlanForWork = this.normalizeBasePlanWork()
      let data = {
        pZabeteh: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.saveZabeteh(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.isEditable = false

            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedItem.NidZabeteh,
              bizCodeTitle: 'NidZabeteh',
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره اطلاعات ضابطه با چیدمان انجام گردید.`
            })

            this.load()
            this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
            this.$emit('saveDone')
          }
        })
        .catch(e => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    copyToPrincipleAgreement () {
      this.showConfirm(
        'آیااز کپی اطلاعات چیدمان در طبقات به چیدمان مجاز اطمینان دارید؟'
      ).onOk(() => {
        this.copyToAgreement()
      })
    },
    copyToAgreement () {
      this.showLoading()
      let payload = {
        pNidProc: this.selectedRequest.NidProc,
        pFromFormName: 'UI.SC.UserControl.UZabeteh_Details',
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.copyToMovafeghatOsooli(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess(
              'کپی چیدمان در طبقات به چیدمان مجاز با موفقیت انجام شد.'
            )
            this.load()
            await this.log({
              action: this.logActions.copyToMovafeghatOsooli,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی چیدمان در طبقات به چیدمان مجاز انجام گردید.`
            })
          }
        })
        .catch(e => {
          this.serverError()
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    calculateZabetehAndSave () {
      this.showLoading()
      let data = {
        pZabeteh: this.results,
        pNidZabeteh: this.selectedItem.NidZabeteh,
        pNidProc: this.selectedRequest.NidProc,
        pNidNosaziCode: this.nidNosaziCode,
        pZabetehParameters: this.results.ZabetehParameters,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.calculateZabetehAndSaveAndZabetehChideman(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.calculateZabetehAndSave,
              bizCode: this.selectedItem.NidZabeteh,
              bizCodeTitle: 'NidZabeteh',
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `محاسبه و ذخیره ضابطه چیدمان انجام گردید.`
            })
            this.showSuccess('عملیات با موفقیت انجام گردید.')
          }
        })
        .catch(e => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    calculateZabete () {
      this.showLoading()
      let data = {
        pZabeteh: this.results,
        pNidZabeteh: this.selectedItem.NidZabeteh,
        pNidProc: this.selectedRequest.NidProc,
        pNidNosaziCode: this.nidNosaziCode,
        pZabetehParameters: this.results.ZabetehParameters,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.calculateZabeteh(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.calculateZabeteh,
              bizCode: this.selectedItem.NidZabeteh,
              bizCodeTitle: 'NidZabeteh',
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `اعلام ضابطه انجام گردید.`
            })

            this.showSuccess('محاسبه ضابطه انجام شد.')
          }
        })
        .catch(e => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    calculateZabetehChidemanAndSave () {
      this.showLoading()
      let data = {
        pNidProc: this.selectedRequest.NidProc,
        pNidZabeteh: this.selectedItem.NidZabeteh,
        pParameters: this.results.ZabetehParameters,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.calculateZabetehChidemanAndSave(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.calculate,
              bizCode: this.selectedItem.NidZabeteh,
              bizCodeTitle: 'NidZabeteh',
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `محاسبه و ذخیره ضابطه چیدمان انجام گردید.`
            })

            this.showSuccess('عملیات با موفقیت انجام گردید.')
          }
        })
        .catch(e => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async print () {
      const reportPath =
        '/Sara8Reports/RptZabete'
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NidZabeteh: this.selectedItem.NidZabeteh,
        NIdUser: this.getNidUser(),
        RptDomain: '1@2@3',
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode).District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: 'RptZabete',
        bizCodeTitle: 'گزارش',
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ گزارش ضابطه انجام گردید.`
      })
    }
  }
}
</script>
