<template>
  <form-wrapper :padding="false" title="تایید استعلام">
    <template #header>
      <safa-status :result="loadObjRes1" />
      <safa-status :result="loadObjRes2" />
      <safa-status :result="getBazdidRes" />
      <form-header-by-nosazi-code
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
        m="r"
      />
    </template>
    <fit>
      <safa-tabs v-model="currentTab" fit :bordered="false" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="TotalInformation" label="اطلاعات کلی" />
          <tab-menu name="DrillingSpecification" label="مشخصات حفاری" />
          <tab-menu
            name="ExecutiveAgentsSpecifications"
            label="مشخصات عوامل اجرایی"
          />
          <tab-menu name="Inquiry" label="استعلامات" />
          <tab-menu
            name="BuildingHistory"
            label="سوابق شهرسازی ملک و تایید درخواست"
          />
          <!-- <tab-menu name="Map" label="نقشه" />
          این تب به دلیل پیاده سازی نشدن کامپوننت نقشه کامنت شده است -->
        </template>
        <tab-content name="TotalInformation">
          <TotalInformation v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="DrillingSpecification">
          <DrillingSpecification v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="ExecutiveAgentsSpecifications">
          <ExecutiveAgentsSpecifications
            v-model="model"
            :m="mode"
          />
        </tab-content>
        <tab-content name="Inquiry">
          <Inquiry v-model="model" :m="mode" />
        </tab-content>
        <!-- <tab-content name="Map">
          <Map v-model="model" :m="mode"/>
        </tab-content> -->
        <tab-content name="BuildingHistory" :padding="false">
          <BuildingHistory :gridShahrsazi="gridShahrsazi" />
        </tab-content>
      </safa-tabs>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TotalInformation from "./partials/TotalInformation.vue"
import DrillingSpecification from "./partials/DrillingSpecification.vue"
import ExecutiveAgentsSpecifications from "./partials/ExecutiveAgentsSpecifications.vue"
import Inquiry from "./partials/Inquiry.vue"
import BuildingHistory from "./partials/BuildingHistory.vue"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  components: {
    TotalInformation,
    DrillingSpecification,
    ExecutiveAgentsSpecifications,
    Inquiry,
    BuildingHistory
  },
  props: {
    selectedItem: Object
  },
  data () {
    return {
      currentTab: "TotalInformation",

      // Res
      loadObjRes1: null,
      loadObjRes2: null,
      getBazdidRes: null,

      // var
      gridShahrsazi: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // model
      model: {
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
        ClsRequest_Info: {
          Base_ShahrsaziArchive: null,
          ClsIncomeFiche: null,
          ErrorResult: null,
          IsSendCheck: "false",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          NidWorkflowDeff: "00000000-0000-0000-0000-000000000000",
          Request_Contractor: [],
          Request_Info: [],
          Request_Inquiry: [],
          Request_Line: [],
          Request_Operations: [],
          Request_Time: []
        },
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
        NidProc: "00000000-0000-0000-0000-000000000000",
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
        AllRequestService_RunMonitoringHeaders: null,
        AllRequest_RunMonitoringHeaders: null,
        AssignRequesterToUser: null,
        Baygani: null,
        CI_RedirectName: null,
        ClsAccountingDocNotSent: null,
        ClsCancelRenewal: null,
        ClsIssuancecosts: null,
        ErrorResult: {
          BizErrors: null,
          Requirements: null
        },
        IncomeFicheList: null,
        IncomeFiches: null,
        ListCI_Region: null,
        ListConfrimFiche: null,
        Polygon: null,
        RunMonitoringKartabl: null,
        SerachInBlackList: null,
        VBlackList_Ifo: null,
        VCompany_Info: null,
        VRequester_RedirectName: null
      }
    }
  },
  mounted () {
    this.loadObj1()
  },
  methods: {
    async loadObj1 () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRequestInfoWithNidProc({
            pRequest: { NidProc: this.selectedItem.NIdProc }
          })
        this.loadObjRes1 = this.getResponse(data)
        if (this.loadObjRes1.success) {
          this.model = this.loadObjRes1.data.GetGetRequest_InfoWithNidProcResult
          debugger
          this.baseNosaziCode = convertStringToNosaziCodeObject(
            this.loadObjRes1.data.GetGetRequest_InfoWithNidProcResult
              .ClsRequest_Info.Request_Info.CodeString
          )
          this.getBazdid()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getBazdid () {
      try {
        const payload = {
          pNosaziCode: {
            District: this.baseNosaziCode.District,
            Region: this.baseNosaziCode.Region,
            Block: this.baseNosaziCode.Block,
            House: this.baseNosaziCode.House,
            Building: this.baseNosaziCode.Building,
            Apartment: this.baseNosaziCode.Apartment,
            Shop: this.baseNosaziCode.Shop
          },
          pLoadFunc: "Base_ShahrsaziArchive"
        }
        this.showLoading()
        const { data } = await this.$services.SC.getBaseParvandehInfo(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.getBazdidRes = this.getResponse(data)
        if (this.getBazdidRes.success) {
          this.gridShahrsazi =
            this.getBazdidRes.data.Base_ParvandehInfo.Base_ShahrsaziArchive
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
