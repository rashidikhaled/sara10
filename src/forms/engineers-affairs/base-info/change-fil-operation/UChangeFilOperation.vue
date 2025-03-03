<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <FormWrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit className="q-gutter-y-sm">
        <FormRow>
          <nosazi-code-input
            label="کد نوسازی قدیم"
            label-width="100px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            :m="mode"
            @enter="loadObj"
          />
          <div>
            <btn-default label="جستجو" @click="loadObj" />
          </div>
        </FormRow>
        <FormRow>
          <safa-datepicker
            label="تاریخ شروع عملیات"
            label-width="100px"
            v-model="operationStartDate"
            cdcName="operationStartDate"
            :m="mode"
          />
        </FormRow>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        />
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "تغییر تاریخ شروع عملیات",
      formKey: "c7211be1-c418-449b-be63-0f84c9a5c16b",
      name: "UChangefiloperation",
      main: true,

      // #variables
      model: null,
      operationStartDate: '',
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // #services
      loadObjRes: null,
      saveObjRes: null
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    }
  },

  methods: {
    loadObj () {
      this.showLoading()
      const NosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
      this.$services.engineers
        .getFilOperationInNosaziCode({ pRequest: { NosaziCode } })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model =
              this.loadObjRes.data.GetFil_OperationInNosaziCodeResult
            await this.log({
              action: this.logActions.view,
              bizCode: NosaziCode,
              bizCodeTitle: "NosaziCode"
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
      if (this.model === null) {
        return this.showError("لطفا ابتدا کد نوسازی را جستجو نمایید.")
      }
      if (
        this.model.ClsFil_Operation &&
        this.model.ClsFil_Operation.Fil_Operation
      ) {
        this.model.ClsFil_Operation.Fil_Operation.OperationStartDate =
          this.operationStartDate
      }
      this.showLoading()
      this.$services.engineers
        .updateFillOperation({ pRespons: this.model })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            await this.log({
              action: this.logActions.update,
              bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
              bizCodeTitle: "bizCode"
            })
            this.isEditable = false
            this.showError("عملیات با موفقیت انجام شد")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
