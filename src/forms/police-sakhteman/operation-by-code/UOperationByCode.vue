<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper
      :title="title"
      :padding="false"
    >
      <template #header>
        <safa-status :result="getAllOperationListRes" />
        <div class="flex wrap justify-between items-center">
          <span
            :title="`کد قبلی: ${basePreCodes || '---'}`"
            class="ellipsis"
            style="max-width: 200px; margin-left: 5px"
          >
            کد قبلی: {{ ` ${basePreCodes} , ` || "---" }}
          </span>
          <form-header-by-nosazi-code
            class="col"
            actions
            v-model="baseNosaziCode"
            @fetched="fetched"
            cdcName="baseNosaziCode"
          />
        </div>
      </template>
      <fit>
        <safa-grid
          :title="title"
          v-model="allSealedList"
          cdcName="EumSealedOperationType"
          helper="EumSealedOperationTypeColumns"
          :take="20"
          :m="mode"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تاریخچه عملیات روی ملک",
      formKey: "392B0809-14A9-4A1C-8BA6-CD20C8F8FB4C",
      name: "UOperationByCode",
      main: true,

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      // service
      getAllOperationListRes: null,
      allSealedList: []
    }
  },

  methods: {
    fetched (val) {
      this.nosaziInfo = val || {}
      this.loadObj()
    },
    loadObj () {
      this.showLoading()
      const payload = {
        pFromDate: null,
        pToDate: null,
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pFromRow: 0,
        pToRow: 1000,
        EumSealedOperationType: 0,
        HaveWarrant: false,
        haveWarrantResult: false,
        LimitWarrantResult: false
      }
      this.$services.SH.getAllOperationList(payload)
        .then(async ({ data }) => {
          this.getAllOperationListRes = this.getResponse(data)
          if (this.getAllOperationListRes.success) {
            this.allSealedList = this.getAllOperationListRes?.data?.AllSealedList || []
            const str = convertNosaziCodeObjectToString(this.baseNosaziCode)
            await this.log({
              action: this.logActions.view,
              bizCode: str,
              bizCodeTitle: "str",
              saveDesc: `نمایش تاریخچه عملیات روی ملک ${str} انجام گردید.`
            })
          }
        })
        .catch((err) => {
          this.showError(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  mounted () {
    this.fetched()
  },
  computed: {
    basePreCodes () {
      if (this.nosaziInfo && this.nosaziInfo.Base_PreCodeInfo) {
        return (
          this.nosaziInfo.Base_PreCodeInfo.map((m) => m.PreCode).toString() ||
          "---"
        )
      } else return "---"
    }
  }
}
</script>
