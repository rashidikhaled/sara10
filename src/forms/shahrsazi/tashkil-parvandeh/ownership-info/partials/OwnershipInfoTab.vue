<template>
  <fit>
    <safa-status :result="checkResult" />
    <safa-status :result="confirmResult" />
    <safa-status :result="saveResult" />
    <safa-tabs
      ref="safaTabs"
      v-model="activeTab"
      :bordered="false"
    >
      <template v-slot:tabs>
        <tab-menu
          name="showApartmentTab"
          label="اطلاعات آپارتمان"
        />
        <tab-menu
          name="showPurchaserTab"
          label="اطلاعات خریدار"
        />
        <tab-menu
          name="showPresellTab"
          label="اطلاعات واحد پیش فروش"
        />
      </template>

      <tab-content
        name="showApartmentTab"
        title="اطلاعات آپارتمان"
      >
        <ApartmentInfoTab :results="results" />
      </tab-content>
      <tab-content
        name="showPurchaserTab"
        :padding="false"
      >
        <PurchaserInfo
          :results="results"
          :m="m"
        />
      </tab-content>
      <tab-content
        name="showPresellTab"
        title="اطلاعات آپارتمان"
      >
        <PresellInfo
          :results="results"
          :m="m"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import ApartmentInfoTab from './ApartmentInfoTab'
import PurchaserInfo from './PurchaserInfo'
import PresellInfo from './PresellInfo'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      activeTab: 'showApartmentTab',
      result: null,
      results: {
        NosaziCode_House: {},
        Sh_ApartmentEarlySold: {},
        Sh_ApartmentEarlySold_List: []
      },
      saveResult: null,
      checkResult: null,
      confirmResult: null
    }
  },
  components: {
    ApartmentInfoTab,
    PurchaserInfo,
    PresellInfo
  },
  props: {
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    },
    selectedItem: Object,
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
    },
    m: String
  },
  mounted () {
    this.load()

    // console.log('///////selectedItem', this.selectedItem)
  },
  methods: {
    load () {
      this.showLoading()
      let apartentData = {
        pNidEarlySold: this.selectedItem.NidEarlySold,
        pNidBase_House: this.selectedItem.NidEarlySold
      }

      this.$services.SC.getApartmentEarlySold(apartentData)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedItem.NidEarlySold,
              bizCodeTitle: 'NidEarlySold',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch(({ data }) => {
          this.result = this.getResponse(data)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeApartmentEarlySold () {
      return this.results.Sh_ApartmentEarlySold_Owner_List.map(m => {
        return {
          ...m,
          IDCardNo: m.IDCardNo || null
        }
      })
    },
    save () {
      this.showLoading()
      this.results.Sh_ApartmentEarlySold_Owner_List = this.normalizeApartmentEarlySold()
      const apartmentEarlySold = this.results.Sh_ApartmentEarlySold
      apartmentEarlySold.AllBuildingNoParking = apartmentEarlySold.AllBuildingNoParking || 0
      apartmentEarlySold.TroublesomeNoParking = apartmentEarlySold.TroublesomeNoParking || 0
      apartmentEarlySold.NoParkingThisVahed = apartmentEarlySold.NoParkingThisVahed || 0
      apartmentEarlySold.WarehouseNumber = apartmentEarlySold.WarehouseNumber || 0
      apartmentEarlySold.WarehouseNoThisVahed = apartmentEarlySold.WarehouseNoThisVahed || 0
      apartmentEarlySold.ParkingCount = apartmentEarlySold.ParkingCount || 0
      let payload = {
        pObj: this.results
      }

      this.$services.SC.saveApartmentEarlySold(payload)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.load()
            this.isEditable = false
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })

            this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
            this.$emit('saveDone')
          }
        })
        .catch(() => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    checkIsConfirmApartmentEarlySold () {
      this.showLoading()
      let payload = {
        pNidEarlySold: this.selectedItem.NidEarlySold
      }

      this.$services.SC.checkIsConfirmApartmentEarlySold(payload)
        .then(async ({ data }) => {
          this.checkResult = this.getResponse(data)
          if (this.checkResult.success) {
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
            this.showConfirmApartmentEarlySold()
          }
        })
        .catch(({ data }) => {
          this.result = this.getResponse(data)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    confirmApartmentEarlySold () {
      this.showLoading()
      let payload = {
        pDtoOut: this.results.Sh_ApartmentEarlySold,
        pReportPath: '/Sara8Reports/RptOwnership',
        pArchiveDomain: null,
        pReportDomain: null
      }
      this.$services.SC.confirmApartmentEarlySold(payload)
        .then(async ({ data }) => {
          this.showConfirmResult = this.getResponse(data)
          if (this.showConfirmResult.success) {
            this.load()
            this.isEditable = false
            // check log
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.confirm,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })

            this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
          }
        })
        .catch(({ data }) => {
          this.result = this.getResponse(data)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    register () {
      this.checkIsConfirmApartmentEarlySold()
    }
  }
}
</script>
