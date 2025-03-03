<template>
  <form-wrapper title="اضافه کردن چک بین بانکی" :padding="false">
    <fit>
      <safa-grid
        helper="installmentgrid"
        v-model="incomeFicheSubResults"
        cdcName="incomeFicheSubResults"
        fit
        title="چک بین بانکی"
        min-height="200px"
        height="100%"
        max-height="100%"
        :m="m"
      />
    </fit>
    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="confirm"
        @cancel="isEditable = false"
      />
    </template>
  </form-wrapper>
</template>
<script>
export default {
  props: {
    m: String,
    incomeFicheSubResults: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    confirm () {
      this.$emit("reloadInstallmentform", this.incomeFicheSubResults)
    }
  }
}
</script>
