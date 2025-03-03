<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="مدرک تحصیلی"
          ciName="CI_Degree"
          domainName="engineer"
          label-width="100px"
          :m="m"
          :class="{ 'control-highlight': isModifyField('CI_Degree') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.CI_Degree"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="محل اخذ"
          ciName="CI_University"
          domainName="engineer"
          label-width="100px"
          :m="m"
          :class="{ 'control-highlight': isModifyField('CI_University') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.CI_University"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ آخرین مدرک"
          label-width="100px"
          :m="m"
          :class="{ 'control-highlight': isModifyField('LastDegreeDate') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.LastDegreeDate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="رشته تحصیلی"
          label-width="100px"
          :m="m"
          :class="{ 'control-highlight': isModifyField('StudyFieldRel') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.StudyFieldRel"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت نظام وظیفه"
          label-width="100px"
          ciName="CI_MilitaryService"
          domainName="engineer"
          :m="m"
          :class="{ 'control-highlight': isModifyField('CI_MilitaryService') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.CI_MilitaryService"
        />
      </FormControl>
    </FormRow>
    <safa-datatable
      title="سایر اطلاعات"
      helper="OtherInfo"
      v-model="model.ClsEngineerTemp.Eng_OtherData_Temp"
      cdcName=""
      :m="m"
      fit
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      min-height="100px"
      height="100%"
      max-height="100%"
      :class="{ 'control-highlight': isModifyField('Eng_OtherData_Temp') }"
    />
  </fit>
</template>

<script>
export default {
  name: "EducationInfo",
  data () {
    return {
    }
  },
  props: {
    m: String,
    model: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    engCompareFields () {
      return (
        this.model &&
        this.model.ClsEngCompare &&
        this.model.ClsEngCompare.map((x) => x.Name)
      )
    }
  },
  methods: {
    isModifyField (field) {
      return !this.engCompareFields.includes(field)
    }
  }
}
</script>
