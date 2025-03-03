<template>
<safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
  <form-wrapper :title="title">
    <safa-status :result="requestResult"/>
    <fit>
      <div class="row q-col-gutter-sm items-center">
        <div class="col-auto">
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            @enter="handleInutNosazicode"
          >
          </nosazi-code-input>
        </div>
        <div class="col-12 col-sm-auto col-md-2">
          <safa-combo
            v-if="isShowBaseInfoGroupCombo"
            v-model="selectedInfoGroup"
            :options="infoGroupOptions"
            label="دسته اطلاعاتی "
            sourceType="local"
          />
        </div>
      </div>
      <safa-grid
        v-model="results.TmpApar"
        :loadingAnimation="false"
        :m="mode"
        cdc-name="apartmentHistory"
        class="q-mt-sm"
        fit
        :animateRows="true"
        :filterable="true"
        height="100%"
        :columns="apartmentHistoryCols"
        max-height="100%"
        title="تاریخچه آپارتمان"
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
  route: '/nosazi-history/apartment-history',
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'سوابق آپارتمان',
      formKey: '41e7eb75-ef49-421e-a59b-c02789d737cb',
      name: 'UapartmentHistory',
      main: true,
      selectedItem: 0,
      apartmentHistoryCols: [ // جهت تست لاگ این مورد رو داخل دیتا تعریف کردم مورد افتا
        {
          field: 'Buildno',
          title: 'شماره ساختمان'
        },
        {
          field: 'IdGroup',
          title: 'کاربری اصلی'
        },
        {
          field: 'IdType',
          title: 'کاربری فرعی'
        },
        {
          field: 'BuildUnit',
          title: 'تعداد واحد'
        },
        {
          field: 'TotApartAre',
          title: 'مساحت اپارتمان',
          isArea: true
        },
        {
          field: 'FloorNo',
          title: 'شماره طبقه'
        },
        {
          field: 'BuildYear',
          title: 'سال ساخت'
        },
        {
          field: 'tmpAffActDateFrom',
          title: 'تاریخ اثر از',
          editor: 'date'
        },
        {
          field: 'tmpAffActDateTo',
          title: 'تاریخ اثر تا',
          editor: 'date'
        }
      ],
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
      result: {},
      results: {},
      getTmpAparPrequest: {
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
          this.getTmpAparPrequest.pNidBase = this.result.data.NidBase
          this.getTmpApar()
        })
        .catch(response => {
          this.hideLoading()

          this.result = this.getResponse(response)
          this.serverError()
        })
    },
    getTmpApar () {
      this.$services.SB.getTmpApar(this.getTmpAparPrequest)
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
      console.log('nid', this.result.data)
      const reportPath =
        '/Sara8Reports/RptDataArchive'
      const queryParams = {
        NidBase: this.result.data._NidBase
      }
      this.showReport(reportPath, queryParams)
    }
  }
}
</script>
