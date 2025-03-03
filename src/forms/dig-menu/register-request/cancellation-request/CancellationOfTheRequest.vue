<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <FormWrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="cancelRenewalRes" />
      </template>

      <fit>
        <FormRow>
          <FormControl>
            <safa-text
              label="کد ارجاع"
              label-width="80px"
              m="r"
              v-model="model.ClsCancelRenewal.RequestData.NidWorkItem"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نوع حفاری"
              label-width="80px"
              m="r"
              v-model="model.ClsCancelRenewal.RequestData.DigType"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره مجوز "
              label-width="80px"
              m="r"
              v-model="model.ClsCancelRenewal.RequestData.ExportLicenseNo"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="تاریخ مجوز"
              label-width="80px"
              m="r"
              v-model="model.ClsCancelRenewal.RequestData.ExportLicenseDate"
            />
          </FormControl>
        </FormRow>
      </fit>
      <template v-slot:footer>
        <btn-cancel label="ابطال تمدید" @click="cancel" :disabled="false" />
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
const defualtModel = {
  ClsCancelRenewal: {
    RequestData: {
      NidWorkItem: "",
      DigType: "",
      ExportLicenseNo: "",
      ExportLicenseDate: ""
    }
  }
}

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "انصراف از درخواست تمدید یا تحویل",
      formKey: "6C68F555-2AA0-4F9B-B3AF-F8D8F5EC5C18",
      name: "CancellationOfTheRequest",
      main: true,
      model: { ClsCancelRenewal: { RequestData: { ...defualtModel } } },
      // #services
      loadObjRes: null,
      cancelRenewalRes: null
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.getRequestForCancelRenewal({
            pRequest: {
              ...this.model
            }
          })
        this.loadObjRes = this.getResponse(data)

        if (this.loadObjRes.success) {
          this.model = this.loadObjRes.data.GetRequestForCancelRenewalResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    cancel () {
      this.showConfirm("آیا از ابطال تمدید درخواست مورد نظر مطمئن هستید؟").onOk(
        async () => {
          try {
            this.showLoading()
            const { data } = await this.$services.excavation.cancelRenewal({
              pRequest: {
                ...this.model
              }
            })
            this.cancelRenewalRes = this.getResponse(data)

            if (this.cancelRenewalRes.success) {
              // this.model = this.cancelRenewalRes.data.GetRequestForCancelRenewalResult
              await this.log({
                action: this.logActions.delete,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode
              })
            }
          } catch (e) {
            console.error(e)
            this.serverError()
          } finally {
            this.hideLoading()
          }
        }
      )
    }
  }
}
</script>
