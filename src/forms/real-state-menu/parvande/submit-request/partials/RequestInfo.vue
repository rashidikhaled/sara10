<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          label-width="100px"
          v-model="value.Request_Info.CI_RequestType"
          cdcName="CI_RequestType"
          ciName="CI_RequestType"
          domainName="Estate"
          required
          :validations="['required', validations.CI_RequestType]"
          :m="inAdd == 'e' && m == 'e' ? 'e' : 'r'"
          ref="CI_RequestType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع اولویت صلح نامه"
          label-width="100px"
          v-model="value.Request_Info.CI_ContractPriorityType"
          cdcName="CI_ContractPriorityType"
          ciName="CI_ContractPriorityType"
          domainName="Estate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام متقاضی"
          label-width="100px"
          v-model="value.Request_Info.RequesterName"
          cdcName="RequesterName"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تولد"
          label-width="100px"
          v-model="value.Request_Info.BirthDate"
          cdcName="BirthDate"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-text
          label="کد پستی"
          label-width="100px"
          v-model="value.Request_Info.PostCode"
          cdcName="PostCode"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن متقاضی"
          label-width="100px"
          v-model="value.Request_Info.TelNo"
          cdcName="TelNo"
          type="number"
          :m="m"
        />
      </FormControl>

      <FormControl>
        <safa-text
          label="تلفن همراه متقاضی"
          label-width="100px"
          v-model="value.Request_Info.CellphoneNo"
          cdcName="CellphoneNo"
          required
          type="number"
          :validations="['required', validations.CellphoneNo]"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ملی متقاضی"
          label-width="100px"
          v-model="value.Request_Info.RequesterNationalCode"
          cdcName="RequesterNationalCode"
          required
          type="number"
          :validations="['required', validations.nationalCode]"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام پدر متقاضی"
          label-width="100px"
          v-model="value.Request_Info.RequesterFatherName"
          cdcName="RequesterFatherName"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره شناسنامه متقاضی"
          label-width="100px"
          v-model="value.Request_Info.RequesterIDCardNo"
          cdcName="RequesterIDCardNo"
          type="number"
          :m="m"
        />
        <!-- required
          :validations="['required', validations.RequesterIDCardNo]" -->
      </FormControl>
      <FormControl>
        <safa-text
          label="محل صدور شناسنامه متقاضی"
          label-width="100px"
          v-model="value.Request_Info.RequesterEmissionPlace"
          cdcName="RequesterEmissionPlace"
          :m="m"
        />
      </FormControl>
      <safa-text
        type="textarea"
        label="آدرس متقاضی"
        label-width="100px"
        v-model="value.Request_Info.RequesterAddress"
        cdcName="RequesterAddress"
        required
        validations="required"
        :m="m"
        class="col-12"
        :rows="1"
      />
    </FormRow>
    <safa-grid
      title="مشخصات وکیل / وکلا"
      v-model="value.Request_Attorney"
      cdcName="Request_Attorney"
      helper="requestAttorneyColumns"
      fit
      :m="m"
    />
  </fit>
</template>

<script>
import Joi from "joi"
import customValidation from "src/utils/customValidation"
export default {
  props: {
    inAdd: {
      type: String,
      default: "r"
    },
    m: {
      type: String,
      default: "r"
    },
    value: {
      type: Object,
      default: () => {}
    },
    lawyerInfoList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      validations: {
        CI_RequestType: Joi.custom(
          function (value, helper) {
            if (
              this.value.CI_RequestType === 0 ||
              this.value.CI_RequestType === null ||
              this.$refs.CI_RequestType.selectedItem.Title.toString() === 'نامشخص'
            ) {
              return helper.message("مقدار نوع درخواست نمی تواند نامشخص باشد.")
            }
            return true
          }.bind(this)
        ),
        nationalCode: customValidation.nationalCode,
        CellphoneNo: Joi.string().length(11).required().messages({
          "string.base": `تلفن همراه میبایست به صورت عدد باشد.`,
          "string.length": `تلفن همراه میبایست 11 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        }),
        RequesterIDCardNo: Joi.string().max(10).required().messages({
          "string.base": `شماره شناسنامه میبایست به صورت عدد باشد.`,
          "string.max": `شماره شناسنامه میبایست حداکثر 10 رقم باشد.`,
          "any.required": `اطلاعاتی وارد نشده است.`
        })
      }
    }
  }
}
</script>
