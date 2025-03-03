<template>
  <FormRow class="q-mb-sm">
    <FormControl class="col-12">
      <text-template
        v-model="value.ContractSale_Info.Description"
        cdcName="Description"
        label-width="120px"
        label="توضیحات"
        class="col-12"
        :rows="3"
        :m="m"
        spId="5872E27C-356D-498C-B72A-A3459AE06FF5"
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
