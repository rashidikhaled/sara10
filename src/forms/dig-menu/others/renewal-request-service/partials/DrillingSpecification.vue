<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_DigDelayTime"
          cdcName="CI_DigDelayTime"
          ciName="CI_DigDelayTime"
          domain-name="Dig"
          label="مدت تاخیر حفاری"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="value.RequestService_Info.CI_SplitType"
          cdcName="CI_SplitType"
          ciName="CI_SplitType"
          domain-name="Dig"
          label="نوع انشعاب"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.LetterNo"
          cdcName="LetterNo"
          label="شماره نامه"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="value.RequestService_Info.LetterDate"
          cdcName="LetterDate"
          label="تاریخ نامه"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <div class="row">
        <safa-checkbox
          v-model="value.RequestService_Info.ConfilictWithOther"
          m="r"
          label="تداخل با سایر طرح ها"
          cdcName="ConfilictWithOther"
        />
      </div>
    </FormRow>
    <fit>
      <safa-grid
        title="مشخصات عوامل اجرایی"
        v-model="value.RequestService_Contractor"
        :columns="requestServiceContractorColumns"
        :defaultNewRow="{
          Company: '',
          RegisterNo: '',
          CompanyName: '',
          ManagerName: '',
          Description: '',
          ManagerTel: '',
          ManagerMobile: '',
        }"
        paginate
        :pageSize="20"
        :suppressRowClickSelection="false"
        :m="m"
        :addRow="false"
        fit
      />
    </fit>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      requestServiceContractorColumns: [
        {
          field: "company",
          title: "شرکت",
          width: "200px"
        },
        {
          field: "ManagerMobile",
          title: "همراه مدیر عامل",
          width: "200px"
        },
        {
          field: "ManagerTel",
          title: "تلفن شرکت",
          width: "200px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "200px"
        }
      ]
    }
  }
}
</script>
