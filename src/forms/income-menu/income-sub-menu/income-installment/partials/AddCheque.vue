<template>
  <div>
    <div class="row">
      <safa-
        v-model="incomeFicheSubResults"
        ref="grid"
        name="grid"
        helper="addCheque"
        class="col-12"
        m="e"
        title="چک بین بانکی"
   />
      <q-btn  label="تأیید" class="btn-confirm q-mt-md" @click="confirm"></q-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {

    }
  },
  mounted () {},
  methods: {
    confirm () {
      this.$emit('reloadInstallmentform', this.incomeFicheSubResults)
    }
  }
}
</script>
