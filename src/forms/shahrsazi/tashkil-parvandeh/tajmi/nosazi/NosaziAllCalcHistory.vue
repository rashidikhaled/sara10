<template>
  <fit>
      <safa-datatable
        helper="nosaziAllCalcHistory"
        v-model="calcuateHistoryResults.DutySessionHistoryHeaders"
        title="تاریخچه"
        fit
        height="100%"
        :bordered="false"
      />
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data: function () {
    return {
      calcuateHistoryResults: { DutySessionHistoryHeaders: [] }
    }
  },
  mixins: [baseFormMixin],
  props: {
    codeInfoResults: Object
  },
  mounted () {
    this.calcuateHistory()
  },
  methods: {
    calcuateHistory () {
      this.showLoading()
      let data = {
        pNidList: this.codeInfoResults.NidList,
        pSysCiDutyType: 1
      }

      this.$services.SB.getDutyCalculateHistoryHeaders(data)
        .then(({ data }) => {
          this.calcuateHistoryResult = this.getResponse(data)

          if (this.calcuateHistoryResult.success) {
            this.calcuateHistoryResults = this.calcuateHistoryResult.data
          }
        })
        .catch(response => {
          this.calcuateHistoryResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
