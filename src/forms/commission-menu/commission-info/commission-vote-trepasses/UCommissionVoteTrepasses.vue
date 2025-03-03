<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title" :padding="false">
    <safa-status :result="result" />
    <fit>
      <safa-datatable
        fit
        :columns="commissionVoteTrepassesColumns"
        m="r"
        height="100%"
        max-height="100%"
        min-height="200px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        paginate
        :bordered="false"
        v-model="Grid_vote"
        cdcName="GridVote"
        ref="commissionVoteTrepassesref"
      />

      <FormRow class="q-mt-sm q-pa-sm">
        <FormControl>
          <safa-text
            v-model="TxtUsername"
            cdcName="TxtUsername"
            label="کاربر ایجاد کننده"
            label-width="80px"
            m="e"
          />
        </FormControl>
        <FormControl>
          <safa-text
            cdcName="txtdate"
            v-model="txtdate"
            label="تاریخ / زمان"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            cdcName="txtmetrajkol"
            v-model="txtmetrajkol"
            label="متراژ کل"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            cdcName="txtmetrajkasr"
            v-model="txtmetrajkasr"
            label="متراژ کسر شده"
            label-width="80px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            cdcName="txtmetrajkolkasr"
            v-model="txtmetrajkolkasr"
            label="متراژ کل تخلفات باقیمانده"
            label-width="80px"
            m="r"
          />
        </FormControl>

        <text-template
          label="توضیحات"
          label-width="80px"
          cdcName="txtcomment"
          v-model="txtcomment"
          formKey="43f636df-a44d-467c-982c-a08e7626f5d0"
          class="col-12"
          :rows="4"
          :m="mode"
        />
      </FormRow>
    </fit>

    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        saveButtonTitle="کسر از آمار"
        @save="saveObj"
      >
        <btn-default label="گزارش" @click="btnReportClick" />
      </form-actions>
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
      title: "کسر از آمار",
      name: "UCommissionVoteTrepasses",
      formKey: "3bba1b7c-30a3-4f23-8dc6-e920b7b2274d",
      main: true,

      // #region variables
      selectedRow: null,
      commissionVoteTrepassesColumns: [
        { field: "VotePriority", title: "ترتیب صدور", width: "100px" },
        {
          field: "CI_VoteType",
          title: "نوع رای",
          editor: "combo",
          domain: "Commission",
          width: "150px"
        },
        { field: "VoteValue", title: "مقدار رای", width: "150px" },
        {
          field: "VoteValueAmar",
          title: "مقدار رای پس از کسر آمار",
          width: "150px"
        },
        { field: "VoteNo", title: "شماره رای", width: "150px" },
        {
          field: "VoteDate",
          title: "تاریخ رای",
          width: "150px",
          editor: "date"
        },
        { field: "Vote_Comments", title: "شرح رای", width: "400px" }
      ]
      // model: {
      //   GetCommissionVoteTrepasses: {
      //     PReques: {
      //       ADP_Commission: null,
      //       Agent: null,
      //       AgentType: null,
      //       Agents: null,
      //       CICommission: null,
      //       CIRegion: null,
      //       CI_Commission: null,
      //       CI_CommissionType: null,
      //       CI_TreepassType: null,
      //       CI_VoteType: null,
      //       CheckExistVoteToArchiveByNidCommission: false,
      //       CheckExistVoteToArchiveByReportName: false,
      //       ClsChartRequestReport: null,
      //       ClsCommission_ApposeVote: null,
      //       ClsCommission_BlankList: null,
      //       ClsCommission_ExecutTrackingVote: null,
      //       ClsCommission_Impart: null,
      //       ClsCommission_Info: null,
      //       ClsCommission_LegalProxy: null,
      //       ClsCommission_Proclamation: null,
      //       ClsGetAllTaskResponse: null,
      //       ClsTemporaryArchive: null,
      //       ClsTokens: null,
      //       ClsTrepasses: null,
      //       CommissionAfter: null,
      //       CommissionFilter: null,
      //       CommissionInfo: null,
      //       CommissionInfos: null,
      //       CommissionTrepasses: null,
      //       CommissionVoteOfAgent: null,
      //       CommissionVoteOfAgentAll: null,
      //       Commission_LegalProxyExecutionOrder: null,
      //       Commission_LegalProxyExtension: null,
      //       Commission_Relapse: null,
      //       DomainName: null,
      //       ExpertName: null,
      //       IsActive: false,
      //       IsSara10: false,
      //       ListCommissionVoteOfAgent: null,
      //       NIDCommission: "00000000-0000-0000-0000-000000000000",
      //       NIDVote: "00000000-0000-0000-0000-000000000000",
      //       NidProc: "00000000-0000-0000-0000-000000000000",
      //       NidProcAhkam: "00000000-0000-0000-0000-000000000000",
      //       OwnerCellNo: null,
      //       OwnerNationalCodeCommissionList: null,
      //       OwnerTelNo: null,
      //       ReferenceToLegalExpertList: null,
      //       ReportName: null,
      //       Requester: null,
      //       Token: null,
      //       Tokens: null,
      //       UserStates: null,
      //       AllBizCode: null,
      //       CI_Region: null,
      //       CI_Regions: null,
      //       ClsSMS: null,
      //       CommissiomnAnalyze: null,
      //       CommissionCapacity: null,
      //       CommissionHoliday: null,
      //       CommissionStatus: 0,
      //       CommissionToken: null,
      //       CommissionTrepass_HistoryRelapse: null,
      //       CommissionVote: null,
      //       Commission_Agent_Signature: null,
      //       Commission_Appose: null,
      //       Commission_Archive: null,
      //       Commission_CheckList: null,
      //       Commission_ConfirmVotes: null,
      //       Commission_Inquiry: null,
      //       Commission_PrintLog: null,
      //       Commission_VoteList: null,
      //       Commission_VoteTrepasses: [],
      //       CurrentCity: null,
      //       ErrorResult: null,
      //       GetAgent: null,
      //       GetAllVotesAndTrepass: null,
      //       GraphResult: null,
      //       GraphVoteDate: null,
      //       IsMoghayerat: false,
      //       MapDetails: null,
      //       PageInfo: null,
      //       PersianDateServer: "1402\/07\/04",
      //       PersianTimeServer: " PT10H28M25.6460676S",
      //       RandomCode: null,
      //       RegionAnalyze: null,
      //       Search: null,
      //       Status: null,
      //       TotalFiles: 0,
      //       TrepassAnalyze: null,
      //       UrbanDetails: null,
      //       UserInfo: null,
      //       ViolatorsAnalyze: null,
      //       WFHistory: null
      //     }
      //   }
      // }
      // #endregion
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.isEditable = false
      this.showLoading()
      const payload = {
        PRequest: {
          NIDCommission: "00000000-0000-0000-0000-000000000000",
          NIDVote: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.commissions
        .getCommissionVoteTrepasses(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model = res.data.GetCommissionVoteTrepassesResult
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async btnReportClick () {
      const reportPath =
        "/commision/RptCommissionAmar"
      const queryParams = {
        NidCommission: this.model.NidCommission,
        NidUser: this.getNidUser(),
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidFiche,
        bizCodeTitle: "NidFiche",
        saveDesc: `نمایش گزارش اطلاعات فرم ${this.title} انجام گردید.`
      })
    },
    saveObj () {
      this.showError("هیچ تخلفی انتخاب نشده است.")

      // if (this.$refs.commissionVoteTrepassesref.selectedRow.length === 0) {

      // } else if (
      //   this.txtcommentref === null
      // ) {
      //   this.showError("لطفا توضیحات را وارد نمایید")
      // } else if (
      //   this.$refs
      // ) {
      //   this.showError("لطفا مقدار کسر شده را وارد نمایید")
      // }
      // this.showLoading()
      // const payload = { pRequest: { ...this.model } }
      // this.$services.commissions.SaveCommissionVoteAmar(payload)
      //   .then(({ data }) => {
      //     this.SaveObjRes = this.getResponse(data)
      //     if (this.SaveObjRes.success) {
      //       this.isEditable = false
      //       this.loadObj()
      //       this.getCommissionService()
      //       this.showSuccess("عملیات با موفقیت انجام شد.")
      //       this.log({
      //         action: this.logActions.view,
      //         bizCode: "",
      //         bizCodeTitle: ""
      //       })
      //     }
      //   })
      //   .catch((ex) => {
      //     console.error(ex)
      //     this.serverError()
      //   })
      //   .finally(() => {
      //     this.hideLoading()
      //   })
    },
    clickRow (value) {
      this.selectedRow = value
      this.isClickedRow = true
    }
  }
}
</script>
