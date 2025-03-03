<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="مدرک تحصیلی"
          ciName="CI_Degree"
          domainName="engineer"
          label-width="110px"
          :m="m"
          v-model="value.ClsEngineerTemp.Eng_Info_Temp.CI_Degree"
          cdcName="CI_Degree"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="محل اخذ"
          ciName="CI_University"
          domainName="engineer"
          label-width="110px"
          :m="m"
          v-model="value.ClsEngineerTemp.Eng_Info_Temp.CI_University"
          cdcName="CI_University"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ آخرین مدرک"
          label-width="110px"
          :m="m"
          v-model="value.ClsEngineerTemp.Eng_Info_Temp.LastDegreeDate"
          cdcName="LastDegreeDate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="رشته تحصیلی"
          label-width="110px"
          source-type="local"
          :options="studyFieldRelOptions"
          :m="m"
          v-model="value.ClsEngineerTemp.Eng_Info_Temp.ADP_StudyFieldRel"
          cdcName="StudyFieldRel"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت نظام وظیفه"
          label-width="110px"
          ciName="CI_MilitaryService"
          domainName="engineer"
          :m="m"
          v-model="value.ClsEngineerTemp.Eng_Info_Temp.CI_MilitaryService"
          cdcName="CI_MilitaryService"
        />
      </FormControl>
    </FormRow>
    <safa-datatable
      title="سایر اطلاعات"
      helper="OtherInfo"
      v-model="value.ClsEngineerTemp.Eng_OtherData_Temp"
      cdcName="Eng_OtherData_Temp"
      :m="m"
      fit
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      min-height="110px"
      height="100%"
      max-height="100%"
    />
  </fit>
</template>

<script>
export default {
  name: "EducationInfo",
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    studyFieldRelOptions () {
      if (!this.value) return []
      return this.value.ADP_StudyFieldRel.map((m) => {
        return {
          ID: m.ADPstudyFieldRel,
          Title: `${m.StudyField} || ${m.StudyFieldRel}`
        }
      })
    }
  }
}
</script>
