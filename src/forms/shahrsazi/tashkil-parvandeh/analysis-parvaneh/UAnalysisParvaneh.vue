<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      vertical
      title="تحلیل پروانه ساختمان"
      :padding="false"
    >
      <safa-status :result="result" />
      <safa-tabs
        v-model="activeTab"
        :padding="false"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu
            name="list"
            label="تحلیل ساختمان"
          />
          <tab-menu
            name="history"
            label="تاریخچه تحلیل ساختمان"
          />
          <tab-menu
            v-for="tab in tabs"
            :key="tab.name"
            :name="tab.name"
            v-bind="tab"
            closable
            @click="closeTab(tab)"
          >
          </tab-menu>
        </template>
        <tab-content name="list">
          <fit>

            <safa-datatable
              title="تحلیل ساختمان"
              v-model="analysisList.AnalysisBuildingList"
              cdcName="AnalysisBuildingList"
              @dbclick="handleGridDblClick"
              :bordered="false"
              @row-click="handelClick"
              helper="analysisBuildingList"
                @reportClick="handleGridRport"
            />
          </fit>
        </tab-content>
        <tab-content name="history">
          <safa-datatable
            title="تاریخچه تحلیل ساختمان"
            helper="analysisBuildingHistory"
            v-model="analysisList.AnalysisBuildingList_PreRevisit"
            cdcName="AnalysisBuildingList_PreRevisit"
            :bordered="false"
          />
        </tab-content>
        <tab-content
          v-for="tab in tabs"
          :key="tab.name"
          :name="tab.name"
          :title="tab.label"
        >
          <UAnalysisParvanehDetails
            v-model="tab.analysisBuilding"
            v-bind="passedProps"
            :formKey="formKey"
            :title="title"
            :name="name"
            :ref="tab.name+'-details'"
            :m="mode"
            @saveDone="saveDone"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
      <form-actions
        height="40px"
        :buttons="tabActions"
        :value="activeTab"
        :showEditButton="activeTab!=='list' && activeTab!=='history'"
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @cancel="isEditable = false"
        class="q-my-sm q-pl-sm"
        editSPId="96f41b36-073e-4dff-a7cb-3f260d14af47"
        editFormId="c71e7c3e-0d05-42fb-b806-2a9434052983"

      >

        <template v-slot:after>
          <btn-default
            label="تحلیل جدید"
            @click="add"
            spId="eed9d9d7-30a4-412d-b21e-8d7d08fcc73d"
            spCaption="تحلیل جدید"
            :force="true"
            v-show="activeTab==='list'"
          />
          <btn-default
            v-show="selectedAnalysisBuilding &&activeTab==='list' "
            label="حذف تحلیل"
            @click="remove"
            spId="fb725ac7-fe7f-428d-a601-da73baaecb1c"
            :force="true"
            spCaption="حذف تحلیل"
          />
          <btn-default
            v-show="selectedAnalysisBuilding && activeTab==='list'"
            label="کپی تحلیل"
            @click="copy"
            spId="f8c25158-ddd6-48e4-91ee-82d2cf813a97"
            spCaption="کپی تحلیل"
            :force="true"
          />
           <!-- <btn-default label="ثبت دبیرخانه" /> -->
        </template>
      </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import { newGuid } from 'src/utils/formHelpers'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import requestSecResponseModel from './models/requestSecResponse.js'
