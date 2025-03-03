<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-combo
          v-model="model.ClsEngineer.Eng_Info.CI_Degree"
          cdcName="CI_Degree"
          :m="m"
          label="مدرک تحصیلی"
          label-width="100px"
          domainName="engineer"
          ciName="CI_Degree"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="model.ClsEngineer.Eng_Info.CI_University"
          cdcName="CI_University"
          :m="m"
          label="محل اخذ"
          label-width="100px"
          domainName="engineer"
          ciName="CI_University"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="model.ClsEngineer.Eng_Info.LastDegreeDate"
          cdcName="LastDegreeDate"
          :m="m"
          label="تاریخ آخرین مدرک"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="model.ClsEngineer.Eng_Info.ADPstudyFieldRel"
          cdcName="ADPstudyFieldRel"
          :m="m"
          source-type="local"
          :options="studyFieldList"
          label="رشته تحصیلی"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-if="!isEngOrgan"
          v-model="model.ClsEngineer.Eng_Info.CI_Score"
          cdcName="CI_Score"
          :m="m"
          label="امتیاز"
          label-width="70px"
          domainName="engineer"
          ciName="CI_SCORE"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="model.ClsEngineer.Eng_Info.CI_MilitaryService"
          cdcName="CI_MilitaryService"
          :m="m"
          label="وضعیت نظام وظیفه"
          label-width="100px"
          domainName="engineer"
          ciName="CI_MilitaryService"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.Score"
          cdcName="Score"
          :m="m"
          label="امتیاز ارجاع"
          label-width="100px"
        />
      </FormControl>
    </FormRow>
    <safa-datatable
      v-model="model.ClsEngineer.Eng_OtherData"
      cdcName="Eng_OtherData"
      helper="engOtherData"
      title="سایر اطلاعات"
      :m="m"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      class="q-mt-sm"
      addRow
      deleteRow
      allowCopy
      :columns="engOtherDataColumns"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    model: Object,
    m: String,
    formKey: String,
    title: String,
    isEngOrgan: Boolean
  },
  data () {
    return {
      name: "EducateInfo",
      engOtherDataColumns: [
        { field: "", title: "عنوان " },
        { field: "", title: "مقدار" }
      ],
      studyFieldList: []
    }
  },
  created () {
    this.getADPStudyFieldRel()
  },
  methods: {
    getADPStudyFieldRel () {
      this.showLoading()
      let payLoad = {}
      this.$services.engineers
        .GetADPStudyFieldRel(payLoad)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.studyFieldList =
              res.data?.GetADP_StudyFieldRelResult?.ADP_StudyFieldRel?.map(
                (x) => ({
                  ID: x.ADPstudyFieldRel,
                  Title: x.StudyField + " | " + x.StudyFieldRel
                })
              ) ?? []
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>

<style>
</style>
