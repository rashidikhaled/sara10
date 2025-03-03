<template>
  <safa-group class="row q-col-gutter-sm">
    <safa-text
      label="شماره فیش"
      label-width="70px"
      v-model="model.FishNo"
      class="col-sm-3 col-md-3"
    />
    <safa-combo
      label="کد نوع سند"
      ciName="CI_IncomeDocType"
      domainName="engineer"
      v-model="model.CI_IncomeDocType"
      label-width="70px"
      class="col-sm-3 col-md-3"
    />
    <safa-datepicker
      label="تاریخ"
      v-model="model.IncomeDate"
      label-width="70px"
      class="col-sm-3 col-md-3"
    />
    <safa-combo
      ciName="CI_Years"
      domainName="engineer"
      label="سال"
      v-model="model.CI_Years"
      label-width="70px"
      class="col-sm-3 col-md-3"
      :validations="validations.Years"
    />
    <safa-custom-text
      type="money"
      label="بدهکار"
      v-model="model.Debit"
      label-width="70px"
      class="col-sm-3 col-md-3"
    />
    <safa-custom-text
      type="money"
      label="پرداختی"
      v-model="model.Credit"
      label-width="70px"
      class="col-sm-3 col-md-3"
    />
    <safa-text
      type="textarea"
      label="توضیحات"
      v-model="model.Comments"
      label-width="70px"
      class="col-md-12"
    />
  </safa-group>
</template>

<script>
import Joi from "joi"
export default {
  props: ["model", "m"],
  data () {
    return {
      title: "اطلاعات فیش",
      name: "FishInfo",
      validations: {
        Years: Joi.number().min(1).required().messages({
          "number.base": `اطلاعاتی وارد نشده است.`,
          "number.min": `مقدار وارد شده مجاز نمیباشد.`,
          "any.required": `این  فیلد اجباری میباشد.`
        })
      }
    }
  }
}
</script>
