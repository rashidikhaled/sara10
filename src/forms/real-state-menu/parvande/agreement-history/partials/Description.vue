<template>
  <fit>
    <safa-text
      v-model="isSaleOrBuy"
      cdcName="DebitCreditDesc"
      type="textarea"
      label-width="100px"
      height="100%"
      max-height="100%"
      :m="m"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    accessBuyOrSale: { type: Boolean, default: () => true },
    m: { type: String }
  },
  data () {
    return {
      name: "Description"
    }
  },
  computed: {
    isSaleOrBuy () {
      if (this.accessBuyOrSale) {
        return this.value.ContractBuy_Info.DebitCreditDesc
      } else {
        return this.value.ContractSale_Info.DebitCreditDesc
      }
    }
  }
}
</script>
