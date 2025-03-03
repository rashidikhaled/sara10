<template>
  <fit>
    <safa-datatable
      helper="dutyFichePoseHistory"
      v-model="poseHistoryResults.PoseFicheHistory"
      title="تاریخچه پوز"
      :bordered="false"
      fit
      height="100%"
    />
  </fit>
</template>
<script>
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin/"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      poseHistoryResults: { PoseFicheHistory: [] },
      poseHistoryResult: null
    }
  },
  props: {
    formKey: String,
    title: String,
    name: String,
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
        .then(async ({ data }) => {
          this.poseHistoryResult = this.getResponse(data)

          if (this.poseHistoryResult.success) {
            this.poseHistoryResults = this.poseHistoryResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
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
