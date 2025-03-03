<template>
  <fit>
    <safa-datatable
      title="تاریخچه چاپ"
      helper="printHistoryColumns"
      v-model="logList.Commission_PrintLog"
      cdcName="Commission_PrintLog"
      m="r"
      height="100%"
      max-height="100%"
      min-height="300px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
      fit
    />
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  props: {
    formKey: String
  },
  data () {
    return {
      title: "تاریخچه چاپ",
      name: "PrintHistory",
      logList: { Commission_PrintLog: [] }
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      const payload = {
        PRequest: { NIDCommission: this.selectedNidCommission }
      }
      this.showLoading()
      this.$services.commissions
        .getCommissionPrintLog(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.logList = res.data.GetCommission_PrintLogResult
            this.log({
              action: this.logActions.view,
              bizCode: this.selectedCommission.NidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `بارگذاری اطلاعات ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
