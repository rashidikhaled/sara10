<template>
  <FormRow>
    <FormControl>
      <safa-text
        label-width="100px"
        v-model="value.ContractPartnershipNo"
        cdcName="ContractPartnershipNo"
        :m="m"
        label="شماره قرارداد"
      />
    </FormControl>
    <FormControl>
      <safa-datepicker
        label-width="100px"
        v-model="value.ContractPartnershipDate"
        cdcName="ContractPartnershipDate"
        :m="m"
        label="تاریخ قرارداد"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label-width="100px"
        v-model="value.ProjectName"
        cdcName="ProjectName"
        :m="m"
        label="نام پروژه"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label-width="100px"
        v-model="value.FinancierName"
        cdcName="FinancierName"
        :m="m"
        label="نام سرمایه گذار"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label-width="100px"
        v-model="value.ProjectArea"
        cdcName="ProjectArea"
        :m="m"
        label="مساحت پروژه"
      />
    </FormControl>
    <FormControl>
      <safa-text
        label-width="100px"
        v-model="value.EstimateAmount"
        cdcName="EstimateAmount"
        :m="m"
        label="مبلغ براوردی پروژه"
      />
    </FormControl>
    <FormControl class="q-mt-sm fit">
      <text-template
        label-width="100px"
        v-model="value.Description"
        cdcName="Description"
        label="توضیحات"
      />
    </FormControl>
  </FormRow>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String
  },
  data () {
    return {
      name: "SpecificationsContract",
      title: "مشخصات قرار داد مشترک"
    }
  }
}
</script>
