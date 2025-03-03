<template>
  <fit>
    <safa-text
      v-model="value.ContractSale_Info.DebitCreditDesc"
      cdcName="DebitCreditDesc"
      type="textarea"
      label-width="100px"
      height="100%"
      max-height="100%"
      :m="m"
      spId="E3660FED-2050-43DD-ACA9-2D41374E3E58"
    />
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
      name: "Description"
    }
  }

}
</script>
