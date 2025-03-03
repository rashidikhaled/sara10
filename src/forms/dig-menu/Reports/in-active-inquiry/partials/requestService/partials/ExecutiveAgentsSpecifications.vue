<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="مدت تاخیر حفاری"
          label-width="110px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.CI_DigDelayTime
          "
          m="r"
          ciName="CI_DigDelayTime"
          cdcName="CI_DigDelayTime"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع انشعاب"
          label-width="110px"
          v-model="
            value.ClsRequestService_Info.RequestService_Info.CI_SplitType
          "
          m="r"
          ciName="CI_SplitType"
          cdcName="CI_SplitType"
          domain-name="Dig"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه"
          label-width="110px"
          m="r"
          cdcName="LetterNo"
          v-model="value.ClsRequestService_Info.RequestService_Info.LetterNo"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه"
          label-width="110px"
          m="r"
          v-model="value.ClsRequestService_Info.RequestService_Info.LetterDate"
          cdcName="LetterDate"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      title="مشخصات عملیات اجرایی"
      v-model="value.ClsRequestService_Info.RequestService_Contractor"
      :columns="Request_ContractorColumns"
      fit
      class="q-ma-sm"
      paginate
      cdcName="Request_Contractor"
      m="r"
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: Object
  },
  components: {},
  data () {
    return {
      Request_ContractorColumns: [
        {
          field: "CompanyCaption",
          title: "شرکت",
          width: "100px"
        },
        { field: "ManagerMobile", title: "همراه مدیرعامل" },
        { field: "ManagerTel", title: "تلفن شرکت" },
        { field: "Description", title: "توضیحات" }
      ]
    }
  },
  methods: {}
}
</script>
