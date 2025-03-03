<template>
  <div>
    <!-- Binding is not completed -->
    <safa-datatable
      v-model="historyResults.PoseFicheHistory"
      cdcName="PoseFicheHistory"
      ref="grid"
      name="grid"
      helper="posePaymentHistory"
      title="تاریخچه پرداخت با پوز"
    />
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
    ficheNo: String,
    config: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }

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
        .then(async ({ data }) => {
          this.historyResult = this.getResponse(data)
          if (this.historyResult.success) {
            this.historyResults = this.historyResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidFiche,
              bizCodeTitle: 'NidFiche',
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش تاریخچه پرداخت با پوز برای فیش با شماره ${this.ficheNo} انجام گردید.`
            })
          }
        })
        .catch(e => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
