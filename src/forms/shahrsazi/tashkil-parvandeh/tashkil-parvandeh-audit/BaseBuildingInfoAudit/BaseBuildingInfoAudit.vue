<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs v-model="activeTabGlobal.currentTab">
        <template v-slot:tabs>
          <tab-menu
            v-for="({name, title}) in tabs"
            :key="name"
            :name="name"
            :label="title"
          />
        </template>
        <tab-content name="buildingInfo" >
          <tab-base-building-info
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="other">
          <tab-other
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="baseUsing" :padding="false">
          <tab-base-using
            v-model="currentData"
            v-bind="passedProps"
            @loadObj="load"
          />
        </tab-content>
        <tab-content name="baseFront" :padding="false">
          <tab-base-front
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="sharingInfrastructure" :padding="false">
          <tab-sharing-infrastructure
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="otherEquipment" :padding="false">
          <tab-other-equipment
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="controllerInfo" :padding="false">
          <tab-controller
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="parking" :padding="false">
          <tab-parking
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="explanation">
          <tab-explanation
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
      </safa-tabs>

      <form-actions
        v-if="!readOnly"
        :m="mode"
        @edit="isEditable = true"
        @save="handleSaveAction"
        @cancel="load"
        editSPId="940e2b6e-b052-47ec-a041-8abaf8fb9ee1"
        class="q-my-sm"
      >
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from './config/requestModel'
import TabBaseBuildingInfo from './partials/TabBaseBuildingInfo'
import TabOther from './partials/TabOther'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabSharingInfrastructure from './partials/TabSharingInfrastructure'
import TabOtherEquipment from './partials/TabOtherEquipment'
import TabController from './partials/TabController'
import TabParking from './partials/TabParking'
import TabExplanation from './partials/TabExplanation'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'BaseBuildingInfoAudit',
  mixins: [baseFormMixin],
  components: {
    TabBaseBuildingInfo,
    TabOther,
    TabBaseUsing,
    TabBaseFront,
    TabSharingInfrastructure,
    TabOtherEquipment,
    TabController,
    TabParking,
    TabExplanation
  },

  props: {
    activeTabGlobal: {
      type: Object,
      default: () => {
        return {
          currentTab: "buildingInfo"
        }
      }
    },
    value: Object,
    readOnly: Boolean,
    // formKey: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // title: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      formKey: 'c94a30c1-0d4e-4ce9-9b67-8dc537b8a755',
      title: 'شهرسازی- اطلاعات ممیزی ساختمان',
      result: null,
      resultSave: null,
      main: true, // این فرم به صورت فرم اصلی هم در گردش کار استفاده شده برای همین این فید باید اضافه بشه
      currentTab: 'buildingInfo',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'buildingInfo',
          title: 'مشخصات ساختمان'
        },
        {
          name: 'other',
          title: 'سایر مشخصات'
        },
        {
          name: 'baseUsing',
          title: 'کاربری ها'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگی ها'
        },
        {
          name: 'sharingInfrastructure',
          title: 'مشترکات'
        },
        {
          name: 'otherEquipment',
          title: ' سایر امکانات'
        },
        {
          name: 'controllerInfo',
          title: 'مهندسین ناظر'
        },
        {
          name: 'parking',
          title: 'پارکینگ'
        },
        {
          name: 'explanation',
          title: 'توضیحات'
        }
      ]
    }
  },

  computed: {
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    normalizeBaseOtherEquipmentRows () {
      return this.currentData.Base_OtherEquipment.map(m => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null
        }
      })
    },
    normalizeBaseUsing () {
      return this.currentData.Base_Using.map(m => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          BusyArea: m.BusyArea || null,
          CI_BuildingType: m.CI_BuildingType || null,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || null,
          CI_Repair: m.CI_Repair || null,
          CI_ViewCode: m.CI_ViewCode || null,
          CI_UsingStatus: m.CI_UsingStatus || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          Depth1Area: m.Depth1Area || null,
          Depth1No: m.Depth1No || null,
          Depth2Area: m.Depth2Area || null,
          Depth2No: m.Depth2No || null,
          Depth3Area: m.Depth3Area || null,
          GenerateDate: m.GenerateDate || null,
          IllegalInfrastructure: m.IllegalInfrastructure || null,
          MassDistance_Main: m.MassDistance_Main || null,
          MassDistance_Sub: m.MassDistance_Sub || null,
          OverOnArea: m.OverOnArea || null,
          OverOnLengthNear: m.OverOnLengthNear || null,
          OverOnTarakom: m.OverOnTarakom || null,
          OverOrNoParvaneh: m.OverOrNoParvaneh || null,
          RepairArea: m.RepairArea || null,
          UnUsefulHeight: m.UnUsefulHeight || null,
          CI_UsingPlace: m.CI_UsingPlace || null,
          ConversionDate: m.ConversionDate || null,
          Depth3No: m.Depth3No || null,
          GarbageUnit: m.GarbageUnit || null
        }
      })
    },
    normalizeBaseFront () {
      return this.currentData.Base_Front.map(m => {
        return {
          ...m,
          CI_RoofType: m.CI_RoofType || null,
          CI_FrontStatus: m.CI_FrontStatus || null,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || null
        }
      })
    },
    normalizeBaseBezel () {
      return this.currentData.Base_Bezel.map(m => {
        return {
          ...m,
          CI_BezelType: m.CI_BezelType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          Dimension: m.Dimension || null,
          IsObserve: m.IsObserve || null,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidBezel: m.NidBezel || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    normalizeBaseParking () {
      return this.currentData.Base_Parking.map(m => {
        return {
          ...m,
          CI_RequiredParkingType: m.CI_RequiredParkingType || null,
          InspectedNo: m.InspectedNo || null,
          ProductYear: m.ProductYear || null,
          SupplyNo: m.SupplyNo || null,
          TrespassYear: m.TrespassYear || null
        }
      })
    },
    normalizeBaseDoor () {
      return this.currentData.Base_Door.map(m => {
        return {
          ...m,
          CI_DoorType: m.CI_DoorType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          DoorCount: m.DoorCount || 0,
          DoorDepth: m.DoorDepth || 0,
          DoorWidth: m.DoorWidth || 0,
          UnitNo: m.UnitNo || 0,
          NidBase: m.NidBase || '00000000-0000-0000-0000-000000000000',
          NidDoor: m.NidDoor || '00000000-0000-0000-0000-000000000000',
          EmissionPlace: m.EmissionPlace || null,
          NationalCode: m.NationalCode || null,
          NidOwnerBank: m.NidOwnerBank || null,
          PostCode: m.PostCode || null,
          AyanHabeh: m.AyanHabeh || null,
          ToftSir: m.ToftSir || null,
          EconomicID: m.EconomicID || null,
          IDCardNo: m.IDCardNo || null,
          OwnerFatherName: m.OwnerFatherName || '',
          OwnerLastName: m.OwnerLastName || '',
          OwnerName: m.OwnerName || '',
          Telephone: m.Telephone || null,
          ToftHabeh: m.ToftHabeh || null
        }
      })
    },
    normalizeBaseOtherEquipment () {
      return this.currentData.Base_OtherEquipment.map(m => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
          CI_Suggest: m.CI_Suggest || null,
          Comments: m.Comments || null,
          CreateDate: m.CreateDate || null,
          OtherEquipmentValue: m.OtherEquipmentValue || null
        }
      })
    },
    normalizeBaseInstallationBuilding () {
      return this.currentData.Base_Installation.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          Length: m.Length || null,
          Volume: m.Volume || null,
          Width: m.Width || null,
          Height: m.Height || null
        }
      })
    },
    normalizeBaseGap () {
      return this.currentData.Base_Gap.map(m => {
        return {
          ...m,
          PathWidth: m.PathWidth || null
        }
      })
    },
    normalizeBaseControllerInfo () {
      return this.currentData.Base_ControllerInfo.map(m => {
        return {
          ...m,
          CI_Base: m.CI_Base || null,
          CI_EngStudyField: m.CI_EngStudyField || null,
          CI_EngineerType: m.CI_EngineerType || null,
          CommitmentNo: m.CommitmentNo || null,
          CommitmentSupervisionDate: m.CommitmentSupervisionDate || null,
          CommitmentSupervisionNo: m.CommitmentSupervisionNo || null,
          ControllerCode: m.ControllerCode || null,
          EngBase: m.EngBase || null,
          FloorNo: m.FloorNo || null,
          JobAgreement: m.JobAgreement || null,
          MembershipNo: m.MembershipNo || null,
          MobileNo: m.MobileNo || null
        }
      })
    },
    handleSaveAction () {
      if (!this.isValidForm()) return
      this.showSending()
      this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipmentRows()
      this.currentData.Base_Bezel = this.normalizeBaseBezel()
      this.currentData.Base_Using = this.normalizeBaseUsing()
      this.currentData.Base_Front = this.normalizeBaseFront()
      this.currentData.Base_Parking = this.normalizeBaseParking()
      this.currentData.Base_Door = this.normalizeBaseDoor()
      this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
      this.currentData.Base_Installation = this.normalizeBaseInstallationBuilding()
      this.currentData.Base_Gap = this.normalizeBaseGap()
      this.currentData.Base_ControllerInfo = this.normalizeBaseControllerInfo()
      const buildingInfo = this.currentData.Base_BuildingInfo
      buildingInfo.InfrastructureArea = buildingInfo.InfrastructureArea || 0
      buildingInfo.AllowableDensityLicence =
          buildingInfo.AllowableDensityLicence || 0
      buildingInfo.RampArea = buildingInfo.RampArea || 0
      buildingInfo.LightfastArea = buildingInfo.LightfastArea || 0
      buildingInfo.BusyArea = buildingInfo.BusyArea || 0
      buildingInfo.UpperHeight = buildingInfo.UpperHeight || 0
      buildingInfo.ViewArea = buildingInfo.ViewArea || 0
      buildingInfo.DownerHeight = buildingInfo.DownerHeight || 0
      buildingInfo.Height = buildingInfo.Height || 0
      buildingInfo.CommercialGapWidt = buildingInfo.CommercialGapWidth || 0
      buildingInfo.Defilade = buildingInfo.Defilade || 0
      buildingInfo.CommercialGapDepth = buildingInfo.CommercialGapDepth || 0
      buildingInfo.HeightKorsi = buildingInfo.HeightKorsi || 0
      buildingInfo.MultiBuildingToftImpartArea =
          buildingInfo.MultiBuildingToftImpartArea || 0
      buildingInfo.ParkingNeedCount = buildingInfo.ParkingNeedCount || 0
      buildingInfo.ParkingSupplyCount = buildingInfo.ParkingSupplyCount || 0
      buildingInfo.ParkingGet = buildingInfo.ParkingGet || 0

      const buildingAddress = this.currentData.Base_CommonEstate
      buildingAddress.CommercialGapWidth =
          buildingAddress.CommercialGapWidth || 0
      buildingAddress.ViewArea = buildingAddress.ViewArea || 0

      const buildingOther = this.currentData.Base_BuildingInfo
      buildingOther.CreateYearFrom = buildingOther.CreateYearFrom || 0
      buildingOther.CreateYearTo = buildingOther.CreateYearTo || 0
      this.$services.SC.saveParvandehBuilding(
        {
          PObj: this.currentData,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.resultSave = this.getResponse(data)
          if (this.resultSave.success) {
            this.showSuccess('ذخیره با موفقیت انجام شد')

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.load()
          }
        })
        .catch(response => {
          this.resultSave = this.getResponse(response)
          this.showError('ذخیره انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    load () {
      this.isEditable = false
      if (!this.value.NidBase) {
        return
      }
      this.showLoading()
      this.$services.SC.getParvandehBuilding(
        {
          PNidBase: this.value.NidBase,
          PLoadFun:
            'Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Wall,Base_Door,Base_Bezel,Base_OtherEquipment,Base_ControllerInfo,Base_Attachment,MapImage,Base_Parking,Base_SharingInfrastructure'
        },
        {
          config: {
            District: this.value.District
          }
        }
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.currentData = this.result.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.showError('انجام نشد')
          }
        })
        .catch(response => this.getResponse(response))
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  created () {
    this.currentData = { ...requestModel }
  },
  mounted () {
    this.load()
  },
  watch: {
    activeTabGlobal: {
      handler () {
        if (this.activeTabGlobal.currentTab === 'baseUsing') {
          this.load()
        }
      },
      deep: true
    }
  }
}
</script>
