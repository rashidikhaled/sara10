<template>
  <fit>
    <safa-datatable
      v-model="historyResults.PoseFicheHistory"
      cdcName="PoseFicheHistory"
      helper="posePaymentHistory"
      min-height="400px"
      title="تاریخچه پرداخت با پوز"
      fit
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
    />
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    nidFiche: String,
    ficheNo: {
      type: String,
      default: ''
    },
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      historyResult: null,
      historyResults: { PoseFicheHistory: [] }
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SA.getPoseFicheHistory(
        { pNidFiche: this.nidFiche },
        { config: { District: this.selectedDistrict } }
      )
        .then(async ({ data }) => {
          this.historyResult = this.getResponse(data)
          if (this.historyResult.success) {
            this.historyResults = this.historyResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `تاریخچه پرداخت با پوز فیش با شماره ${this.ficheNo} `
            })
          }
        })
        .catch((e) => {
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
