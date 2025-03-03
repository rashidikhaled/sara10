<template>
  <div>
    <safa-status :result="fichesResult"></safa-status>
    <safa-status :result="recycleResult"></safa-status>
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
        @click="reloadDeletedFiche"
      ></q-btn>
    </div>
  </div>
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

      this.$services.SB.getDeletedDutyFiches(data)
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
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
    click (event, dataItem, target) {
      this.selectedRow = dataItem
    },
    reloadDeletedFiche () {
      if (this.selectedRow === null) {
        this.showError("هیچ فیشی انتخاب نشده است.")
      } else {
        this.showConfirm("آیا از بازآوری فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.showLoading()
            let data = { pNidFiche: this.selectedRow.NidFiche }

            this.$services.SB.reCycleFiche(data)
              .then(async ({ data }) => {
                this.recycleResult = this.getResponse(data)

                if (this.recycleResult.success) {
                  await this.log({
                    action: this.logActions.save,
                    bizCode: this.selectedRow.NidFiche,
                    bizCodeTitle: "NidFiche"
                  })
                  this.showSuccess("فیش انتخاب شده با موفقیت بازآوری شد.")
                  this.load()
                }
              })
              .catch((e) => {
                console.error(e)
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
