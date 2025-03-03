
<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getRevisitRequestServiceWithNidProcRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="getBaseParvandehInfoRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab" fit>
          <template v-slot:tabs>
            <tab-menu name="totlaInfoTab" label="اطلاعات کلی" />
            <tab-menu name="drillingInfoTab" label="مشخصات عملیات حفاری" />
            <tab-menu
              name="executInfoTab"
              label="مشخصات دستگاه حفار و عوامل اجرایی"
            />
            <tab-menu name="inquiryTab" label="استعلامات" />
            <tab-menu name="descriptionTab" label="توضیحات مجوز" />
            <tab-menu name="trafficInstrumentTab" label="ادوات ترافیکی" />
          </template>
          <tab-content name="totlaInfoTab">
            <TotlaInfo
              v-model="model"
              :docInfo="documentInfo"
              :m="mode"
              ref="generalInformation"
            />
          </tab-content>
          <tab-content name="drillingInfoTab">
            <DrillingSpecification
              v-model="model"
              :m="mode"
            />
          </tab-content>
          <tab-content name="executInfoTab">
            <ExecutiveAgentsSpecification v-model="model.ClsRevisit_RequestService" :m="mode" />
          </tab-content>
          <tab-content name="inquiryTab" :padding="false">
            <Inquiry
              v-model="model.ClsRevisit_RequestService"
              :m="mode"
              @inquiryHandler="report"
            />
          </tab-content>
          <tab-content name="descriptionTab">
            <fit>
              <text-template
                label="توضیحات"
                label-width="80px"
                v-model="
                  model.ClsRevisit_RequestService.RequestService_Info
                    .ExportLicenseComments
                "
                cdcName="ExportLicenseComments"
                type="textarea"
                fit
                :m="mode"
              />
            </fit>
          </tab-content>
          <tab-content name="trafficInstrumentTab" :padding="false">
            <TrafficTools v-model="model.ClsRevisit_RequestService" :m="mode" />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer v-if="!readOnly">
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template #before>
            <btn-default label="نمایش نقشه" @click="mapHandler" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "../../../../mixins/mapMixin"
