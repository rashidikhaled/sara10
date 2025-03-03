<template>
  <form-wrapper>
    <safa-status :result="loadObjRes" />
    <safa-status :result="loadObjRes2" />
    <safa-status :result="getBazdidRes" />
    <fit>
      <div class="q-mb-sm">
        <nosazi-code-input
          label="کدنوسازی"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          label-width="65px"
          m="r"
        />
      </div>
      <safa-tabs v-model="currentTab" fit :bordered="false" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="TotalInformation" label="اطلاعات کلی" />
          <tab-menu name="DrillingSpecification" label="مشخصات حفاری  " />
          <tab-menu
            name="ExecutiveAgentsSpecifications"
            label="مشخصات عوامل اجرایی"
          />
          <tab-menu name="Inquiry" label="استعلامات" />
          <tab-menu
            name="LicenseExtensionDescription"
            label="توضیحات تمدید مجوز"
          />
          <!-- <tab-menu name="Map" label="نقشه" />
          این تب به دلیل پیاده سازی نشدن کامپوننت نقشه کامنت شده است -->
          <tab-menu name="BuildingHistory" label="سوابق شهرسازی ملک" />
          <tab-menu name="TrafficDevices" label="ادوات ترافیکی" />
        </template>
        <tab-content name="TotalInformation">
          <TotalInformation v-model="model" :m="mode" :model2="model2" />
        </tab-content>
        <tab-content name="DrillingSpecification">
          <DrillingSpecification v-model="model" :m="mode" :model2="model2" />
        </tab-content>
        <tab-content name="ExecutiveAgentsSpecifications">
          <ExecutiveAgentsSpecifications
            v-model="model"
            :m="mode"
            :model2="model2"
          />
        </tab-content>
        <tab-content name="Inquiry">
          <Inquiry v-model="model" :m="mode" :model2="model2" />
        </tab-content>
        <tab-content name="LicenseExtensionDescription">
          <LicenseExtensionDescription
            v-model="model"
            :m="mode"
            :model2="model2"
          />
        </tab-content>
        <tab-content name="Map">
          <Map v-model="model" :m="mode" :model2="model2" />
        </tab-content>
        <tab-content name="BuildingHistory">
          <BuildingHistory
            v-model="model"
            :m="mode"
            :model2="model2"
            :gridShahrsazi="gridShahrsazi"
          />
        </tab-content>
        <tab-content name="TrafficDevices">
          <TrafficDevices v-model="model" :m="mode" :model2="model2" />
        </tab-content>
      </safa-tabs>
    </fit>
    <template v-slot:footer v-if="!readOnly">
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveObj"
        @cancel="isEditable = false"
      >
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TotalInformation from "./TotalInformation.vue"
import DrillingSpecification from "./DrillingSpecification.vue"
import ExecutiveAgentsSpecifications from "./ExecutiveAgentsSpecifications.vue"
import Inquiry from "./Inquiry.vue"
import LicenseExtensionDescription from "./LicenseExtensionDescription.vue"
import Map from "./Map.vue"
import BuildingHistory from "./BuildingHistory.vue"
import TrafficDevices from "./TrafficDevices.vue"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  components: {
    TotalInformation,
    DrillingSpecification,
    ExecutiveAgentsSpecifications,
    Inquiry,
    LicenseExtensionDescription,
    Map,
    BuildingHistory,
    TrafficDevices
  },
  props: {
    selectedRow: Object
  },
  data () {
    return {
      currentTab: "DrillingSpecification",

      // Res
      loadObjRes: null,
      loadObjRes2: null,
      saveObjRes: null,
      getBazdidRes: null,

      // var
      gridShahrsazi: [],
      readOnly: false,
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
        ClsRenewal_Request: {
          AreaCode: null,
          ClsIncomeFiche: null,
          ErrorResult: null,
          IsReview: "false",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Request_Contractor: [],
          Request_Info: [],
          Request_Inquiry: [],
          Request_Instrument: [],
          Request_Line: [],
          Request_Operations: [],
          Request_Time: [],
          Request_TimeMojavez: [],
          UserName: null
        },
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
      },
      model2: {
        Delivery: {
          ActualCompletion: {
            ActualCompletionDate: null,
            DeadlineDefect: null,
            GuaranteePeriodEndDate: null,
            IsCheck: false,
            NIdProc: "00000000-0000-0000-0000-000000000000"
          },
          CI_RequesterType: [
            {
              AccessToPayment: "2,1,5,4,3",
              AreaLicense: 0,
              AssurancePriority: 0,
              ComplaintsTel: null,
              ID: 0,
              InquiryTime: 0,
              NumberOfWork: 0,
              Tel: "",
              Title: "نا مشخص"
            },
            {
              AccessToPayment: "1,2,3",
              AreaLicense: 52,
              AssurancePriority: 20,
              ComplaintsTel: null,
              ID: 1,
              InquiryTime: 200,
              NumberOfWork: 10,
              Tel: "",
              Title: "شرکت آب و فاضلاب"
            },
            {
              AccessToPayment: "1,2,3,4,5,6",
              AreaLicense: 8,
              AssurancePriority: 22,
              ComplaintsTel: null,
              ID: 2,
              InquiryTime: 245,
              NumberOfWork: 1,
              Tel: "",
              Title: "شرکت توزيع برق"
            },
            {
              AccessToPayment: null,
              AreaLicense: 67,
              AssurancePriority: 33,
              ComplaintsTel: null,
              ID: 3,
              InquiryTime: 50,
              NumberOfWork: 2,
              Tel: "",
              Title: "معاونت فني و عمراني شهرداري"
            },
            {
              AccessToPayment: null,
              AreaLicense: 5000,
              AssurancePriority: 730,
              ComplaintsTel: "8119520",
              ID: 4,
              InquiryTime: 90,
              NumberOfWork: 30,
              Tel: "135",
              Title: "مخابرات خراسان رضوي"
            },
            {
              AccessToPayment: "1",
              AreaLicense: 7,
              AssurancePriority: 44,
              ComplaintsTel: null,
              ID: 5,
              InquiryTime: 60,
              NumberOfWork: 6,
              Tel: "",
              Title: "شرکت گاز"
            },
            {
              AccessToPayment: "1",
              AreaLicense: 78,
              AssurancePriority: 55,
              ComplaintsTel: null,
              ID: 6,
              InquiryTime: 44,
              NumberOfWork: 4,
              Tel: "",
              Title: "شرکت مخابرات"
            },
            {
              AccessToPayment: null,
              AreaLicense: 34,
              AssurancePriority: 66,
              ComplaintsTel: null,
              ID: 7,
              InquiryTime: 36,
              NumberOfWork: 7,
              Tel: "",
              Title: "سازمان فناوري اطلاعات و ارتباطات شهرداري"
            },
            {
              AccessToPayment: "2,1,6,3",
              AreaLicense: 100,
              AssurancePriority: 730,
              ComplaintsTel: null,
              ID: 8,
              InquiryTime: 90,
              NumberOfWork: 2,
              Tel: "7617011",
              Title: "آب منطقه اي خراسان رضوي"
            },
            {
              AccessToPayment: null,
              AreaLicense: 200,
              AssurancePriority: 730,
              ComplaintsTel: null,
              ID: 9,
              InquiryTime: 90,
              NumberOfWork: 5,
              Tel: "0",
              Title: "سازمان حمل ونقل و ترافيک"
            },
            {
              AccessToPayment: null,
              AreaLicense: 150,
              AssurancePriority: 730,
              ComplaintsTel: null,
              ID: 10,
              InquiryTime: 90,
              NumberOfWork: 10,
              Tel: "0",
              Title: "شرکت هاي قطار شهري مشهد"
            },
            {
              AccessToPayment: null,
              AreaLicense: 30000,
              AssurancePriority: 730,
              ComplaintsTel: "137",
              ID: 11,
              InquiryTime: 90,
              NumberOfWork: 70,
              Tel: "137",
              Title: "شهرداري مشهد"
            },
            {
              AccessToPayment: null,
              AreaLicense: 100,
              AssurancePriority: 730,
              ComplaintsTel: "0",
              ID: 12,
              InquiryTime: 90,
              NumberOfWork: 1,
              Tel: "0",
              Title: "شرکت خطوط لوله و مخابرات نفت"
            },
            {
              AccessToPayment: null,
              AreaLicense: 100,
              AssurancePriority: 730,
              ComplaintsTel: "0",
              ID: 13,
              InquiryTime: 90,
              NumberOfWork: 1,
              Tel: "0",
              Title: "شرکت آب و فاضلاب روستايي مشهد"
            },
            {
              AccessToPayment: null,
              AreaLicense: 200,
              AssurancePriority: 730,
              ComplaintsTel: "0",
              ID: 16,
              InquiryTime: 0,
              NumberOfWork: 5,
              Tel: "0",
              Title: "ساير"
            },
            {
              AccessToPayment: "1",
              AreaLicense: 40,
              AssurancePriority: 730,
              ComplaintsTel: null,
              ID: 17,
              InquiryTime: 90,
              NumberOfWork: 25,
              Tel: "125",
              Title: "سازمان آتش نشاني"
            },
            {
              AccessToPayment: null,
              AreaLicense: 100,
              AssurancePriority: 730,
              ComplaintsTel: "0",
              ID: 18,
              InquiryTime: 90,
              NumberOfWork: 1,
              Tel: "33658520",
              Title: "شرکت انتقال گاز ايران"
            },
            {
              AccessToPayment: null,
              AreaLicense: 100,
              AssurancePriority: 730,
              ComplaintsTel: null,
              ID: 19,
              InquiryTime: 90,
              NumberOfWork: 5,
              Tel: "38497900-4",
              Title: "شرکت ارتباطات زيرساخت"
            }
          ],
          ClsIncomeFiche: null,
          CompanyName: null,
          Consultant: null,
          Delivery: {
            AgentName: null,
            AgentTellNo: null,
            DeliveryDate: null,
            Description: null,
            IsRenewal: false,
            NId: "00000000-0000-0000-0000-000000000000",
            NidUser: null,
            RepairDate: null,
            StrDate: null,
            StrTime: null,
            UserName: null
          },
          DeliveryDefectList: [],
          Delivery_Crimes: [],
          Delivery_Delays: [
            {
              DelaysAllowed: 0,
              Description: "",
              EndDate: null,
              Nid: "00000000-0000-0000-0000-000000000000",
              NidDeliveryDelays: "00000000-0000-0000-0000-000000000000",
              StartDate: "",
              Time: 0
            }
          ],
          Delivery_Inquiry: [],
          Delivery_Installations: [],
          Delivery_Project: null,
          Delivery_Project_License: null,
          ErrorResult: null,
          Lines: [],
          Nid: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          RequestService_Info: null,
          RequestType: 0,
          Request_Info: {
            AgainRenewal: null,
            AreaCode: null,
            CI_DigDelayTime: 0,
            CI_Duration: null,
            CI_RedirectName: null,
            CI_Region: 0,
            CI_RequestType: 0,
            CI_RequesterType: 0,
            CI_SplitType: 0,
            CI_TypeApplicant: null,
            CI_Years: 0,
            CellphoneNo: null,
            CodeString: "",
            ConfilictWithOther: false,
            CreatedRequestID: "00000000-0000-0000-0000-000000000000",
            CreatedRequestName: null,
            DateCancelRequest: null,
            Description: null,
            DigPathLength: 0,
            EntityKey: null,
            EumRequestStatus: null,
            ExportLicenseComments: null,
            ExportLicenseDate: null,
            ExportLicenseMayorComment: null,
            ExportLicenseNo: null,
            ExportingLicenseUserId: null,
            ExportingUserLicense: null,
            IsApproval: false,
            IsDisapprove: null,
            IsRenewal: false,
            IsRevisit: false,
            IsSara10: null,
            LetterDate: null,
            LetterNo: null,
            NIdProc: "00000000-0000-0000-0000-000000000000",
            NIdRequest: "00000000-0000-0000-0000-000000000000",
            NIdWorkItem: 0,
            NidUserCancelRequest: null,
            OriginalLicenseComments: null,
            OriginalLicenseDate: null,
            OriginalLicenseNo: null,
            PostCode: null,
            RequestDate: null,
            RequesterAddress: null,
            RequesterName: null,
            RequesterNationalCode: null,
            RequesterRegion: null,
            SysCI_RequestStatus: 0,
            TelNo: null,
            TimeCancelRequest: null,
            UrbanCI_RequestType: 0,
            UrbanNIdKartablItem: null,
            UrbanNIdRequest: 0,
            UrbanRequestType: null,
            UserNameCancelRequest: null
          },
          SrvGetMaxLengthAllRequest: null,
          StatusSendNextDelivery: false,
          UserName: null
        }
      }
    }
  },
  mounted () {
    this.loadObj()
    this.loadObj2()
  },
  methods: {
    getRenewalRequestNidProc (nidProc = undefined, readOnly = false) {
      this.showLoading()

      let payload = {
        pRequest: {
          NidProc: this.selectedRow.NIdProc
        }
      }
      this.$services.excavation
        .getRenewalRequest(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.GetRenewal_RequestResult
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
    loadObj () {
      this.showLoading()

      let payload = {
        pRequest: {
          NidProc: this.selectedRow.NIdProc
        }
      }
      this.$services.excavation
        .getRenewalRequest(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.GetRenewal_RequestResult

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
    },
    loadObj2 () {
      this.showLoading()

      let payload = {
        pRequest: {
          NidProc: this.selectedRow.NIdProc
        }
      }
      this.$services.excavation
        .getDelivery(payload)
        .then(({ data }) => {
          this.loadObjRes2 = this.getResponse(data)
          if (this.loadObjRes2.success) {
            this.model2 = this.loadObjRes2.data.GetDeliveryResult
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              this.model2.Delivery.Request_Info.CodeString
            )
            if (this.model.ClsRenewal_Request.Request_Line) {
              this.getBazdid()
            }
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
    },
    saveObj () {
      this.showLoading()
      const payload = {
        pRequest: this.model
      }
      this.$services.excavation
        .saveRenewalRequest(payload)
        .then(({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.model = this.saveObjRes.data.SaveRenewal_RequestResult
            // this.loadObj()
            // this.loadObj2()
            this.log({
              action: this.logActions.save,
              bizCode: this.selectedRow.NIdWorkItem,
              bizCodeTitle: "NIdWorkItem",
              saveDesc: `درخواست تقاضای تحویل موقت برای درخواست با شماره پیگیری NIdWorkItem ${this.selectedRow.NIdWorkItem}`
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
