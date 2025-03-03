<template>
  <form-wrapper title="ثبت درخواست تحویل موقت انشعابات">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
    </template>
    <fit>
      <safa-tabs v-model="currentTab" fit :bordered="false" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="TotalInfo" label="اطلاعات کلی" />
          <tab-menu name="DamagesInquiry" label="استعلام خسارت" />
          <tab-menu name="DeficienciesDeclaration" label="اعلام نواقص" />
        </template>
        <tab-content name="TotalInfo">
          <TotalInfo :m="mode" v-model="model" />
        </tab-content>
        <tab-content name="DamagesInquiry">
          <DamagesInquiry :m="mode" v-model="model" />
        </tab-content>
        <tab-content name="DeficienciesDeclaration">
          <DeficienciesDeclaration :m="mode" v-model="model" />
        </tab-content>
      </safa-tabs>
    </fit>
    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveObj"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <btn-delete label="اطلاعات مجوز" @click="BtnReport_Click(selectedRow)" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TotalInfo from "./TotalInfo.vue"
import DamagesInquiry from "./DamagesInquiry.vue"
import DeficienciesDeclaration from "./DeficienciesDeclaration.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    TotalInfo,
    DamagesInquiry,
    DeficienciesDeclaration
  },
  props: {
    selectedRow: Object
  },
  data () {
    return {
      main: true,
      currentTab: "TotalInfo",
      newBtnActive: true,
      result: null,

      loadObjRes: null,
      saveObjRes: null,
      model: {
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
            CodeString: null,
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
  },
  methods: {
    loadObj () {
      this.showLoading()

      let payload = {
        pRequest: {
          NidProc: this.selectedRow.NIdProc
        }
      }
      this.$services.excavation
        .getDelivery(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.GetDeliveryResult
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
        .saveDelivery(payload)
        .then(({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
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
    async BtnReport_Click (data) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`

      const queryParams = {
        NIdProc: data.NIdProc,
        RequestType: data.RequestType,
        SysCI_LicenseStatus: data.SysCI_PaymentType,
        Koroki: data.Koroki ?? '',
        NIdRequest: this.model.Delivery.RequestService_Info?.NIdRequestService ?? "00000000-0000-0000-0000-000000000000"
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: data.NIdProc,
        bizCodeTitle: "NIdProc"
      })
    }
  }
}
</script>
