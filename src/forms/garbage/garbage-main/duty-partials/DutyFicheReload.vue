<template>
  <fit>
    <safa-status :result="fichesResult"/>
    <safa-status :result="recycleResult"/>

    <safa-datatable
      v-model="fichesResults.DeletedDutyFiches"
      cdcName="dutyFicheReload"
      class="q-mb-sm"
      fit
      height="100%"
      helper="dutyFicheReload"
      title="فیش ها"
      @row-click="click"
    />
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import { ClsEnumEumDutyType } from 'src/forms/garbage/config/enums.js'
export default {
  name: 'DutyFicheReload',
  mixins: [baseFormMixin],
  data: function () {
    return {
      fichesResult: null,
      fichesResults: { DeletedDutyFiches: [] },
      selectedRow: null,
      recycleResult: null,
      getClsEnumEumDutyType: ClsEnumEumDutyType
    }
  },
  props: {
    payOfHistory: Array,
    results: Object,
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
      let data = {
        pNidList: this.results.NidList,
        pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value
      }

      this.$services.SB.getDeletedDutyFiches(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
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
    },
    click (row) {
      this.selectedRow = row
    },
    reloadDeletedFiche () {
      if (this.selectedRow === null) {
        this.showError('هیچ فیشی انتخاب نشده است.')
      } else {
        this.showConfirm('آیا از بازآوری فیش انتخاب شده اطمینان دارید؟').onOk(
          () => {
            this.showLoading()
            let data = { pNidFiche: this.selectedRow.NidFiche }

            this.$services.SB.reCycleFiche(data, { config: { District: this.baseNosaziCode.District } })
              .then(async ({ data }) => {
                this.recycleResult = this.getResponse(data)

                if (this.recycleResult.success) {
                  this.showSuccess('فیش انتخاب شده با موفقیت بازآوری شد.')
                  await this.log({
                    action: this.logActions.save,
                    bizCode: this.selectedRow.NidFiche,
                    bizCodeTitle: 'NidFiche'
                  })

                  this.load()
                  this.$emit('reloadDutyFiche')
                  this.$emit('closeReloadModal')
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
        )
      }
    }
  }
}
</script>
