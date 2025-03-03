<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getRenewalRequestServiceRes" />
        <safa-status :result="saveRenewalRequestServiceRes" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="Information" label="اطلاعات" />
            <!-- <tab-menu
              name="DrillingSpecification"
              label="مشخصات عملیات حفاری"
              v-if="false"
            /> -->
            <tab-menu
              name="DrillingMachineSpecificationsExecutiveFactors"
              label="مشخصات دستگاه حفاری و عوامل اجرایی"
            />
            <tab-menu name="Inquiry" label="استعلامات" />
            <!-- <tab-menu
              name="LicenseDescription"
              label="توضیحات مجوز"
              v-if="false"
            /> -->
            <!-- <tab-menu
              name="LicenseRenewalDescription"
              label="توضیحات تمدید مجوز"
              v-if="false"
            /> -->
            <tab-menu name="TrafficTools" label="ادوات ترافیکی" />
          </template>
          <tab-content name="Information">
            <fit>
              <Information
                v-model="model"
                :formKey="formKey"
                :m="mode"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
          <!-- <tab-content name="DrillingSpecification">
            <fit>
              <DrillingSpecification
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content> -->
          <tab-content name="DrillingMachineSpecificationsExecutiveFactors">
            <fit>
              <DrillingMachineSpecificationsExecutiveFactors
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
                :m="mode"
              />
            </fit>
          </tab-content>
          <tab-content name="Inquiry">
            <fit>
              <Inquiry
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
          <!-- <tab-content name="LicenseDescription">
            <fit>
              <LicenseDescription
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content> -->
          <!-- <tab-content name="LicenseRenewalDescription">
            <fit>
              <LicenseRenewalDescription
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content> -->
          <tab-content name="TrafficTools" :padding="false">
            <fit>
              <TrafficTools
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template v-if="!isEditable">
            <btn-default
              label="اطلاعات مجوز"
              @click="licenseInfClick"
            ></btn-default>
            <btn-default label="نمایش نقشه" @click="mapHandler" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Information from "./partials/Information.vue"
