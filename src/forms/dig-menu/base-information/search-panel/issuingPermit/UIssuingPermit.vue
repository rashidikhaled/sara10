<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper>
      <safa-status :result="getLicenceExportRes" />
      <safa-status :result="saveCommentsRes" />
      <safa-status :result="saveMayorCommentsRes" />
      <safa-tabs v-model="currentTab" fit :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="LicenseSpecification" label="مشخصات مجوز" />
          <tab-menu name="Calculations" label="محاسبات" />
          <tab-menu name="DescriptionLicense" label="توضیحات مجوز" />
        </template>

        <tab-content name="LicenseSpecification">
          <LicenseSpecification v-model="model" />
        </tab-content>
        <tab-content name="Calculations">
          <Calculations v-model="model" />
        </tab-content>
        <tab-content name="DescriptionLicense">
          <DescriptionLicense
            v-model="model"
            @saveExportLicenseComments="saveExportLicenseComments"
            @saveExportLicenseMayorCommen="saveExportLicenseMayorCommen"
          />
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import LicenseSpecification from "./partials/LicenseSpecification"
import DescriptionLicense from "./partials/DescriptionLicense"
import Calculations from "./partials/Calculations"
export default {
  mixins: [baseFormMixin],
  components: { LicenseSpecification, Calculations, DescriptionLicense },
  props: {
    rowSelectData: Object
  },
  computed: {},
  data () {
    return {
      title: "صدور مجوز حفاری انشعابات شخصی",
      name: "UIssuingPermit",
      model: {},
      getLicenceExportRes: null,
      saveCommentsRes: null,
      saveMayorCommentsRes: null,
      currentTab: "LicenseSpecification"
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
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
          DoNotChangeConfirmDate: "false",
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
          NidProc: this.rowSelectData?.NIdProc || "",
          NidWorkItem: "0",
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
          CheckApprovalDate: "false",
          CodeString: null,
          Date: null,
          EumAccountingDocumentingCause: "0",
          EumLicenseStatus: "1",
          EumObjOnPrice: "0",
          FicheNo: "0",
          InquiryDay: "0",
          IsApproval: "false",
          IsBaygani: "false",
          IsConfirm: "false",
          IsDelivery: "false",
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
      this.showLoading()
      this.$services.excavation
        .getLicenceExport(payload)
        .then(({ data }) => {
          this.getLicenceExportRes = this.getResponse(data)
          if (this.getLicenceExportRes.success) {
            this.model = this.getLicenceExportRes.data.GetLicenceExportResult
            // await this.log({
            //   action: this.logActions.save,
            //   bizCode: "",
            //   bizCodeTitle: "search"
            // })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveExportLicenseComments (Comments) {
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
          Comments: Comments || "",
          Delivery: null,
          DoNotChangeConfirmDate: "false",
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
          NidProc: this.rowSelectData?.NIdProc || "",
          NidWorkItem: "0",
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
          CheckApprovalDate: "false",
          CodeString: null,
          Date: "1402/08/21",
          EumAccountingDocumentingCause: "0",
          EumLicenseStatus: "1",
          EumObjOnPrice: "0",
          FicheNo: "0",
          InquiryDay: "0",
          IsApproval: "false",
          IsBaygani: "false",
          IsConfirm: "false",
          IsDelivery: "false",
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
      this.showLoading()
      this.$services.excavation
        .saveExportLicenseComments(payload)
        .then(({ data }) => {
          this.saveCommentsRes = this.getResponse(data)
          if (this.saveCommentsRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            // await this.log({
            //   action: this.logActions.save,
            //   bizCode: "",
            //   bizCodeTitle: "search"
            // })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveExportLicenseMayorCommen (MayorCommen) {
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
          Comments: MayorCommen || "",
          Delivery: null,
          DoNotChangeConfirmDate: "false",
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
          NidProc: this.rowSelectData?.NIdProc || "",
          NidWorkItem: "0",
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
          CheckApprovalDate: "false",
          CodeString: null,
          Date: "1402/08/21",
          EumAccountingDocumentingCause: "0",
          EumLicenseStatus: "1",
          EumObjOnPrice: "0",
          FicheNo: "0",
          InquiryDay: "0",
          IsApproval: "false",
          IsBaygani: "false",
          IsConfirm: "false",
          IsDelivery: "false",
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
      this.showLoading()
      this.$services.excavation
        .saveExportLicenseMayorComment(payload)
        .then(({ data }) => {
          this.saveMayorCommentsRes = this.getResponse(data)
          if (this.saveMayorCommentsRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            // await this.log({
            //   action: this.logActions.save,
            //   bizCode: "",
            //   bizCodeTitle: "search"
            // })
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
