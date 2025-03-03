<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="Information" label="اطلاعات" />
            <tab-menu
              name="DrillingSpecification"
              label="مشخصات عملیات حفاری"
              v-if="false"
            />
            <tab-menu
              name="DrillingMachineSpecificationsExecutiveFactors"
              label="مشخصات دستگاه حفاری و عوامل اجرایی"
            />
            <tab-menu name="Inquiry" label="استعلامات" />

            <tab-menu
              name="LicenseRenewalDescription"
              label="توضیحات تمدید مجوز"
            />
            <tab-menu name="TrafficTools" label="ادوات ترافیکی" />
          </template>
          <tab-content name="Information">
            <fit>
              <Information
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
          <tab-content name="DrillingSpecification">
            <fit>
              <DrillingSpecification
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
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
          <tab-content name="LicenseDescription">
            <fit>
              <LicenseDescription
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
          <tab-content name="LicenseRenewalDescription">
            <fit>
              <LicenseRenewalDescription
                v-model="model"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </fit>
          </tab-content>
          <tab-content name="TrafficTools">
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
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Information from "./partials/Information.vue"
import DrillingSpecification from "./partials/DrillingSpecification.vue"
import DrillingMachineSpecificationsExecutiveFactors from "./partials/DrillingMachineSpecificationsExecutiveFactors.vue"
import Inquiry from "./partials/Inquiry.vue"
import LicenseRenewalDescription from "./partials/LicenseRenewalDescription.vue"
import TrafficTools from "./partials/TrafficTools.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    Information,
    DrillingSpecification,
    DrillingMachineSpecificationsExecutiveFactors,
    Inquiry,
    LicenseRenewalDescription,
    TrafficTools
  },
  data () {
    return {
      name: "URequestServiceRevisitRenewal",
      title: "بازدید تمدید طرح های توسعه",
      formKey: "f870b201-b63d-4a4e-852a-bf03200bd090",
      main: true,
      workflowCompatible: true,

      // #variabels
      model: {
        RevisitRenewal_RequestService: {
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
            CI_Project: 1,
            CI_RedirectName: 103,
            CI_Region: 1,
            CI_RequestType: 0,
            CI_RequesterType: 1,
            CI_SplitType: 1,
            CI_Years: 1402,
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
          RequestService_Inquiry: [],
          RequestService_Instrument: [],
          RequestService_Operations: [],
          RequestService_Time: [],
          UserName: ""
        }
      },
      RequestMessage: {},

      activeTab: "Information"

      // #services
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
      this.$services.excavation
        .getRevisitRenewalRequestService(payload)
        .then(async ({ data }) => {
          this.getRevisitRenewalRequestServiceRes = this.getResponse(data)
          if (this.getRevisitRenewalRequestServiceRes.success) {
            this.model.RevisitRenewal_RequestService =
              this.getRevisitRenewalRequestServiceRes.data.RevisitRenewal_RequestService
            this.model.RevisitRenewal_RequestService.RequestService_Info.CI_RequestType = 1

            // let IsRenewal = this.model.RevisitRenewal_RequestService?.RevisitRenewal_RequestService?.RequestService_Info?.IsRenewal || false
            // let AgainRenewal = this.model.RevisitRenewal_RequestService?.RevisitRenewal_RequestService?.RequestService_Info?.AgainRenewal || false
            let IsRevisitedRenewal = false
            let IsRevisitedAgainRenewal = false
            // if (IsRenewal === true)
            // {
            //   let TmpExtendedProp = this.TaskInfo.ExtendedProp.PropList[0].map(f => f.PropName === "IsFillRevisitTamdid" && f.PropValue === "true")
            //   if (!(TmpExtendedProp === null))
            //   {
            //     IsRevisitedRenewal = true
            //   }
            // }
            // if (AgainRenewal === true)
            // {
            //   let TmpExtendedProp = this.TaskInfo.ExtendedProp.PropList[0].map(f => f.PropName === "IsFillRevisitTamdid2" && f.PropValue === "true")
            //   if (!(TmpExtendedProp === null))
            //   {
            //     IsRevisitedAgainRenewal = true
            //   }
            // }

            if (this.model.RevisitRenewal_RequestService.RequestService_Time.length === 0) {
              let TmpEndDate = this.model.RevisitRenewal_RequestService.RequestServiceMojavez_Time[0].EndDate
              TmpEndDate = this.addDayToDate(TmpEndDate, 1)
              let Tmpphase = this.model.RevisitRenewal_RequestService.RequestServiceMojavez_Time[0].CI_Phase
              this.model.RevisitRenewal_RequestService.RequestService_Time.push(
                {
                  StartDate: TmpEndDate,
                  CI_Phase: Tmpphase,
                  IsRevisitedRenewal: IsRevisitedRenewal,
                  IsRevisitedAgainRenewal: IsRevisitedAgainRenewal
                })
            }
            else
            {
              let MaxEndDate = Math.max(...this.model.RevisitRenewal_RequestService.RequestService_Time.map(i => i.EndDate))
              if (!this.model.RevisitRenewal_RequestService.RequestService_Time.some(i => i.EndDate === "" || i.EndDate === null))
              {
                this.model.RevisitRenewal_RequestService.RequestService_Time[0](i => i.EndDate === MaxEndDate).StatusMaxDate = true
                this.model.RevisitRenewal_RequestService.RequestService_Time[0](i => i.EndDate === MaxEndDate).IsLastRecord = true
              }
              for (let i = 0; i <= this.model.RevisitRenewal_RequestService.RequestService_Time.RequestService_Time.Count - 1; i++)
              {
                this.model.RevisitRenewal_RequestService.RequestService_Time.RequestService_Time[i].IsRevisitedRenewal = IsRevisitedRenewal
                this.model.RevisitRenewal_RequestService.RequestService_Time.RequestService_Time[i].IsRevisitedAgainRenewal = IsRevisitedAgainRenewal
                if (this.model.RevisitRenewal_RequestService.RequestService_Time.RequestService_Time.Count > 1 && this.model.RevisitRenewal_RequestService.RequestService_Time.RequestService_Time[i].EndDate === MaxEndDate)
                {
                  this.model.RevisitRenewal_RequestService.RequestService_Time.RequestService_Time[i].AgainRenewal = true
                }
                else
                {
                  this.model.RevisitRenewal_RequestService.RequestService_Time.RequestService_Time[i].AgainRenewal = false
                }
              }
            }
            this.model.RevisitRenewal_RequestService.RequestService_Time = this.model.RevisitRenewal_RequestService.RequestService_Time.sort((a, b) => new Date(b.StartDate) - new Date(a.StartDate))
            this.mapHandler()
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
          this.showMessage("اطلاعاتی با این کد یافت نشد")
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    mapHandler () {
      this.showLine()
      this.setLayout("half")
    },
    showLine () {
      this.clearMap()
      // این بخش مربوط به نمایش اطلاعات نقشه میباشد که درحال حاضر دیتا را طبق سرا 8 نمایش میدهد. اما اگر نیازمندی دیگری وجود داشت ، بعدا به آن اضافه میگردد
      const wktList = this.model?.RevisitRenewal_RequestService?.Request_Line ?? []
      if (Array.isArray(wktList) && wktList.length > 0) {
        const WKT = wktList[0] ?? ''
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
    saveObj () {
      if (!this.isValidForm()) return

      this.model.RevisitRenewal_RequestService.NidUser =
      this.getNidUser()
      this.model.RevisitRenewal_RequestService.UserName =
      this.getUserDisplayName()

      let RequestMessage = {
        RevisitRenewal_RequestService: this.model.RevisitRenewal_RequestService,
        TaskTitel: this.taskInfo?.TaskTitel ?? "",
        FormName: "URenewalReviewRequestService",
        UserGroups: this.currentUser.UserGroups
      }

      const payload = {
        pRequest: RequestMessage
      }
      this.showLoading()
      this.$services.excavation
        .saveRevisitRenewalRequestService(payload)
        .then(async ({ data }) => {
          this.saveRevisitRenewalRequestServiceRes = this.getResponse(data)
          if (this.saveRevisitRenewalRequestServiceRes.success) {
            this.isEditable = false
            this.loadObj()
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
    licenseInfClick (croquis = "") {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc,
        RequestType: this.model.RevisitRenewal_RequestService.RequestService_Info.CI_RequestType,
        SysCI_LicenseStatus: this.EumLicenseStatus.toString(),
        Koroki: croquis,
        NIdRequest: this.nIdRequest,
        NidUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    }
  }
}
</script>
