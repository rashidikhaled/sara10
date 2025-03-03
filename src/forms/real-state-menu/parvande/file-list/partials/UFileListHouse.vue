<template>
  <fit>
    <safa-status :result="getHouseRes" />
    <safa-status :result="saveHouseRes" />

    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="amlakDirections" label="جهات ملک" />
        <tab-menu name="specifications" label="مشخصات" />
        <tab-menu name="ownersAndHistories" label="مالکین و سوابق" />
        <tab-menu name="patern" label="کروکی" />
        <tab-menu name="otherSpecifications" label="سایر مشخصات" />
      </template>

      <tab-content name="amlakDirections" title="جهات ملک">
        <UHouseAmlakDirections :getHouseResult="dataContext" :m="mode" />
      </tab-content>

      <tab-content name="specifications" title="مشخصات">
        <UHouseSpecifications
          ref="UHouseSpecifications"
          :getHouseResult="dataContext"
          :m="mode"
        />
      </tab-content>

      <tab-content name="ownersAndHistories" title="مالکین و سوابق">
        <UHouseOwnersAndHistories
          ref="UHouseOwnersAndHistories"
          :getHouseResult="dataContext"
          :m="mode"
        />
      </tab-content>

      <tab-content name="patern" title="کروکی">
        <UHousePatern
          :getHouseResult="dataContext"
          :m="mode"
          :croqieGuid="NIdRequest"
        />
      </tab-content>

      <tab-content name="otherSpecifications" title="سایر مشخصات">
        <UHouseOtherSpecifications :getHouseResult="dataContext" :m="mode" />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<!-- eslint-disable vue/no-reserved-keys -->
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from "quasar"

// UHouse Partials
import UHousePatern from "./ufile-list-house-partials/UHousePatern.vue"
import UHouseSpecifications from "./ufile-list-house-partials/UHouseSpecifications.vue"
import UHouseAmlakDirections from "./ufile-list-house-partials/UHouseAmlakDirections.vue"
import UHouseOwnersAndHistories from "./ufile-list-house-partials/UHouseOwnersAndHistories.vue"
import UHouseOtherSpecifications from "./ufile-list-house-partials/UHouseOtherSpecifications.vue"

export default {
  mixins: [baseFormMixin],

  components: {
    UHousePatern,
    UHouseSpecifications,
    UHouseAmlakDirections,
    UHouseOwnersAndHistories,
    UHouseOtherSpecifications
  },

  props: {
    formKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeTab: "amlakDirections",
      getHouseRes: null,
      saveHouseRes: null,

      Nid: "00000000-0000-0000-0000-000000000000",
      NidCopy: "00000000-0000-0000-0000-000000000000",
      NIdRequest: "00000000-0000-0000-0000-000000000000",

      dataContext: {
        Base_Info: {},
        Request_Info: {},
        Base_HouseInfo: {},
        Base_AddressInfo: {},
        Base_CommonEstate: {},
        Base_CodeInfoHistory: {},
        Base_File: {
          Base_File: {}
        },
        Base_Edge: {
          Base_Edge: {}
        },
        Base_PreCodeInfo: {
          Base_PreCodeInfo: {}
        },
        Base_Owner: null,
        Base_HouseDoc: null,
        Base_PlanMojaz: null,
        Base_Attachment: null,
        Base_PlanMosavab: null,
        Base_SubScription: null,
        Base_RegisterPlack: null,
        Base_OtherEquipment: null,
        Base_ShahrsaziArchive: null,
        Base_CommissionHistory: null
      },

      // CF
      loadCompleted: null,
      SaveCompleted: null
    }
  },
  methods: {
    uHouse2 (pNid, pNidCopy, pNIdRequest) {
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

      this.$services.ES.getHouse(payload)
        .then(({ data }) => {
          this.getHouseRes = this.getResponse(data)

          if (this.getHouseRes.success) {
            this.dataContext = this.getHouseRes.data.GetHouseResult

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
      let tmpobj = { ...this.dataContext }

      if (tmpobj != null && tmpobj.Base_Owner != null) {
        for (let i = 0; i < tmpobj.Base_Owner.length; i++) {
          if (!tmpobj.Base_Owner[i].OwnerBirthDate) {
            this.saveCompleted(false)
            this.showError("تاریخ تولد مالک وارد نشده است")
            return false
          }
        }
      }
      if (tmpobj.Request_Info.CI_ContractPriorityType == null) {
        this.saveCompleted(false)
        this.showError("نوع اولویت صلح نامه وارد نشده است")
        return false
      }

      tmpobj._clsNidLib.Nid = this.Nid
      tmpobj._clsNidLib.NidCopy = this.NidCopy
      tmpobj.IsCompletedKey = uid()
      tmpobj.IsCompleted = false

      if (!tmpobj.Base_HouseInfo.UserName) {
        tmpobj.Base_HouseInfo.UserName = this.getUserDisplayName()
        tmpobj.Base_HouseInfo.NidUser = this.getNidUser()
      }

      if (
        tmpobj.Base_RegisterPlack != null &&
        tmpobj.Base_RegisterPlack.some(
          // eslint-disable-next-line eqeqeq
          (f) => f.Priority == 0 || f.Priority == null
        )
      ) {
        this.saveCompleted(false)
        this.showError("اولویت پلاک ثبتی وارد نشده")
        return false
      }

      this.showLoading()

      const payload = {
        PObj: { ...tmpobj }
      }

      this.$services.ES.saveHouse(payload)
        .then(({ data }) => {
          this.saveHouseRes = this.getResponse(data)
          if (this.saveHouseRes.success) {
            this.dataContext = this.saveHouseRes.data.SaveHouseResult
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
