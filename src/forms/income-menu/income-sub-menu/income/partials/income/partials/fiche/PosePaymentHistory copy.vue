<template>
  <div>
    <!-- Binding is not completed -->
    <safa-datagrid
      v-model="historyResults.PoseFicheHistory"
      cdcName="historyResultsPoseFicheHistory"
      ref="grid"
      name="grid"
      helper="posePaymentHistory"
      title="تاریخچه پرداخت با پوز"
    ></safa-datagrid>
  </div>
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
    config: Object
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
      this.$services.SA.getPoseFicheHistory(data, this.config)
        .then(({ data }) => {
          this.historyResult = this.getResponse(data)
          if (this.historyResult.success) {
            this.historyResults = this.historyResult.data
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
