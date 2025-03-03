<template>
  <fit>
    <safa-notice>در صورتی که اطلاعات مالک با اطلاعات موجود مغایرت دارد این فیلدها را پر نمایید.</safa-notice>
    <FormRow>
      <FormControl>
        <safa-text
          label="نام کامل مالک"
          label-width="85px"
          :m="m"
          v-model="value.OwnerFullName"
          cdcName="OwnerFullName"
        />
      </FormControl>
      <FormControl v-if="!value.IsForeigners">
        <safa-text
          label="کد ملی"
          label-width="60px"
          :m="m"
          v-model="value.OwnerNationalCode"
          cdcName="OwnerNationalCode"
          :validations="['required', 'number', validations.nationalCode, validations.nationalCode2]"
          type="number"
          dir="ltr"
        />
      </FormControl>
      <FormControl v-else>
        <safa-text
          label="کد اتباع بیگانه"
          label-width="85px"
          :m="value.IsForeigners ? 'e' : 'r'"
          v-model="value.ForeignersCode"
          cdcName="ForeignersCode"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="اتباع بیگانه"
          label-width="85px"
          :m="m"
          v-model="value.IsForeigners"
          cdcName="IsForeigners"
        />
      </FormControl>
      <text-template
        class="col-12"
        label="آدرس"
        label-width="85px"
        :m="m"
        :rows="8"
        formKey="2472191d-425c-4caf-962d-8ea896fcbf48"
        v-model="value.OwnerAddress"
        cdcName="OwnerAddress"
      />
    </FormRow>
  </fit>
</template>

<script>
import customValidation from "src/utils/customValidation"
import Joi from "joi"
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: "r"
    }
  },
  data () {
    return {
      validations: {
        NationalCode: customValidation.nationalCode,
        nationalCode2: Joi.string().length(10).required().messages({
          "string.base": `کد ملی میبایست به صورت عدد باشد.`,
          "string.length": `کد ملی میبایست 10 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        })
      }
    }
  },
  watch: {
    'value.IsForeigners': {
      handler () {
        if (this.value.IsForeigners === true) {
          this.value.OwnerNationalCode = ''
        } else {
          this.value.ForeignersCode = ''
        }
      },
      immediate: true
    }
  }
}
</script>
