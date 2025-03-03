<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <fit>
    <safa-status :result="calcResult"/>
    <safa-status :result="saveResult"/>
    <safa-status :result="result"/>
    <safa-tabs
      v-model="activeTab"
      :bordered="false"
    >
      <template v-slot:tabs>
        <tab-menu
          name="showUserTab"
          label="کاربری های صلح شده"
        />
        <tab-menu
          name="showTarheTafsiliTab"
          label="طرح تفصیلی و تعیین صلح"
        />
        <tab-menu
          name="parametersTab"
          label="پارامترها"
        />
        <tab-menu
          name="showCommentsTab"
          label="توضیحات"
        />
      </template>
      <tab-content
        name="showUserTab"
        title="کاربری های صلح شده"
        :padding="false"
      >
        <PeaceDetailesUser
          :results="results"
          :m="m"
        />
      </tab-content>

      <tab-content
        name="showTarheTafsiliTab"
        title="طرح تفصیلی و تعیین صلح"
        :padding="false"
      >
        <PeaceDetailesTarheTafsili
          :results="results"
          :m="m"
        />
      </tab-content>
      <tab-content
        name="parametersTab"
        title="پارامترها"
        :padding="false"
      >
        <UParametersTab :results="results" :m="m"/>
      </tab-content>
      <tab-content
        name="showCommentsTab"
        title="توضیحات"
      >
        <PeaceDetailesComments
          :results="results"
          :mode="m"
        />
      </tab-content>
    </safa-tabs>
  </fit>
  </safa-form>
