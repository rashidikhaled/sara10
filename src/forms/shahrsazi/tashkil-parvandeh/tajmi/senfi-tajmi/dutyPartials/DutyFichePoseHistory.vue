<template>
  <div>
    <div class="form-row">
      <safa-datagrid
        helper="dutyFichePoseHistory"
        v-model="poseHistoryResults.PoseFicheHistory"
    title="تاریخچه پوز"
      />
    </div>
  </div>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin/'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      poseHistoryResults: { PoseFicheHistory: [] },
      poseHistoryResult: null
    }
  },
  props: {
    selectedRow: Object
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      let data = { pNidFiche: this.selectedRow.NidFiche }
      this.$services.SA.getPoseFicheHistory(data)
        .then(({ data }) => {
          this.poseHistoryResult = this.getResponse(data)

          if (this.poseHistoryResult.success) {
            this.poseHistoryResults = this.poseHistoryResult.data
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
