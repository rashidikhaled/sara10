<template>
  <fit>
    <safa-status :result="fichesResult"></safa-status>
    <safa-status :result="recycleResult"></safa-status>
    <safa-datatable
      helper="dutyFicheReload"
      v-model="fichesResults.DutyCanceledFiches"
      @click="click"
      title="فیش ها"
      cdcName="DutyCanceledFiches"
      height="100%"
      fit
    />
  </fit>
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
    baseNosaziCode: Object,
    name: {
      type: String,
      default: "DutyFicheResokedList"
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

      this.$services.SB.getDutyCanceledFiches(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری فیش های ابطال شده در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((e) => {
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
            this.showLoading()
            let data = { pNidFiche: this.selectedRow.NidFiche }
            this.$services.SB.retriveCanceledFicheToMainTable(data, {
              config: { District: this.baseNosaziCode.District }
            })
              .then(async ({ data }) => {
                this.recycleResult = this.getResponse(data)

                if (this.recycleResult.success) {
                  this.showSuccess("فیش انتخاب شده با موفقیت بازآوری شد.")
                  this.load()
                  this.$emit("reloadDutyFiche")
                  this.$emit("closeRevokedFichesModal")

                  await this.log({
                    action: this.logActions.save,
                    bizCode: this.selectedRow.NidFiche,
                    bizCodeTitle: "NidFiche",
                    saveDesc: `بازآوری فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
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
