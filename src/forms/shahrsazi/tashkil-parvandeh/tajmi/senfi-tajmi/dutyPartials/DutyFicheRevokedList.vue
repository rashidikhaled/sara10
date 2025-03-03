<template>
  <div>
    <safa-status class="col-12" :result="fichesResult"></safa-status>
    <safa-status class="col-12" :result="recycleResult"></safa-status>
    <div class="form-row">
      <safa-datatable
        helper="dutyFicheReload"
        v-model="fichesResults.DeletedDutyFiches"
        @click="click"
        title="فیش ها"
        cdcName="DeletedDutyFiches"
      />
    </div>
    <div class="row q-gutter-md q-mt-md">
      <q-btn
        label="بازآوری"
        color="primary"
        @click="reloadRevokedFiche"
      ></q-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      fichesResult: null,
      fichesResults: { DutyCanceledFiches: [] },
      selectedRow: null,
      recycleResult: null
    }
  },
  props: {
    payOfHistory: Array,
    results: Object,
    name: {
      type: String,
      default: "DutyFicheRevokedList"
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
        pNidList: this.results.NidList,
        pSysCiDutyType: 1
      }

      this.$services.SB.getDutyCanceledFiches(data)
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: ""
            })
            this.fichesResults = this.fichesResult.data
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
    click (event, dataItem, target) {
      this.selectedRow = dataItem
    },
    reloadRevokedFiche () {
      // TODO complete reload method
      if (this.selectedRow === null) {
        this.showError("هیچ فیشی انتخاب نشده است.")
      } else {
        this.showConfirm("آیا از بازآوری فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            // this.showLoading()
            // let data = { pNidFiche: this.selectedRow.NidFiche }
            // this.$services.SB.getDutyCanceledFiches(data)
            //   .then(({ data }) => {
            //     this.recycleResult = this.getResponse(data)
            //     if (this.recycleResult.success) {
            //       this.showSuccess('فیش انتخاب شده با موفقیت بازآوری شد.')
            //       this.load()
            //     }
            //   })
            //   .catch(response => {
            //     this.serverError()
            //   })
            //   .finally(() => {
            //     this.hideLoading()
            //   })
          }
        )
      }
    }
  }
}
</script>
