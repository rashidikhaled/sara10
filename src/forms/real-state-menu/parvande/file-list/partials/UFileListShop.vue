<template>
  <fit>
    <safa-status :result="getShopRes" />
    <safa-status :result="saveShopRes" />

    <safa-tabs v-model="activeTabSenfi">
      <template v-slot:tabs>
        <tab-menu name="Specifications" label="مشخصات" />
        <tab-menu name="usageAndCommons" label="کاربری و مشترکات" />
        <tab-menu name="registerPlack" label="پلاک ثبتی" />
        <tab-menu name="commentsAndOthers" label="توضیحات و سایر امکانات" />
        <tab-menu name="jobSpecifications" label="مشخصات شغلی" />
      </template>

      <!-- first tab -->
      <tab-content name="Specifications" title="SpecificationsContent">
        <fit>
          <Specifications
            v-model="dataContext"
            :form-key="formKey"
            :m="mode"
            ref="Specifications"
          />
        </fit>
      </tab-content>

      <!-- second tab -->
      <tab-content name="usageAndCommons" title="usageAndCommonsContent">
        <fit>
          <usageAndCommons
            v-model="dataContext"
            :form-key="formKey"
            :m="mode"
            ref="usageAndCommons"
          />
        </fit>
      </tab-content>

      <!-- third tab -->
      <tab-content name="registerPlack" title="registerPlackContent">
        <fit>
          <registerPlack
            v-model="dataContext"
            :form-key="formKey"
            :m="mode"
            ref="registerPlack"
          />
        </fit>
      </tab-content>

      <!-- forth tab -->
      <tab-content name="commentsAndOthers" title="commentsAndOthersContent">
        <fit>
          <commentsAndOthers
            v-model="dataContext"
            :form-key="formKey"
            :m="mode"
            ref="commentsAndOthers"
          />
        </fit>
      </tab-content>

      <!-- fifth tab -->
      <tab-content name="jobSpecifications" title="jobSpecificationsContent">
        <fit>
          <jobSpecifications
            v-model="dataContext"
            :form-key="formKey"
            :m="mode"
            ref="jobSpecifications"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<!-- eslint-disable vue/no-reserved-keys -->
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import Specifications from "./ufile-list-shop-partials/UFileListShopSpecifications"
import usageAndCommons from "./ufile-list-shop-partials/UFileListShopUsageAndCommons"
import registerPlack from "./ufile-list-shop-partials/UFileListShopRegisterPlack"
import commentsAndOthers from "./ufile-list-shop-partials/UFileListShopCommentsAndOthers"
import jobSpecifications from "./ufile-list-shop-partials/UFileListShopJobSpecifications"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      activeTabSenfi: "Specifications",

      dataContext: {
        Apartment: 0,
        Base_AddressInfo: {},
        Base_Attachment: [],
        Base_CodeInfoHistory: {},
        Base_CommonEstate: {},
        Base_File: [],
        Base_Gap: [],
        Base_HouseDoc: [],
        Base_Info: {},
        Base_Installation: [],
        Base_JobInfo: {},
        Base_OtherEquipment: [],
        Base_Owner: [],
        Base_PreCodeInfo: [],
        Base_RegisterPlack: [],
        Base_ShahrsaziArchive: [],
        Base_SharingInfrastructure: [],
        Base_ShopInfo: {},
        Base_SubScription: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Block: 0,
        Building: 0,
        Distric: 0,
        House: 0,
        Region: 0,
        Shop: 0,
        _NIdJobInfo: 0,
        _clsNidLib: {}
      },

      _Nid: "00000000-0000-0000-0000-000000000000",
      _NidCopy: "00000000-0000-0000-0000-000000000000",

      getShopRes: null,
      saveShopRes: null,

      // CF
      loadCompleted: null,
      SaveCompleted: null
    }
  },

  components: {
    Specifications,
    usageAndCommons,
    registerPlack,
    commentsAndOthers,
    jobSpecifications
  },

  props: {
    formKey: {
      type: String,
      required: true
    }
  },

  methods: {
    uShop2 (pNid, pNidCopy) {
      this._Nid = pNid
      this._NidCopy = pNidCopy
      this.loadObj()
    },

    loadObj () {
      this.showLoading()

      const payload = {
        pNidBase: this._Nid,
        pNidCopy: this._NidCopy
      }

      this.$services.ES.getShop(payload)
        .then(({ data }) => {
          this.getShopRes = this.getResponse(data)
          if (this.getShopRes.success) {
            this.dataContext = this.getShopRes.data.GetShopResult
            if (this.loadCompleted != null) this.loadCompleted(true)
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverErorr()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    save () {
      this.showLoading()
      let tmpobj = { ...this.dataContext }

      tmpobj._clsNidLib.Nid = this._Nid
      tmpobj._clsNidLib.NidCopy = this._NidCopy

      const payload = {
        PObj: { ...tmpobj }
      }

      this.$services.ES.saveShop(payload).then(({ data }) => {
        this.saveShopRes = this.getResponse(data)

        this.saveCompleted(this.saveShopRes.success)
      })
    }
  }
}
</script>
