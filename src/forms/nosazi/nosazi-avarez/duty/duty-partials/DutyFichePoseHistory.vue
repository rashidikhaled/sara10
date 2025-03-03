<template>
  <fit>
  <safa-datatable
    v-model="poseHistoryResults.PoseFicheHistory"
    cdcName="dutyFichePoseHistory"
    height="100%"
    max-height="100%"
    helper="dutyFichePoseHistory"
    title="تاریخچه پوز"
  />
</fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin/'

export default {
  name: 'DutyFichePoseHistory',
  mixins: [baseFormMixin],
  data: function () {
    return {
      poseHistoryResults: { PoseFicheHistory: [] },
      poseHistoryResult: null
    }
  },
  props: {
    selectedRow: Object,
    baseNosaziCode: Object,
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
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      let data = { pNidFiche: this.selectedRow.NidFiche }
      this.$services.SA.getPoseFicheHistory(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.poseHistoryResult = this.getResponse(data)

          if (this.poseHistoryResult.success) {
            this.poseHistoryResults = this.poseHistoryResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: 'NidFiche'
            })
          }
        })

        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
