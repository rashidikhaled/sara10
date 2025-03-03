<template>
  <fit>
    <!-- <div class="form-row"> -->
      <safa-datatable
        helper="senfiAllCalculationHistory"
        v-model="calcuateHistoryResults.DutySessionHistoryHeaders"
        :hideToolbar="true"
        title="تاریخچه"
      />
    <!-- </div> -->
  </fit>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      calcuateHistoryResults: {
        DutySessionHistoryHeaders: []
      },
      calcuateHistoryResult: null
    }
  },
  props: {
    results: Object
  },
  mounted () {
    this.calcuateHistory()
  },
  methods: {
    calcuateHistory () {
      this.showLoading()
      let data = {
        pNidList: this.results.NidJobList,
        pSysCiDutyType: 2
      }

      this.$services.SB.getDutyCalculateHistoryHeaders(data)
        .then(({ data }) => {
          this.calcuateHistoryResult = this.getResponse(data)

          if (this.calcuateHistoryResult.success) {
            this.calcuateHistoryResults = this.calcuateHistoryResult.data
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
