<template>
  <text-template
          v-model="CommentReport"
          cdcName="CommentReport"
          type="textarea"
          m="r"
          height="100%"
        />
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    selectedItem: {
      type: Object,
      default: () => {},
      required: true
    }
  },

  data () {
    return {
      // #services
      loadObjRes: null,

      // #variables
      CommentReport: ""
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.engineers
        .getBuildingReportFormOperation({
          pNIdBuildingExecRep: this.selectedItem.NIdBuildingExecRep
        })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.CommentReport =
              this.loadObjRes.data?.GetBuildingReport_FormOperationResult.BuildingExecRep_Info_Main.BuildingExecRepComments
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedItem?.NIdBuildingExecRep ?? '',
              bizCodeTitle: "NIdBuildingExecRep"
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
