<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs
        v-model="currentTab"
        class="fit"
        height="100%"
      >
        <template v-slot:tabs>
          <tab-menu
            name="baseUsing"
            label="کاربریها"
          />
          <tab-menu
            name="baseFront"
            label="پیشامدگی ها"
          />
          <tab-menu
            name="baseParking"
            label="مهندسین و پارکینگ"
          />
          <tab-menu
            name="buildingInfo"
            label="مشخصات ساختمان"
          />
          <tab-menu
            name="other"
            label="سایر مشخصات"
          />
          <tab-menu
            name="comments"
            label="توضیحات"
          />
          <tab-menu
            name="archive"
            label="سوابق و اشتراکات"
          />
        </template>
        <tab-content
          name="baseUsing"
          title="کاربریها"
          :padding="false"
        >
          <tab-base-using
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="baseFront"
          title="پیشامدگی ها"
          :padding="false"
        >
          <tab-base-front
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="baseParking"
          title="مهندسین و پارکینگ"
        >
          <tab-base-parkings
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="buildingInfo"
          title="مشخصات ساختمان"
        >
          <tab-base-building-info
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="other"
          title="سایر مشخصات"
        >
          <tab-other
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="comments"
          title="توضیحات"
        >
          <tab-comment
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="archive"
          title="سوابق و اشتراکات"
        >
          <tab-archive
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
      </safa-tabs>
      <form-actions
        v-if="!readOnly"
        :m="mode"
        @edit="isEditable = true"
        @save="save"
        @cancel="load"
        editSPId="00dc95d4-1f84-4adb-b749-e2109d2528a0"
        class="q-py-sm q-pl-sm"
      >
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from './model/mojaazParvaanehRequest'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabBaseParkings from './partials/TabBaseParkings'
import TabBaseBuildingInfo from './partials/TabBaseBuildingInfo'
import TabOther from './partials/TabOther'
import TabComment from './partials/TabComment'
import TabArchive from './partials/TabArchive'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'MojaazParvaanehInfo',
  mixins: [baseFormMixin],
  components: {
    TabBaseUsing,
    TabBaseFront,
    TabBaseParkings,
    TabBaseBuildingInfo,
    TabOther,
    TabComment,
    TabArchive
  },

  props: {
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
      formKey: '6551ec60-82f9-4ef3-bfae-c108b131957a',
      title: 'شهرسازی- مجاز پروانه عرصه',
      result: null,
      resultSave: null,
      isView: false,
      currentTab: 'baseUsing',
      currentData: { ...requestModel },
      tabs: [
        {
          name: 'baseUsing',
          title: 'کاربریها'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگی ها'
        },
        {
          name: 'baseParking',
          title: 'مهندسین و پارکینگ'
        },
        {
          name: 'buildingInfo',
          title: 'مشخصات ساختمان'
        },
        {
          name: 'other',
          title: 'سایر مشخصات'
        },
        {
          name: 'comments',
          title: 'توضیحات'
        },
        {
          name: 'archive',
          title: 'سوابق و اشتراکات'
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
      return { m: this.mode,
        title: this.title,
        formKey: this.formKey,
        name: this.name }
    }
  },

  methods: {
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
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map(m => {
        return {
          ...m,
          NidProc: m.NidProc || null,
          BuildingNo: m.BuildingNo || null,
          SerialNo: m.SerialNo || null,
          CertificateNo: m.CertificateNo || null,
          NidWorkItem: m.NidWorkItem || null,
          CertificateDate: m.CertificateDate || null,
          CreditDate: m.CreditDate || null
        }
      })
    },
    normalizeBaseCommissionHistory () {
      return this.currentData.Base_CommissionHistory.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          SendNo: m.SendNo || null,
          CI_RequestType: m.CI_RequestType || null,
          NidProc: m.NidProc || null,
          VoteNo: m.VoteNo || null
        }
      })
    },
    normalizeBaseRenovationPaymentHistory () {
      return this.currentData.Base_RenovationPaymentHistory.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          CI_RequestType: m.CI_RequestType || null,
          FicheNo: m.FicheNo || null,
          NidProc: m.NidProc || null,
          IsInImpart: m.IsInImpart || null,
          IsInTotal: m.IsInTotal || null,
          SendNo: m.SendNo || null,
          VoteNo: m.VoteNo || null
        }
      })
    },
    normalizeBaseSubScription () {
      return this.currentData.Base_SubScription.map(m => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null,
          BillID: m.BillID || null,
          CounterSerial: m.CounterSerial || null,
          ElectricityType: m.ElectricityType || null,
          FileNumber: m.FileNumber || null
        }
      })
    },
    normalizeBaseInstallation () {
      return this.currentData.Base_Installation.map(m => {
        return {
          ...m,
          Area: m.Area || null,
          Height: m.Height || null,
          Length: m.Length || null,
          Volume: m.Volume || null,
          Width: m.Width || null
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
    async save () {
      try {
        if (!this.isValidForm()) return
        this.showSending()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBaseFront()
        this.currentData.Base_Parking = this.normalizeBaseParking()
        this.currentData.Base_OtherEquipment = this.normalizeBaseOtherEquipment()
        this.currentData.Base_Door = this.normalizeBaseDoor()
        this.currentData.Base_Bezel = this.normalizeBaseBezel()
        this.currentData.Base_ShahrsaziArchive = this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_CommissionHistory = this.normalizeBaseCommissionHistory()
        this.currentData.Base_RenovationPaymentHistory = this.normalizeBaseRenovationPaymentHistory()
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        this.currentData.Base_Installation = this.normalizeBaseInstallation()
        this.currentData.Base_Gap = this.normalizeBaseGap()

        const buildingInfo = this.currentData.Base_BuildingInfo
        buildingInfo.ParkingNeedCount = buildingInfo.ParkingNeedCount || 0
        buildingInfo.ParkingSupplyCount = buildingInfo.ParkingSupplyCount || 0
        buildingInfo.ParkingGet = buildingInfo.ParkingGet || 0
        buildingInfo.InfrastructureArea = buildingInfo.InfrastructureArea || 0
        buildingInfo.RampArea = buildingInfo.RampArea || 0
        buildingInfo.LightfastArea = buildingInfo.LightfastArea || 0
        buildingInfo.CreateYearFrom = buildingInfo.CreateYearFrom || 0
        buildingInfo.AllowableDensityLicence =
          buildingInfo.AllowableDensityLicence || 0
        buildingInfo.DownerHeight = buildingInfo.DownerHeight || 0
        buildingInfo.BusyArea = buildingInfo.BusyArea || 0
        buildingInfo.ParkingGet = buildingInfo.ParkingGet || 0
        buildingInfo.Height = buildingInfo.Height || 0
        buildingInfo.CommercialGapDepth = buildingInfo.CommercialGapDepth || 0
        buildingInfo.Defilade = buildingInfo.Defilade || 0
        buildingInfo.CreateYearTo = buildingInfo.CreateYearTo || 0
        buildingInfo.UpperHeight = buildingInfo.UpperHeight || 0
        const commonEstate = this.currentData.Base_CommonEstate
        commonEstate.CommercialGapWidth = commonEstate.CommercialGapWidth || 0
        commonEstate.ViewArea = commonEstate.ViewArea || 0

        const { data } = await this.$services.SC.saveMojazParvanehHouse(
          {
            pObj: this.currentData,
            pUser: this.currentUser,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: '00000000-0000-0000-0000-000000000000'
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: 'NidBase',
            nosaziCode: this.value.key
          })

          this.showSuccess('ذخیره با موفقیت انجام شد')
          this.load()
        }

        // end
      } catch (e) {
        this.serverError()
        console.error('save error', e)
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      if (!this.value.NidNosaziCode) {
        return
      }
      try {
        this.showLoading()

        const { data } = await this.$services.SC.getMojazParvanehHouse(
          {
            PNidNosaziCode: this.value.NidNosaziCode,
            PLoadFun:
              'Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Door,Base_Wall,Base_Bezel,Base_OtherEquipment,Base_ControllerInfo,Base_Attachment,Base_Parking,Base_HouseInfo,Base_ShahrsaziArchive,Base_SharingInfrastructure,Base_CommissionHistory,Base_RenovationPaymentHistory,Base_SubScription'
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NidNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: this.value.key
            })
          }
          this.isView = true
        }

        // end
      } catch (e) {
        this.serverError()
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
