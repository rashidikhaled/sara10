<template>
  <safa-form :id="formKey" :caption="title">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadRes" />
      </template>
      <fit>
        <safa-tabs v-model="currentTab" fit :bordered="false" :padding="false">
          <template v-slot:tabs>
            <tab-menu name="Info" label="اطلاعات" />
            <tab-menu
              name="SpecificationsOfDrillingMachineAndexecutiveFactors"
              label="مشخصات دستگاه حفاری و عوامل اجرایی"
            />
            <tab-menu name="Inquiry" label="استعلامات" />
            <tab-menu
              name="LicenseExtensionDescription"
              label="توضیحات تمدید مجوز"
            />
            <!-- <tab-menu name="Map" label="نقشه" /> -->
            <tab-menu name="TrafficDevices" label="ادوات ترافیکی" />
          </template>
          <tab-content name="Info">
            <Info
              :title="title"
              :formKey="formKey"
              :name="name"
              v-model="model.ClsRenewal_RequestService"
              :m="mode"
            />
          </tab-content>
          <tab-content
            name="SpecificationsOfDrillingMachineAndexecutiveFactors"
          >
            <SpecificationsOfDrillingMachineAndexecutiveFactors
              :title="title"
              :formKey="formKey"
              :name="name"
              v-model="model.ClsRenewal_RequestService"
            />
          </tab-content>
          <tab-content name="Inquiry">
            <Inquiry
              :title="title"
              :formKey="formKey"
              :name="name"
              :m="mode"
              v-model="model.ClsRenewal_RequestService"
            />
          </tab-content>
          <tab-content name="LicenseExtensionDescription">
            <LicenseExtensionDescription
              :m="mode"
              :title="title"
              :formKey="formKey"
              :name="name"
              v-model="model.ClsRenewal_RequestService.RequestService_Info"
            />
          </tab-content>
          <tab-content name="Map">
            <!-- <RenewalRequestMap :title="title" :formKey="formKey" :name="name" /> -->
          </tab-content>
          <tab-content name="TrafficDevices">
            <TrafficDevices
              :title="title"
              :formKey="formKey"
              :name="name"
              v-model="model.ClsRenewal_RequestService"
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
import mapMixin from "src/mixins/mapMixin"
import Info from "./Info.vue"
import SpecificationsOfDrillingMachineAndexecutiveFactors from "./SpecificationsOfDrillingMachineAndexecutiveFactors.vue"
import Inquiry from "./Inquiry.vue"
import LicenseExtensionDescription from "./LicenseExtensionDescription.vue"
// import RenewalRequestMap from "./RenewalRequestMap.vue"
import TrafficDevices from "./TrafficDevices.vue"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    Info,
    SpecificationsOfDrillingMachineAndexecutiveFactors,
    Inquiry,
    LicenseExtensionDescription,
    // RenewalRequestMap,
    TrafficDevices
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
      currentTab: "Info",
      newBtnActive: true,
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
        .getRenewalRequestService(payload)
        .then(({ data }) => {
          this.loadRes = this.getResponse(data)
          if (this.loadRes.success) {
            this.model = this.loadRes.data.GetRenewal_RequestServiceResult
            if (this.model.Polygon) {
              this.showWKT({ WKT: this.model.Polygon ?? "" })
              this.setLayout("half")
            } else this.setLayout("full")
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
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      let payload = {
        pRequest: this.model
      }
      this.$services.excavation
        .saveRenewalRequestService(payload)
        .then(({ data }) => {
          this.saveRes = this.getResponse(data)
          if (this.saveRes.success) {
            this.isEditable = false
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
          this.model.Delivery.RequestService_Info?.NIdRequestService ??
          "00000000-0000-0000-0000-000000000000"
      }
      await this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NIdWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    }
  }
}
</script>
