<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper>
      <safa-status :result="loadObjRes" />
      <safa-tabs v-model="currentTab" fit :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="TotalInformation" label="اطلاعات کلی" />
          <tab-menu name="DrillingSpecification" label="مشخصات حفاری" />
          <tab-menu
            name="ExecutiveAgentsSpecifications"
            label="مشخصات عوامل اجرایی"
          />
          <tab-menu name="Inquiry" label="استعلامات" />
          <tab-menu name="DescriptionRenewal" label="توضیحات تمدید مجوز" />
          <tab-menu name="BuildingHistory" label="سوابق شهرسازی ملک" />
          <tab-menu name="TrafficTools" label="ادوات ترافیکی" />
        </template>

        <tab-content name="TotalInformation">
          <TotalInformation v-model="model" :rowSelectData="rowSelectData" />
        </tab-content>
        <tab-content name="DrillingSpecification">
          <DrillingSpecification
            v-model="model"
            :rowSelectData="rowSelectData"
          />
        </tab-content>
        <tab-content name="ExecutiveAgentsSpecifications">
          <ExecutiveAgentsSpecifications
            v-model="model"
            :rowSelectData="rowSelectData"
          />
        </tab-content>
        <tab-content name="Inquiry">
          <Inquiry v-model="model" :rowSelectData="rowSelectData" />
        </tab-content>
        <tab-content name="DescriptionRenewal">
          <DescriptionRenewal v-model="model" :rowSelectData="rowSelectData" />
        </tab-content>
        <tab-content name="BuildingHistory">
          <BuildingHistory v-model="model" :rowSelectData="rowSelectData" />
        </tab-content>
        <tab-content name="TrafficTools">
          <TrafficTools v-model="model" :rowSelectData="rowSelectData" />
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TotalInformation from "./partials/TotalInformation"
import DrillingSpecification from "./partials/DrillingSpecification"
import ExecutiveAgentsSpecifications from "./partials/ExecutiveAgentsSpecifications"
import DescriptionRenewal from "./partials/DescriptionRenewal"
import BuildingHistory from "./partials/BuildingHistory"
import Inquiry from "./partials/Inquiry"
import TrafficTools from "./partials/TrafficTools"
export default {
  mixins: [baseFormMixin],
  components: {
    TotalInformation,
    DrillingSpecification,
    ExecutiveAgentsSpecifications,
    Inquiry,
    DescriptionRenewal,
    BuildingHistory,
    TrafficTools
  },
  props: {
    rowSelectData: Object
  },
  computed: {},
  data () {
    return {
      model: {},
      loadObjRes: null,
      currentTab: "TotalInformation"
    }
  },
  created () {
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
        .getRenewalRequest(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.GetRenewal_RequestResult
            console.log("this.model", this.model)

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
