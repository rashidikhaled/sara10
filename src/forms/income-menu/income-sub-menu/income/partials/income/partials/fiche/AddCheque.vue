<template>
  <fit>
    <safa-grid
      title="چک بین بانکی"
      v-model="incomeFicheSubResults"
      cdcName="incomeFicheSubResults"
      helper="addCheque"
      m="e"
      fit
      height="100%"
      max-height="100%"
      min-height="100px"
    />
    <div class="q-pa-sm">
      <btn-save label="تأیید" @click="confirm" />
    </div>
  </fit>
</template>
<script>
export default {
  data () {
    return {
      incomeFicheSubResults: []
    }
  },
  methods: {
    confirm () {
      this.$emit("reloadInstallmentform", this.incomeFicheSubResults)
    }
  }
}
</script>
