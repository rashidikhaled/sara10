<template>
  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            v-model="CI_Years"
            label="سال کاری"
            label-width="80px"
            class="col-md-3"
            ciName="CI_Years"
            domainName="engineer"
            required
            :validations="['required', validations.hasYears]"
          />
        </FormControl>
        <FormControl>
          <btn-search
            label="اعمال"
            @click="loadData"
          />
        </FormControl>
      </FormRow>
      <safa-datatable
        title="لیست تعرفه های درآمدی"
        helper="incomeTarefeInfoColumns"
        v-model="getTarefeResult.ClsTarefe.Income_Info"
        :m="mode"
        fit
        paginate
        min-height="200px"
        height="100%"
        max-height="100%"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable=true"
        @cancel="isEditable=false"
        @save="saveData"
      />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Joi from "joi"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تعرفه های درآمدی",
      name: "UIncomeTariffs",
      formKey: "9587dbe6-f0bd-42dc-b3f6-3b9e400ac449",
      main: true,

      CI_Years: 0,
      getTarefeResult: {
        ClsTarefe: {
          Income_Info: [],
          _CI_Years: null
        }
      },
      validations: {
        hasYears: Joi.number().min(1).messages({
          "number.min": `مقدار نامشخص برای این فیلد معتبر نمیباشد`,
          "any.required": `این  فیلد اجباری میباشد.`
        })
      }
    }
  },

  methods: {
    loadData () {
      if (!this.isValidForm()) return
      this.isEditable = false
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: this.CI_Years
        }
      }
      this.$services.engineers
        .getTarefe(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            this.getTarefeResult = res.data.GetTarefeResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.CI_Years.toString(),
              bizCodeTitle: "سال کاری تعرفه های درآمدی"
            })
          }
        })
        .catch((error) => {
          console.error("load error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      if (!this.isValidForm()) return
      this.showLoading()
      let payLoad = {
        pRequest: { ClsTarefe: this.getTarefeResult.ClsTarefe }
      }
      this.$services.engineers
        .saveTarefe(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.getTarefeResult.ClsTarefe._CI_Years.toString(),
              bizCodeTitle: "سال کاری تعرفه های درآمدی"
            })
            this.showSuccess("عملیات با موفقیت انجام شد")
          }
        })
        .catch((error) => {
          console.error("load error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
