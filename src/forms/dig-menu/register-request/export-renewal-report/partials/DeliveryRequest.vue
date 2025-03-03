<template>
  <safa-form :id="formKey" :caption="title">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadRes" />
        <safa-status :result="saveRes" />
      </template>
      <fit>
        <safa-tabs v-model="currentTab" fit :bordered="false" :padding="false">
          <template v-slot:tabs>
            <tab-menu name="TotalInfo" label="اطلاعات کلی" />
            <tab-menu name="DamagesInquiry" label="استعلام خسارت" />
            <tab-menu name="DeficienciesDeclaration" label="اعلام نواقص" />
          </template>
          <tab-content name="TotalInfo">
            <TotalInfo
              :title="title"
              :formKey="formKey"
              :name="name"
              v-model="model.Delivery"
              :m="mode"
            />
          </tab-content>
          <tab-content name="DamagesInquiry">
            <DamagesInquiry
              :title="title"
              :formKey="formKey"
              :name="name"
              v-model="model.Delivery"
            />
          </tab-content>
          <tab-content name="DeficienciesDeclaration">
            <DeficienciesDeclaration
              :title="title"
              :formKey="formKey"
              :name="name"
              v-model="model.Delivery"
            />
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
            <btn-delete label="اطلاعات مجوز" @click="reportHandler" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
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
    formKey: String,
    title: String,
    name: String,
    selectedRow: Object
  },
  data () {
    return {
      // #values
      currentTab: "TotalInfo",
      newBtnActive: true,
      model: {
        Delivery: {
          CI_RequesterType: {
            CI_RequesterType: [
              {
                AccessToPayment: "2,1,5,4,3",
                AreaLicense: 0,
                AssurancePriority: 0,
                ComplaintsTel: "",
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
                ComplaintsTel: "",
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
                ComplaintsTel: "",
                ID: 2,
                InquiryTime: 245,
                NumberOfWork: 1,
                Tel: "",
                Title: "شرکت توزيع برق"
              },
              {
                AccessToPayment: "",
                AreaLicense: 67,
                AssurancePriority: 33,
                ComplaintsTel: "",
                ID: 3,
                InquiryTime: 50,
                NumberOfWork: 2,
                Tel: "",
                Title: "معاونت فني و عمراني شهرداري"
              },
              {
                AccessToPayment: "",
                AreaLicense: 5000,
                AssurancePriority: 730,
                ComplaintsTel: 8119520,
                ID: 4,
                InquiryTime: 90,
                NumberOfWork: 30,
                Tel: 135,
                Title: "مخابرات خراسان رضوي"
              },
              {
                AccessToPayment: 1,
                AreaLicense: 7,
                AssurancePriority: 44,
                ComplaintsTel: "",
                ID: 5,
                InquiryTime: 60,
                NumberOfWork: 6,
                Tel: "",
                Title: "شرکت گاز"
              },
              {
                AccessToPayment: 1,
                AreaLicense: 78,
                AssurancePriority: 55,
                ComplaintsTel: "",
                ID: 6,
                InquiryTime: 44,
                NumberOfWork: 4,
                Tel: "",
                Title: "شرکت مخابرات"
              },
              {
                AccessToPayment: "",
                AreaLicense: 34,
                AssurancePriority: 66,
                ComplaintsTel: "",
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
                ComplaintsTel: "",
                ID: 8,
                InquiryTime: 90,
                NumberOfWork: 2,
                Tel: 7617011,
                Title: "آب منطقه اي خراسان رضوي"
              },
              {
                AccessToPayment: "",
                AreaLicense: 200,
                AssurancePriority: 730,
                ComplaintsTel: "",
                ID: 9,
                InquiryTime: 90,
                NumberOfWork: 5,
                Tel: 0,
                Title: "سازمان حمل ونقل و ترافيک"
              },
              {
                AccessToPayment: "",
                AreaLicense: 150,
                AssurancePriority: 730,
                ComplaintsTel: "",
                ID: 10,
                InquiryTime: 90,
                NumberOfWork: 10,
                Tel: 0,
                Title: "شرکت هاي قطار شهري مشهد"
              },
              {
                AccessToPayment: "",
                AreaLicense: 30000,
                AssurancePriority: 730,
                ComplaintsTel: 137,
                ID: 11,
                InquiryTime: 90,
                NumberOfWork: 70,
                Tel: 137,
                Title: "شهرداري مشهد"
              },
              {
                AccessToPayment: "",
                AreaLicense: 100,
                AssurancePriority: 730,
                ComplaintsTel: 0,
                ID: 12,
                InquiryTime: 90,
                NumberOfWork: 1,
                Tel: 0,
                Title: "شرکت خطوط لوله و مخابرات نفت"
              },
              {
                AccessToPayment: "",
                AreaLicense: 100,
                AssurancePriority: 730,
                ComplaintsTel: 0,
                ID: 13,
                InquiryTime: 90,
                NumberOfWork: 1,
                Tel: 0,
                Title: "شرکت آب و فاضلاب روستايي مشهد"
              },
              {
                AccessToPayment: "",
                AreaLicense: 200,
                AssurancePriority: 730,
                ComplaintsTel: 0,
                ID: 16,
                InquiryTime: 0,
                NumberOfWork: 5,
                Tel: 0,
                Title: "ساير"
              },
              {
                AccessToPayment: 1,
                AreaLicense: 40,
                AssurancePriority: 730,
                ComplaintsTel: "",
                ID: 17,
                InquiryTime: 90,
                NumberOfWork: 25,
                Tel: 125,
                Title: "سازمان آتش نشاني"
              },
              {
                AccessToPayment: "",
                AreaLicense: 100,
                AssurancePriority: 730,
                ComplaintsTel: 0,
                ID: 18,
                InquiryTime: 90,
                NumberOfWork: 1,
                Tel: 33658520,
                Title: "شرکت انتقال گاز ايران"
              },
              {
                AccessToPayment: "",
                AreaLicense: 100,
                AssurancePriority: 730,
                ComplaintsTel: "",
                ID: 19,
                InquiryTime: 90,
                NumberOfWork: 5,
                Tel: "38497900-4",
                Title: "شرکت ارتباطات زيرساخت"
              }
            ]
          },
          CompanyName: "",
          Consultant: "",
          Delivery: {
            AgentName: "",
            AgentTellNo: "",
            DeliveryDate: "",
            Description: "",
            IsRenewal: false,
            NId: "00000000-0000-0000-0000-000000000000",
            NidUser: "",
            RepairDate: "",
            StrDate: "",
            StrTime: "",
            UserName: ""
          },
          DeliveryDefectList: [],
          Delivery_Inquiry: [],
          RequestService_Info: {
            AgainRenewal: "",
            AreaCode: "",
            Boulevard: 1,
            ByAlley: 1,
            ByStreet: 1,
            CI_DigDelayTime: 0,
            CI_ExtendedDue: 0,
            CI_Project: 1,
            CI_RedirectName: 103,
            CI_Region: 1,
            CI_RequestType: 0,
            CI_RequesterType: 1,
            CI_SplitType: 0,
            CI_Years: 1402,
            ConfilictWithOther: false,
            CreatedRequestID: "00000000-0000-0000-0000-000000000000",
            CreatedRequestName: "",
            DateCancelRequest: "",
            Description: null,
            DigPathLength: 1,
            District: 0,
            EntityKey: "",
            EumRequestStatus: 2,
            ExportLicenseComments: "",
            ExportLicenseDate: "",
            ExportLicenseMayorComment: "",
            ExportLicenseNo: null,
            ExportingLicenseUserId: "",
            ExportingUserLicense: "",
            FollowerCellphoneNo: 1,
            IsApproval: true,
            IsDisapprove: "",
            IsEvents: false,
            IsRenewal: false,
            IsRevisit: true,
            IsSara10: "",
            LetterDate: "",
            LetterNo: "",
            MainAlley: 1,
            MainStreet: 1,
            NIdProc: "00000000-0000-0000-0000-000000000000",
            NIdRequestService: "00000000-0000-0000-0000-000000000000",
            NIdWorkItem: 0,
            NidUserCancelRequest: "",
            OriginalLicenseComments: "",
            OriginalLicenseDate: "",
            OriginalLicenseNo: "",
            Region: 0,
            RequestServiceDate: "",
            RequestServiceerName: "",
            RequestServiceerRegion: "",
            RequesterRegion: 1,
            SysCI_RequestServiceStatus: 0,
            TimeCancelRequest: "",
            UrbanCI_RequestServiceType: 0,
            UrbanNIdKartablItem: 0,
            UrbanNIdRequestService: 0,
            UrbanRequestServiceType: "",
            UserNameCancelRequest: ""
          }
        }
      },

      // #services
      loadRes: null,
      saveRes: null
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
          this.loadRes = this.getResponse(data)
          if (this.loadRes.success) {
            this.model = this.loadRes.data.GetDeliveryResult
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.NIdWorkItem,
              bizCodeTitle: "NIdWorkItem"
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
      this.showDeliveryRequest = true
    },
    saveObj () {
      this.showLoading()
      const payload = {
        pRequest: this.model
      }
      this.$services.excavation
        .saveDelivery(payload)
        .then(({ data }) => {
          this.saveRes = this.getResponse(data)
          if (this.saveRes.success) {
            this.log({
              action: this.logActions.save,
              bizCode: this.selectedRow.NIdWorkItem,
              bizCodeTitle: "NIdWorkItem"
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
    async reportHandler () {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`
      const selectedRow = this.selectedRow
      const queryParams = {
        NIdProc: selectedRow.NIdProc,
        RequestType: selectedRow.RequestType,
        SysCI_LicenseStatus: selectedRow.SysCI_PaymentType,
        Koroki: selectedRow.Croquis ?? "",
        NIdRequest:
          this.loadedObject.Delivery.RequestService_Info?.NIdRequestService ??
          "00000000-0000-0000-0000-000000000000"
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NIdWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    }
  }
}
</script>
