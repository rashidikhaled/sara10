<template>
<safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
  <form-wrapper title="سوابق" vertical>
    <fit>
      <nosazi-code-input
        v-model="baseNosaziCode"
        @enter="handleInutNosazicode"
      >
      </nosazi-code-input>

      <safa-tabs
        v-model="activeTab"
        class="q-mt-sm"
        fit
      >
        <template v-slot:tabs>
          <tab-menu
            label="سوابق ملک"
            name="melkHistory"
          />
          <tab-menu
            label="سوابق ساختمان"
            name="buildingHistory"
          />
          <tab-menu
            label="سوابق آپارتمان"
            name="apartmentHistory"
          />
          <tab-menu
            label="سوابق جهات اربعه"
            name="jahateArbaeHistory"
          />
        </template>
        <tab-content
          :padding="false"
          name="melkHistory"
          title="سوابق ملک"
        >
          <UMelkHistory
            :m="mode"
            :value="results"
          />
        </tab-content>
        <tab-content
          :padding="false"
          name="buildingHistory"
          title="سوابق ساختمان"
        >

          <UBuildingHistory
            :buildingResults="buildingResults"
            :m="mode"
          />
        </tab-content>
        <tab-content
          :padding="false"
          name="apartmentHistory"
          title="سوابق آپارتمان"
        >
          <UApartmentHistory
            :apartmentResults="apartmentResults"
            :m="mode"
          />
        </tab-content>
        <tab-content
          :padding="false"
          name="jahateArbaeHistory"
          title="سوابق جهات اربعه"
        >
          <UJahateArbaeHistory
            :edgeResults="edgeResults"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="goToEditMode"
          @save="saveData"
        >
          <template v-slot:after>
            <btn-default
              label="گزارش"
              @click="report"
            />
          </template>
        </FormActions>
      </template>
    </fit>
  </form-wrapper>
</safa-form>
</template>

<script>
import UApartmentHistory from './partials/UApartmentHistory'
import UBuildingHistory from './partials/UBuildingHistory'
import UMelkHistory from './partials/UMelkHistory'
import UJahateArbaeHistory from './partials/UJahateArbaeHistory'
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions.vue'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/nosazi-history/nosazi-history',
  mixins: [baseFormMixin],

  components: {
    UApartmentHistory,
    UBuildingHistory,
    UMelkHistory,
    UJahateArbaeHistory,
    FormActions
  },
  data () {
    return {
      title: 'سوابق',
      formKey: '21195cd6-af71-41d3-ad7e-d2c22d0d685a',
      name: 'UNosaziHistoryTabs',
      main: true,
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
      results: {
        TmpLand: []
      },
      nidBase: '00000000-0000-0000-0000-000000000000',
      getTmpLandPrequest: {
        pNidBase: null
      },
      requsetResult: {},
      buildingResults: { TmpBuilding: [] },
      requestResultBuilding: null,
      requestResultApartment: null,
      apartmentResults: { TmpApar: [] },
      edgeResults: { TmpEdge: [] },
      requestResultEdge: null,
      activeTab: 'melkHistory',
      isView: false

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
          this.getTmpLandPrequest.pNidBase = this.result.data.NidBase
          this.nidBase = this.result.data.NidBase
          this.getTmpLand()
          this.getTmpBuilding()
          this.getTmpApar()
          this.getTmpEdge()
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getTmpLand () {
      this.showLoading()
      this.$services.SB.getTmpLand(this.getTmpLandPrequest)
        .then(async ({ data }) => {
          this.requsetResult = this.getResponse(data)
          if (this.requsetResult.success) {
            this.results = this.requsetResult.data
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
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getTmpBuilding () {
      this.showLoading()
      this.$services.SB.getTmpBuilding(this.getTmpLandPrequest)
        .then(({ data }) => {
          this.requestResultBuilding = this.getResponse(data)

          if (this.requestResultBuilding.success) {
            this.buildingResults = this.requestResultBuilding.data
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getTmpApar () {
      this.showLoading()
      this.$services.SB.getTmpApar(this.getTmpLandPrequest)
        .then(({ data }) => {
          this.requestResultApartment = this.getResponse(data)

          if (this.requestResultApartment.success) {
            this.apartmentResults = this.requestResultApartment.data
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getTmpEdge () {
      this.showLoading()
      this.$services.SB.getTmpEdge(this.getTmpLandPrequest)
        .then(({ data }) => {
          this.requestResultEdge = this.getResponse(data)
          if (this.requestResultEdge.success) {
            this.edgeResults = this.requestResultEdge.data
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveData () {
      this.showSending()
      this.$services.SB.saveTmpTables(
        {
          pClsTmpTables: this.results
        },
        {
          config: {
            District: this.baseNosaziCode.District
          }
        }
      )
        .then(async (response) => {
          this.hideSending()
          this.requestResult = this.getResponse(response.data)
          if (this.requestResult.success) {
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
            this.isEditable = false
            this.getTmpLand()
          }
        })
        .catch((response) => {
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
