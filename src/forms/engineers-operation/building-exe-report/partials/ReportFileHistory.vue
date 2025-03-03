<template>
  <fit>
    <safa-status :result="loadObjRes" />
    <safa-grid
      title="لیست سوابق"
      v-model="reportHistoryList"
      cdcName="reportHistoryList"
      helper="reportHistoryColumns"
      fit
      paginate
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../../mixins/kartableReferencesMixin"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],

  props: {
    model: Object,
    showreportList: String,
    NIdFil: String,
    NIdEng: String,
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      loadObjRes: null,
      reportHistoryList: []
    }
  },
  methods: {
    async loadObj () {
      if (this.showreportList === "showreportList") {
        try {
          this.showLoading()
          const payload = {
            pNidFil: this.NIdFil,
            pNidEng: this.NIdEng,
            pCI_ExecLevel: this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.CI_ExecLevel,
            pCI_ExecFloor: this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.CI_ExecFloor
          }
          // جهت تست
          // const payload = {
          //   pNidFil: "4033D130-FD05-4B6D-A1D3-E9469FD95959",
          //   pNidEng: "B88B7ACE-7FFB-47C4-ACC9-297A1673E00C",
          //   pCI_ExecLevel: this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.CI_ExecLevel,
          //   pCI_ExecFloor: this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.CI_ExecFloor
          // }
          const { data } = await this.$services.engineers
            .getBuildingExecRepInfoHistoryList(payload)

          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.reportHistoryList =
                this.loadObjRes.data.GetBuildingExecRep_Info_HistoryListResult
                  ?.BuildingExecRep_Info_HistoryList ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidBuildingExecRep,
              bizCodeTitle: "NIdBuildingExecRep",
              nosaziCode: this.selectedExecRep.CodeString ?? "",
              nidWorkItem: this.selectedExecRep.NidWorkItem ?? "",
              saveDesc: `نمایش سوابق برای شماره ارجاع ${
                this.selectedExecRep.NidWorkItem ?? ""
              } با موفقیت انجام شد.`
            })
          }
        }
        catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      }
    }
  },
  mounted () {
    this.loadObj()
  }
}
</script>