import UAnalysisParvanehDetails from './partials/UAnalysisParvanehDetails'
import analysisBuildingListWithHistoryModel from './models/analysisBuildingListWithHistory.js'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/analysis/parvaneh',
  mixins: [baseFormMixin],
  components: {
    UAnalysisParvanehDetails
  },

  data () {
    return {
      title: 'تحلیل پروانه ساختمان',
      formKey: 'f2423368-6206-45e0-b369-f2c83c41de49',
      name: 'UAnalysisParvaneh',
      main: true,
      workflowCompatible: true,
      isView: false,
      result: null,
      currentTab: 'list',
      selectedAnalysisBuilding: null,
      baseNosaziCode: {},
      analysisList: { ...analysisBuildingListWithHistoryModel },
      requestSecResponse: { ...requestSecResponseModel },
      tabs: [],
      activeTab: 'list',
      tabActions: {}

    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    },
    passedProps () {
      return {
        NidProc: this.selectedRequest && this.selectedRequest.NidProc,
        baseNosaziCode: this.baseNosaziCode
      }
    }
  },

  methods: {
    async handleGridRport (e) {
      const reportPath =
        '/Sara8Reports/RptAnalysisParvaneh'
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NidAnalysisBuilding: e.dataItem.NidAnalysisBuilding
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: e.dataItem.NidAnalysisBuilding,
        bizCodeTitle: 'NidAnalysisBuilding',
        saveDesc: `چاپ گزارش در فرم ${this.title} برای کاربر ${e.dataItem.UserName} انجام گردید.`
      })
    },
    addTab (analysisBuilding) {
      if (!analysisBuilding) {
        return
      }
      const { NidAnalysisBuilding } = analysisBuilding
      const tabKey = `tab-${NidAnalysisBuilding}`
      const preferName =
        'تحلیل پروانه - تاریخ ' +
        analysisBuilding.PenaltyDate +
        ' - ساعت ' +
        analysisBuilding.PenaltyTime
      const already = this.tabs.some(
        x => x.name.toLowerCase() === tabKey.toLowerCase()
      )
      this.activeTab = tabKey

      if (already) {
        return
      }

      this.tabs.push({
        name: tabKey,
        label: preferName,
        analysisBuilding
      })
      this.tabActions[tabKey] = [
        {
          label: 'محاسبه و ذخیره',
          type: 'default',
          click: (e, btn) => {
            this.$refs[tabKey + '-details'][0].calculateAndSave()
          },
          formId: "c71e7c3e-0d05-42fb-b806-2a9434052983",
          spId: "613bf041-1e92-4b0e-8bf0-d03c545f6714",
          spCaption: 'محاسبه و ذخیره'
        },
        {
          label: 'محاسبه',
          type: 'default',
          click: (e, btn) => {
            this.$refs[tabKey + '-details'][0].calculate()
          },
          formId: "c71e7c3e-0d05-42fb-b806-2a9434052983",
          spId: "4fa8a43d-e25f-4973-a86d-c0a35974cc25",
          spCaption: 'محاسبه'
        },
        {
          label: 'گزارش',
          type: 'default',
          click: (e, btn) => {
            this.$refs[tabKey + '-details'][0].print()
          },
          formId: "c71e7c3e-0d05-42fb-b806-2a9434052983",
          spId: "7f950fd8-72a3-496d-962c-6c60d4d67e5b",
          spCaption: 'گزارش'
        }
      ]
    },
    // closeTab (tab) {
    //   debugger
    //   const tabKey = tab.name
    //   this.tabs = this.tabs.filter(x => x.name !== tabKey)
    //   this.tabActions[tabKey] = undefined
    //   this.activeTab = 'list'
    //   const detailsPartial = this.$refs[tabKey + '-details']
    //   if (detailsPartial && detailsPartial.destroy) {
    //     console.log('?///////////////////', detailsPartial)
    //     detailsPartial.destroy()
    //   }
    // },
    handelClick (e) {
      this.selectedAnalysisBuilding = e
    },

    handleGridDblClick ({ event, target, row }) {
      if (!row) {
        this.showError('هیچ ردیفی انتخاب نشده است')
        return
      }
      this.addTab(row)
    },

    copy () {
      if (!this.selectedAnalysisBuilding) {
        return this.showError('هیچ ردیفی انتخاب نشده است')
      }
      const handler = async () => {
        try {
          this.showLoading()
          const { NidProc } = this.selectedRequest

          let response = await this.$services.SC.copyAnalysisBuilding(
            {
              pNidProc: NidProc,
              pNidAnalysisBuilding: this.selectedAnalysisBuilding
                .NidAnalysisBuilding,
              pNidUser: this.getNidUser(),
              pUser: this.currentUser
            },
            this.config
          )
          this.result = this.getResponse(response.data)
          if (this.result.success !== true) {
            return this.showError('ردیف کپی نشد')
          }

          await this.log({
            action: this.logActions.copy,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: 'شماره درخواست',
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `کپی تحلیل کاربر ${this.selectedAnalysisBuilding.UserName} انجام گردید.`
          })

          this.showSuccess('ردیف با موفقیت کپی شد')
          this.load()
        } catch (e) {
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm('آیا از کپی ردیف تحلیل اطمینان دارید؟').onOk(handler)
    },
    remove () {
      if (!this.selectedAnalysisBuilding) {
        return this.showError('هیچ ردیفی انتخاب نشده است')
      }
      const handler = async () => {
        try {
          this.showLoading()
          console.log('user guid', this.getNidUser())
          let response = await this.$services.SC.deleteAnalysisBuilding(
            {
              pNidAnalysisBuilding: this.selectedAnalysisBuilding
                .NidAnalysisBuilding,
              pNidUser: this.getNidUser()
            },
            this.config
          )
          this.result = this.getResponse(response.data)
          if (this.result.success !== true) {
            return this.showError('ردیف حذف نشد')
          }

          await this.log({
            action: this.logActions.delete,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: 'شماره درخواست',
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `حذف تحلیل کاربر ${this.selectedAnalysisBuilding.UserName} انجام گردید.`
          })

          this.showSuccess('ردیف با موفقیت حذف شد')
          this.load()
        } catch (e) {
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm('آیا از حذف ردیف تحلیل اطمینان دارید؟').onOk(handler)
    },

    async add () {
      if (!this.selectedRequest) {
        return this.showError('هیچ درخواستی در کارتابل انتخاب نشده است')
      }

      try {
        this.showLoading()
        const { NidProc } = this.selectedRequest

        // Fetch template
        let response = await this.$services.SC.loadAnalysisBuilding(
          {
            pNidAnalysisBuilding: newGuid(),
            pNidProc: NidProc,
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.result = this.getResponse(response.data)
        if (this.result.success !== true) {
          return this.showError('اطلاعات تحلیل بارگذاری نشد')
        }
        const loadAnalysisBuilding = this.result.data
        loadAnalysisBuilding.AnalysisBuilding.EnumAnalysisBuildingType = 1 // Parvaneh
        loadAnalysisBuilding.AnalysisBuilding.NidBase =
          loadAnalysisBuilding.NidLib.RMain.NidBase
        loadAnalysisBuilding.AnalysisBuilding.NidUser = this.getNidUser()
        loadAnalysisBuilding.AnalysisBuilding.UserName = this.getUserDisplayName()

        // Save
        response = await this.$services.SC.saveAnalysisBuilding(
          {
            pAnalysisBuilding: loadAnalysisBuilding,
            pNidProc: NidProc,
            pUser: this.currentUser,
            pDtoWorkflowData: null
          },
          this.config
        )
        this.result = this.getResponse(response.data)
        if (this.result.success !== true) {
          return this.showError('ردیف جدید ایجاد نشد')
        }

        await this.log({
          action: this.logActions.save,
          bizCode: this.selectedRequest.BizCode,
          nosaziCode: this.selectedRequest.BizCode,
          nidWorkItem: this.selectedRequest.NidWorkItem,
          saveDesc: `عملیات اضافه کردن ردیف جدید تحلیل برای درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
        })
        this.showSuccess('ردیف جدید ایجاد شد')
        this.load()
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      const { BizCode, NidProc } = this.selectedRequest
      this.baseNosaziCode = convertStringToNosaziCodeObject(BizCode)
      this.analysisList = { ...analysisBuildingListWithHistoryModel }
      this.requestSecResponse = { ...requestSecResponseModel }

      try {
        this.showLoading()

        let response = await this.$services.SC.loadAnalysisBuildingListWithHistory(
          {
            pNidProc: NidProc,
            pEnumAnalysisBuildingType: 1, // Parvaneh
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.result = this.getResponse(response.data)

        if (this.result.success !== true) {
          return this.showError('اطلاعات تحلیل بارگذاری نشد')
        }
        this.analysisList = this.result.data
        if (!this.isView) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: 'شماره درخواست',
            saveDesc: `بارگذاری فرم ${this.title} انجام گردید.`
          })
        }
        this.isView = true
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveData () {
      this.$refs[this.activeTab + '-details'][0].save()
    },
    saveDone () {
      this.isEditable = false
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.load()
    } else {
      this.hideSidebar("UAnalysisParvanehDetails")
    }
  }
}
</script>