import DrillingSpecification from "./partials/DrillingSpecification.vue"
import ExecutiveAgentsSpecification from "./partials/ExecutiveAgentsSpecification.vue"
import Inquiry from "./partials/Inquiry.vue"
import TotlaInfo from "./partials/TotlaInfo.vue"
import TrafficTools from "./partials/TrafficTools"
export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    DrillingSpecification,
    ExecutiveAgentsSpecification,
    Inquiry,
    TotlaInfo,
    TrafficTools
  },
  data () {
    return {
      name: "URevisitRequestEvents",
      title: "بررسی و بازدید اتفاقات",
      formKey: "5428C9E0-2E47-4037-92B5-5474A332FBC8",
      main: true,
      workflowCompatible: true,

      // #services
      getRevisitRequestServiceWithNidProcRes: null,
      saveObjRes: null,
      getBaseParvandehInfoRes: null,

      // #variables
      activeTab: "totlaInfoTab",
      drawingLengthModal: false,
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
      nidWorkflowDeff: "",
      documentInfo: { RequesterAddress: "", PostCode: "" },
      procInfo: "",
      isValidNosaziCode: "",
      RequestMessage: {},

      // model
      model: {
        ClsRevisit_RequestService: {
          RequestService_Info: {
            confilictWithOther: false,
            AgainRenewal: "",
            AreaCode: "",
            Boulevard: "",
            ByAlley: "",
            ByStreet: "",
            CI_DigDelayTime: 0,
            CI_ExtendedDue: 0,
            CI_Project: 0,
            CI_RedirectName: 0,
            CI_Region: 0,
            CI_RequestType: 0,
            CI_RequesterType: null,
            CI_SplitType: 0,
            CI_Years: 1402,
            CreatedRequestName: " ",
            DateCancelRequest: "",
            Description: "",
            DigPathLength: 0,
            District: 0,
            EntityKey: "",
            EumRequestStatus: 2,
            ExportLicenseComments: null,
            ExportLicenseDate: "",
            ExportLicenseMayorComment: "",
            ExportLicenseNo: "",
            ExportingLicenseUserId: "",
            ExportingUserLicense: "",
            FollowerCellphoneNo: "",
            IsApproval: false,
            IsDisapprove: "",
            IsEvents: true,
            IsRenewal: false,
            IsRevisit: true,
            IsSara10: "",
            LetterDate: "",
            LetterNo: "",
            MainAlley: "",
            MainStreet: "",
            Region: 0,
            RequestServiceDate: "",
            RequestServiceerName: "",
            RequestServiceerRegion: "",
            RequesterRegion: "",
            SysCI_RequestServiceStatus: 0,
            TimeCancelRequest: "",
            UrbanCI_RequestServiceType: 0,
            UrbanNIdKartablItem: 0,
            UrbanNIdRequestService: 0,
            UrbanRequestServiceType: "",
            UserNameCancelRequest: ""
          },
          RegionPrice: null,
          RequestService_Operations: [],
          RequestService_Time: [],
          RequestService_Contractor: [],
          RequestService_Inquiry: [],
          RequestService_Instrument: [],
          RequestService_Line: []
        }
      }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.setLayout("half")
      setTimeout(() => {
        this.loadObj()
      }, 250)
    } else {
      this.hideSidebar(this.name)
      this.showError("هیچ درخواستی در کارتابل انتخاب نشده است.")
    }
    // this.setMapDefault()
  },
  methods: {
    loadObj () {
      this.isEditable = false
      this.search()
    },
    async search () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "e1205ea9-0d6e-463a-a518-bc9564384476"
        }
      }
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRevisitRequestServiceWithNidProc(
            payload
          )
        this.getRevisitRequestServiceWithNidProcRes = this.getResponse(data)
        if (this.getRevisitRequestServiceWithNidProcRes.success) {
          if (
            this.getRevisitRequestServiceWithNidProcRes.data
              .GetRevisit_RequestServiceWithNidProcResult === null &&
            this.getRevisitRequestServiceWithNidProcRes.data
              .GetRevisit_RequestServiceWithNidProcResult
              .ClsRevisit_RequestService === null
          ) {
            this.showError("اطلاعاتی با این کد یافت نشد")
            return
          } else {
            this.model =
              this.getRevisitRequestServiceWithNidProcRes.data.GetRevisit_RequestServiceWithNidProcResult
          }
          const wktList =
            this.model.ClsRevisit_RequestService.RequestService_Line ?? []
          if (Array.isArray(wktList) && wktList.length > 0) {
            const WKT = wktList[0].Line ?? ""
            this.showWKT({ WKT }, true, null, null, "digline")
          }
          // this.showLine()
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
          })
          if (this.selectedRequest && this.isNewRequest === false) {
            await this.getRequestInfoWithNidProc()
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getRequestInfoWithNidProc () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "e1205ea9-0d6e-463a-a518-bc9564384476"
        }
      }
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRevisitRequestServiceWithNidProc(
            payload
          )
        this.getRevisitRequestServiceWithNidProcRes = this.getResponse(data)
        if (this.getRevisitRequestServiceWithNidProcRes.success) {
          if (
            this.getRevisitRequestServiceWithNidProcRes.data
              .GetRevisit_RequestServiceWithNidProcResult === null &&
            this.getRevisitRequestServiceWithNidProcRes.data
              .GetRevisit_RequestServiceWithNidProcResult
              .ClsRevisit_RequestService === null
          ) {
            this.showError("اطلاعاتی با این کد یافت نشد")
            return
          } else {
            this.model =
              this.getRevisitRequestServiceWithNidProcRes.data.GetRevisit_RequestServiceWithNidProcResult
          }
          const wktList =
            this.model.ClsRevisit_RequestService.RequestService_Line ?? []
          if (Array.isArray(wktList) && wktList.length > 0) {
            const WKT = wktList[0].Line ?? ""
            this.showWKT({ WKT }, true, null, null, "digline")
          }
          // this.showLine()
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getRevisitRequestWithNidProc () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
          // NidProc: "e1205ea9-0d6e-463a-a518-bc9564384476"
        }
      }
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRevisitRequestWithNidProc(
            payload
          )
        this.getRevisitRequestServiceWithNidProcRes = this.getResponse(data)
        if (this.getRevisitRequestServiceWithNidProcRes.success) {
          if (
            this.getRevisitRequestServiceWithNidProcRes.data
              .GetRevisit_RequestServiceWithNidProcResult === null &&
            this.getRevisitRequestServiceWithNidProcRes.data
              .GetRevisit_RequestServiceWithNidProcResult
              .ClsRevisit_RequestService === null
          ) {
            this.showError("اطلاعاتی با این کد یافت نشد")
            return
          } else {
            this.model =
              this.getRevisitRequestServiceWithNidProcRes.data.GetRevisit_RequestServiceWithNidProcResult
          }
          const wktList =
            this.model.ClsRevisit_RequestService.RequestService_Line ?? []
          if (Array.isArray(wktList) && wktList.length > 0) {
            const WKT = wktList[0].Line ?? ""
            this.showWKT({ WKT }, true, null, null, "digline")
          }
          // this.showLine()
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async report (data) {
      // درسرا8 دیتایی موجود نبود جهت تست این مورد
      // طبق زمل کامل است
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`
      const queryParams = {
        NId: data.NIdInquiryService,
        RequestType: "1" // طبق زمل
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: data?.NidDelivery_Inquiry,
        bizCodeTitle: "NidDelivery_Inquiry",
        saveDesc: `مشاهده گزارش برای شماره ${data.No} انجام گردید.`
      })
    },
    // normaliedRequestTimeSaving () {
    //   let normaliedRequestTime = this.model.ClsRevisit_RequestService.RequestService_Time.map(
    //     (e) => {
    //       return {
    //         ...e,
    //         StartDate: e.StartDateExtension,
    //         EndDate: e.EndDateExtension
    //       }
    //     }
    //   )
    //   this.model.ClsRevisit_RequestService.RequestService_Time = normaliedRequestTime
    // },
    async saveObj () {
      if (this.model.ClsRevisit_RequestService.RequestService_Contractor.some((s) => s.NIdCompany === null)) return this.showError("اطلاعات مشخصات عملیات اجرایی به درستی وارد نشده است.")
      // طبق زمل کامل است
      this.model.ClsRevisit_RequestService.RequestService_Operations.forEach(
        (i) => {
          i.RegionPrice = parseFloat(this.model.ClsRevisit_RequestService.RequestService_Operations[0].RegionPrice)
        }
      )

      this.RequestMessage.ClsRevisit_RequestService =
        this.model.ClsRevisit_RequestService
      this.RequestMessage.UserName = this.getUserDisplayName() || ""
      this.RequestMessage.TaskTitel = this.taskInfo?.DtoTask?.TaskTitel ?? ""
      this.RequestMessage.FormName = "URevisit_Request_Events"
      this.RequestMessage.UserGroups = this.currentUser.UserGroups

      const payload = {
        pRequest: this.RequestMessage
      }
      try {
        this.showLoading()
        if (!this.isValidForm()) return
        const { data } =
          await this.$services.excavation.saveRevisitRequestService(payload)
        this.saveObjRes = this.getResponse(data)
        if (this.saveObjRes.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          // this.loadObj()
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} ذخیره شد.`
          })
          this.isEditable = false
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    // Map
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
    },
    // showLine () {
    //   this.clearMap()
    //   const wktList =
    //     this.model?.ClsRevisit_RequestService?.RequestService_Line ?? []
    //   if (Array.isArray(wktList) && wktList.length > 0) {
    //     const lineObj = wktList.filter((f) => f.Line)[0]
    //     const WKT = lineObj?.Line ?? ""
    //     this.$KaisMap.StrEDITWKT = WKT
    //     this.showWKT({ WKT }, false)
    //     this.mapZoom(19)
    //   }
    // },
    mapHandler () {
      const wktList =
        this.model.ClsRevisit_RequestService.RequestService_Line ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0].Line ?? ""
        this.showWKT({ WKT }, true, null, null, "digline")
      }
      this.setLayout("half")
    }
  },
  beforeDestroy () {
    this.$KaisMap.Clear()
    this.$KaisMap.ClearAllThings()
    this.$KaisMap.ClearMeasure()
    this.setLayout("full")
  }
}
</script>
