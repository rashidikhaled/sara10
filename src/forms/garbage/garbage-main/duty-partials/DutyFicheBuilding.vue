<template>
  <div>
    <safa-datatable
      v-model="fichesResults.DutyFiches"
      cdcName="DutyFiches"
      class="q-mb-sm"
      height="400px"
      helper="dutyFicheBuilding"
      title="فیش ها"
      @click="click"
    />

    <div class="row q-gutter-sm">
      <btn-default
        label="فیش صنف های حذف شده"
        @click="deletedFiches"
      />
      <btn-default label="چاپ گزارش مفاصا"/>
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import { ClsEnumEumDutyType, ClsEnumEumBaseInfoGroup } from 'src/forms/garbage/config/enums.js'
export default {
  name: 'DutyFicheBuilding',
  mixins: [baseFormMixin],
  data: function () {
    return {
      results: { NidNosaziCode: [] },
      result: null,
      fichesResult: null,
      fichesResults: { DutyFiches: [] },
      selectedRow: null,
      getClsEnumEumDutyType: ClsEnumEumDutyType,
      getClsEnumEumBaseInfoGroup: ClsEnumEumBaseInfoGroup
    }
  },
  props: {
    payOfHistory: Array,
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
    this.getNidNosaziCode()
  },
  methods: {
    getNidNosaziCode () {
      this.showLoading()
      let self = this
      this.ownerName = ''
      let data = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: 0,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pDutyType: this.getClsEnumEumDutyType.Garbage.value,
        pEumNosaziCodeGroup: 0,
        pEumBaseInfoGroup: this.getClsEnumEumBaseInfoGroup.Parvandeh.value,
        pIsHouseFiche: true
      }
      this.$services.SB.getNidNosaziCode(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          self.result = this.getResponse(data)

          if (this.result.success) {
            self.results = self.result.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.getDutyFiches()
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
    getDutyFiches () {
      this.showLoading()
      let data = {
        pNidList: this.results.NidNosaziCode,
        pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value,
        pUnLoadCancelFiches: false
      }

      this.$services.SB.getDutyFiches(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.results.NidNosaziCode,
              bizCodeTitle: 'NidNosaziCode'
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
    click (event, dataItem, target) {
      this.selectedRow = dataItem
      this.showLoading()
      let data = { pNidFiche: dataItem.NidFiche }
      this.$services.SB.getDutyFicheSubs(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.dutyFicheSubResult = this.getResponse(data)

          if (this.dutyFicheSubResult.success) {
            this.dutyFicheSubResults = this.dutyFicheSubResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: dataItem.NidFiche,
              bizCodeTitle: 'NidFiche'
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
    deletedFiches () {
      if (this.selectedRow === null) {
        this.showError('هیچ فیشی انتخاب نشده است.')
      } else {
      }
    }
  }
}
</script>