import mapMixin from "src/mixins/mapMixin"
// import DrillingSpecification from "./partials/DrillingSpecification.vue"
import DrillingMachineSpecificationsExecutiveFactors from "./partials/DrillingMachineSpecificationsExecutiveFactors.vue"
import Inquiry from "./partials/Inquiry.vue"
// import LicenseDescription from "./partials/LicenseDescription.vue"
// import LicenseRenewalDescription from "./partials/LicenseRenewalDescription.vue"
import TrafficTools from "./partials/TrafficTools.vue"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    Information,
    // DrillingSpecification,
    DrillingMachineSpecificationsExecutiveFactors,
    Inquiry,
    // LicenseDescription,
    // LicenseRenewalDescription,
    TrafficTools
  },
  data () {
    return {
      name: "URenewalReviewRequestService",
      title: "ویرایش زمان تمدید طرح های توسعه",
      formKey: "FBE419F8-3988-4284-9C8C-BAA091F11ABA",
      main: true,
      workflowCompatible: true,

      // #variabels
      Information: "LicenseSpecifications",
      model: {
        ClsRenewal_RequestService: {
          AreaCode: "",
          ClsIncomeFiche: "",
          IsReview: false,
          NIdRequestService: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          RequestServiceMojavez_Time: [],
          RequestService_Contractor: [],
          RequestService_Info: {
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
            CI_RequesterType: 0,
            CI_SplitType: 0,
            CI_Years: 0,
            ConfilictWithOther: false,
            CreatedRequestID: "00000000-0000-0000-0000-000000000000",
            CreatedRequestName: "",
            DateCancelRequest: "",
            Description: "",
            DigPathLength: null,
            District: 0,
            EntityKey: "",
            EumRequestStatus: 2,
            ExportLicenseComments: "",
            ExportLicenseDate: "",
            ExportLicenseMayorComment: "",
            ExportLicenseNo: null,
            ExportingLicenseUserId: "",
            ExportingUserLicense: "",
            FollowerCellphoneNo: null,
            IsApproval: true,
            IsDisapprove: "",
            IsEvents: false,
            IsRenewal: false,
            IsRevisit: true,
            IsSara10: "",
            LetterDate: "",
            LetterNo: "",
            MainAlley: null,
            MainStreet: null,
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
          },
          RequestService_Line: {},
          RequestService_Inquiry: [],
          RequestService_Instrument: [],
          RequestService_Operations: [],
          RequestService_Time: [],
          UserName: ""
        }
      },
      activeTab: "Information",

      // #services
      getRenewalRequestServiceRes: null,
      saveRenewalRequestServiceRes: null
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.loadObj()
    }
  },

  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc
        }
      }
      debugger
      this.$services.excavation
        .getRenewalRequestService(payload)
        .then(async ({ data }) => {
          this.getRenewalRequestServiceRes = this.getResponse(data)
          if (this.getRenewalRequestServiceRes.success) {
            let value = this.getRenewalRequestServiceRes.data.GetRenewal_RequestServiceResult
            if (value !== null) {
              this.model = value
              this.model.ClsRenewal_RequestService.RequestService_Info.CI_RequestType = 1
              if (
                // eslint-disable-next-line eqeqeq
                this.model.ClsRenewal_RequestService.RequestService_Time.length == 0 &&
                this.model.ClsRenewal_RequestService.RequestService_Info
                  .ExportLicenseDate
              ) {
                let TmpEndDate = this.model.ClsRenewal_RequestService.RequestServiceMojavez_Time[0]?.EndDate
                let TmpPhase = this.model.ClsRenewal_RequestService.RequestServiceMojavez_Time[0]?.CI_Phase
                this.model.ClsRenewal_RequestService.RequestService_Time.StartDate = TmpEndDate
                this.model.ClsRenewal_RequestService.RequestService_Time.CI_Phase = TmpPhase
              }
            } else {
              this.showMessage("اطلاعاتی با این کد یافت نشد")
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
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
    async saveObj () {
      const taskInfo = (this.taskInfo || this.selectedRequest?.Task[0]) ?? null
      this.model.ClsRenewal_RequestService.NidUser = this.getNidUser()
      this.model.ClsRenewal_RequestService.UserName = this.getUserDisplayName()
      const payload = {
        // ClsRenewal_RequestService: this.model.ClsRenewal_RequestService,
        pRequest: {
          ...this.model,
          TaskTitel: taskInfo?.TaskTitel,
          FormName: "URenewalReviewRequestService",
          UserGroups: this.currentUser.UserGroups
        }
      }
      debugger
      this.showLoading()
      this.$services.excavation
        .saveRenewalRequestService(payload)
        .then(async ({ data }) => {
          this.saveRenewalRequestServiceRes = this.getResponse(data)
          if (this.saveRenewalRequestServiceRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} ذخیره شد.`
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
    async licenseInfClick () {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`
      const selectedRow = this.selectedRequest
      const queryParams = {
        NIdProc: selectedRow.NIdProc,
        RequestType: selectedRow.RequestType,
        SysCI_LicenseStatus: selectedRow.SysCI_PaymentType,
        Koroki: selectedRow.Croquis ?? "",
        NIdRequest:
          this.model.ClsRenewal_RequestService.RequestService_Info
            ?.NIdRequestService ?? "00000000-0000-0000-0000-000000000000"
      }
      await this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NIdWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    },
    showLine () {
      this.clearMap()
      // این بخش مربوط به نمایش اطلاعات نقشه میباشد که درحال حاضر دیتا را طبق سرا 8 نمایش میدهد. اما اگر نیازمندی دیگری وجود داشت ، بعدا به آن اضافه میگردد
      const wktList =
        this.model?.ClsRenewal_RequestService?.RequestService_Line ?? []

      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0].Line ?? ""
        // this.$KaisMap.StrEDITWKT = WKT
        // this.showWKT({ WKT }, false)
        this.showWKT({ WKT }, false, {
          line: {
            dashed: true
          }
        })
        this.mapZoom(19)
      }
    },
    clearMap () {
      this.$KaisMap.StrEDITWKT = ""
      this.$KaisMap.Clear()
      this.mapZoom(5)
    },
    mapHandler () {
      this.showLine()
      this.setLayout("half")
    }
  },
  beforeDestroy () {
    this.$KaisMap.Clear()
    this.$KaisMap.ClearAllThings()
    this.$KaisMap.ClearMeasure()
    this.clearMap()
    this.setLayout("full")
  }
}
</script>
