<template>
  <safa-form
    appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="copyAnalysisBuildingRes" />
        <safa-status :result="deleteAnalysisBuildingRes" />
        <safa-status :result="loadAnalysisBuildingRes" />
        <safa-status :result="saveAnalysisBuildingRes" />
        <safa-status :result="loadAnalysisBuildingListWithHistoryRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          :actions="false"
          m="r"
        />
      </template>
      <safa-tabs v-model="activeTab" :bordered="false" :padding="false" fit>
        <template v-slot:tabs>
          <tab-menu name="list" label="تحلیل ساختمان" />
          <tab-menu name="history" label="تارخچه تحلیل ساختمان" />
          <tab-menu
            v-for="(tab,index) in tabs"
            :key="index"
            :name="tab.name"
            v-bind="tab"
            closable
            @close="closeTab(tab)"
          />
        </template>
        <tab-content name="list" title=" تحلیل ساختمان">
          <fit>
            <safa-datatable
              title="تحلیل ساختمان"
              v-model="analysisList.AnalysisBuildingList"
              cdcName="AnalysisBuildingList"
              helper="analysisBuildingList"
              @selectedChange="handleAnalysisBuildingSelected"
              @dbclick="handleGridDblClick"
              :bordered="false"
              fit
              :m="mode"
              @reportClick="handleGridRport"
              paginate
            />
          </fit>
        </tab-content>
        <tab-content name="history" title="تاریخچه تحلیل ساختمان ">
          <fit>
            <safa-datatable
              :bordered="false"
              helper="analysisBuildingHistory"
              v-model="analysisList.AnalysisBuildingList_PreRevisit"
              cdcName="AnalysisBuildingList_PreRevisit"
              fit
              title="تاریخچه تحلیل ساختمان"
              paginate
            />
          </fit>
        </tab-content>
        <tab-content
          v-for="(tab,index) in tabs"
          :key="index"
          v-bind="tab"
          :name="tab.name"
          :title="tab.label"
        >
          <UAnalysisMovafeghatOsooliDetails
            v-model="tab.analysisBuilding"
            :NidProc="selectedRequest.NidProc"
            :baseNosaziCode="baseNosaziCode"
            :m="mode"
            :name="name"
            :title="title"
            :formKey="formKey"
            :config="config"
            :ref="tab.name + '-details'"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer v-if="activeTab !== 'history'">
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @save="save"
          @cancel="loadAnalysisMovafeghatOsooliDetails"
          :showEditButton="activeTab !== 'list'"
          editSPId="efc7b713-52b0-42de-acf0-fdbcbf65e0fc"
          editFormId="8e7e4255-abd0-4215-b150-a1c166e9f384"
        >
          <template #after>
            <btn-new
              label="تحلیل جدید"
              @click="add"
              v-show="activeTab === 'list'"
            />
            <btn-default
              label="گزارش"
              v-show="activeTab !== 'list'"
              @click="print"
              spId="76dab6c8-d46e-41dd-b124-0408356b30d4"
              spCaption="گزارش"
              formId="8e7e4255-abd0-4215-b150-a1c166e9f384"
            />
            <btn-default
              key="#2"
              v-show="!isEditable && activeTab !== 'list'"
              label="محاسبه و ذخیره"
              @click="calculateAndSave"
              spId="afcb485f-e1b1-44b3-acb5-9acc83d594b4"
              spCaption="محاسبه و ذخیره"
              formId="8e7e4255-abd0-4215-b150-a1c166e9f384"
            />
            <btn-default
              key="#3"
              v-show="!isEditable && activeTab !== 'list'"
              label="محاسبه"
              @click="calculate"
              spId="1814653c-ea85-4164-8eeb-39c7ef3769f3"
              spCaption="محاسبه"
              formId="8e7e4255-abd0-4215-b150-a1c166e9f384"
            />
            <btn-delete
              spId="7e4765a4-03dd-4577-b0fb-eaf6e311c52a"
              spCaption="حذف تحلیل"
              v-show="activeTab === 'list'"
              key="#2"
              label="حذف تحلیل"
              @click="remove"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import { newGuid } from "src/utils/formHelpers"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import analysisBuildingListWithHistoryModel from "./models/analysisBuildingListWithHistory.js"
