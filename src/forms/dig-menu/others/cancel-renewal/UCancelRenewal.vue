<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="cancelRenewalRes" />
        <safa-status :result="getRequestForCancelRenewalRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="کد ارجاع"
              v-model="model.ClsCancelRenewal.RequestData.NidWorkItem"
              label-width="80px"
              cdcName="NidWorkItem"
              m="r"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نوع حفاری"
              v-model="model.ClsCancelRenewal.RequestData.DigType"
              label-width="80px"
              cdcName="DigType"
              m="r"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره مجوز"
              v-model="model.ClsCancelRenewal.RequestData.ExportLicenseNo"
              label-width="80px"
              cdcName="ExportLicenseNo"
              m="r"
            />
          </FormControl>
        </FormRow>
        <FormRow>
          <FormControl>
            <safa-text
              label="تاریخ مجوز"
              v-model="model.ClsCancelRenewal.RequestData.ExportLicenseDate"
              label-width="80px"
              cdcName="ExportLicenseDate"
              m="r"
            />
          </FormControl>
        </FormRow>
      </fit>
      <template v-slot:footer>
        <btn-default label="ابطال تمدید" @click="cancelClick" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "UCancelRenewal",
      title: "ابطال تمدید",
      formKey: "208D9492-0706-465A-A23B-2454273DCFDD",
      main: true,
      workflowCompatible: true,

      // vsriables
      model: {
        ClsCancelRenewal: {
          RequestData: {
            NidWorkItem: "",
            DigType: "",
            ExportLicenseNo: "",
            ExportLicenseDate: ""
          }
        }
      },

      // services
      cancelRenewalRes: null,
      getRequestForCancelRenewalRes: null
    }
  },
  mounted () {
    if (this.$isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.excavation
        .getRequestForCancelRenewal({
          pRequest: { NidProc: this.selectedRequest.NidProc }
        })
        .then(async ({ data }) => {
          this.getRequestForCancelRenewalRes = this.getResponse(data)
          if (this.getRequestForCancelRenewalRes.success) {
            this.model =
              this.getRequestForCancelRenewalRes.data.GetRequestForCancelRenewalResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات فرم  ${this.title} برای در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
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
    cancelClick () {
      this.showConfirm("آیا از تأیید سال تسویه اطمینان دارید؟").onOk(() => {
        const payload = {
          pRequest: {
            NidProc: this.selectedRequest?.NidProc,
            NIdRequest: "00000000-0000-0000-0000-000000000000",
            NidUser: this.getNidUser()
          }
        }
        this.showLoading()
        this.$services.excavation
          .cancelRenewal(payload)
          .then(async ({ data }) => {
            this.cancelRenewalRes = this.getResponse(data)
            if (this.cancelRenewalRes.success) {
              await this.log({
                action: this.logActions.cancel,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `عملیات ابطال در فرم ${this.title} برای در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
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
      })
    }
  }
}
</script>
