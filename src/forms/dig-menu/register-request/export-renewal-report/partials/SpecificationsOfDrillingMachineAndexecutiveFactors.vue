<template>
  <fit>
    <safa-splitter v-model="splitterValue" class="fit" horizontal margin="0">
      <template v-slot:before>
        <fit>
          <FormRow class="q-my-sm">
            <FormControl>
              <safa-combo
                v-model="value.RequestService_Info.CI_DigDelayTime"
                cdcName="CI_DigDelayTime"
                ciName="CI_DigDelayTime"
                domainName="Dig"
                label="مدت تاخیر حفاری"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                v-model="value.RequestService_Info.CI_SplitType"
                cdcName="CI_SplitType"
                ciName="CI_SplitType"
                domainName="Dig"
                label="نوع انشعاب"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="value.RequestService_Info.LetterNo"
                cdcName="LetterNo"
                label="شماره نامه"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                v-model="value.RequestService_Info.LetterDate"
                cdcName="LetterDate"
                label="تاریخ نامه"
                label-width="80px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-checkbox
                v-model="value.RequestService_Info.ConfilictWithOther"
                cdcName="ConfilictWithOther"
                label="تداخل با سایر طرح ها"
                label-width="80px"
                m="r"
              />
            </FormControl>
          </FormRow> </fit
      ></template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.RequestService_Contractor"
            :columns="RequestRequestServiceContractorColumns"
            :show-selected-checkbox="true"
            :allowMultipleSelection="false"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            fit
            paginate
            cdcName="RequestService_Contractor"
            m="r"
            @CompanyCaptionClick="companyInfo"
          /> </fit
      ></template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    formKey: String,
    title: String,
    name: String,
    value: Object

  },
  components: {},
  data () {
    return {
      RequestRequestServiceContractorColumns: [
        {
          field: "CompanyCaption",
          title: "شرکت",
          width: "100px"
        },
        { field: "ManagerMobile", title: "همراه مدیرعامل" },
        { field: "ManagerTel", title: "تلفن شرکت" },
        { field: "Description", title: "توضیحات" }
      ],
      showCompanyInfo: false,
      splitterValue: 50
    }
  },
  methods: {}
}
</script>
