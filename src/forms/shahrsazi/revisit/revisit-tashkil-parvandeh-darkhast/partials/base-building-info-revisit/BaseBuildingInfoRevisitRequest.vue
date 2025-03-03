<template>
  <safa-form :id="formKey" :caption="title">
    <safa-status :result="result"/>
    <safa-status :result="resultSave"/>
    <fit>
      <safa-tabs
        v-model="currentTab"
        :bordered="false"
        class="fit"
        height="100%"
      >
        <template v-slot:tabs>
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :label="title"
            :name="name"
          />
        </template>
        <tab-content name="buildingInfo" title="مشخصات ساختمان">
          <tab-base-building-info v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <tab-content name="other" title="سایر مشخصات">
          <tab-other v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <tab-content :padding="false" name="baseUsing" title="کاربری ها">
          <tab-base-using v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <tab-content :padding="false" name="baseFront" title="پیشامدگی ها">
          <tab-base-front v-model="currentData" v-bind="passedProps"/>
        </tab-content>

        <tab-content
          :padding="false"
          name="sharingInfrastructure"
          title="مشترکات"
        >
          <tab-base-sharing-infrastructure
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content :padding="false" name="otherEquipment" title="سایر">
          <tab-other-equipment v-model="currentData" v-bind="passedProps"/>
        </tab-content>

        <tab-content
          :padding="false"
          name="controllerInfo"
          title="مهندسین ناظر"
        >
          <tab-controller-info v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <tab-content name="parking" title="پارکینگ">
          <tab-base-parking v-model="currentData" v-bind="passedProps"/>
        </tab-content>
        <tab-content name="explanation" title=" توضیحات">
          <tab-explanation v-model="currentData" v-bind="passedProps"/>
        </tab-content>
      </safa-tabs>

      <form-actions
        v-if="!readOnly"
        :m="mode"
        class="q-py-sm q-pl-sm"
        @cancel="load"
        @edit="isEditable = true"
        @save="save"
      >
        <template #after>
          <btn-default label="کپی به مجاز پروانه"></btn-default>
        </template>
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
import TabBaseSharingInfrastructure from './partials/TabBaseSharingInfrastructure'
import TabOtherEquipment from './partials/TabOtherEquipment'
import TabControllerInfo from './partials/TabControllerInfo'
import TabBaseParking from './partials/TabBaseParking'
import TabExplanation from './partials/TabExplanation'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseBuildingInfoRevisit',
  mixins: [baseFormMixin],
  components: {
    TabBaseBuildingInfo,
    TabOther,
    TabBaseUsing,
    TabBaseFront,
    TabBaseSharingInfrastructure,
    TabOtherEquipment,
    TabControllerInfo,
    TabBaseParking,
    TabExplanation
  },

  props: {
    value: Object,
    formKey: String,
    title: String,
    readOnly: Boolean
  },

  data () {
    return {

      name: 'BaseBuildingInfoRevisitRequest',
      result: null,
      resultSave: null,
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
          title: 'سایر'
        },
        {
          name: 'parking',
          title: 'پارکینگ'
        },
        {
          name: 'controllerInfo',
          title: 'مهندسین ناظر'
        },
        {
          name: 'explanation',
          title: 'توضیحات'
        }
      ]
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.value.District
        }
      }
    },
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    normalizeBaseOtherEquipmentRows () {
      return this.currentData.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null
        }
      })
    },
    normalizeBaseUsing () {
      return this.currentData.Base_Using.map((m) => {
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
      return this.currentData.Base_Front.map((m) => {
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
      return this.currentData.Base_Bezel.map((m) => {
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
      return this.currentData.Base_Parking.map((m) => {
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
      return this.currentData.Base_Door.map((m) => {
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
      return this.currentData.Base_OtherEquipment.map((m) => {
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
    normalizeBaseGap () {
      return this.currentData.Base_Gap.map((m) => {
        return {
          ...m,
          PathWidth: m.PathWidth || null
        }
      })
    },
    normalizeBaseParkingLackInPlan () {
      return this.currentData.Base_ParkingLackInPlan.map((m) => {
        return {
          ...m,
          ParkingArea: m.ParkingArea || null,
          ParkingCount: m.ParkingCount || null
        }
      })
    },
    normalizeBaseParkingLackInParkingGroup () {
      return this.currentData.Base_ParkingLackInParkingGroup.map((m) => {
        return {
          ...m,
          ParkingArea: m.ParkingArea || null,
          ParkingCount: m.ParkingCount || null
        }
      })
    },
    newGuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    async save () {
      try {
        this.showSending()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipmentRows()
        this.currentData.Base_Bezel = this.normalizeBaseBezel()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBaseFront()
        this.currentData.Base_Parking = this.normalizeBaseParking()
        this.currentData.Base_Gap = this.normalizeBaseGap()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipment()
        this.currentData.Base_ParkingLackInPlan =
          this.normalizeBaseParkingLackInPlan()
        this.currentData.Base_ParkingLackInParkingGroup =
          this.normalizeBaseParkingLackInParkingGroup()

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
        const { data } = await this.$services.SC.saveRevisitBuilding(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            pNidProc: this.value.NidProc,
            PNidRevisit: this.value.NidRevisit,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: '00000000-0000-0000-0000-000000000000'
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess('ذخیره با موفقیت انجام شد')
          await this.log({
            action: this.logActions.save,
            bizCode: this.value.NidProc,
            bizCodeTitle: 'NidProc'
          })
          this.load()
        }
      } catch (e) {
        this.serverError()
        console.log('error', e)
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      // Reset State
      this.isEditable = false
      try {
        this.showLoading()

        // Fetch
        const { data } = await this.$services.SC.getRevisitBuilding(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              'Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_ParkingLackInPlan,Base_ParkingLackInParkingGroup,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Wall,Base_Bezel,Base_OtherEquipment,Base_Attachment,MapImage,Base_ControllerInfo,Base_Parking,Base_SharingInfrastructure',
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )

        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('اطلاعات بازدید بارگذاری نشد')
        }
        this.currentData = this.result.data
        await this.log({
          action: this.logActions.view,
          bizCode: this.value.nosaziCodeString,
          bizCodeTitle: 'nosaziCode',
          nosaziCode: this.value.nosaziCodeString
        })

        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    this.currentData = { ...requestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
