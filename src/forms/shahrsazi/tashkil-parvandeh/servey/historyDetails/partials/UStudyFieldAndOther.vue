<template>
  <section class="UStudyFieldAndOther">
    <div class="row q-gutter-lg-lg">
    <h6 class="form-title"><span>مشخصات تحصیلی و سایر</span></h6>
    <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6 col-md-4">
          <safa-combo
            :m="mode"
            label="مدرک تحصیلی"
            domainName="engineer"
            ciName="CI_Degree"
            v-model="results.pRequest.ClsEngineer.Eng_Info.CI_Degree"
          ></safa-combo>
        </div>

        <div class="col-12 col-sm-6 col-md-4">
          <safa-combo
            :m="mode"
            domainName="engineer"
            ciName="CI_StudyField"
            label="رشته تحصیلی"
            v-model="results.pRequest.ClsEngineer.Eng_Info.ADP_StudyFieldRel"
          ></safa-combo>
        </div>

        <div class="col-12 col-sm-6 col-md-4">
          <safa-text :m="mode" label="امتیاز ارجاع" v-model="results.pRequest.ClsEngineer.Eng_Info.Score"></safa-text>
        </div>

        <div class="col-12 col-sm-6 col-md-4">
          <safa-combo
            :m="mode"
            label="محل اخذ"
            domainName="engineer"
            ciName="CI_University"
            v-model="results.pRequest.ClsEngineer.Eng_Info.CI_University"
          ></safa-combo>
        </div>

        <div class="col-12 col-sm-6 col-md-4">
          <safa-combo
            :m="mode"
            label="امتیاز"
            domainName="engineer"
            ciName="CI_SCORE"
            v-model="results.pRequest.ClsEngineer.Eng_Info.CI_Score"
          ></safa-combo>
        </div>

      <div class="col-12 col-sm-6 col-md-4">
          <safa-datepicker
            :m="mode"
            :disabled="false"
            outlined
            class="col-4"
            dense="true"
            locale="fa"
            placeholder="تاریخ آخرین مدرک"
            format="jYYYY/jMM/jDD"
            display-format="dddd jDD jMMMM jYYYY"
            label="تاریخ آخرین مدرک"
            v-model="results.pRequest.ClsEngineer.Eng_Info.LastDegreeDate"
          >
          </safa-datepicker>
        </div>

        <div class="col-12 col-sm-6 col-md-4">
          <safa-combo
            :m="mode"
            label="وضعیت نظام وظیفه"
            domainName="engineer"
            ciName="CI_MilitaryService"
            v-model="results.pRequest.ClsEngineer.Eng_Info.CI_MilitaryService"
          ></safa-combo>
      </div>
    </div>
    </div>

    <div class="row">
      <h6>سایر اطلاعات</h6>
    </div>

    <div class="row">
      <hr/>
    </div>

    <div class="row">
      <safa-datatable
              v-model="gridItems"
              ref="grid"
              name="otherData"
              helper="otherData"
              title="سایر اطلاعات"
            />
    </div>
  </section>
</template>

<script>
// import CiItems from '../../../../components/json/items'
// import baseFormMixin from '../../../../mixins/baseFormMixin'

export default {
  name: 'u-study-field-and-other'
  // props: {
  //   formEditable: Boolean,
  //   results: {},
  //   lastDegreeDate: null,
  //   editable: String,
  //   isElementDisabled: Boolean,
  //   isEditable: {
  //     type: Boolean,
  //     default: false
  //   },
  //   isChangeResult: String
  // },
  // data: function () {
  //   return {
  //     ciStudyField: null,
  //     ciUniversityPlace: null,
  //     ciScore: null,
  //     ciMilitaryStatus: null,
  //     mariageStatus: 'single',
  //     gender: 'male',
  //     showNezamMohandesi: false
  //   }
  // },
  // created () {
  //   this.gridItems = this.results.pRequest.ClsEngineer.Eng_OtherData
  //   this.gridKey = 'NidOtherData'
  // },
  // watch: {
  //   isEditable (value) {
  //     if (value) { this.addGridRecord() } else {
  //       this.gridItems = this.gridItems.map(row => {
  //         row.inEdit = false
  //         return row
  //       })

  //       // this.gridItems = this.results.pRequest.ClsEngineer.Eng_OtherData

  //       if (this.gridItems[0].isNew) {
  //         this.gridItems.splice(0, 1)
  //       }
  //     }
  //   },
  //   gridItems () {
  //     this.results.pRequest.ClsEngineer.Eng_OtherData = this.gridItems
  //   },
  //   isChangeResult () {
  //     this.gridItems = this.results.pRequest.ClsEngineer.Eng_JobAgreement
  //   }
  // },
  // mounted () {
  //   this.gridItems = this.results.pRequest.ClsEngineer.Eng_OtherData

  //   if (this.isEditable) {
  //     this.addGridRecord()
  //   }
  // },
  // components: {},
  // mixins: [baseFormMixin],
  // computed: {
  //   fieldStudyDataSource: function () {
  //     return CiItems.CI__FIELD_STUDY
  //   },
  //   universityPlaceDataSource: function () {
  //     return CiItems.CI_UNIVERSITY_PLACE
  //   },
  //   scoreDataSource: function () {
  //     return CiItems.CI_SCORE
  //   },
  //   militaryStatusDataSource: function () {
  //     return CiItems.CI_MILITARY_STATUS
  //   }
  // },
  // methods: {
  //   rowClick (e) {
  //
  //     if (this.isEditable) {
  //       this.editRow(e.dataItem)
  //     }
  //   }
  // }
}
</script>
