<template>
  <FormRow>
    <FormControl>
      <safa-text
        label="نام مدیر مسئول"
        label-width="90px"
        v-model="value.President.PresidentName"
        cdcName="PresidentName"
        m="r"
      />
    </FormControl>
    <!-- <FormControl>
      <safa-text
        label="ظرفیت"
        label-width="90px"
        v-model="value.President.PresidentName"
        cdcName="PresidentName"
        :m="m"
        m="r"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="ظرفیت باقیمانده"
        label-width="90px"
        v-model="value.President.PresidentName"
        cdcName="PresidentName"
        :m="m"
        m="r"
      />
    </FormControl> -->
    <FormControl>
      <safa-combo
        ciName="CI_OfficeType"
        domainName="engineer"
        label="نوع دفتر"
        label-width="90px"
        v-model="value.Off_Info.CI_OfficeType"
        cdcName="CI_OfficeType"
        required
        :validations="['required', 'number', validations.officeType]"
        :m="isNewOffice ? m : 'r'"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="کد دفتر"
        label-width="90px"
        v-model="value.Off_Info.OfficeCode"
        cdcName="OfficeCode"
        :m="m"
        type="number"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="نام دفتر"
        label-width="90px"
        v-model="value.Off_Info.OfficeName"
        cdcName="OfficeName"
        :m="m"
        required
        validations="required"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label="تاریخ ثبت"
        label-width="90px"
        v-model="value.Off_Info.RegisterDate"
        cdcName="RegisterDate"
        :m="m"
        required
        validations="required"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شماره ثبت دفتر"
        label-width="90px"
        v-model="value.Off_Info.RegisterNo"
        cdcName="RegisterNo"
        :m="m"
        type="number"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label="تاریخ انقضاء دفتر"
        label-width="90px"
        v-model="value.Off_Info.ExpireDate"
        cdcName="ExpireDate"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شماره تلفن ثابت"
        label-width="90px"
        v-model="value.Off_Info.Tel"
        cdcName="Tel"
        :m="m"
        type="number"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شماره فکس"
        label-width="90px"
        v-model="value.Off_Info.FaxNo"
        cdcName="FaxNo"
        :m="m"
        type="number"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label="تاریخ انحلال دفتر"
        label-width="90px"
        v-model="value.Off_Info.BreackupDate"
        cdcName="BreackupDate"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شماره تلفن همراه"
        label-width="90px"
        v-model="value.Off_Info.CellPhone"
        cdcName="CellPhone"
        :m="m"
        type="number"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="پست الکترونیکی"
        label-width="90px"
        v-model="value.Off_Info.Email"
        cdcName="Email"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label="تاریخ آخرین تمدید مهلت پروانه"
        label-width="90px"
        v-model="value.Off_Info.JobAgreementLastDate"
        cdcName="JobAgreementLastDate"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="حداکثر تعداد اعضاء"
        label-width="90px"
        v-model="value.Off_Info.MemMaxCount"
        cdcName="MemMaxCount"
        :m="m"
        type="number"
      />
    </FormControl>
    <FormControl>
      <safa-combo
        ciName="CI_StudyField"
        domainName="engineer"
        label="نوع پروانه"
        label-width="90px"
        v-model="value.Off_Info.CI_JobAgreementType"
        cdcName="CI_JobAgreementType"
        :m="m"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label="شماره پروانه"
        label-width="90px"
        v-model="value.Off_Info.JobAgreementNo"
        cdcName="JobAgreementNo"
        :m="m"
        type="number"
      />
    </FormControl>
    <FormControl class="flex items-center">
      <safa-checkbox
        label="مشاور"
        label-width="90px"
        v-model="value.Off_Info.IsConsultant"
        cdcName="IsConsultant"
        :m="m"
      />
    </FormControl>
    <safa-text
      label="موضوع"
      label-width="90px"
      class="col-12"
      v-model="value.Off_Info.JobAgreementSubject"
      cdcName="JobAgreementSubject"
      :m="m"
    />
    <text-template
      label="آدرس"
      label-width="90px"
      class="col-12"
      v-model="value.Off_Info.Address"
      cdcName="Address"
      :m="m"
      :rows="2"
    />
    <text-template
      label="توضیحات"
      label-width="90px"
      class="col-12"
      v-model="value.Off_Info.Comments"
      cdcName="Comments"
      :m="m"
      :rows="2"
    />
  </FormRow>
</template>

<script>
import Joi from "joi"
export default {
  props: {
    value: Object,
    isNewOffice: {
      type: Boolean,
      default: false
    },
    m: {
      type: String,
      default: 'r'
    }
  },
  data () {
    return {
      name: "OfficeInfo",
      validations: {
        officeType: Joi.number().min(1).messages({
          "number.min": `مقدار نامشخص برای این فیلد معتبر نمیباشد`,
          "any.required": `این  فیلد اجباری میباشد.`
        })
      }
    }
  }
}
</script>
