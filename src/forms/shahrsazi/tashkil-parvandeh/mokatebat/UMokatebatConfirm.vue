<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper vertical title="تایید مکاتبات">
      <template #header>
        <safa-status :result="loadMokatebatConfirmRes" />
        <safa-status :result="saveMokatebatConfirmRes" />
        <safa-status :result="getReportParametersRes" />
      </template>
      <fit>
        <form-row class="q-mb-sm" v-show="isEditable">
          <form-control>
            <safa-combo
              label="نوع مجوز"
              label-width="80px"
              source-type="local"
              :options="eumManagerConfirmLicenceItems"
              :m="mode"
              v-model="dataContext.Sh_MokatebatConfirm.EumManagerConfirmLicence"
              cdcName="EumManagerConfirmLicence"
            />
          </form-control>
          <form-control>
            <safa-combo
              label="مکاتبات"
              label-width="80px"
              domain-name="CI_SaraM1"
              ciName="CI_ResourceMokatebatConfirm"
              :m="mode"
              v-model="
                dataContext.Sh_MokatebatConfirm.CI_ResourceMokatebatConfirm
              "
              cdcName="CI_ResourceMokatebatConfirm"
            />
          </form-control>
          <form-control className="col-12">
            <text-template
              label="توضیحات تایید مکاتبات"
              label-width="80px"
              :rows="2"
              :m="mode"
              :formKey="formKey"
              v-model="dataContext.Sh_MokatebatConfirm.Comments"
              cdcName="Comments"
            />
          </form-control>
        </form-row>
        <safa-datatable
          title="تایید مکاتبات"
          helper="shMokatebatConfirm"
          m="r"
          fit
          max-height="100%"
          height="100%"
          minHeight="100%"
          v-model="dataContext.Sh_MokatebatConfirm_List"
          cdcName="Sh_MokatebatConfirm_List"
          @displayClick="btnShowReportClick"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="edit"
          @save="saveObj"
          @cancel="cancel"
          editSPId="af201fe4-ba58-410f-a9a8-0fa39a57b0be"
          editSPCaption="ویرایش"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "شهرسازی- تایید مکاتبات",
      formKey: "a50207b6-4184-4a43-859a-418c0ff0aa9a",
      name: "UMokatebatConfirm",
      main: true,

      // Responses
      loadMokatebatConfirmRes: null,
      saveMokatebatConfirmRes: null,
      getReportParametersRes: null,

      // Context
      dataContext: {
        Sh_MokatebatConfirm_List: [],
        CI_ResourceMokatebatConfirm_List: {},
        Sh_MokatebatConfirm: {
          Comments: ""
        }
      },
      nidProc: "00000000-0000-0000-0000-000000000000",
      stButtons: true,
      eumManagerConfirmLicenceItems: [
        { Id: 0, Title: "بدون نظر" },
        { Id: 1, Title: "تأیید" },
        { Id: 2, Title: "ابطال" },
        { Id: 3, Title: "عدم تأیید" },
        { Id: 4, Title: "تأیید نهایی شهروندسپاری" }
      ],
      isView: false
    }
  },

  methods: {
    loadObj () {
      this.nidProc = this.selectedNidProc
      this.showLoading()
      const payload = { pNidProc: this.nidProc }
      this.$services.SC.loadMokatebatConfirm(payload)
        .then(async ({ data }) => {
          this.loadMokatebatConfirmRes = this.getResponse(data)
          if (this.loadMokatebatConfirmRes.success) {
            this.dataContext = this.loadMokatebatConfirmRes.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
              })
            }
            this.isView = true
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveObj () {
      const tmpWorkflow = {
        StateName: "",
        WorkflowGuid: "00000000-0000-0000-0000-000000000000"
      }
      if (this.taskInfo != null) {
        tmpWorkflow.StateName = this.taskInfo.DtoTask.WorkflowStateName
        tmpWorkflow.WorkflowGuid =
          this.taskInfo.WorkflowInstance.NidWorkflowDeff
      }

      this.dataContext.Sh_MokatebatConfirm.NidProc = this.nidProc
      this.dataContext.Sh_MokatebatConfirm.NidUser = this.getNidUser()
      this.dataContext.Sh_MokatebatConfirm.UserName = this.getUserDisplayName()
      if (!this.dataContext.Sh_MokatebatConfirm.EumManagerConfirmLicence) {
        this.dataContext.Sh_MokatebatConfirm.EumManagerConfirmLicence = 0
      }

      const payload = {
        pMokatebatConfirm: this.dataContext,
        pUser: this.currentUser,
        pDtoWorkflowData: tmpWorkflow
      }

      this.showLoading()
      this.$services.SC.saveMokatebatConfirm(payload)
        .then(async ({ data }) => {
          this.saveMokatebatConfirmRes = this.getResponse(data)
          if (this.saveMokatebatConfirmRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره اطلاعات فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.loadObj()
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async btnShowReportClick ({ dataItem: tmpContext }) {
      const reportTitle =
        this.dataContext.CI_ResourceMokatebatConfirm_List.find(
          (b) => b.ID === tmpContext.CI_ResourceMokatebatConfirm
        )

      if (!reportTitle) return
      const reportPath = `${reportTitle.EngTitle}`
      const queryParams = {
        District: this.selectedNosaziCode.District,
        NidProc: this.selectedRequest.NidProc,
        NIdUser: this.getNidUser()
        // ReportTitle: report.Title
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.confirm,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `تایید مکاتبات در فرم ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
      })
    },

    edit () {
      this.isEditable = true

      this.dataContext.Sh_MokatebatConfirm = {
        CI_ResourceMokatebatConfirm: "",
        Comments: "",
        ConfirmationDate: "",
        ConfirmationTime: "",
        EumManagerConfirmLicence: "",
        NidMokatebatConfirm: "00000000-0000-0000-0000-000000000000",
        NidProc:
          this.taskInfo?.DtoTask?.NidProc ||
          "00000000-0000-0000-0000-000000000000",
        NidUser: this.getNidUser(),
        UserName: this.getUserDisplayName()
      }
    },

    cancel () {
      this.isEditable = false
      this.loadObj()
    }
  },

  async created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  }
}
</script>
