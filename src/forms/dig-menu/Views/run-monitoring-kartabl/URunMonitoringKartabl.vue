<template>
  <safa-form :id="formKey" :caption="title" app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902">
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
      </template>
      <fit>
        <safa-grid
          helper="colRunMonitoringKartabl"
          :m="mode"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          v-model="gridValue"
        >
        <template v-slot:header>
          <q-icon
            style="position: relative; right: -5px; font-size: 18px"
            @click="loadObj"
            color="primary"
            name="find_replace"
            title="بازآوری"
            class="cursor-pointer"
          />
        </template>
        </safa-grid>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "کارتابل نظارت",
      formKey: "45668E4F-1E22-4358-82C7-5E5EADF78A9A",
      name: "URunMonitoringKartabl",
      main: true,

      // #variables
      model: null,
      gridValue: [],

      // #services
      loadObjRes: null
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          AcceptInquiry: null,
          ClsAsphaltLabLevel1: null,
          ClsAsphaltLabLevel2: null,
          ClsAssignRequestToUser: null,
          ClsBankFile: null,
          ClsBankWebService: null,
          ClsBlackList: null,
          ClsCheckList: null,
          ClsCheckProcSend: null,
          ClsCommitteeLicense: null,
          ClsCompany_Info: null,
          ClsEPayWS: null,
          ClsExportLicense: null,
          ClsExportLicenseReport: null,
          ClsIncomeFiche: null,
          ClsIncome_Payment: null,
          ClsInstallment: null,
          ClsLicense: null,
          ClsOddmentAccount: null,
          ClsPerformanceEstimate: null,
          ClsRenewal_Request: null,
          ClsRenewal_RequestService: null,
          ClsRequestService_Info: null,
          ClsRequestService_RunMonitoring: null,
          ClsRequest_Info: null,
          ClsRequest_RunMonitoring: null,
          ClsRevisit_Request: null,
          ClsRevisit_RequestService: null,
          ClsSearchEngine: null,
          Comments: null,
          Delivery: null,
          DoNotChangeConfirmDate: false,
          ExportLicenseDate: null,
          ExportLicenseNo: null,
          ExportRenewalReport: null,
          FormName: null,
          InActiveInquiriesReport: null,
          Inquiry: null,
          InquiryReport: null,
          InquiryReportRenewed: null,
          NIdRequest: "00000000-0000-0000-0000-000000000000",
          NIdRequestInfoService: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidWorkItem: "0",
          RType: null,
          PredicateCondition: null,
          RevisitRenewal_Request: null,
          RevisitRenewal_RequestService: null,
          Skip: "0",
          StateTag: null,
          Take: "0",
          TaskSchedulerTime: null,
          TaskTitel: null,
          UserGroups: null,
          UserName: null,
          WorkflowStateName: null,
          BillID: null,
          CI_Bank: "0",
          CheckApprovalDate: false,
          CodeString: null,
          Date: null,
          EumAccountingDocumentingCause: "0",
          EumLicenseStatus: "0",
          EumObjOnPrice: "0",
          FicheNo: "0",
          InquiryDay: "0",
          IsApproval: false,
          IsBaygani: false,
          IsConfirm: false,
          IsDelivery: false,
          IssuancecostsRequestType: "0",
          LicensColumns: null,
          NIdBlackList: "00000000-0000-0000-0000-000000000000",
          NIdFiche: "00000000-0000-0000-0000-000000000000",
          NIdRunMonitoringHeader: "00000000-0000-0000-0000-000000000000",
          NIdTask: "00000000-0000-0000-0000-000000000000",
          NidBaygani: "00000000-0000-0000-0000-000000000000",
          NidCompany: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          PaymentID: null
        }
      }
      this.$services.excavation
        .getRunMonitoringKartabl(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.gridValue = this.loadObjRes.data
              .GetRunMonitoringKartablResult.RunMonitoringKartabl.RunMonitoringKartablItems.map(x => {
                const r = { ...x }
                if (r.RType === 1) {
                  r.RTypeTitle = "انشعابات شخصی"
                } else {
                  r.RTypeTitle = "طرح های توسعه"
                }
                return r
              }) ?? []
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
