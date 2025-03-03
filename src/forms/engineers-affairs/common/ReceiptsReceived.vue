<template>
  <form-wrapper :title="title">
    <fit>
      <safa-datatable
        title=""
        helper="exportFicheHistory"
        v-model="getExportFicheHistoryResult.ExportFicheHistory"
        m="r"
        fit
        height="100%"
        max-height="100%"
        min-height="100px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
      />
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: ["currentIdentityCode"],
  data () {
    return {
      title: "فیش های وصول شده",
      name: "ReceiptsReceived",
      formKey: "b271ed15-eaf0-452e-bc4c-7e2664d59810",
      main: true,
      expansionState: true,
      getExportFicheHistoryResult: {
        ExportFicheHistory: []
      }
    }
  },
  mounted () {
    this.getExportFicheHistory()
  },
  methods: {
    getExportFicheHistory () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
          NidEng: "00000000-0000-0000-0000-000000000000",
          NidFil: "00000000-0000-0000-0000-000000000000",
          NidWorkitem: 0,
          CI_CancelType: 0,
          CI_ExecFloor: 0,
          CI_ExecLevel: 0,
          CI_SazeType: 0,
          CI_Year: 0,
          Floor: 0,
          Height: 0,
          Infrastructure: 0,
          IsConfirm: false,
          IsSendToSaraRequest: false,
          NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
          NIdDetail: "00000000-0000-0000-0000-000000000000",
          NIdRealPerson: "00000000-0000-0000-0000-000000000000",
          NidBlackList: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidRefer: "00000000-0000-0000-0000-000000000000",
          NidTask: "00000000-0000-0000-0000-000000000000",
          NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
          OtherFileType: 0,
          PredicateCondition:
            "WHERE it.IdentityCode='" + this.currentIdentityCode + "'",
          Sara_WorkflowID: 0,
          SecretariatNo: 0,
          Skip: 0,
          StudyFiled: 0,
          SysCI_RequestStatus: 0,
          Take: 200
        }
      }
      this.$services.engineers
        .getExportFicheHistory(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            this.getExportFicheHistoryResult =
              res.data.GetExportFicheHistoryResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.currentIdentityCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch((error) => {
          console.error("load error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
