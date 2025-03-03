<template>
  <fit>
    <safa-form
      :id="formKey"
      :caption="title"
      app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    >
      <form-wrapper title="اطلاعات جرثقیل" vertical :padding="false">
        <safa-status :result="requestResult"></safa-status>
        <safa-datatable
          :bordered="false"
          v-model="DataModel.Sh_DrillingRig"
          :m="mode"
          helper="JaresaghilInfo"
          class="fit"
          height="100%"
          max-height="100%"
          min-height="100%"
          margin="0"
        ></safa-datatable>

        <template v-slot:footer>
          <FormActions
            :m="mode"
            @edit="isEditable = true"
            @cancel="isEditable = false"
            @save="SaveDrillingRig"
          >
          </FormActions>
        </template>
      </form-wrapper>
    </safa-form>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  route: "/Jarsaghil-Information/InfoJarsaghil",
  mixins: [baseFormMixin],
  data () {
    return {
      title: "اطلاعات جرثقیل",
      formKey: "d8614a99-a7c6-4494-96a0-8cdcf61cdfa7",
      name: "InfoJarsaghil",
      main: true,
      // Sh_DrillingRig: [],
      workflowCompatible: true,
      DataModel: {
        Sh_DrillingRig: []
      },
      requestResult: null
    }
  },

  mounted () {
    this.Load()
  },
  methods: {
    Load () {
      this.showLoading()
      let payload = {
        pNidProc: this.selectedNidProc
      }
      this.$services.SC.GetDrillingRig(payload)
        .then(async (response) => {
          this.requestResult = this.getResponse(response)
          if (this.requestResult.success) {
            this.DataModel = this.getResponse(response).data.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch((err) => {
          this.serverError()
          console.error("load error", err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    SaveDrillingRig () {
      this.showLoading()
      this.DataModel.Sh_DrillingRig = this.normalizeformData()
      let payload = {
        pDrillingRig: {
          ErrorResult: {
            BizErrors: [],
            Requirements: []
          },
          Sh_DrillingRig: this.DataModel.Sh_DrillingRig
        },
        pNidProc: this.selectedNidProc
      }
      // debugger
      this.$services.SC.SaveDrillingRig(payload)
        .then(async (response) => {
          this.requestResult = this.getResponse(response)
          if (this.requestResult.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
          this.Load()
        })
        .catch((err) => {
          this.serverError()
          console.error("error", err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeformData () {
      return this.DataModel.Sh_DrillingRig.map((m) => {
        return {
          ...m,
          CI_DrillingRigTechnicalInfo: m.CI_DrillingRigTechnicalInfo || null,
          CI_DrillingRigType: m.CI_DrillingRigType || null,
          Capacity: m.Capacity || null,
          DrillingRigType: m.DrillingRigType || null,
          DrillingRigTechnicalInfo: m.DrillingRigTechnicalInfo || null,
          NidDrilling: m.NidDrilling || "00000000-0000-0000-0000-000000000000",
          NidProc: m.NidProc || "00000000-0000-0000-0000-000000000000"
        }
      })
    }
  }
}
</script>
