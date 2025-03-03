<template>
  <fit>
    <safa-status :result="getHouseSharingRes" />
    <safa-status :result="saveHouseSharingRes" />

    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="AmlakDirections" label="جهات ملک" />
        <tab-menu name="AmlakSpecifications" label="مشخصات ملک" />
        <tab-menu name="DastgahSpecifications" label="مشخصات دستگاه" />
        <tab-menu name="OwnerAndHistory" label="مالکین و سوابق" />
        <tab-menu name="Sketch" label="کروکی" />
        <tab-menu name="UsageAndBasefront" label="کاربریها و پیش آمدگیها" />
        <tab-menu name="Describtions" label="توضیحات" />
        <tab-menu name="OtherSpecification" label="سایر مشخصات" />
      </template>
      <tab-content name="AmlakDirections">
        <UFileListHouseSharingAmlakDirections
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
      <tab-content name="AmlakSpecifications">
        <UFileListHouseSharingAmlakSpecifications
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
      <tab-content name="DastgahSpecifications">
        <UFileListHouseSharingDastgahSpecifications
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
      <tab-content name="OwnerAndHistory">
        <UFileListHouseSharingOwnerAndHistory
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
      <tab-content name="Sketch">
        <UFileListHouseSharingSketch
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
          :croqieGuid="NIdRequest"
        />
      </tab-content>
      <tab-content name="UsageAndBasefront">
        <UFileListHouseSharingUsageAndBasefront
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
          :croqieGuid="NIdRequest"
        />
      </tab-content>
      <tab-content name="Describtions">
        <UFileListHouseSharingDescribtions
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
      <tab-content name="OtherSpecification">
        <UFileListHouseSharingOtherSpecification
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
          :croqieGuid="NIdRequest"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import UFileListHouseSharingAmlakDirections from "./ufile-list-house-sharing-partials/UFileListHouseSharingAmlakDirections.vue"
import UFileListHouseSharingAmlakSpecifications from "./ufile-list-house-sharing-partials/UFileListHouseSharingAmlakSpecifications.vue"
import UFileListHouseSharingDastgahSpecifications from "./ufile-list-house-sharing-partials/UFileListHouseSharingDastgahSpecifications.vue"
import UFileListHouseSharingOwnerAndHistory from "./ufile-list-house-sharing-partials/UFileListHouseSharingOwnerAndHistory.vue"
import UFileListHouseSharingSketch from "./ufile-list-house-sharing-partials/UFileListHouseSharingSketch.vue"
import UFileListHouseSharingUsageAndBasefront from "./ufile-list-house-sharing-partials/UFileListHouseSharingUsageAndBasefront.vue"
import UFileListHouseSharingDescribtions from "./ufile-list-house-sharing-partials/UFileListHouseSharingDescribtions.vue"
import UFileListHouseSharingOtherSpecification from "./ufile-list-house-sharing-partials/UFileListHouseSharingOtherSpecification.vue"

import { uid } from "quasar"

export default {
  mixins: [baseFormMixin],

  components: {
    UFileListHouseSharingAmlakDirections,
    UFileListHouseSharingAmlakSpecifications,
    UFileListHouseSharingDastgahSpecifications,
    UFileListHouseSharingOwnerAndHistory,
    UFileListHouseSharingSketch,
    UFileListHouseSharingUsageAndBasefront,
    UFileListHouseSharingDescribtions,
    UFileListHouseSharingOtherSpecification
  },

  props: {
    formKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeTab: "AmlakDirections",

      Nid: "00000000-0000-0000-0000-000000000000",
      NidCopy: "00000000-0000-0000-0000-000000000000",
      NIdRequest: "00000000-0000-0000-0000-000000000000",

      dataContext: {
        Base_AddressInfo: {},
        Base_Attachment: [],
        Base_Bezel: [],
        Base_BuildingInfo: {},
        Base_CodeInfoHistory: {},
        Base_CommissionHistory: [],
        Base_CommonEstate: {},
        Base_Door: [],
        Base_Edge: [],
        Base_File: [],
        Base_Front: [],
        Base_Gap: [],
        Base_GreenSpace: [],
        Base_HouseInfo: {},
        Base_HouseSharing: {},
        Base_Info: {},
        Base_Installation: [],
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        Base_PreCodeInfo: [],
        Base_RegisterPlack: [],
        Base_ResourceInfo: [],
        Base_Scuttle: [],
        Base_ShahrsaziArchive: [],
        Base_SubScription: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Base_Wall: [],
        Block: 0,
        Building: 0,
        Distric: 0,
        House: 0,
        IsCompleted: false,
        IsCompletedKey: "00000000-0000-0000-0000-000000000000",
        Region: 0,
        _clsNidLib: {}
      },

      getHouseSharingRes: null,
      saveHouseSharingRes: null,

      // CF
      loadCompleted: null,
      SaveCompleted: null
    }
  },

  methods: {
    uHouseSharing (pNid, pNidCopy, pNIdRequest) {
      this.Nid = pNid
      this.NidCopy = pNidCopy
      this.NIdRequest = pNIdRequest
      this.loadObj()
    },

    loadObj () {
      this.showLoading()

      const payload = {
        pNidBase: this.Nid,
        pNidCopy: this.NidCopy,
        pNidRequest: this.NIdRequest
      }

      this.$services.ES.getHouseSharing(payload)
        .then(({ data }) => {
          this.getHouseSharingRes = this.getResponse(data)

          if (this.getHouseSharingRes.success) {
            this.dataContext =
              this.getHouseSharingRes.data.GetHouseSharingResult

            if (this.loadCompleted != null) this.loadCompleted(true)
          }
        })

        .catch((error) => {
          console.error(error)
          this.hideLoading()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    save () {
      this.showLoading()
      let tmpobj = { ...this.dataContext }

      tmpobj._clsNidLib.Nid = this.Nid
      tmpobj._clsNidLib.NidCopy = this.NidCopy
      tmpobj.IsCompletedKey = uid()
      tmpobj.IsCompleted = false

      const payload = {
        PObj: { ...tmpobj }
      }

      this.$services.ES.saveHouseSharing(payload)
        .then(({ data }) => {
          this.saveHouseSharingRes = this.getResponse(data)
          if (this.saveHouseSharingRes.success) {
            this.dataContext =
              this.saveHouseSharingRes.data.SaveHouseSharingResult
            // #todo
            // this.SaveComplete();
            this.saveCompleted(true)
          } else {
            this.saveCompleted(false)
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
