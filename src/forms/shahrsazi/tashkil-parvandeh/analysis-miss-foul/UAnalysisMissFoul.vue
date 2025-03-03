<template>
  <safa-form
    :caption="title"
    :id="formKey"
    appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      :padding="false"
      title="تحلیل تعیین خلاف ساختمان"
      vertical
      @load="$emit('load')"
    >
      <safa-status :result="result" />
      <safa-status :result="saveRequestSecRes" />
      <safa-tabs ref="safaTabs" v-model="activeTab" :bordered="false">
        <template v-slot:tabs>
          <tab-menu label=" تحلیل ساختمان" name="list" />
          <tab-menu label="تاریخچه تحلیل ساختمان" name="history" />
          <tab-menu label="مغایرت های ساختمان" name="contrast" />
          <tab-menu
            v-for="tab in tabs"
            :key="tab.name"
            :name="tab.name"
            v-bind="tab"
            closable
            @close="closeTab(tab)"
          />
        </template>
        <tab-content name="list">
          <fit>
            <div class="row">
              <safa-combo
                class="col-12 col-sm-4 col-md-3 q-mb-sm"
                label="اطلاعات دبیرخانه"
                v-model="cboSec"
                source-type="local"
               :options="cboSecOptions"
              />
            </div>
            <safa-datatable
              :hideHeader="true"
              @dbclick="handleGridDblClick"
              @selectedChange="handleAnalysisBuildingSelected"
              v-model="analysisList.AnalysisBuildingList"
              cdcName="AnalysisBuildingList"
              title="تحلیل ساختمان"
              @reportClick="handleGridRport"
              helper="analysisBuildingList"
            />
          </fit>
        </tab-content>
        <tab-content
          :padding="false"
          name="history"
          title=" تاریخچه تحلیل ساختمان"
        >
          <fit>
            <safa-grid
              title="تاریخچه تحلیل ساختمان"
              v-model="analysisList.AnalysisBuildingList_PreRevisit"
              cdcName="AnalysisBuildingList_PreRevisit"
              helper="analysisBuildingHistory"
              max-height="100%"
              height="100%"
              minHeight="100px"
            />
          </fit>
        </tab-content>
        <tab-content
          :padding="false"
          name="contrast"
          title="مغایرت های ساختمان"
        >
          <UBuildingDifferences :taskInfo="taskInfo" />
        </tab-content>
        <tab-content
          v-for="tab in tabs"
          :key="tab.name"
          v-bind="tab"
          :name="tab.name"
          :padding="false"
        >
          <UAnalysisMissFoulDetails
            :formKey="formKey"
            :name="name"
            :title="title"
            v-bind="passedProps"
            :selectedAnalysisBuilding="selectedAnalysisBuilding"
            :m="mode"
            :ref="tab.name + '-details'"
            @saveDone="isEditable = false"
            :taskInfo="taskInfo"
          />
        </tab-content>
      </safa-tabs>

      <!-- <safa-datatable
      fit
            :bordered="false"
             max-height="100%"
              height="100%"
              minHeight="100%"
              helper="analysisBuildingList"
              :hideHeader="true"
              v-model="analysisList.AnalysisBuildingList_PreRevisit"
                        cdcName="AnalysisBuildingList_PreRevisit"
            /> -->

      <!-- Action -->
      <template v-slot:footer>
        <!-- :showEditButton="
            activeTab !== 'list' &&
            activeTab !== 'history' &&
            activeTab !== 'contrast'
          "
          @edit="isEditable = true" -->
        <form-actions
          height="40px"
          :buttons="tabActions"
          :value="activeTab"
          :showEditButton="disableEditBtn"
          @edit="editObj"
          :m="mode"
          editSPId="4063d994-04e8-402f-ad2f-93f85edfc2b9"
          :force="true"
          editFormId="a5fd398c-e146-4819-8eb3-04194aee4992"
          @save="saveData"
          @cancel="cancel"
        >

          <template v-slot:after>
            <btn-default
              v-show="activeTab === 'list'"
              @click="add"
              label="تحلیل جدید"
              spCaption="تحلیل جدید"
              spId="fc2c4590-3c4c-4eba-8554-ae2c672002b3"
            />
            <btn-save
             @click="registerSecretariatInfo"
              label="ثبت دبیرخانه"
              spCaption="ثبت دبیرخانه"
              spId="d7ec833a-c177-4176-ac9a-37791538b42b"
            />
            <btn-default
              @click="remove"
              label="حذف تحلیل"
              spCaption="حذف تحلیل"
              spId="1e9797a7-69ab-454f-95c0-f9010386a2e6"
              v-show="selectedAnalysisBuilding && activeTab === 'list'"
            />
            <btn-default
              @click="copy"
              label="کپی تحلیل"
              spCaption="کپی تحلیل"
              spId="44382079-6569-4a52-b447-bb19c05e93d4"
              v-show="selectedAnalysisBuilding && activeTab === 'list'"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { newGuid } from "src/utils/formHelpers"
