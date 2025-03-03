<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label-width="100px"
          v-model="value.ContractBuy_Info.CancelNo"
          cdcName="CancelNo"
          :m="m"
          label="شماره فسخ"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label-width="100px"
          v-model="value.ContractBuy_Info.CancelDate"
          cdcName="CancelDate"
          :m="m"
          label="تاریخ فسخ"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label-width="100px"
          v-model="value.ContractBuy_Info.CI_ContractCancelReason"
          cdcName="CI_ContractCancelReason"
          ciName="CI_ContractCancelReason"
          domainName="Estate"
          :m="m"
          label="علت فسخ"
        />
      </FormControl>
      <FormControl class="fit">
        <text-template
          label-width="100px"
          v-model="value.ContractBuy_Info.CancelDesc"
          cdcName="CancelDesc"
          class="col-12"
          :m="m"
          label="توضیحات"
        />
      </FormControl>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String }
  },
  data () {
    return {
      name: "CancleDetailsPeaceAgreement",
      title: "اطلاعات فسخ صلح نامه"
    }
  }
}
</script>
