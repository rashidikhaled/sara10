<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="نوع"
          ciName="CI_EngineerType"
          domainName="engineer"
          label-width="100px"
          m="r"
          v-model="value.Eng_Info_Temp.CI_EngineerType"
          cdcName="CI_EngineerType"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-label style="width: 100px">وضعیت تأهل</safa-label>
        <div class="q-gutter-x-md">
          <safa-radio
            :m="m"
            :val="true"
            label="متأهل"
            v-model="value.Eng_Info_Temp.IsMarried"
            cdcName="IsMarried"
          />
          <safa-radio
            :m="m"
            label="مجرد"
            :val="false"
            v-model="value.Eng_Info_Temp.IsMarried"
            cdcName="IsMarried"
          />
        </div>
      </FormControl>
      <FormControl class="flex items-center">
        <safa-label style="width: 100px">جنسیت</safa-label>
        <div class="q-gutter-x-md">
          <safa-radio
            label="مرد"
            :val="true"
            v-model="value.Eng_Info_Temp.IsMale"
            cdcName="IsMale"
            :m="m"
          />
          <safa-radio
            label="زن"
            :val="false"
            v-model="value.Eng_Info_Temp.IsMale"
            cdcName="IsMale"
            :m="m"
          />
        </div>
      </FormControl>
    </FormRow>
    <FormRow>
      <FormControl>
        <safa-text
          label="نام"
          label-width="100px"
          m="r"
          v-model="value.Eng_Info_Temp.EngName"
          cdcName="EngName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام خانوادگی"
          label-width="100px"
          m="r"
          v-model="value.Eng_Info_Temp.EngFamily"
          cdcName="EngFamily"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام پدر"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.FatherName"
          cdcName="FatherName"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تولد"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.BirthDate"
          cdcName="BirthDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل تولد"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.BirthPlace"
          cdcName="BirthPlace"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل صدور"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.IdExportPlace"
          cdcName="IdExportPlace"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره شناسنامه"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.IdNo"
          cdcName="IdNo"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ملی"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.NationalCode"
          :validations="validations.NationalCode"
          cdcName="NationalCode"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ثبت"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.CreatedDate"
          cdcName="CreatedDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد دفتر جاری"
          label-width="100px"
          m="r"
          v-model="value.Eng_Info_Temp.IdentityCode"
          cdcName="IdentityCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره عضویت نظام مهندسی"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.MunicipalityCode"
          cdcName="MunicipalityCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد نظام معماری"
          label-width="100px"
          :m="m"
          v-model="value.Eng_Info_Temp.ArchitectureCode"
          cdcName="MunicipalityCode"
        />
      </FormControl>
      <text-template
        class="col-12"
        label="توضیحات فعالیت ثبت شده"
        label-width="100px"
        m="r"
        :rows="1"
        v-model="value.Eng_Info_Temp.EngComments"
        cdcName="EngComments"
      />
    </FormRow>

    <safa-splitter v-model="spliterModel" horizontal fit class="q-mt-sm">
      <template #before>
        <fit>
          <safa-datatable
            m="r"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            helper="Eng_JobAgreement_Temp"
            paginate
            hideHeader
            v-model="value.Eng_JobAgreement_Temp"
            cdcName="Eng_JobAgreement_Temp"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-datatable
            m="r"
            fit
            hideHeader
            height="100%"
            max-height="100%"
            helper="Eng_Competence_Temp"
            paginate
            v-model="value.Eng_Competence_Temp"
            cdcName="Eng_Competence_Temp"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import customValidation from "src/utils/customValidation"
export default {
  name: "PersonalInfo",
  data () {
    return {
      spliterModel: 50,
      validations: {
        NationalCode: customValidation.nationalCode
      }
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
