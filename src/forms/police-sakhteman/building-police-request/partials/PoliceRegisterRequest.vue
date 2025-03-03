<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-combo
          label="نوع درخواست"
          label-width="100px"
          v-model="value.Request.RequestType"
          cdcName="RequestType"
          :m="m"
          :options="requestTypeOptions"
          sourceType="local"
          required
          :validations="['required', 'string']"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره اخطار"
          label-width="100px"
          v-model="value.Warning.WarningNo"
          cdcName="WarningNo"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="سازمان متقاضی"
          label-width="100px"
          domainName="BuildingPolice"
          ciName="CI_RequesterType"
          v-model="value.Request.CI_RequesterType"
          cdcName="CI_RequesterType"
          required
          validations="required"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام متقاضی"
          label-width="100px"
          v-model="value.Request.RequesterName"
          cdcName="RequesterName"
          :m="m"
          required
          :validations="['required', 'string']"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره تلفن"
          label-width="100px"
          v-model="value.Request.RequesterTelephone"
          cdcName="RequesterTelephone"
          :m="m"
          type="number"
          required
          :validations="['required', 'number', validations.requesterTelephone]"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره تلفن همراه"
          label-width="100px"
          v-model="value.Request.RequesterCellphone"
          type="number"
          cdcName="RequesterCellphone"
          :m="m"
          :validations="value.Request.RequesterCellphone !== '' ? validations.requesterCellphone : ''"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه"
          label-width="100px"
          v-model="value.Request.LetterNo"
          cdcName="LetterNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه"
          label-width="100px"
          v-model="value.Request.LetterDate"
          cdcName="LetterDate"
          :m="m"
        />
      </FormControl>
      <safa-text
        label="آدرس"
        label-width="100px"
        class="col-12"
        v-model="value.Request.RequesterAddress"
        cdcName="RequesterAddress"
        :m="m"
        required
        :validations="['required', 'string']"
      />
      <text-template
        label="توضیحات"
        label-width="100px"
        class="col-12"
        v-model="value.Request.Comments"
        cdcName="Comments"
        :m="m"
      />
    </FormRow>
  </fit>
</template>

<script>
import Joi from "joi"
export default {
  props: {
    m: String,
    value: Object,
    requestTypeOptions: Array
  },
  data () {
    return {
      name: "PoliceRegisterRequest",
      validations: {
        requesterTelephone: Joi.custom(
          function (value, helper) {
            if (this.value.Request.RequesterTelephone.length !== 11) { return helper.message("شماره تلفن می بایست 11 رقم باشد.") }
            return true
          }.bind(this)
        ),
        requesterCellphone: Joi.custom(
          function (value, helper) {
            if (this.value.Request.RequesterCellphone.length !== 11) { return helper.message("شماره موبایل می بایست 11 رقم باشد.") }
            return true
          }.bind(this)
        )
      }
    }
  }
}
</script>