import UAnalysisMovafeghatOsooliDetails from "./partials/UAnalysisMovafeghatOsooliDetails"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  components: { UAnalysisMovafeghatOsooliDetails },

  data () {
    return {
      title: "تحلیل موافقت اصولی ساختمان",
      formKey: "3edd7723-d603-4036-8dc1-9b4fb5ab9141",
      name: "UAnalysisMovafeghatOsooli",
      main: true,
      workflowCompatible: true,

      copyAnalysisBuildingRes: null,
      deleteAnalysisBuildingRes: null,
      loadAnalysisBuildingRes: null,
      saveAnalysisBuildingRes: null,
      loadAnalysisBuildingListWithHistoryRes: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      isView: false,
      activeTab: "list",
      tabActions: {},
      selectedAnalysisBuilding: null,
      analysisList: { ...analysisBuildingListWithHistoryModel },
      tabs: []
    }
  },

  computed: {
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else {
      this.hideSidebar("UAnalysisMovafeghatOsooli")
    }
  },

  methods: {
    async loadObj () {
      const { BizCode, NidProc } = this.selectedRequest
      this.baseNosaziCode = convertStringToNosaziCodeObject(BizCode)
      this.analysisList = { ...analysisBuildingListWithHistoryModel }

      try {
        if (this.taskInfo) {
          this.baseNosaziCode = {
            ...this.baseNosaziCode,
            District: this.taskInfo.District,
            Region: this.taskInfo.Region,
            Block: this.taskInfo.Block,
            House: this.taskInfo.House,
            Building: this.taskInfo.Building,
            Apartment: this.taskInfo.Apartment,
            Shop: this.taskInfo.Shop
          }
        }
        const payload = {
          pNidProc: NidProc,
          pEnumAnalysisBuildingType: 3, // MovafeghatOsooli
          pIsLoadDeletedNosaziCode: false
        }
        this.showLoading()
        const data =
          await this.$services.SC.loadAnalysisBuildingListWithHistory(
            payload,
            this.config
          )
        this.loadAnalysisBuildingListWithHistoryRes = this.getResponse(data)
        if (this.loadAnalysisBuildingListWithHistoryRes.success) {
          this.analysisList = this.loadAnalysisBuildingListWithHistoryRes.data.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
          this.isView = true
        } else this.showError("متاسفانه اطلاعات تحلیل بارگذاری نشد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    copy () {
      if (!this.selectedAnalysisBuilding) {
        return this.showError("هیچ ردیفی انتخاب نشده است")
      }
      const handler = async () => {
        try {
          const payload = {
            pNidProc: this.selectedRequest.NidProc,
            pNidAnalysisBuilding:
              this.selectedAnalysisBuilding.NidAnalysisBuilding,
            pNidUser: this.getNidUser(),
            pUser: this.currentUser
          }
          this.showLoading()
          const { data } = await this.$services.SC.copyAnalysisBuilding(
            payload,
            this.config
          )
          this.copyAnalysisBuildingRes = this.getResponse(data)
          if (this.copyAnalysisBuildingRes.success) {
            await this.log({
              action: this.logActions.copy,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode
            })
            this.showSuccess("ردیف با موفقیت کپی شد")
            this.loadObj()
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی ردیف تحلیل اطمینان دارید؟").onOk(handler)
    },
    remove () {
      if (!this.selectedAnalysisBuilding) {
        return this.showError("هیچ ردیفی انتخاب نشده است")
      }
      const handler = async () => {
        try {
          const payload = {
            pNidAnalysisBuilding:
              this.selectedAnalysisBuilding.NidAnalysisBuilding,
            pNidUser: this.getNidUser()
          }
          this.showLoading()
          const { data } = await this.$services.SC.deleteAnalysisBuilding(
            payload,
            this.config
          )
          this.deleteAnalysisBuildingRes = this.getResponse(data)
          if (this.deleteAnalysisBuildingRes.success) {
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode
            })
            this.showSuccess("ردیف با موفقیت حذف شد.")
            this.loadObj()
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از حذف ردیف تحلیل اطمینان دارید؟").onOk(handler)
    },
    async add () {
      if (!this.selectedRequest) {
        return this.showError("هیچ درخواستی در کارتابل انتخاب نشده است")
      }
      try {
        const payload = {
          pNidAnalysisBuilding: newGuid(),
          pNidProc: this.selectedRequest.NidProc,
          pIsLoadDeletedNosaziCode: false
        }
        this.showLoading()
        const { data } = await this.$services.SC.loadAnalysisBuilding(
          payload,
          this.config
        )
        this.loadAnalysisBuildingRes = this.getResponse(data)
        if (this.loadAnalysisBuildingRes.success) {
          const loadAnalysisBuilding = this.loadAnalysisBuildingRes.data
          loadAnalysisBuilding.AnalysisBuilding.EnumAnalysisBuildingType = 3 // MovafeghatOsooli
          loadAnalysisBuilding.AnalysisBuilding.NidBase =
            loadAnalysisBuilding.NidLib.RMain.NidBase
          loadAnalysisBuilding.AnalysisBuilding.NidUser =
            this.getNidUser()
          loadAnalysisBuilding.AnalysisBuilding.UserName =
            this.getUserDisplayName()
          await this.saveAnalysisBuilding(loadAnalysisBuilding)
        } else {
          return this.showError("متاسفانه اطلاعات تحلیل بارگذاری نشد.")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveAnalysisBuilding (loadAnalysisBuilding) {
      try {
        const payload = {
          pAnalysisBuilding: loadAnalysisBuilding,
          pNidProc: this.selectedRequest.NidProc,
          pUser: this.currentUser,
          pDtoWorkflowData: null
        }
        const { data } = await this.$services.SC.saveAnalysisBuilding(
          payload,
          this.config
        )
        this.saveAnalysisBuildingRes = this.getResponse(data)
        if (this.saveAnalysisBuildingRes.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode
          })
          this.showSuccess("ردیف جدید با موفقیت ایجاد شد.")
          this.loadObj()
        } else {
          return this.showError("متاسفانه ردیف جدید ایجاد نشد.")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async handleGridRport (e) {
      const reportPath =
        "/Sara8Reports/RptAnalysisMovafeghatOsooli"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NidAnalysisBuilding: e.dataItem.NidAnalysisBuilding
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptAnalysisMovafeghatOsooli",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    save () {
      this.isEditable = false
      this.$refs[this.activeTab + "-details"][0].save()
    },
    print () {
      this.$refs[this.activeTab + "-details"][0].print()
    },
    calculateAndSave () {
      this.$refs[this.activeTab + "-details"][0].calculateAndSave()
    },
    calculate () {
      this.$refs[this.activeTab + "-details"][0].calculate()
    },
    loadAnalysisMovafeghatOsooliDetails () {
      this.isEditable = false
      this.$refs[this.activeTab + "-details"][0].loadObj()
    },
    addTab (analysisBuilding) {
      if (!analysisBuilding) {
        return
      }
      const { NidAnalysisBuilding } = analysisBuilding
      const preferName =
        "چیدمان مجاز - تاریخ " +
        analysisBuilding.PenaltyDate +
        " - ساعت " +
        analysisBuilding.PenaltyTime
      const tabKey = `tab-${NidAnalysisBuilding}`
      const already = this.tabs.some(
        (x) => x.name.toLowerCase() === tabKey.toLowerCase()
      )
      if (already) {
        return
      }
      this.tabs.push({
        name: tabKey,
        label: preferName,
        analysisBuilding
      })
      this.activeTab = tabKey
      this.activeTab = "list"
      setTimeout(() => {
        this.activeTab = tabKey
        this.hideLoading()
      }, 300)
    },
    closeTab (tab) {
      const tabKey = tab.name
      this.tabs = this.tabs.filter((x) => x.name !== tabKey)
      this.activeTab = "list"
      const detailsPartial = this.$refs[tabKey + "-details"]
      if (detailsPartial && detailsPartial.length > 0) {
        // console.log(detailsPartial)
        detailsPartial[0].destroy()
      }
      // this.tabs = this.tabs.filter((x) => x.name !== tab.name)
      // if (this.activeTab === tab.name) {
      //   this.activeTab = "list"
      // }
      // if (this.$refs[name] && this.$refs[name][0]) {
      //   this.$refs[name][0].$destroy()
      // }
    },
    handleAnalysisBuildingSelected (e) {
      this.selectedAnalysisBuilding = e.dataItem
    },
    async handleGridDblClick ({ row }) {
      this.selectedAnalysisBuilding = row
      if (!this.selectedAnalysisBuilding) {
        this.showError("هیچ ردیفی انتخاب نشده است")
        return
      }
      await this.addTab(this.selectedAnalysisBuilding)
    }
  }
}
</script>
