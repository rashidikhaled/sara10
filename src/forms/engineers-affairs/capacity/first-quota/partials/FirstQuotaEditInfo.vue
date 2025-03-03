<template>
  <fit>
    <form-row class="q-mt-sm">
      <form-control>
        <safa-combo
          ciName="CI_Years"
          domainName="engineer"
          input-debounce="0"
          label="سال"
          v-model="value.CI_Years"
          :m="m"
          label-width="70px"
          validations="required"
          cdcName="Years"
        />
      </form-control>
      <form-control>
        <safa-text
          label="نوع سهمیه"
          v-model="value.QuotaType"
          m="r"
          label-width="70px"
          class="col-sm-3 col-md-3"
          cdcName="QuotaType"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          :m="m"
          label="سهمیه"
          label-width="50px"
          v-model="value.CreditValue"
          class="col-sm-3 col-md-3"
          cdcName="CreditValue"
        />
      </form-control>
      <form-control>
        <safa-combo
          :m="m"
          label="صلاحیت"
          ciName="CI_Ability"
          domainName="engineer"
          v-model="value.CI_Ability"
          label-width="70px"
          class="col-sm-3 col-md-3"
          validations="required"
          cdcName="Ability"
        />
      </form-control>
      <form-control>
        <safa-combo
          :m="m"
          label="پایه"
          domainName="engineer"
          ciName="CI_Base"
          v-model="value.CI_Base"
          label-width="50px"
          class="col-sm-3 col-md-3"
          cdcName="engineer"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          :m="m"
          label="تاریخ تایید"
          v-model="value.ConfirmDate"
          label-width="70px"
          class="col-sm-3 col-md-3"
          cdcName="ConfirmDate"
        />
      </form-control>
      <form-control>
        <safa-text
          :m="m"
          label="شماره نامه"
          v-model="value.LetterNo"
          label-width="70px"
          class="col-sm-3 col-md-3"
          cdcName="LetterNo"
        />
      </form-control>
      <form-control>
        <safa-combo
          :m="m"
          label="شهر"
          domainName="engineer"
          ciName="CI_City"
          v-model="value.CI_City"
          label-width="70px"
          class="col-sm-3 col-md-3"
          cdcName="City"
        />
      </form-control>
    </form-row>
    <safa-text
      :m="m"
      type="textarea"
      label="توضیحات"
      v-model="value.QtaComments"
      label-width="70px"
      class="col-md-12 q-mt-sm"
      cdcName="QtaComments"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    },
    m: String
  },
  data () {
    return {
      name: "FirstQuotaEditInfo",
      title: "ویرایش اطلاعات",
      maxAllowWorkList: [
        {
          ID: "0",
          Title: "عمومی"
        },
        {
          ID: "1",
          Title: "مشهد"
        },
        {
          ID: "2",
          Title: "شیراز"
        }
      ]
      // validations: {
      //   CI_Years: Joi.string().required().messages({
      //     "any.required": `اطلاعاتی وارد نشده است.`,
      //   }),
      //   CI_QuotaType: Joi.string().required().messages({
      //     "any.required": `اطلاعاتی وارد نشده است.`,
      //   }),
      //   CreditValue: Joi.string().required().messages({
      //     "any.required": `اطلاعاتی وارد نشده است.`,
      //   }),
      //   CI_Ability: Joi.string().required().messages({
      //     "any.required": `اطلاعاتی وارد نشده است.`,
      //   }),
      //   CI_Base: Joi.string().required().messages({
      //     "any.required": `اطلاعاتی وارد نشده است.`,
      //   }),
      //   LetterNo: Joi.string().required().messages({
      //     "any.required": `اطلاعاتی وارد نشده است.`,
      //   }),
      //   MaxAllowWork: Joi.string().required().messages({
      //     "any.required": `اطلاعاتی وارد نشده است.`,
      //   }),
      // },
    }
  }
}
</script>
