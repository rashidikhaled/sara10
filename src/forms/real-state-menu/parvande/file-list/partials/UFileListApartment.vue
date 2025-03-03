<template>
  <fit>
    <safa-status :result="getApartmentRes" />
    <safa-status :result="saveApartmentRes" />

    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="Info" label="مشخصات آپارتمان" />
        <tab-menu name="OwnerAndRegesterdPlack" label="مالکین و پلاک ثبتی" />
        <tab-menu name="UsageAndBasefront" label="کاربری ها و پیش آمدگیها" />
        <tab-menu name="JointAndRecords" label="مشترکات و سوابق" />
      </template>
      <tab-content name="Info">
        <UFileListApartmentInfo
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
      <tab-content name="OwnerAndRegesterdPlack">
        <UFileListApartmentOwnerAndRegesterdPlack
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
      <tab-content name="UsageAndBasefront">
        <UFileListApartmentUsageAndBasefront
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
      <tab-content name="JointAndRecords">
        <UFileListApartmentJointAndRecords
          v-model="dataContext"
          :form-key="formKey"
          :m="mode"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import UFileListApartmentInfo from "./ufile-list-apartment-partials/UFileListApartmentInfo.vue"
import UFileListApartmentJointAndRecords from "./ufile-list-apartment-partials/UFileListApartmentJointAndRecords.vue"
import UFileListApartmentOwnerAndRegesterdPlack from "./ufile-list-apartment-partials/UFileListApartmentOwnerAndRegesterdPlack.vue"
import UFileListApartmentUsageAndBasefront from "./ufile-list-apartment-partials/UFileListApartmentUsageAndBasefront.vue"

export default {
  mixins: [baseFormMixin],

  components: {
    UFileListApartmentInfo,
    UFileListApartmentJointAndRecords,
    UFileListApartmentOwnerAndRegesterdPlack,
    UFileListApartmentUsageAndBasefront
  },

  props: {
    formKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeTab: "Info",

      dataContext: {
        Base_AddressInfo: {},
        Base_ApartmentInfo: {},
        Base_Attachment: [],
        Base_CodeInfoHistory: {},
        Base_CommissionHistory: [],
        Base_CommonEstate: {},
        Base_File: [],
        Base_Front: [],
        Base_Info: {},
        Base_Installation: [],
        Base_OtherEquipment: [],
        Base_Owner: [],
        Base_PreCodeInfo: [],
        Base_RegisterPlack: [],
        Base_ResourceInfo: [],
        Base_ShahrsaziArchive: [],
        Base_SharingInfrastructure: [],
        Base_SubScription: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Apartment: 0,
        Block: 0,
        Building: 0,
        Distric: 0,
        House: 0,
        Region: 0,
        _clsNidLib: {}
      },

      getApartmentRes: null,
      saveApartmentRes: null,

      nid: "00000000-0000-0000-0000-000000000000",
      nidCopy: "00000000-0000-0000-0000-000000000000",

      // CF
      loadCompleted: null,
      SaveCompleted: null
    }
  },

  methods: {
    uApartment2 (pNid, pNidCopy) {
      this.nid = pNid
      this.nidCopy = pNidCopy
      this.loadObj()
    },

    loadObj () {
      this.showLoading()

      const payload = {
        pNidBase: this.nid,
        pNidCopy: this.nidCopy
      }

      this.$services.ES.getApartment(payload)
        .then(({ data }) => {
          this.getApartmentRes = this.getResponse(data)

          if (this.getApartmentRes.success) {
            this.dataContext = this.getApartmentRes.data.GetApartmentResult

            if (this.loadCompleted != null) {
              this.loadCompleted(true)
            }
          }
        })
        .catch((error) => {
          this.showError(error.message)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      let tmpobj = { ...this.dataContext }

      tmpobj._clsNidLib.Nid = this.nid
      tmpobj._clsNidLib.NidCopy = this.nidCopy

      if (tmpobj != null && tmpobj.Base_Owner != null) {
        for (let i = 0; i < tmpobj.Base_Owner.length; i++) {
          if (!tmpobj.Base_Owner[i].OwnerBirthDate) {
            this.saveCompleted(false)
            this.showError("تاریخ تولد مالک وارد نشده است")
            return false
          }
        }
      }

      // eslint-disable-next-line no-unreachable
      if (!tmpobj.Base_ApartmentInfo.UserName) {
        tmpobj.Base_ApartmentInfo.UserName = this.getUserDisplayName()
        tmpobj.Base_ApartmentInfo.NidUser = this.getNidUser()
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

      this.$services.ES.saveApartment(payload)
        .then(({ data }) => {
          this.saveApartmentRes = this.getResponse(data)
          if (this.saveApartmentRes.success) {
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
