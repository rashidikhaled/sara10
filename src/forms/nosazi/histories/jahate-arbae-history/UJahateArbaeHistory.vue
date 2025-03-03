<template>
<safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
  <form-wrapper :title="title">
    <safa-status :result="requestResult"/>
    <fit>
      <div class="row q-col-gutter-lg items-center">
        <div class="flex items-center col-auto">
          <safa-label>کد نوسازی</safa-label>
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            class="q-mx-sm"
            @enter="handleInutNosazicode"
          />
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
        v-model="results.TmpEdge"
        :loadingAnimation="false"
        :m="mode"
        :margin="null"
        cdcName="baseEdgeHistory"
        class="q-mt-sm"
        fit
        height="100%"
        helper="nosazi.baseEdgeHistory"
        max-height="100%"
        title='سوابق جهات اربعه'
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
</safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/nosazi-history/jahate-arbae-history',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'سوابق جهات اربعه',
      formKey: '0489f96a-c321-4338-8ac8-a6a80e389af0',
      name: 'UJahateArbaeHistory',
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
      requestResult: {},
      selectedItem: 0,
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: false,
      items: [],
      result: {},
      results: {},
      getTmpEdgePrequest: {
        pNidBase: null
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
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
          this.getTmpEdgePrequest.pNidBase = this.result.data.NidBase
          this.getTmpEdge()
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getTmpEdge () {
      this.$services.SB.getTmpEdge(this.getTmpEdgePrequest)
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

          this.hideLoading()
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

            this.isEditable = false

            this.loadData()
          }
        })
        .catch(response => {
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
