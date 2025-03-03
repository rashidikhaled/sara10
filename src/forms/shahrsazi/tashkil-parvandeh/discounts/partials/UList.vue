<template>
  <fit>
    <safa-status :result="getAllDiscountListRes" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="نام متقاضی"
          label-width="75px"
          v-model="filter.requesterName"
          cdcName="requesterName"
          @keypress.enter="loadObj"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره ملی"
          label-width="75px"
          v-model="filter.nationalCode"
          cdcName="nationalCode"
          @keypress.enter="loadObj"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ایثارگری"
          label-width="75px"
          v-model="filter.rayanehCode"
          cdcName="rayanehCode"
          @keypress.enter="loadObj"
        />
      </FormControl>
      <div>
        <nosazi-code-input
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @enter="nosaziChanged"
          label="کد نوسازی"
          label-width="75px"
        />
      </div>
      <div class="q-gutter-sm">
        <btn-search label="جستجو" @click="loadObj" />
        <btn-cancel label="حذف" @click="reset" />
      </div>
    </FormRow>
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
      margin="0"
      style="min-height: 150px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="اطلاعات ملک"
            :hide-header="true"
            v-model="baseOwner"
            cdcName="baseOwner"
            helper="ownerInfo"
            m="r"
            class="fit"
            margin="0"
            height="100%"
            min-height="200px"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="model.Sara8Sys_DiscountList"
            cdcName="Sara8Sys_DiscountList"
            helper="discountList"
            @dbclick="dbclick"
            :hide-header="true"
            m="r"
            class="fit"
            margin="0"
            height="100%"
            min-height="100px"
            title="لیست تخفیفات"
            paginate
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      gridSplitter: 30,
      filter: {
        requesterName: null,
        nationalCode: null,
        rayanehCode: null
      },
      model: { Sara8Sys_DiscountList: [] },
      baseNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      getAllDiscountListRes: null,
      getBaseLibPrequest: {
        pNosaziCode: {
          Apartment: "6",
          Block: "3",
          Building: "5",
          CI_City: "0",
          District: "1",
          EumBaseInfoGroup: "0",
          EumNosaziCodeGroup: "0",
          EumNosaziCodeObjType: "0",
          EumRevisitGroup: "0",
          House: "4",
          Id: "null",
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          ParentId: "null",
          Region: "2",
          Shop: "7",
          UserName: "null"
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: "false"
      },
      baseOwner: []
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    reset () {
      this.filter = {
        requesterName: null,
        nationalCode: null,
        rayanehCode: null
      }
      this.baseNosaziCode = {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.model = {
        pRayanehCode: this.filter.requesterName,
        pNationalCode: this.filter.nationalCode,
        pRequesterName: this.filter.rayanehCode,
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pFromRow: 0,
        pToRow: 1000
      }
      this.loadObj()
    },
    loadObj () {
      if (this.baseNosaziCode.District === 0) this.baseNosaziCode.District = 0
      const payload = {
        pRayanehCode:
          this.filter.rayanehCode === "" ? null : this.filter.rayanehCode,
        pNationalCode:
          this.filter.nationalCode === "" ? null : this.filter.nationalCode,
        pRequesterName:
          this.filter.requesterName === "" ? null : this.filter.requesterName,
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pFromRow: 0,
        pToRow: 1000
      }
      this.showLoading()
      this.$services.SC.getAllDiscountList(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.getAllDiscountListRes = this.getResponse(data)
          this.model = this.getAllDiscountListRes.data
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی"
          })
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    nosaziChanged () {
      const payload = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.baseOwner = this.getResponse(data).data.Base_Owner ?? []
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی"
          })
          this.loadObj()
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    dbclick ({ event, target, row }) {
      this.$emit("dbclick", row)
    }
  }
}
</script>
