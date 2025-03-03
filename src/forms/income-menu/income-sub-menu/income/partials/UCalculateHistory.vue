<template>
  <section></section>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      logResult: null,
      logResults: {}
    }
  },
  components: {},
  props: {
    selectedRow: Object,
    formKey: String,
    title: String,
    name: String
  },
  mounted () {
    this.getCalcLogInfo()
  },
  methods: {
    getCalcLogInfo () {
      if (!this.selectedRow) return
      this.showLoading()
      let data = {
        pNidIncome: this.selectedRow.NidIncome
      }
      this.$services.SD.getCalculateLogInfo(data)
        .then(async ({ data }) => {
          this.logResult = this.getResponse(data)
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRow.NidIncome,
            bizCodeTitle: "NidIncome",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: ` دریافت لاگ محاسبه درآمد برای فیش شماره  ${this.selectedRow.FicheNo ?? ''}  انجام گردید.`
          })

          if (this.logResult.success) {
            this.logResults = this.logResult.data
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
