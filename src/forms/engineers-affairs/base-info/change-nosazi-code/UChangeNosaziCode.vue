<template>
  <safa-form
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
    :id="formKey"
    :caption="title"
  >
    <FormWrapper :title="title">
      <template #header>
        <safa-status :result="changeNosaziCodeRes" />
      </template>
      <fit>
        <FormRow>
          <nosazi-code-input
            label="کد نوسازی قدیم"
            label-width="95px"
            actions
            :m="mode"
            cdcName="nosaziCodeBase"
            v-model="nosaziCodeBase"
          />
        </FormRow>
        <FormRow>
          <nosazi-code-input
            label="کد نوسازی جدید"
            label-width="95px"
            actions
            :m="mode"
            cdcName="nosaziCodeDest"
            v-model="nosaziCodeDest"
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
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "تغییر کد نوسازی",
      formKey: "f5fceebc-2a27-4f9f-8e90-c941c159945e",
      name: "UChangeNosaziCode",
      main: true,

      changeNosaziCodeRes: null,
      nosaziCodeBase: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziCodeDest: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.nosaziCodeBase = convertStringToNosaziCodeObject(
        this.selectedRequest.bizCode
      )
    }
  },
  methods: {
    async saveObj () {
      if (
        this.nosaziCodeBase.District === 0 ||
        this.nosaziCodeDest.District === 0
      ) {
        return this.showError("کد نوسازی وارد صده صحیح نمی باشد.")
      }
      try {
        const payload = {
          pRequest: {
            ClsChangeNosaziCode: {
              NosaziCode_Base: convertNosaziCodeObjectToString(
                this.nosaziCodeBase
              ),
              NosaziCode_Dest: convertNosaziCodeObjectToString(
                this.nosaziCodeDest
              )
            }
          }
        }
        this.showLoading()
        const { data } = await this.$services.engineers.changeNosaziCode(
          payload
        )
        this.changeNosaziCodeRes = this.getResponse(data)
        if (this.changeNosaziCodeRes.success) {
          await this.log({
            action: this.logActions.update,
            bizCode: convertNosaziCodeObjectToString(this.nosaziCodeDest),
            bizCodeTitle: "NosaziCode"
          })
          this.showSuccess("کد نوسازی با موفقیت تغییر یافت")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