import analysisBuildingListWithHistoryModel from "./models/analysisBuildingListWithHistory.js"
import requestSecResponseModel from "./models/requestSecResponse.js"
import UAnalysisMissFoulDetails from "./partials/UAnalysisMissFoulDetails"
import UBuildingDifferences from "./partials/building-differences/UBuildingDifferences.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { ClsEnumEumSecNoGroup } from "src/forms/shahrsazi/config/enums.js"

export default {
  mixins: [baseFormMixin],
  components: {
    UAnalysisMissFoulDetails,
    UBuildingDifferences
  },
  data () {
    return {
      title: "تحلیل تعیین خلاف ساختمان",
      formKey: "f0db615e-450b-4b91-a9db-52435c1210c2",
      name: "UAnalysisMissFoul",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      result: null,
      reqSecRes: null,
      saveRequestSecRes: null,

      isView: false,
      selectedSec: 0,
      cboSecOptions: [],
      cboSec: null,
      activeTab: "list",
      selectedAnalysisBuilding: false,
      baseNosaziCode: {},
      analysisList: { ...analysisBuildingListWithHistoryModel },
      requestSecResponse: { ...requestSecResponseModel },
      tabs: [],
      tabActions: {}
    }
  },

  computed: {
    disableEditBtn () {
      return this.activeTab !== 'list' && this.activeTab !== 'history' && this.activeTab !== 'contrast'
    },
    config () {
      return { config: { District: this.baseNosaziCode.District } }
    },
    passedProps () {
      return {
        NidProc: this.selectedRequest && this.selectedRequest.NidProc,
        baseNosaziCode: this.baseNosaziCode
      }
    }
  },

  methods: {
    editObj () {
      this.isEditable = this.disableEditBtn
    },
    async registerSecretariatInfo () {
      if (this.cboSecOptions.length > 0) {
        this.showConfirm(
          "درخواست مورد نظر قبلا ثبت دبیرخانه شده است آیا تمایل دارید دوباره ثبت شود؟"
        ).onOk(async () => {
          await this.saveRequestSec()
        })
      } else {
        await this.saveRequestSec()
      }
    },
    async saveRequestSec () {
      try {
        this.showLoading()
        const payload = {
          pRequestSec: {
            ErrorResult: null,
            EumSecNoGroup: ClsEnumEumSecNoGroup.AnalysisBuilding.value,
            NidProc: this.selectedRequest.NidProc,
            SecretariatReceiver: null,
            SecretariatSummary: null,
            SecretariatTypeDesc: null,
            Sh_RequestSec: {
              EumSecNoGroup: ClsEnumEumSecNoGroup.AnalysisBuilding.value,
              NidProc: this.selectedRequest.NidProc,
              NidSec: "00000000-0000-0000-0000-000000000000",
              ReportPath: "/Sara8Reports/RptAnalysisMissFoul",
              SecDate: null,
              SecNo: null
            },
            Sh_RequestSec_List: null
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.NidWorkflowDeff,
            WorkflowGuid: this.selectedRequest.NidWorkflowDeff
          }
        }
        const { data } = await this.$services.SI.saveRequestSec(
          payload,
          this.config
        )
        this.saveRequestSecRes = this.getResponse(data)
        if (this.saveRequestSecRes.success) {
          this.showSuccess("ثبت دبیرخانه با موفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ثبت دبیرخانه درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
          })
          this.load()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadRequestSec () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pEumSecNoGroup: ClsEnumEumSecNoGroup.AnalysisBuilding.value // 11
      }
      try {
        const { data } = await this.$services.SI.loadRequestSec(
          payload,
          this.config
        )
        this.reqSecRes = this.getResponse(data)
        if (this.reqSecRes.success) {
          const _l = this.reqSecRes?.data?.Sh_RequestSec_List ?? []
          this.cboSecOptions = _l
            .map((m) => {
              return {
                ...m,
                ID: m.NidSec,
                Title: `شماره: ${m?.SecNo ?? "---"}  تاریخ: ${
                  m?.SecDate ?? "---"
                }`
              }
            })
            .sort((a, b) => b.SecDate - a.SecDate)
          if (this.cboSecOptions.length > 0) {
            this.cboSec = this.cboSecOptions[0].ID
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async handleGridRport (e) {
      const reportPath = "/Sara8Reports/RptAnalysisMissFoul"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NidAnalysisBuilding: e.dataItem.NidAnalysisBuilding
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptAnalysisMissFoul",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode,
        saveDesc: `چاپ گزارش تحلیل برای کاربر ${
          e.dataItem?.UserName ?? ""
        } انجام گردید. `
      })
    },
    addTab (analysisBuilding) {
      if (!analysisBuilding) {
        return
      }
      const { NidAnalysisBuilding } = analysisBuilding
      const tabKey = `tab-${NidAnalysisBuilding}`
      const preferName =
        "تعیین خلاف - تاریخ " +
        analysisBuilding.PenaltyDate +
        " - ساعت " +
        analysisBuilding.PenaltyTime
      const already = this.tabs.some(
        (x) => x.name.toLowerCase() === tabKey.toLowerCase()
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
          label: "محاسبه و ذخیره",
          type: "default",
          click: (e, btn) => {
            this.$refs[tabKey + "-details"][0].calculateAndSave()
          },
          spId: "f2ddfd23-9fce-42eb-ad26-695145531662",
          spCaption: "محاسبه و ذخیره",
          formId: "a5fd398c-e146-4819-8eb3-04194aee4992"
        },
        {
          label: "محاسبه",
          type: "default",
          click: (e, btn) => {
            this.$refs[tabKey + "-details"][0].calculate()
          },
          spId: "ccc542ac-8c35-4906-ac56-f644e5c4edcb",
          spCaption: "محاسبه",
          formId: "a5fd398c-e146-4819-8eb3-04194aee4992"
        },
        {
          label: "گزارش",
          type: "default",
          click: (e, btn) => {
            this.$refs[tabKey + "-details"][0].print()
          },
          spId: "4827b20e-cf10-48c5-b116-995b449a27f2",
          spCaption: "گزارش",
          formId: "a5fd398c-e146-4819-8eb3-04194aee4992"
        }
      ]
    },
    closeTab (tab) {
      this.tabs = this.tabs.filter((x) => x.name !== tab.name)
      this.activeTab = "list"
      if (this.$refs[name] && this.$refs[name][0]) {
        this.$refs[name][0].$destroy()
      }
    },

    handleAnalysisBuildingSelected (e) {
      this.selectedAnalysisBuilding = e.dataItem
    },
    handleGridDblClick (e) {
      this.selectedAnalysisBuilding = e.row
      if (!this.selectedAnalysisBuilding) {
        this.showError("هیچ ردیفی انتخاب نشده است")
        return
      }
      this.addTab(this.selectedAnalysisBuilding)
    },
    // copySameRows
    copy () {
      if (!this.selectedAnalysisBuilding) {
        return this.showError("هیچ ردیفی انتخاب نشده است")
      }
      const handler = async () => {
        try {
          this.showLoading()
          const { NidProc } = this.selectedRequest

          let response = await this.$services.SC.copyAnalysisBuilding(
            {
              pNidProc: NidProc,
              pNidAnalysisBuilding:
                this.selectedAnalysisBuilding.NidAnalysisBuilding,
              pNidUser: this.getNidUser(),
              pUser: this.currentUser
            },
            this.config
          )
          this.result = this.getResponse(response.data)
          if (this.result.success !== true) {
            return this.showError("ردیف کپی نشد")
          }
          await this.log({
            action: this.logActions.copy,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode,
            saveDesc: `کپی تحلیل برای کاربر ${
              this.selectedAnalysisBuilding.UserName ?? ""
            } انجام گردید. `
          })

          this.showSuccess("ردیف با موفقیت کپی شد")
          this.load()
        } catch (e) {
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی ردیف تحلیل اطمینان دارید؟").onOk(handler)
    },
    copySameRows () {
      let count = Number(this.copySameRowsCount)

      if (!this.selectedAnalysisBuilding) {
        return this.showError("هیچ ردیفی انتخاب نشده است")
      } else if (!count || count === 0) {
        return this.showError("تعداد ردیف جهت کپی وارد شود")
      } else {
        for (var i = 0; i < count; i++) {
          this.analysisList.AnalysisBuildingList.push(
            this.selectedAnalysisBuilding
          )
        }
      }
    },
    remove () {
      if (!this.selectedAnalysisBuilding) {
        return this.showError("هیچ ردیفی انتخاب نشده است")
      }
      const handler = async () => {
        try {
          this.showLoading()

          let response = await this.$services.SC.deleteAnalysisBuilding(
            {
              pNidAnalysisBuilding:
                this.selectedAnalysisBuilding.NidAnalysisBuilding,
              pNidUser: this.getNidUser()
            },
            this.config
          )
          this.result = this.getResponse(response.data)
          if (this.result.success) {
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `حذف تحلیل برای کاربر ${
                this.selectedAnalysisBuilding.UserName ?? ""
              } انجام گردید. `
            })
            this.showSuccess("ردیف با موفقیت حذف شد")
            this.load()
          }
        } catch (e) {
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
          return this.showError("اطلاعات تحلیل بارگذاری نشد")
        }

        const loadAnalysisBuilding = this.result.data
        loadAnalysisBuilding.AnalysisBuilding.EnumAnalysisBuildingType = 2
        loadAnalysisBuilding.AnalysisBuilding.NidBase =
          loadAnalysisBuilding.NidLib.RMain.NidBase
        loadAnalysisBuilding.AnalysisBuilding.NidUser = this.getNidUser()
        loadAnalysisBuilding.AnalysisBuilding.UserName =
          this.getUserDisplayName()

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
          return this.showError("ردیف جدید ایجاد نشد")
        }

        await this.log({
          action: this.logActions.save,
          bizCode: this.selectedRequest.BizCode,
          bizCodeTitle: "کد نوسازی",
          saveDesc: `ایجاد ردیف جدید برای کاربر ${
            this.selectedAnalysisBuilding.UserName ?? ""
          } انجام گردید. `
        })

        this.showSuccess("ردیف جدید ایجاد شد")
        this.load()

        // end
      } catch (e) {
        console.log("new row error....", e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      const { BizCode, NidProc } = this.selectedRequest
      if (this.selectedRequest.BizCode) {
        this.baseNosaziCode = convertStringToNosaziCodeObject(BizCode)
      } else {
        this.baseNosaziCode = {
          ...this.baseNosaziCode,
          District: this.selectedRequest.District
        }
      }
      this.analysisList = { ...analysisBuildingListWithHistoryModel }
      this.requestSecResponse = { ...requestSecResponseModel }

      try {
        this.showLoading()
        let response =
          await this.$services.SC.loadAnalysisBuildingListWithHistory(
            {
              pNidProc: NidProc,
              pEnumAnalysisBuildingType: 2, // Foul
              pIsLoadDeletedNosaziCode: false
            },
            this.config
          )

        this.result = this.getResponse(response.data)
        // if (this.result.success !== true) {
        //   return this.showError('اطلاعات تحلیل بارگذاری نشد')
        // }
        if (this.result.success) {
          this.analysisList = this.result.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode,
              saveDesc: `بارگذاری اطلاعات فرم ${this.title}  برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید. `
            })
          }
          this.isView = true
        }
        await this.loadRequestSec()
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveData () {
      this.$refs[this.activeTab + "-details"][0].save()
    },
    cancel () {
      this.isEditable = false
      this.$refs[this.activeTab + "-details"][0].cancel()
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.load()
    } else this.hideSidebar(this.name)
  }
}
</script>
