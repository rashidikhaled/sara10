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
        title="لیست عوارض درآمدی"
        helper="incomeSymptomsColumns"
        v-model="incomeSymptoms.ClsIncomeSymptoms.Income_Toll"
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
      title: "عوارض درآمدی",
      name: "UIncomeSymptoms",
      formKey: "c6ff8647-a332-428d-acde-4821888adbbe",
      main: true,

      CI_Years: 0,
      incomeSymptoms: {
        ClsIncomeSymptoms: {
          Income_Toll: [],
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
        .getIncomeSymptoms(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            this.incomeSymptoms = res.data.GetIncomeSymptomsResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.CI_Years.toString(),
              bizCodeTitle: "سال کاری عوارض درآمدی"
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
        pRequest: { ClsIncomeSymptoms: this.incomeSymptoms.ClsIncomeSymptoms }
      }
      this.$services.engineers
        .saveIncomeSymptoms(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            await this.log({
              action: this.logActions.save,
              bizCode:
                this.incomeSymptoms.ClsIncomeSymptoms._CI_Years.toString(),
              bizCodeTitle: "سال کاری عوارض درآمدی"
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
