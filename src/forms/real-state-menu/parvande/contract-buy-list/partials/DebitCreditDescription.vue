<template>
  <fit>
    <safa-text
      v-model="value.ContractBuy_Info.DebitCreditDesc"
      cdcName="DebitCreditDesc"
      type="textarea"
      label-width="100px"
      height="100%"
      max-height="100%"
      m="r"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    accessBuyOrSale: Boolean,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
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