</template>
<script>
import PeaceDetailesUser from './PeaceDetailesUser.vue'
import PeaceDetailesTarheTafsili from './PeaceDetailesTarheTafsili.vue'
import PeaceDetailesComments from './PeaceDetailesComments.vue'
import UParametersTab from './UParametersTab'
import baseFormMixin from 'src/mixins/baseFormMixin.js'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      formKey: '2c1fd63b-42ed-4af3-98da-d443f44fe837',
      title: 'جزئیات صلحنامه',
      name: 'PeaceDetail',
      // showDetails: false,
      activeTab: 'showUserTab',
      result: null,
      results: {
        Base_Front: [],
        Base_PlanForWork: [],
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        Base_Using: [],
        PeaceParameters: [],
        Sh_Peace: {},
        Sh_PeaceLetter: [],
        Sh_Agreement: {}
      },
      saveResult: null,
      saveResults: { Sh_Peace: {} },
      calcResult: null,
      updateLastRequestResult: null,
      resagreementFromListresultult: null,
      resagreementFromListresultults: {},
      saveClick: false,
      nidBase: '00000000-0000-0000-0000-000000000000',
      showNewBtn: true,
      showCancelBtn: true
    }
  },
  props: {
    passedResult: Object,
    copyLastRow: Boolean,
    selectedNidBase: String,
    historyResult: Object,
    isNewDetails: Boolean,
    m: String
  },
  components: {
    PeaceDetailesUser,
    PeaceDetailesTarheTafsili,
    PeaceDetailesComments,
    UParametersTab
  },
  mounted () {
    this.loadOnePeaceFromList(this.selectedNidBase)
  },
  watch: {
    selectedNidBase () {
      this.loadOnePeaceFromList(this.selectedNidBase)
    }
  },
  computed: {},
  methods: {
    changeEditable (status) {
      this.$emit('changeEditable', status)
    },
    openNewTab () {
      this.isShowNewTab = true

      this.$refs.safaTabs.changeTab('showUserTab')
      this.isEditable = true

      this.isNew = true
    },
    dbclick (dataItem) {
      this.engineerInfo = dataItem

      this.isShowNewTab = true

      this.activeTab = 'showUserTab'

      this.isNew = false
    },
    loadOnePeaceFromList (nidBase) {
      this.showLoading()
      // جدید اضافه کردم بابت لود صفحه
      // البته میشد پاک کنم showLoading
      let payload = {
        pNidBase: nidBase,
        pNidProc: this.selectedRequest.NidProc,
        pIsLoadDeletedNosaziCode: false
      }
      this.$services.SC.loadOnePeaceFromList(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            if (this.isNewDetails) {
              this.results.Sh_PeaceLetter = []
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeBaseFontRows () {
      return this.results.Base_Front.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || 0,
          CI_BuildingStep: m.CI_BuildingStep || 0,
          CI_FrontIs: m.CI_FrontIs || 0,
          CI_FrontPlace: m.CI_FrontPlace || 0,
          CI_FrontRoofStatus: m.CI_FrontRoofStatus || 0,
          CI_FrontStatus: m.CI_FrontStatus || 0,
          CI_FrontType: m.CI_FrontType || 0,
          CI_RoofType: m.CI_RoofType || null,
          CI_SideCode: m.CI_SideCode || 0,
          CI_UsingGroup: m.CI_UsingGroup || 0,
          CI_UsingType: m.CI_UsingType || 0,
          ConversionDate: m.ConversionDate || null,
          CreateYearFrom: m.CreateYearFrom || 0,
          CreateYearTo: m.CreateYearTo || 0,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          FloorNo: m.FloorNo || 0,
          FrontArea: m.FrontArea || 0,
          FrontDepth: m.FrontDepth || 0,
          FrontHeight: m.FrontHeight || 0,
          FrontLength: m.FrontLength || 0,
          FrontWidth: m.FrontWidth || 0,
          GenerateDate: m.GenerateDate || '',
          HeightKaf: m.HeightKaf || 0,
          UnitNo: m.UnitNo || 0,
          inEdit: m.inEdit || false,
          isNew: m.isNew || false,
          selected: m.selected || false,
          uniqueID: m.uniqueID || '00000000-0000-0000-0000-000000000000',
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidFront: m.NidFront || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    normalizeBaseUsingRows () {
      return this.results.Base_Using.map(m => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          BuildingNo: m.BuildingNo || 0,
          BusyArea: m.BusyArea || null,
          CI_BuildingKind: m.CI_BuildingKind || 0,
          CI_BuildingStep: m.CI_BuildingStep || 0,
          CI_BuildingType: m.CI_BuildingType || null,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || null,
          CI_Repair: m.CI_Repair || null,
          CI_RoofType: m.CI_RoofType || 0,
          CI_SazehType: m.CI_SazehType || 0,
          CI_UsingGroup: m.CI_UsingGroup || 0,
          CI_UsingPlace: m.CI_UsingPlace || null,
          CI_UsingStatus: m.CI_UsingStatus || null,
          CI_UsingType: m.CI_UsingType || 0,
          CI_ViewCode: m.CI_ViewCode || null,
          CI_WallType: m.CI_WallType || 0,
          ConversionDate: m.ConversionDate || null,
          CreateYearFrom: m.CreateYearFrom || 0,
          CreateYearTo: m.CreateYearTo || 0,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          Dahaneh: m.Dahaneh || 0,
          Depth1Area: m.Depth1Area || null,
          Depth1No: m.Depth1No || null,
          Depth2Area: m.Depth2Area || null,
          Depth2No: m.Depth2No || null,
          Depth3Area: m.Depth3Area || null,
          Depth3No: m.Depth3No || null,
          EditUsingArea: m.EditUsingArea || 0,
          FloorNo: m.FloorNo || 0,
          GarbageUnit: m.GarbageUnit || null,
          GenerateDate: m.GenerateDate || null,
          IllegalInfrastructure: m.IllegalInfrastructure || null,
          MassDistance_Main: m.MassDistance_Main || null,
          MassDistance_Sub: m.MassDistance_Sub || null,
          OverOnArea: m.OverOnArea || null,
          OverOnLengthNear: m.OverOnLengthNear || null,
          OverOnTarakom: m.OverOnTarakom || null,
          OverOrNoParvaneh: m.OverOrNoParvaneh || null,
          ProgressPercent: m.ProgressPercent || 0,
          RepairArea: m.RepairArea || null,
          RoofThickness: m.RoofThickness || 0,
          UnUsefulHeight: m.UnUsefulHeight || null,
          UnitCount: m.UnitCount || 0,
          UnitNo: m.UnitNo || 0,
          UsefulHeight: m.UsefulHeight || 0,
          UsingArea: m.UsingArea || 0,
          UsingArea_Cur: m.UsingArea_Cur || 0,
          UsingDepth: m.UsingDepth || 0,
          inEdit: m.inEdit || false,
          isNew: m.isNew || false,
          selected: m.selected || false,
          uniqueID: m.uniqueID || '00000000-0000-0000-0000-000000000000',
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidUsing: m.NidUsing || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    save () {
      this.showLoading()
      this.results.Base_Front = this.normalizeBaseFontRows()
      this.results.Base_Using = this.normalizeBaseUsingRows()
      // this.results.Sh_Peace = { ...this.results.Sh_Peace }

      if (this.isNewDetails) {
        this.results.Sh_Peace.NidBase = '00000000-0000-0000-0000-000000000000'
        this.results.NidBase = '00000000-0000-0000-0000-000000000000'
      }
      this.results.Sh_Peace.NidBase = this.results.NidBase
      let payLoad = {
        pPeace_List: this.results,
        pDtoWorkflowData: {
          StateName: this.taskInfo.WorkflowTitel,
          WorkflowGuid: this.taskInfo.NidWorkflowDeff
        },
        pUser: this.currentUser
      }

      this.$services.SC.saveOnePeaceFromList(payLoad)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.saveResults = this.saveResult.data
            this.isNewDetails = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc',
              saveDesc: `ذخیره توسط کاربر ${this.getUserDisplayName()}`,
              nosaziCode: this.selectedRequest.BizCode
            })
            console.log('save peace: ', {
              'this.saveResults.Sh_Peace.NidBase': this.saveResults.Sh_Peace.NidBase,
              'this.results.NidBase': this.results.NidBase
            })
            this.loadOnePeaceFromList(this.saveResults.Sh_Peace.NidBase)
            this.$emit('reload', this.saveResults)

            this.isEditable = false

            // const peaceListLen = this.historyResult.Sh_Peace_List.length
            //
            // if (peaceListLen > 0) {
            //   const lastRow = this.historyResult.Sh_Peace_List[peaceListLen - 1]
            //   this.load(lastRow)
            // }

            // this.loadOneAgreementFromList()
            this.showSuccess('ذخیره صلحنامه با موفقیت انجام شد.')
          }
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    calculate () {
      this.showLoading()
      let payload = {
        pPeace: this.results,
        pNidProc: this.selectedRequest.NidProc,
        pParameters: this.results.PeaceParameters,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.WorkflowTitel,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff
        }
      }
      this.$services.SC.calculateOnePeaceFromList(payload)
        .then(async ({ data }) => {
          this.calcResult = this.getResponse(data)
          if (this.calcResult.success) {
            this.showSuccess('محاسبه صلحنامه با موفقیت انجام شد.')
            if (this.saveResult && this.saveResult.success) {
              this.isNewDetails = false
              await this.log({
                action: this.logActions.calculate,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: 'NidProc',
                nosaziCode: this.selectedRequest.BizCode
              })
              this.loadOnePeaceFromList(this.saveResults.Sh_Peace.NidBase)
            } else {
              this.loadOnePeaceFromList(this.selectedNidBase)
            }
          }
        })
        .catch(err => {
          console.error('calc error', err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    copyInfo () {
      this.showConfirm(
        'آیا از کپی اطلاعات صلحنامه به موافقت  اصولی اطمینان دارید؟'
      ).onOk(() => {
        this.showLoading()
        let payload = {
          pNidProc: this.selectedRequest.NidProc,
          pFromFormName: 'UPeace',
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.WorkflowTitel,
            WorkflowGuid: this.selectedRequest.NidWorkflowDeff
          }
        }
        this.$services.SC.copyToMovafeghatOsooli(payload)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            if (this.saveResult.success) {
              this.saveResults = this.saveResult.data
              await this.log({
                action: this.logActions.copyToMovafeghatOsooli,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: 'NidProc',
                nosaziCode: this.selectedRequest.BizCode
              })

              this.loadOnePeaceFromList(this.selectedNidBase)
              this.update()
              this.showSuccess(
                'کپی صلحنامه به موافقت اصولی با موفقیت انجام شد.'
              )
            }
          })
          .catch(err => {
            this.serverError()
            console.error(err)
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    update () {
      // updateLastRequestState method
      let updateLastRequestData = {
        pNidProc: this.selectedRequest.NidProc,
        pLastRequestState: 'کپی صلحنامه به موافقت اصولی با موفقیت انجام شد.'
      }

      this.$services.SC.updateLastRequestState(updateLastRequestData)
        .then(async ({ data }) => {
          this.updateLastRequestResult = this.getResponse(data)
          await this.log({
            action: this.logActions.copy,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: 'NidProc',
            nosaziCode: this.selectedRequest.BizCode
          })
        })
        .catch(err => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async print () {
      const reportPath =
        '/Sara8Reports/RptPeace'
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NIdUser: this.getNidUser(),
        RptDomain: '1@2@3',
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode).District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: 'RptPeace&ReportParameter',
        bizCodeTitle: 'گزارش',
        nosaziCode: this.selectedRequest.BizCode
      })
    }
  }
}
</script>
