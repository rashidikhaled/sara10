<template>
  <!-- <safa-form id="1DD323C3-E294-446A-AF8C-0F77A48DE4FF"> -->
    <fit>
      <FormRow class="q-mb-sm" :xs="1" :sm="2" :md="3" :lg="3" :xl="3">
        <FormControl>
          <safa-text
            label="شماره فسخ"
            v-model="value.ContractBuy_Info.CancelNo"
            cdcName="CancelNo"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ فسخ"
            v-model="value.ContractBuy_Info.CancelDate"
            cdcName="CancelDate"
            label-width="100px"
            :m="m"
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
            :m="m"
          />
        </FormControl>
          <template>
            <text-template
              label="توضیحات"
              v-model="value.ContractBuy_Info.CancelDesc"
              cdcName="CancelDesc"
              label-width="100px"
              class="col-12"
              :m="m"
              formKey="52C2A0C1-DE51-42A3-8D4E-CD680DF1D9E1"
            />
          </template>
      </FormRow>
    </fit>
  <!-- </safa-form> -->
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String }
  },

  data () {
    return {
      name: "SessionDetails"
    }
  }
}
</script>
