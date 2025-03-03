<template>
  <fit>
      <safa-datatable
        helper="nosaziAllCalcHistory"
        v-model="calcuateHistoryResults.DutySessionHistoryHeaders"
        title="تاریخچه"
        fit
        height="100%"
        max-height="100%"
        min-height="100px"
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
    codeInfoResults: Object,
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
        .then(async ({ data }) => {
          this.calcuateHistoryResult = this.getResponse(data)

          if (this.calcuateHistoryResult.success) {
            this.calcuateHistoryResults = this.calcuateHistoryResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
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
