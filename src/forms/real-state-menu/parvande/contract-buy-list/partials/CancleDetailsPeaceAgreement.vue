<template>
    <fit>
      <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-text
            label="شماره فسخ"
            v-model="value.ContractBuy_Info.CancelNo"
            cdcName="CancelNo"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ فسخ"
            v-model="value.ContractBuy_Info.CancelDate"
            cdcName="CancelDate"
            label-width="100px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="علت فسخ"
            v-model="value.ContractBuy_Info.CI_ContractCancelReason"
            cdcName="CI_ContractCancelReason"
            ciName="CI_ContractCancelReason"
            domainName="Estate"
            label-width="100px"
            m="r"
          />
        </FormControl>
          <template>
            <text-template
              label="توضیحات"
              v-model="value.ContractBuy_Info.CancelDesc"
              cdcName="CancelDesc"
              label-width="100px"
              class="col-12"
              m="r"
              formKey="52C2A0C1-DE51-42A3-8D4E-CD680DF1D9E1"
            />
          </template>
      </FormRow>
    </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
    }
  }
}
</script>
