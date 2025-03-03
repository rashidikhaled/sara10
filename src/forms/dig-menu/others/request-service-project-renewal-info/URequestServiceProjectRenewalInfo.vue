<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getLicenceInfoRes" />
        <safa-status :result="getLicenceExportRes" />
      </template>
      <fit>
        <RequestProjectRenewalInfo v-model="model" />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import RequestProjectRenewalInfo from "src/forms/dig-menu/others/request-project-renewal-info/partials/RequestProjectRenewalInfo.vue"

export default {
  mixins: [baseFormMixin],
  components: { RequestProjectRenewalInfo },
  data () {
    return {
      name: "URequestServiceProjectRenewalInfo",
      title: "مشخصات تمديد پروژه طرح توسعه",
      formKey: "1FB50776-CACD-4A9C-9B6A-8CCE2E562528",
      main: true,
      workflowCompatible: true,

      // #variabels
      model: {
        ClsLicense: {
          ExportLicenseInfo: {
            License_AsphaltCoating: []
          },
          ClsIncomeFiche: {
            Income_Fiche: []
          }
        }
      },

      // #services
      getLicenceInfoRes: null,
      getLicenceExportRes: null
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    async loadObj () {
      this.showLoading()
      const results = await Promise.allSettled([
        this.getLicenceInfo(),
        this.getLicenceExport()
      ])
      let getLicenceInfoRes = {}
      let getLicenceExportRes = {}

      if (results[0].status === "fulfilled") {
        getLicenceInfoRes = results[0].value
      } else this.getLicenceInfoRes = this.getResponse(results[0])

      if (results[1].status === "fulfilled") {
        getLicenceExportRes = results[1].value
      } else this.getLicenceExportRes = this.getResponse(results[1])

      // let IsApproval = false
      // let IsDisapprove = false
      // let Nidrequest = '00000000-0000-0000-0000-000000000000'
      // let EumRequestStatus = 0
      let IsRenewal = false
      let AgainRenewal = false
      if (this.getLicenceExportRes.ClsExportLicense.Request_Info !== null)
      {
        // IsApproval = this.getLicenceExportRes.data.ClsExportLicense.Request_Info.IsApproval
        // IsDisapprove = this.getLicenceExportRes.ClsExportLicense.Request_Info.IsDisapprove ?? false
        // Nidrequest = this.getLicenceExportRes.ClsExportLicense.Request_Info.NIdRequest
        // EumRequestStatus = this.getLicenceExportRes.ClsExportLicense.Request_Info.EumRequestStatus ?? 0
        IsRenewal = this.getLicenceExportRes.ClsExportLicense?.Request_Info?.IsRenewal ?? false
        AgainRenewal = this.getLicenceExportRes.ClsExportLicense?.Request_Info?.AgainRenewal ?? false
      }
      else if (this.getLicenceExportRes.ClsExportLicense.RequestService_Info !== null)
      {
        // IsApproval = this.getLicenceExportRes.ClsExportLicense.RequestService_Info.IsApproval
        // IsDisapprove = this.getLicenceExportRes.ClsExportLicense.RequestService_Info.IsDisapprove ?? false
        // Nidrequest = this.getLicenceExportRes.ClsExportLicense.RequestService_Info.NIdRequestService
        // EumRequestStatus = this.getLicenceExportRes.ClsExportLicense.RequestService_Info.EumRequestStatus ?? 0
        IsRenewal = this.getLicenceExportRes.ClsExportLicense?.RequestService_Info?.IsRenewal ?? false
        AgainRenewal = this.getLicenceExportRes.ClsExportLicense?.RequestService_Info?.AgainRenewal ?? false

        if (AgainRenewal)
        {
          this.ficheGridHeader = "صدور فیش (تمدید دوم)"
        }
        else if (IsRenewal)
        {
          this.ficheGridHeader = "صدور فیش (تمدید اول)"
        }
      }

      await this.log({
        action: this.logActions.view,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
      })

      // TODO: این فرم نیاز به شماره درخواست دارد و تکمیل نیست
      // TODO: شماره درخواستی از سرا 8 دریافت شد 380864 حاوی دیتا نمی باشد که قرار شد آقای زاهد شماره درخواست معتبر اعلام کنند.

      console.log(getLicenceInfoRes)
      console.log(getLicenceExportRes)
      this.hideLoading()
    },
    getLicenceInfo () {
      return new Promise(async (resolve, reject) => {
        const res = await this.$services.excavation.getLicenceInfo({
          pRequest: {
            DoNotChangeConfirmDate: false,
            NidProc: this.selectedRequest.NidProc, // "448cc365-b77c-4493-897a-f1ad9ee3f2e9",
            EumAccountingDocumentingCause: 0,
            EumLicenseStatus: 1, // در زمل به همین صورت هارد کد قرار داده شده است
            EumObjOnPrice: 0,
            FicheNo: 0,
            InquiryDay: 0,
            IssuancecostsRequestType: 1 // در زمل به همین صورت هارد کد قرار داده شده است
          }
        })
        if (res.data.success) {
          return resolve(res.data.GetLicenceInfoResult)
        } else {
          return reject(res.data)
        }
      })
    },
    getLicenceExport () {
      return new Promise(async (resolve, reject) => {
        const res = await this.$services.excavation.getLicenceExport({
          pRequest: {
            DoNotChangeConfirmDate: false,
            NidProc: this.selectedRequest.NidProc, // "448cc365-b77c-4493-897a-f1ad9ee3f2e9",
            NidWorkItem: 0,
            Skip: 0,
            Take: 0,
            CI_Bank: 0,
            CheckApprovalDate: false,
            EumAccountingDocumentingCause: 0,
            EumLicenseStatus: 2, // در زمل به همین صورت هارد کد قرار داده شده است
            EumObjOnPrice: 0,
            FicheNo: 0,
            InquiryDay: 0,
            IssuancecostsRequestType: 1 // در زمل به همین صورت هارد کد قرار داده شده است
          }
        })
        if (res.data.success) {
          return resolve(res.data.GetLicenceExportResult)
        } else {
          return reject(res.data)
        }
      })
    }
  }
}
</script>
