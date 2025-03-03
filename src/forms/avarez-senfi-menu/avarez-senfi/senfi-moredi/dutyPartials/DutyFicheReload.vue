<template>
  <fit>
    <safa-status :result="fichesResult"></safa-status>
    <safa-status :result="recycleResult"></safa-status>
    <safa-datatable
      helper="dutyFicheReload"
      v-model="fichesResults.DeletedDutyFiches"
      @row-click="click"
      title="فیش ها"
      cdcName="DeletedDutyFiches"
      fit
      height="100%"
      class="q-mb-sm"
    />
  </fit>
</template>
<script>
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      fichesResult: null,
      fichesResults: { DeletedDutyFiches: [] },
      selectedRow: null,
      recycleResult: null
    }
  },
  props: {
    payOfHistory: Array,
    results: Object,
    baseNosaziCode: Object,
    name: {
      type: String,
      default: "DutyFicheReload"
    },
    title: { type: String, default: "" },
    formKey: { type: String, default: "" }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.showLoading()
      let data = {
        pNidList: this.results.NidJobList,
        pSysCiDutyType: 2
      }

      this.$services.SB.getDeletedDutyFiches(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری فیش های حذف شده در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // click (event, dataItem, target) {
    //   this.selectedRow = dataItem
    // },
    click (row) {
      this.selectedRow = row
    },
    reloadDeletedFiche () {
      if (this.selectedRow === null) {
        this.showError("هیچ فیشی انتخاب نشده است.")
      } else {
        this.showConfirm("آیا از بازآوری فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.showLoading()
            let data = { pNidFiche: this.selectedRow.NidFiche }

            this.$services.SB.reCycleFiche(data, { config: { District: this.baseNosaziCode.District } })
              .then(async ({ data }) => {
                this.recycleResult = this.getResponse(data)

                if (this.recycleResult.success) {
                  this.showSuccess("فیش انتخاب شده با موفقیت بازآوری شد.")
                  this.load()
                  this.$emit("reloadDutyFiche")
                  this.$emit("closeReloadModal")
                }
              })
              .catch((response) => {
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          }
        )
      }
    }
  }
}
</script>
