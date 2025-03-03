<template>
  <div class="full-height column">
    <safa-status :result="result" />
    <div class="form-row" style="flex: 1">
      <safa-datatable
        helper="dutyFicheBuilding"
        v-model="fichesResults.DutyFiches"
        @click="click"
        title="فیش ها"
        cdcName="DutyFiches"
      />
    </div>
    <div class="row q-gutter-md q-mt-md">
      <btn-default
        label="فیش صنف های حذف شده"
        @click="deletedFiches"
      ></btn-default>
      <btn-default label="چاپ گزارش مفاصا"></btn-default>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      results: { NidNosaziCode: [] },
      result: null,
      fichesResult: null,
      fichesResults: { DutyFiches: [] },
      selectedRow: null
    }
  },
  props: {
    payOfHistory: Array,
    baseNosaziCode: Object,
    name: {
      type: String,
      default: "DutyFicheBuilding"
    },
    title: { type: String, default: "" },
    formKey: { type: String, default: "" }
  },
  mounted () {
    this.getNidNosaziCode()
  },
  methods: {
    getNidNosaziCode () {
      this.$q.loading.show({ message: "در حال بارگذاری..." })
      this.ownerName = ""
      let data = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: 0,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pDutyType: 2,
        pEumNosaziCodeGroup: 0,
        pEumBaseInfoGroup: 0,
        pIsHouseFiche: true
      }
      this.$services.SB.getNidNosaziCode(data, { config: { District: this.baseNosaziCode.District } })
        .then(({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            this.getDutyFiches()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    getDutyFiches () {
      this.$q.loading.show({ message: "در حال بارگذاری..." })
      let data = {
        pNidList: this.results.NidNosaziCode,
        pSysCiDutyType: 2,
        pUnLoadCancelFiches: false
      }

      this.$services.SB.getDutyFiches(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          // console.log(response)
          this.serverError()
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    click (event, dataItem, target) {
      this.selectedRow = dataItem
      this.$q.loading.show({ message: "در حال بارگذاری..." })

      let data = { pNidFiche: dataItem.NidFiche }
      this.$services.SB.getDutyFicheSubs(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.dutyFicheSubResult = this.getResponse(data)

          if (this.dutyFicheSubResult.success) {
            this.dutyFicheSubResults = this.dutyFicheSubResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات فیش ${dataItem?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    deletedFiches () {
      if (this.selectedRow === null) {
        this.showError("هیچ فیشی انتخاب نشده است.")
      } else {
      }
    }
  }
}
</script>
