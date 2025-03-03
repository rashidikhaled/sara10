<template>
  <div>
    <div class="form-row">
      <safa-datatable
        helper="dutyFicheBuilding"
        v-model="fichesResults.DutyFiches"
        cdcName="DutyFiches"
        @click="click"
        title="فیش ها"
      />
    </div>
    <div class="row q-gutter-md q-mt-md">
      <q-btn
        label="فیش صنف های حذف شده"
        color="primary"
        @click="deletedFiches"
      ></q-btn>
      <q-btn label="چاپ گزارش مفاصا" color="primary"></q-btn>
    </div>
  </div>
</template>
<script>
import { convertNosaziCodeObjectToString } from "../../../../../../kartable/utils/nosaziCodeOperation"
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
      this.showLoading()
      let self = this
      this.ownerName = ""
      let data = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: 0,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pDutyType: 1,
        pEumNosaziCodeGroup: 0,
        pEumBaseInfoGroup: 0,
        pIsHouseFiche: true
      }
      this.$services.SB.getNidNosaziCode(data)
        .then(async ({ data }) => {
          self.result = this.getResponse(data)
          if (this.result.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
              bizCodeTitle: "NosaziCode"
            })
            self.results = self.result.data
            this.getDutyFiches()
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
    getDutyFiches () {
      this.showLoading()
      let data = {
        pNidList: this.results.NidNosaziCode,
        pSysCiDutyType: 1,
        pUnLoadCancelFiches: false
      }

      this.$services.SB.getDutyFiches(data)
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)
          if (this.fichesResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
              bizCodeTitle: "NosaziCode"
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
      this.showLoading()
      let data = { pNidFiche: dataItem.NidFiche }
      this.$services.SB.getDutyFicheSubs(data)
        .then(async ({ data }) => {
          this.dutyFicheSubResult = this.getResponse(data)

          if (this.dutyFicheSubResult.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche"
            })
            this.dutyFicheSubResults = this.dutyFicheSubResult.data
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
    deletedFiches () {
      if (this.selectedRow === null) {
        this.showError("هیچ فیشی انتخاب نشده است.")
      } else {
      }
    }
  }
}
</script>
