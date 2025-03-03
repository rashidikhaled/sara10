<template>
  <fit>
    <safa-status :result="getBuildingRes" />
    <safa-status :result="saveBuildingRes" />

    <safa-tabs v-model="activeTabBuilding">
      <template v-slot:tabs>
        <tab-menu name="usagesAndBasefronts" label="کاربریها و پیش آمدگیها" />
        <tab-menu name="buildingSpecifications" label=" مشخصات ساختمان" />
        <tab-menu name="Histories" label="سوابق" />
      </template>

      <!-- first tab -->

      <tab-content name="usagesAndBasefronts" title="controlAndCorbelContent">
        <UFileListBuildingInfoUsagesAndBasefronts
          v-model="dataContext"
          :m="mode"
        />
      </tab-content>

      <!-- second tab -->
      <tab-content
        name="buildingSpecifications"
        title="buildingSpecificationsContent"
      >
        <UFileListBuildingInfoSpecifications v-model="dataContext" :m="mode" />
      </tab-content>

      <!-- third tab -->
      <tab-content name="Histories" title="HistoriesContent">
        <UFileListBuildingInfoHistories v-model="dataContext" :m="mode" />
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UFileListBuildingInfoUsagesAndBasefronts from "./ufile-list-building-info-partials/UFileListBuildingInfoUsagesAndBasefronts"
import UFileListBuildingInfoSpecifications from "./ufile-list-building-info-partials/UFileListBuildingInfoSpecifications"
import UFileListBuildingInfoHistories from "./ufile-list-building-info-partials/UFileListBuildingInfoHistories"

export default {
  mixins: [baseFormMixin],

  components: {
    UFileListBuildingInfoUsagesAndBasefronts,
    UFileListBuildingInfoSpecifications,
    UFileListBuildingInfoHistories
  },

  props: {
    formKey: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      activeTabBuilding: "usagesAndBasefronts",

      // service
      getBuildingRes: null,
      saveBuildingRes: null,

      dataContext: {
        Base_Attachment: [],
        Base_Bezel: [],
        Base_BuildingInfo: {},
        Base_CodeInfoHistory: {},
        Base_CommissionHistory: [],
        Base_CommonEstate: {},
        Base_Door: [],
        Base_Front: [],
        Base_Gap: [],
        Base_HouseDoc: [],
        Base_Info: {},
        Base_Installation: [],
        Base_OtherEquipment: [],
        Base_ResourceInfo: [],
        Base_ShahrsaziArchive: [],
        Base_SubScription: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Base_Wall: [],
        Block: 0,
        Building: 0,
        Distric: 0,
        House: 0,
        Region: 0,
        _clsNidLib: {}
      }
    }
  },

  methods: {
    uBuilding2 (pNid, pNidCopy) {
      this.Nid = pNid
      this.NidCopy = pNidCopy
      this.loadObj()
    },

    loadObj () {
      this.showLoading()

      const payload = {
        pNidBase: this.Nid,
        pNidCopy: this.NidCopy
      }

      this.$services.ES.getBuilding(payload)
        .then(({ data }) => {
          this.getBuildingRes = this.getResponse(data)

          if (this.getBuildingRes.success) {
            this.dataContext = this.getBuildingRes.data.GetBuildingResult

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

      tmpobj._clsNidLib.Nid = this.Nid
      tmpobj._clsNidLib.NidCopy = this.NidCopy

      if (!tmpobj.Base_BuildingInfo.UserName) {
        tmpobj.Base_BuildingInfo.UserName = this.getUserDisplayName()
        tmpobj.Base_BuildingInfo.NidUser = this.getNidUser()
      }

      this.showLoading()

      const payload = {
        PObj: { ...tmpobj }
      }

      this.$services.ES.saveBuilding(payload)
        .then(({ data }) => {
          this.saveBuildingRes = this.getResponse(data)
          if (this.saveBuildingRes.success) {
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
