<template>
  <FormRow class="q-mb-sm">
    <FormControl class="col-12">
      <text-template
        v-model="value.ContractBuy_Info.Description"
        cdcName="Description"
        label-width="120px"
        label="توضیحات"
        class="col-12"
        :rows="1"
        :m="m"
        formKey="569C4019-669E-4220-9024-2283A0544C53"
      />
    </FormControl>
    <FormControl class="col-12">
      <text-template
        v-model="value.ContractBuy_Info.Description1"
        cdcName="Description1"
        label-width="120px"
        label="توضیحات ماده 1"
        class="col-12"
        :rows="1"
        :m="m"
        formKey="569C4019-669E-4220-9024-2283A0544C53"
      />
    </FormControl>
    <FormControl class="col-12">
      <text-template
        v-model="value.ContractBuy_Info.DebitCreditDesc"
        cdcName="DebitCreditDesc"
        label-width="120px"
        label="توضیحات ماده 3"
        class="col-12"
        :rows="1"
        :m="m"
        formKey="569C4019-669E-4220-9024-2283A0544C53"
      />
    </FormControl>
    <FormControl class="col-12">
      <text-template
        v-model="value.EvaluationDesc"
        cdcName="EvaluationDesc"
        label-width="120px"
        label="توضیحات ماده 4"
        class="col-12"
        :rows="1"
        :m="'r'"
        formKey="569C4019-669E-4220-9024-2283A0544C53"
      />
    </FormControl>
    <FormControl class="col-12">
      <text-template
        v-model="value.ContractBuy_Info.Description2"
        cdcName="Description2"
        label-width="120px"
        label="مزایای ورود به محدوده"
        class="col-12"
        :rows="1"
        :m="m"
        formKey="569C4019-669E-4220-9024-2283A0544C53"
      />
    </FormControl>
  </FormRow>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String }
  },

  data () {
    return {
      name: "Description"
    }
  }
}
</script>
