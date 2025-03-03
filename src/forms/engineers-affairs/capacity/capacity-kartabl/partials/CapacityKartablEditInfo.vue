<template>
  <fit>
      <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          ciName="CI_Years"
          domainName="engineer"
          label="سال"
          v-model="value.CI_Years"
          :m="m"
          label-width="75px"
          :validations="['required', validations.CI_Years]"
          :sortFunc="sortCombo"
          cdcName="CI_Years"

        />
      </FormControl>
      <FormControl>
        <safa-combo
          ciName="CI_QuotaType"
          cdcName="CI_QuotaType"
          domainName="engineer"
          label="نوع سهمیه"
          v-model="value.SysCI_QuotaType"
          :m="m"
          label-width="75px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          :m="m"
          label="سهمیه"
          label-width="75px"
          v-model="value.CreditValue"
          type="number"
          cdcName="CreditValue"
          validations="number"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          :m="m"
          label="صلاحیت"
          ciName="CI_Ability"
          domainName="engineer"
          v-model="value.CI_Ability"
          cdcName="CI_Ability"
          label-width="75px"
          :validations="['required', validations.CI_Ability]"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          :m="m"
          label="پایه"
          domainName="engineer"
          ciName="CI_Base"
          cdcName="CI_Base"
          v-model="value.CI_Base"
          label-width="75px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          :m="m"
          label="تاریخ تایید"
          v-model="value.ConfirmDate"
          label-width="75px"
          cdcName="ConfirmDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          :m="m"
          label="شماره نامه"
          v-model="value.LetterNo"
          label-width="75px"
          cdcName="LetterNo"

        />
      </FormControl>
      <FormControl>
        <safa-combo
          :m="m"
          label="رشته تحصیلی"
          domainName="engineer"
          ciName="CI_StudyField"
          v-model="value.CI_StudyField"
          label-width="75px"
          cdcName="CI_StudyField"
        />
      </FormControl>
      <FormControl>
        <safa-text
          :m="m"
          label="متراژ صلاحیت"
          v-model="value.MeterOfAbility"
          label-width="75px"
          type="number"
          validations="number"
          cdcName="MeterOfAbility"
        />
      </FormControl>
      <FormControl>
        <safa-text
          :m="m"
          label="تعداد طبقه"
          v-model="value.FloorOfAbility"
          label-width="75px"
          type="number"
          validations="number"
          cdcName="FloorOfAbility"

        />
      </FormControl>
      <FormControl>
        <safa-combo
          :m="m"
          label="شهر"
          domainName="engineer"
          ciName="CI_City"
          v-model="value.CI_City"
          label-width="75px"
          cdcName="CI_City"
        />
      </FormControl>
      <FormControl>
        <safa-text
          :m="m"
          label="تعداد کار"
          v-model="value.MaxAllowWork"
          label-width="75px"
          type="number"
          validations="number"
          cdcName="MaxAllowWork"
          v-if="value.SysCI_QuotaType === 3"
        />
      </FormControl>
    </FormRow>
    <FormRow>
        <text-template
          :m="m"
          type="textarea"
          label="توضیحات"
          v-model="value.QtaComments"
          cdcName="QtaComments"
          label-width="75px"
        />

    </FormRow>
  </fit>
</template>

<script>
import Joi from "joi"
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      name: "CapacityKartablEditInfo",
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
      ],
      validations: {
        CI_Years: Joi.custom(
          function (value, helper) {
            if (this.value.CI_Years === 0 || this.value.CI_Years === null) { return helper.message("مقدار نامشخص برای سال مجاز نمی باشد.") }
            return true
          }.bind(this)
        ),
        CI_Ability: Joi.custom(
          function (value, helper) {
            if (
              this.value.CI_Ability === 0 ||
              this.value.CI_Ability === null ||
              this.value.CI_Ability === ""
            ) { return helper.message("مقدار نامشخص برای صلاحیت مجاز نمی باشد.") }
            return true
          }.bind(this)
        )
      }
    }
  },
  methods: {
    sortCombo (a, b) {
      return b.ID - a.ID
    }
  }
}
</script>
