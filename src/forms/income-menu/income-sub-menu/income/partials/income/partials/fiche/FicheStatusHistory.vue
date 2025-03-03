<template>
  <fit>
    <safa-status :result="historyRes" />
    <safa-datatable
      title="تاریخچه"
      v-model="incomeFicheStatusHistoryList"
      cdcName="IncomeFicheStatusHistoryList"
      helper="ficheStatusHistory"
      fit
      :allowMultipleSelection="true"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
    />
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      historyRes: null,
      incomeFicheStatusHistoryList: []
    }
  },
  props: {
    selectedRow: Object,
    config: Object,
    formKey: String,
    title: String,
    name: String
  },
  mounted () {
    this.getIncomeFicheStatusHistory()
  },
  methods: {
    setRowColor (e) {
      if (e === 0) {
        return "dutyFichePermanent"
      } else if (e === 1) {
        return "dutyFicheConfirmBank" // 'dutyFicheConfirm'
      } else if (e === 2) {
        return "dutyFichePrint"
      } else if (e === 7) {
        return "dutyFicheTempExport"
      } else if (e === 3) {
        return "dutyFicheConfirm" // 'dutyFicheConfirmBank'
      } else if (e === 4) {
        return "dutyFicheRevoke"
      } else return ""
    },
    getIncomeFicheStatusHistory () {
      this.showLoading()
      this.$services.SD.getIncomeFicheStatusHistory(
        { pNidFiche: this.selectedRow.NidFiche },
        this.config
      )
        .then(async ({ data }) => {
          this.historyRes = this.getResponse(data)
          if (this.historyRes.success) {
            this.incomeFicheStatusHistoryList =
              this.historyRes.data?.Income_FicheStatusHistoryList?.map((m) => {
                return { ...m, class: this.setRowColor(m.EumFicheStatus) }
              }) ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش تاریخچه وضعیت فیش با شماره ${this.selectedRow.FicheNo} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
