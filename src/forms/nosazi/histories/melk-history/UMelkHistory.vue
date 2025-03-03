<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
  <form-wrapper title="سوابق ملک">
    <safa-status :result="requestResult"/>
    <fit>
      <div class="row q-col-gutter-sm">
        <div class="flex col-auto items-center">
          <safa-label>کد نوسازی</safa-label>
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            class="q-mx-sm"
            @enter="handleInutNosazicode"
          >
          </nosazi-code-input>
        </div>
        <div class="col-12 col-sm-5 col-md-3">
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
        v-model="results.TmpLand"
        :loadingAnimation="false"
        :m="mode"
        :margin="null"
        cdcName="buildingHistory"
        class="q-mt-sm"
        fit
        height="100%"
        helper="nosazi.buildingHistory"
        max-height="100%"
        min-height="170px"
        title="سوابق ملک"
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
          <btn-default label="گزارش" @click="report"/>
        </template>
      </FormActions>
    </template>
    <!-- </fit> -->
  </form-wrapper>
 </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions.vue'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/nosazi-history/melk-hsitory',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'سوابق ملک',
      formKey: 'cf735d33-0d3b-4096-afc5-8a74ac8cdca3',
      name: 'UMelkHistory',
      selectedItem: 0,
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
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      result: null,
      results: {
        TmpLand: []
      },
      nidBase: null,
      getTmpLandPrequest: {
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
  components: {
    FormActions
  },
  methods: {
    handleInutNosazicode () {
      this.loadData()
    },
    loadData () {
      debugger
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
      this.$services.SB.getNidBase(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(({ data }) => {
          this.result = this.getResponse(data)

          this.getTmpLandPrequest.pNidBase = this.result.data.NidBase

          this.getTmpLand()

          // if (this.result.success) {
          //   this.results = this.result.data
          // }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getTmpLand () {
      debugger
      this.$services.SB.getTmpLand(this.getTmpLandPrequest, {
        config: { District: this.baseNosaziCode.District }
      })
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
        { pClsTmpTables: this.results },
        {
          config: {
            District: this.baseNosaziCode.District
          }
        }
      )
        .then(async (response) => {
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

            this.isEditable = false

            this.loadData()
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
