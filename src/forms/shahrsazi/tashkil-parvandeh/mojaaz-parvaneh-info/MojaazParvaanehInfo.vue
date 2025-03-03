<template>
   <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs
        v-model="currentTab"
        class="fit"
        height="100%"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu name="address" label="آدرس" />
          <tab-menu name="registerPlaque" label="مشخصات سند و پلاک ثبتی" />
          <tab-menu name="baseOwner" label="جهات اربعه" />
          <tab-menu name="houseInfo" label=" مشخصات فنی" />
          <tab-menu name="baseUsing" label="کاربریها" />
          <tab-menu name="baseFront" label="پیشامدگی ها" />
          <tab-menu name="baseParking" label="مهندسین و پارکینگ" />
          <tab-menu name="buildingInfo" label="مشخصات ساختمان" />
          <tab-menu name="other" label="سایر مشخصات" />
          <tab-menu name="comments" label="طرح تفصیلی و توضیحات" />
          <tab-menu name="archive" label="سوابق و اشتراکات" />
        </template>
        <tab-content name="address" title="آدرس">
          <TabAddress v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="registerPlaque" title="مشخصات سند و پلاک ثبتی">
          <TabRegisterPlaque v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseOwner" title="جهات اربعه" :padding="false">
          <TabBaseOwner v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="houseInfo" title="مشخصات فنی">
          <TabBaseHouseInfo v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseUsing" title="کاربریها" :padding="false">
          <tab-base-using v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseFront" title="پیشامدگی ها" :padding="false">
          <tab-base-front v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseParking" title="مهندسین و پارکینگ">
          <tab-base-parkings v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="buildingInfo" title="مشخصات ساختمان">
          <tab-base-building-info v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="other" title="سایر مشخصات">
          <tab-other v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="comments" title="طرح تفصیلی و توضیحات">
          <tab-comment v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="archive" title="سوابق و اشتراکات">
          <tab-archive v-model="currentData" v-bind="passedProps" />
        </tab-content>
      </safa-tabs>
      <form-actions
        v-if="!readOnly"
        :m="mode"
        @edit="handleEdit"
        @save="save"
        @cancel="handleCancel"
        class="q-py-sm q-pl-sm"
        editSPId="00dc95d4-1f84-4adb-b749-e2109d2528a0"
        editFormId="6551ec60-82f9-4ef3-bfae-c108b131957a"
      >
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from "./model/mojaazParvaanehRequest"
import TabAddress from "./partials/TabAddress"
import TabRegisterPlaque from "./partials/TabRegisterPlaque"
import TabBaseOwner from "./partials/TabBaseOwner"
import TabBaseHouseInfo from "./partials/TabBaseHouseInfo"
import TabBaseUsing from "./partials/TabBaseUsing"
import TabBaseFront from "./partials/TabBaseFront"
import TabBaseParkings from "./partials/TabBaseParkings"
import TabBaseBuildingInfo from "./partials/TabBaseBuildingInfo"
import TabOther from "./partials/TabOther"
import TabComment from "./partials/TabComment"
import TabArchive from "./partials/TabArchive"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  name: "MojaazParvaanehInfo",
  mixins: [baseFormMixin],
  components: {
    TabAddress,
    TabRegisterPlaque,
    TabBaseOwner,
    TabBaseHouseInfo,
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
      default: "",
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
      formKey: "6551ec60-82f9-4ef3-bfae-c108b131957a",
      title: "شهرسازی- مجاز پروانه عرصه",
      result: null,
      resultSave: null,
      currentTab: "address",
      currentData: { ...requestModel },
      tabs: [
        {
          name: "address",
          title: " آدرس"
        },
        {
          name: "registerPlaque",
          title: " مشخصات سند و پلاک ثبتی"
        },
        {
          name: "baseOwner",
          title: " مالکین و جهات اربعه"
        },
        {
          name: "houseInfo",
          title: " مشخصات فنی"
        },
        {
          name: "baseUsing",
          title: "کاربریها"
        },
        {
          name: "baseFront",
          title: "پیشامدگی ها"
        },
        {
          name: "baseParking",
          title: "مهندسین و پارکینگ"
        },
        {
          name: "buildingInfo",
          title: "مشخصات ساختمان"
        },
        {
          name: "other",
          title: "سایر مشخصات"
        },
        {
          name: "comments",
          title: "توضیحات"
        },
        {
          name: "archive",
          title: "سوابق و اشتراکات"
        }
      ]
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.value.District
        },
        timeout: 20000
      }
    },
    passedProps () {
      return { m: this.mode }
    }
  },

  methods: {
    handleEdit () {
      this.isEditable = true
      this.$emit("changeEditMode", this.isEditable)
    },
    handleCancel () {
      this.load()
      this.isEditable = false
      this.$emit("changeEditMode", this.isEditable)
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
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidDoor: m.NidDoor || "00000000-0000-0000-0000-000000000000",
          EmissionPlace: m.EmissionPlace || null,
          NationalCode: m.NationalCode || null,
          NidOwnerBank: m.NidOwnerBank || null,
          PostCode: m.PostCode || null,
          AyanHabeh: m.AyanHabeh || null,
          ToftSir: m.ToftSir || null,
          EconomicID: m.EconomicID || null,
          IDCardNo: m.IDCardNo || null,
          OwnerFatherName: m.OwnerFatherName || "",
          OwnerLastName: m.OwnerLastName || "",
          OwnerName: m.OwnerName || "",
          Telephone: m.Telephone || null,
          ToftHabeh: m.ToftHabeh || null
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
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidBezel: m.NidBezel || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map((m) => {
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
      return this.currentData.Base_CommissionHistory.map((m) => {
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
      return this.currentData.Base_RenovationPaymentHistory.map((m) => {
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
      return this.currentData.Base_SubScription.map((m) => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          BillID: m.BillID || null,
          CounterSerial: m.CounterSerial || null,
          ElectricityType: m.ElectricityType || null,
          SubScriptionVal: m.SubScriptionVal || null,
          FileNumber: m.FileNumber || null
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
    normalizeBaseRegisterPlack () {
      return this.currentData.Base_RegisterPlack.map((m) => {
        return {
          ...m,
          Priority: m?.Priority?.toString() || ''
        }
      })
    },
    normalizeBaseEdge () {
      return this.currentData.Base_Edge.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          AddLen: m.AddLen || 0,
          AfterEditBarLen: m.AfterEditBarLen || null,
          AfterEditSideLen: m.AfterEditSideLen || null,
          AfterEditWidth: m.AfterEditWidth || 0,
          BackwardLen: m.BackwardLen || null,
          BarLenEffective: m.BarLenEffective || null,
          CI_Moshrefiat: m.CI_Moshrefiat || null,
          CI_Privacy: m.CI_Privacy || null,
          CI_ValBlockFord: m.CI_ValBlockFord || null,
          CI_ViewCode: m.CI_ViewCode || null,
          Comments: m.Comments || null,
          Depth1: m.Depth1 || 0,
          Depth2: m.Depth2 || 0,
          Depth3: m.Depth3 || 0,
          DesignLen: m.DesignLen || 0,
          EdgeAndSideCurrent: m.EdgeAndSideCurrent || null,
          EdgeAndSideDoc: m.EdgeAndSideDoc || null,
          EdgeBarCurrent: m.EdgeBarCurrent || null,
          EdgeBarDoc: m.EdgeBarDoc || null,
          EdgeLenCurrent: m.EdgeLenCurrent || null,
          EntranceWith: m.EntranceWith || null,
          GoFrontLen: m.GoFrontLen || 0,
          GoFrontLenAllow: m.GoFrontLenAllow || 0,
          GoFrontLenOther: m.GoFrontLenOther || 0,
          GoFrontLenOtherAllow: m.GoFrontLenOtherAllow || 0,
          PathKaf: m.PathKaf || 0,
          PathName: m.PathName || null,
          PathWidth: m.PathWidth || 0,
          RegisterPlack: m.RegisterPlack || null,
          Remain: m.Remain || null,
          RemainBarLen: m.RemainBarLen || null,
          RemainSideLen: m.RemainSideLen || null,
          SideWalkWidth: m.SideWalkWidth || null,
          ValBlockRowNo: m.ValBlockRowNo || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidEdge: m.NidEdge || "00000000-0000-0000-0000-000000000000",
          PathWidthDoc: m.PathWidthDoc || null
        }
      })
    },
    async save () {
      debugger
      try {
        this.showSending()
        const houseInfo = this.currentData.Base_HouseInfo
        houseInfo.CurrentArea = houseInfo.CurrentArea || 0
        houseInfo.AreaAfterEdit = houseInfo.AreaAfterEdit || 0
        houseInfo.GlasshouseArea = houseInfo.GlasshouseArea || 0
        houseInfo.DeepShaftCount = houseInfo.DeepShaftCount || 0
        houseInfo.PoolArea = houseInfo.PoolArea || 0
        houseInfo.PoolCubature = houseInfo.PoolCubature || 0
        houseInfo.MamarArea = houseInfo.MamarArea || 0
        houseInfo.CadastreCode = houseInfo.CadastreCode || 0
        houseInfo.DocArea = houseInfo.DocArea || 0
        houseInfo.AyanDocNo = houseInfo.AyanDocNo || 0
        houseInfo.PieceNo = houseInfo.PieceNo || 0
        houseInfo.ArsehDocNo = houseInfo.ArsehDocNo || 0
        houseInfo.MotherDocArea = houseInfo.MotherDocArea || 0

        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBaseFront()
        this.currentData.Base_Parking = this.normalizeBaseParking()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipment()
        this.currentData.Base_Door = this.normalizeBaseDoor()
        this.currentData.Base_Bezel = this.normalizeBaseBezel()
        this.currentData.Base_ShahrsaziArchive =
          this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_CommissionHistory =
          this.normalizeBaseCommissionHistory()
        this.currentData.Base_RenovationPaymentHistory =
          this.normalizeBaseRenovationPaymentHistory()
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        this.currentData.Base_Gap = this.normalizeBaseGap()
        this.currentData.Base_Edge = this.normalizeBaseEdge()
        this.currentData.Base_RegisterPlack = this.normalizeBaseRegisterPlack()

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
        commonEstate.RegisterSection = commonEstate.RegisterSection || 0

        const { data } = await this.$services.SC.saveMojazParvanehHouse(
        // const { data } = await this.$services.SC.saveMojazPayankarHouse(
          {
            pObj: this.currentData,
            pUser: this.currentUser,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد")
          this.isEditable = false
          this.$emit("changeEditMode", this.isEditable)
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: "NidBase",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
          await this.load()
        }

        // end
      } catch (e) {
        console.log(e)
        this.showError("خطایی در سرویس رخ داد")
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      if (!this.value.NidNosaziCode) {
        return
      }
      this.showLoading()
      try {
        let tempNid = this.currentData._nidBase
        const { data } = await this.$services.SC.getMojazParvanehHouse(
        // const { data } = await this.$services.SC.getMojazPayankarHouse(
          {
            PNidNosaziCode: this.value.NidNosaziCode,
            PLoadFun:
              "Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Door,Base_Wall,Base_Bezel,Base_OtherEquipment,Base_ControllerInfo,Base_Attachment,Base_Parking,Base_HouseInfo,Base_ShahrsaziArchive,Base_SharingInfrastructure,Base_CommissionHistory,Base_RenovationPaymentHistory,Base_SubScription,MapImage,Base_AddressInfo,Base_Edge,Base_AddressPostCode,Base_RegisterPlack,Base_PlanMosavab,Base_PlanMojaz"
          },
          this.config
        )

        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data

          await this.log({
            action: this.logActions.view,
            bizCode: tempNid,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
        } else {
          this.showError("انجام نشد")
        }

        // end
      } catch (e) {
        this.showError("خطایی در سرویس رخ داد")
        console.log(e, "showError")
      } finally {
        this.hideLoading()
      }
    }
  },

  created () {
    this.currentData = { ...requestModel }
    this.load()
  }
}
</script>
