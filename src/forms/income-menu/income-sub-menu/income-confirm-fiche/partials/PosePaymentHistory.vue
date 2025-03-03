<template>
  <fit>
    <!-- Binding is not completed -->
    <safa-datatable
      v-model="historyResults.PoseFicheHistory"
      ref="grid"
      name="grid"
      helper="posePaymentHistory"
      title="تاریخچه پرداخت با پوز"
      height="100%"
      max-height="100%"
    ></safa-datatable>
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  data: function () {
    return {
      historyResult: null,
      historyResults: { PoseFicheHistory: [] }
    }
  },
  mixins: [baseFormMixin],
  props: {
    nidFiche: String,
    title: String,
    formKey: String,
    main: String
  },
  mounted () {
    this.getPoseFicheHistory()
  },
  methods: {
    getPoseFicheHistory () {
      this.showLoading()
      let data = {
        pNidFiche: this.nidFiche
      }
      this.$services.SA.getPoseFicheHistory(data)
        .then(async ({ data }) => {
          this.historyResult = this.getResponse(data)
          if (this.historyResult.success) {
            this.historyResults = this.historyResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidFiche,
              bizCodeTitle: 'NidFiche'
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
