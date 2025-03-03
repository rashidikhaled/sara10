<template>
  <form-wrapper :title="title">
    <safa-status :result="requestResult"/>
    <fit>
      <div class="row q-col-gutter-lg items-center">
        <div class="col-auto">
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            @enter="handleInutNosazicode"
          >
          </nosazi-code-input>
        </div>
        <div class="col-12 col-sm-auto col-md-3">
          <safa-combo
            v-if="isShowBaseInfoGroupCombo"
            v-model="selectedInfoGroup"
            :options="infoGroupOptions"
            label="دسته اطلاعاتی "
            sourceType="local"
          />
        </div>
      </div>

      <safa-datatable
        v-model="results.TmpBuilding"
        :loadingAnimation="false"
        :m="mode"
        :margin="null"
        cdcName="buildingHistoryIn"
        class="q-mt-sm"
        fit
        height="100%"
        helper="nosazi.buildingHistoryIn"
        max-height="100%"
        title="سوابق ساختمان"
      />

    </fit>
    <template v-slot:footer>
      <FormActions
        :m="mode"
        @cancel="isEditable = false"
        @edit="goToEditMode"
        @save="saveData"
      >
        <template v-slot:after>
          <btn-default
            class="btn-default"
            label="گزارش"
            @click="report"
          />
        </template>
      </FormActions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/nosazi-history/building-history',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'سوابق ساختمان',
      formKey: '3916ba26-1e75-4372-8f49-17d4c3737afb',
      name: 'UBuildingHistory',
      main: true,
      infoCategories: [
        {
          ID: 0,
          Title: 'اطلاعات پرونده'
        },
        {
          ID: 100,
          Title: ' نوسازی '
        }
      ],
      selectedInfoGroup: 0,
      selectedItem: 0,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      result: {},
      results: {},
      getTmpBuildingPrequest: {
        pNidBase: null
      },
      requestResult: {},
      isView: false
    }
  },
  computed: {
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').isShowBaseInfoGroupCombo
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').infoGroupOptions
    }
  },
  mounted () {
  },
  methods: {
    handleInutNosazicode () {
      this.loadData()
    },
    loadData () {
      this.showLoading()
      let data = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pDutyType: 1,
        pEumNosaziCodeGroup: 0,
        pEumBaseInfoGroup: this.selectedItem
      }
      this.$services.SB.getNidBase(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)

          this.getTmpBuildingPrequest.pNidBase = this.result.data.NidBase

          this.getTmpBuilding()

          // if (this.result.success) {
          //   this.results = this.result.data
          // }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getTmpBuilding () {
      this.$services.SB.getTmpBuilding(this.getTmpBuildingPrequest)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })
            }
            this.isView = true
          }

          // this.hideLoading()
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      this.showSending()
      this.$services.SB.saveTmpTables(
        { pClsTmpTables: this.results },
        {
          config: {
            District: this.baseNosaziCode.District
          }
        }
      )
        .then(async response => {
          this.hideSending()
          this.requestResult = this.getResponse(response.data)
          if (!this.requestResult.hasError) {
            this.showSuccess('عملیات با موفقیت انجام شد')
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }

          this.isEditable = false
          this.loadData()
        })
        .catch(e => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    goToEditMode () {
      if (
        convertNosaziCodeObjectToString(this.baseNosaziCode) === '0-0-0-0-0-0-0'
      ) {
        this.showError('لطفا کد نوسازی را وارد کنید.')

        return
      }

      this.isEditable = true
    },
    report () {
      console.log('nid', this.result.data)
      const reportPath =
        '/Sara8Reports/RptDataArchive'
      const queryParams = {
        NidBase:
          this.result.data._NidBase || '00000000-0000-0000-0000-000000000000'
      }
      this.showReport(reportPath, queryParams)
    }
  }
}
</script>
