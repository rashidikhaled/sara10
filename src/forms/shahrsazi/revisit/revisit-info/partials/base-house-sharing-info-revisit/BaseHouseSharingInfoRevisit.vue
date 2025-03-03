<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- بازدید دستگاه"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
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
        <tab-content name="address" title=" آدرس و پلاک ثبتی">
          <TabAddressAndRegisterPlaque
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="doc" title="مشخصات سند">
          <TabDocumentInfo v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseOwner" title="مالکین و جهات اربعه">
          <TabBaseOwnerAndBaseEdge v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseInfo" title="مشخصات فنی">
          <TabBaseHouse v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="houseSharingInfo" title="مشخصات دستگاه">
          <TabHouseSharingInfo v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="other" title="سایر مشخصات">
          <TabOther v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content :padding="false" name="baseUsing" title="کاربریها">
          <TabBaseUsing v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content :padding="false" name="baseFront" title="پیشامدگیها">
          <TabBaseFront v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseParking" title="پارکینگ">
          <TabParking v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseArchive" title="سوابق">
          <TabArchive v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="comment" title="توضیحات">
          <TabComment v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="croquie" title="کروکی">
          <TabCroquie
            v-model="currentData"
            v-if="currentData.NidBase_Parvandeh_HouseOrDastgah"
            v-bind="passedProps"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>

      <form-actions
        v-if="!forceReadonly"
        :m="mode"
        class="q-py-sm q-pl-sm"
        :showEditButton="false"
        @cancel="load"
        @save="save"
      >
        <template #before>
          <safa-securityPanel
            id="5c6e9169-02ad-4e5f-92ff-72f5b5c8819d"
            caption="ویرایش"
          >
            <btn-edit
              label="ویرایش"
              @click="isEditable = true"
              v-if="showEditButton && !isEditable"
            />
          </safa-securityPanel>
        </template>
        <template #after>
          <btn-default
            label="کپی از مجاز پروانه"
            spCaption="کپی از مجاز پروانه"
            spId="989b6895-5b8b-4f07-ab3c-42f1d626c0b1"
            @click="handleCopyFromMojazParvaaneh"
          />
          <btn-default
            label="کپی از مجاز پایانکار"
            spCaption="کپی از مجاز پایانکار"
            spId="f3084db4-e355-4a9c-ac54-33f941503fe4"
            @click="handleCopyFromMojazPayankar"
          />
          <btn-default
            v-if="currentTab === 'croquie'"
            :label="
              currentTab === 'croquie' && !isEditable
                ? 'مشاهده کروکی'
                : 'رسم کروکی'
            "
            @click="showCroquie = true"
            @load="load"
          />
        </template>
      </form-actions>
    </fit>
    <safa-popup
      v-model="showCroquie"
      height="730px"
      :title="
        currentTab === 'croquie' && !isEditable ? 'مشاهده کروکی' : 'رسم کروکی'
      "
      width="980px"
    >
      <UDrawCroque
        v-model="currentData"
        :m="isEditable"
        @cancel="showCroquie = false"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import requestModel from "./models/houseSharingRequest"
import TabAddressAndRegisterPlaque from "./partials/TabAddressAndRegisterPlaque"
import TabDocumentInfo from "./partials/TabDocumentInfo"
import TabBaseOwnerAndBaseEdge from "./partials/TabBaseOwnerAndBaseEdge"
import TabBaseHouse from "./partials/TabBaseHouse"
import TabHouseSharingInfo from "./partials/TabHouseSharingInfo"
import TabOther from "./partials/TabOther"
import TabBaseUsing from "./partials/TabBaseUsing"
import UDrawCroque from "./partials/UDrawCroque"
import TabBaseFront from "./partials/TabBaseFront"
import TabParking from "./partials/TabParking"
import TabArchive from "./partials/TabArchive"
import TabCroquie from "./partials/TabCroquie"
// import TabEngineer from './partials/TabEngineer'
import TabComment from "./partials/TabComment"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "BaseHouseSharingInfoRevisit",
  mixins: [baseFormMixin],
  components: {
    TabAddressAndRegisterPlaque,
    TabDocumentInfo,
    TabBaseOwnerAndBaseEdge,
    TabBaseHouse,
    TabHouseSharingInfo,
    TabOther,
    TabBaseUsing,
    TabBaseFront,
    TabParking,
    TabArchive,
    TabCroquie,
    UDrawCroque,
    // TabEngineer,
    TabComment
  },

  props: {
    value: Object,
    readOnly: Boolean,
    // formKey: {
    //   type: String
    // },
    // title: {
    //   type: String
    // },
    name: {
      type: String
    },
    showEditButton: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      formKey: "6fe9a3e5-9ed4-4b36-86dd-395ecf63ba29",
      title: "بازدید دستگاه",
      result: null,
      resultSave: null,
      currentTab: "address",
      showCroquie: false,
      isView: false,
      currentData: { ...requestModel },
      tabs: [
        {
          name: "address",
          title: " آدرس و پلاک ثبتی"
        },
        {
          name: "doc",
          title: "مشخصات سند"
        },
        {
          name: "baseOwner",
          title: "مالکین و جهات اربعه"
        },
        {
          name: "baseInfo",
          title: "مشخصات فنی"
        },
        {
          name: "houseSharingInfo",
          title: "مشخصات دستگاه"
        },
        {
          name: "other",
          title: "سایر مشخصات"
        },
        {
          name: "baseUsing",
          title: " کاربریها"
        },
        {
          name: "baseFront",
          title: "پیشامدگیها"
        },
        {
          name: "baseParking",
          title: "پارکینگ"
        },
        {
          name: "baseArchive",
          title: "سوابق"
        },
        // {
        //   name: 'engineer',
        //   title: 'مهندسین'
        // },
        {
          name: "croquie",
          title: "کروکی"
        },
        {
          name: "comment",
          title: "توضیحات"
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
    handleCopyFromMojazParvaaneh () {
      const handler = async () => {
        try {
          this.showLoading()

          const { data } =
            await this.$services.SC.copyFromMojazParvanehToRevisit(
              {
                pNidBase_Revisit: this.value.NidBase
              },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("اطلاعات از مجاز پروانه با موفقیت کپی شد")
            await this.log({
              action: this.logActions.copyToMojazParvaneh,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی اطلاعات از مجاز پروانه برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          } else this.showError("عملیات ناموفق بود")
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی اطلاعات مجاز پروانه اطمینان دارید؟").onOk(
        handler
      )
    },
    handleCopyFromMojazPayankar () {
      const handler = async () => {
        try {
          this.showLoading()

          const { data } =
            await this.$services.SC.copyFromMojazPayankarToRevisit(
              {
                pNidBase_Revisit: this.value.NidBase
              },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("اطلاعات از مجاز پایانکار با موفقیت کپی شد")
            await this.log({
              action: this.logActions.copyFromMojazPayankar,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی اطلاعات از مجاز پایانکار برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          } else this.showError("عملیات ناموفق بود")
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی اطلاعات مجاز پایانکار اطمینان دارید؟").onOk(
        handler
      )
    },
    // normalizeBaseOwner () {
    //   return this.currentData.Base_Owner.map(m => {
    //     return {
    //       ...m,
    //       ActDate: m.ActDate || null,
    //       Address: m.Address || null,
    //       AyanSir: m.AyanSir || null,
    //       BirthDate: m.BirthDate || null,
    //       BuildingNo: m.BuildingNo || null,
    //       CellPhone: m.CellPhone || null,
    //       Comments: m.Comments || null,
    //       DocNo: m.DocNo || null,
    //       EmissionPlace: m.EmissionPlace || null,
    //       NationalCode: m.NationalCode || null,
    //       NidOwnerBank: m.NidOwnerBank || null,
    //       PostCode: m.PostCode || null,
    //       ToftSir: m.ToftSir || null,
    //       AyanHabeh: m.AyanHabeh || 0,
    //       AyanImpart: m.AyanImpart || 0,
    //       IDCardNo: m.IDCardNo || 0,
    //       ToftHabeh: m.ToftHabeh || 0,
    //       ToftImpart: m.ToftImpart || 0
    //     }
    //   })
    // },
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
          NidEdge: m.NidEdge || "00000000-0000-0000-0000-000000000000"
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
          OtherEquipmentValue: m.OtherEquipmentValue || 0
        }
      })
    },
    normalizeBaseSubScription () {
      return this.currentData.Base_SubScription.map((m) => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || null,
          InstallationDate: m.InstallationDate || null,
          SubScriptionVal: m.SubScriptionVal || null
        }
      })
    },
    normalizeBaseGreenSpace () {
      return this.currentData.Base_GreenSpace.map((m) => {
        return {
          ...m,
          CI_GreenSpaceType: m.CI_GreenSpaceType || 0,
          Comments: m.Comments || null,
          GreenSpaceCount: m.GreenSpaceCount || null,
          NeighborValue: m.NeighborValue || null,
          GreenSpaceValue: m.GreenSpaceValue || 0,
          NidGreenSpace:
            m.NidGreenSpace || "00000000-0000-0000-0000-000000000000",
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    normalizeBaseNeighbor () {
      return this.currentData.Base_Neighbor.map((m) => {
        return {
          ...m,
          CI_NeighborType: m.CI_NeighborType || 0,
          CI_Neighbor_Specifications: m.CI_Neighbor_Specifications || null,
          CI_SideCode: m.CI_SideCode || 0,
          NeighborValue: m.NeighborValue || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidNeighbor: m.NidNeighbor || "00000000-0000-0000-0000-000000000000"
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
    normalizeBase_Front () {
      return this.currentData.Base_Front.map((m) => {
        return {
          ...m,
          CI_FrontStatus: m.CI_FrontStatus || null,
          CI_RoofType: m.CI_RoofType || null,
          ConversionDate: m.ConversionDate || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          GenerateDate: m.GenerateDate || null
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
    normalizeBaseShahrsaziArchive () {
      return this.currentData.Base_ShahrsaziArchive.map((m) => {
        return {
          ...m,
          Comments: m.Comments || null,
          CertificateDate: m.CertificateDate || null,
          CertificateNo: m.CertificateNo || null,
          CreditDate: m.CreditDate || null,
          NidProc: m.NidProc || null,
          BuildingNo: m.BuildingNo || null,
          NidWorkItem: m.NidWorkItem || null
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
    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    async save () {
      for (let i = 0; i < this.currentData.Base_Owner.length; i++) {
        for (let j = 0; j < this.currentData.Base_Owner.length; j++) {
          const x = this.currentData.Base_Owner[i]
          const y = this.currentData.Base_Owner[j]
          if (
            (x.NidOwner === y.NidOwner ||
              "00000000-0000-0000-0000-000000000000") &&
            i !== j
          ) {
            // return this.showError('تکراری NidOwner')
            y.NidOwner = this.newGuid()
          }
        }
      }
      this.currentData.Base_Owner = this.currentData.Base_Owner.map((x) => {
        return {
          ...x,
          NidBase: x.isNew ? undefined : x.NidBase,
          NidOwner: x.isNew ? undefined : x.NidOwner,
          ActDate: x.ActDate || null,
          Address: "",
          AyanDang: x.AyanDang || 0,
          AyanHabeh: x.AyanHabeh || 0,
          AyanImpart: x.AyanImpart || 0,
          AyanSir: x.AyanSir || 0,
          AyanTotalImpart: x.AyanTotalImpart || 0,
          BirthDate: x.BirthDate || "",
          BuildingNo: x.BuildingNo || 0,
          NidOwnerBank: x.NidOwnerBank || null,
          ToftDang: x.ToftDang || 0,
          ToftHabeh: x.ToftHabeh || 0,
          ToftImpart: x.ToftImpart || 0,
          ToftSir: x.ToftSir || 0,
          DateCheckSabt: x.DateCheckSabt || null,
          EconomicID: x.EconomicID || null,
          ToftTotalImpart: x.ToftTotalImpart || 0
        }
      })
      try {
        this.showSending()
        const houseInfo = this.currentData.Base_HouseInfo
        houseInfo.CurrentArea = houseInfo.CurrentArea || 0
        houseInfo.AreaAfterEdit = houseInfo.AreaAfterEdit || 0
        houseInfo.RemainArea = houseInfo.RemainArea || 0
        houseInfo.DocArea = houseInfo.DocArea || 0
        houseInfo.CI_IncloseType = houseInfo.CI_IncloseType || 0
        houseInfo.DeepShaftCount = houseInfo.DeepShaftCount || 0
        houseInfo.PoolArea = houseInfo.PoolArea || 0
        houseInfo.PoolCubature = houseInfo.PoolCubature || 0
        houseInfo.MamarArea = houseInfo.MamarArea || 0
        houseInfo.GlasshouseArea = houseInfo.GlasshouseArea || 0

        const buildingInfo = this.currentData.Base_BuildingInfo
        buildingInfo.InfrastructureArea = buildingInfo.InfrastructureArea || 0
        buildingInfo.AllowableDensityLicence =
          buildingInfo.AllowableDensityLicence || 0
        buildingInfo.LightfastArea = buildingInfo.LightfastArea || 0
        buildingInfo.UpperHeight = buildingInfo.UpperHeight || 0
        buildingInfo.BusyArea = buildingInfo.BusyArea || 0
        buildingInfo.DownerHeight = buildingInfo.DownerHeight || 0
        buildingInfo.RampArea = buildingInfo.RampArea || 0
        buildingInfo.Height = buildingInfo.Height || 0
        buildingInfo.Defilade = buildingInfo.Defilade || 0
        buildingInfo.CommercialGapDepth = buildingInfo.CommercialGapDepth || 0
        buildingInfo.HeightKorsi = buildingInfo.HeightKorsi || 0
        buildingInfo.MultiBuildingToftImpartArea =
          buildingInfo.MultiBuildingToftImpartArea || 0
        buildingInfo.CreateYearTo = buildingInfo.CreateYearTo || 0
        buildingInfo.CreateYearFrom = buildingInfo.CreateYearFrom || 0
        buildingInfo.ParkingNeedCount = buildingInfo.ParkingNeedCount || 0
        buildingInfo.ParkingSupplyCount = buildingInfo.ParkingSupplyCount || 0
        buildingInfo.ParkingGet = buildingInfo.ParkingGet || 0
        buildingInfo.CI_BuildingPosition = buildingInfo.CI_BuildingPosition || 0
        const commonEstate = this.currentData.Base_CommonEstate
        commonEstate.ViewArea = commonEstate.ViewArea || 0
        commonEstate.CommercialGapWidth = commonEstate.CommercialGapWidth || 0

        // this.currentData.Base_Owner = this.normalizeBaseOwner()
        this.currentData.Base_Edge = this.normalizeBaseEdge()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipment()
        this.currentData.Base_SubScription = this.normalizeBaseSubScription()
        this.currentData.Base_GreenSpace = this.normalizeBaseGreenSpace()
        this.currentData.Base_Neighbor = this.normalizeBaseNeighbor()
        this.currentData.Base_Door = this.normalizeBaseDoor()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBase_Front()
        this.currentData.Base_Parking = this.normalizeBaseParking()
        this.currentData.Base_ShahrsaziArchive =
          this.normalizeBaseShahrsaziArchive()
        this.currentData.Base_CommissionHistory =
          this.normalizeBaseCommissionHistory()
        const { data } = await this.$services.SC.saveRevisitHouseSharing(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            pNidProc: this.value.NidProc,
            PNidRevisit: this.value.NidRevisit,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات بازدید دستگاه برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
          this.currentData.NidBase_Parvandeh_HouseOrDastgah = ""
          this.load()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitHouseSharing(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              "Base_NosaziCode,Base_AddressInfo,Base_Edge,Base_BuildingInfo,Base_HouseInfo,Base_CommonEstate,Base_GreenSpace,Base_RegisterPlack,Base_Owner,Base_SubScription,Base_ShahrsaziArchive,Base_Door,Base_Scuttle,Base_Neighbor,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_Parking,Base_OtherEquipment,Base_Attachment,MapImage,Base_AddressPostCode,Base_Wall,Base_CommissionHistory,Base_PreCodeInfo",
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش اطلاعات بازدید عرصه برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          }
          this.isView = true
        } else this.showError("اطلاعات بازدید بارگذاری نشد")
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    }
  },

  mounted () {
    this.load()
  },
  created () {
    this.currentData = { ...requestModel }
  }
}
</script>

<!-- { "PObj": { "Base_AddressInfo": { "MainAddress": "بلوار شاهنامه-شاهنامه 18-آریا 25", "NidAddress": "68ad8ced-f5d7-4441-a4cc-45e8d5669449", "NidAddressBank": null }, "Base_AddressInfo_House": { "MainAddress": "بلوار شاهنامه-شاهنامه 18-آریا 25", "NidAddress": "68ad8ced-f5d7-4441-a4cc-45e8d5669449", "NidAddressBank": null }, "Base_AddressPostCode": [], "Base_ApartmentInfo": null, "Base_Attachment": [], "Base_Bezel": null, "Base_BlockInfo": null, "Base_BlockOrganize": null, "Base_BlockPath": null, "Base_BlockPathConstant": null, "Base_BuildingInfo": { "ActDate": null, "AllowableDensityLicence": 0, "BusyArea": 0, "CI_BuildingPosition": 6, "CI_CreateDesign": 1, "CI_Criterion": null, "CI_HistoricalStatus": 0, "CI_QuotaDuty": null, "CI_RoofType": 1, "CI_StableStatus": 0, "CI_VergeType": null, "CommercialGapDepth": 0, "CreateYearFrom": 0, "CreateYearTo": 0, "Defilade": "0", "DownerHeight": 0, "EndDate": null, "Height": 0, "HeightKorsi": 0, "InfrastructureArea": 112, "LightfastArea": 0, "MultiBuildingToftImpartArea": 0, "NidBase": "db83f317-8e4f-4641-b9ea-bdaf43a6134e", "ParkingGet": 0, "ParkingNeedCount": 0, "ParkingSupplyCount": 0, "PlackWidth": null, "PrivacyCourtyardArea": 0, "PrivacyCourtyardWidth": 0, "RampArea": 0, "StartDate": null, "UpperHeight": 0 }, "Base_Commission77History": null, "Base_CommissionHistory": [], "Base_Commitment": null, "Base_CommonEstate": { "BlockNo": null, "CI_BuildingStep": 2, "CI_DocRefrence": 0, "CI_DocStatus": 0, "CI_DocType": 0, "CI_HouseUser": 0, "CI_OwnerType": 0, "CI_SideCode": 0, "CI_UsingGroup": 0, "CI_UsingType": 0, "CI_ViewCode": 99, "Comments": "احداث بنا فاقد مجوز", "CommercialGapWidth": 0, "DevotionName": "", "DocComments": "", "DocExportDate": "999", "DocTransferDate": "999", "FloorDone": 0, "NidAddress": "68ad8ced-f5d7-4441-a4cc-45e8d5669449", "NidBase": "db83f317-8e4f-4641-b9ea-bdaf43a6134e", "Plack": "34", "Populations": 0, "PostOfficePrice": null, "RegisterSection": "", "TafkikComments": "", "TafkikDate": "999", "TafkikNo": "", "Telephone": null, "TrusteeName": "", "Vahed": null, "ViewArea": 0, "ViewCommitment": null, "ViewCommitmentDate": null, "CI_BuildingPosition": 2 }, "Base_CommonEstate_House": { "BlockNo": null, "CI_BuildingStep": 2, "CI_DocRefrence": 0, "CI_DocStatus": 0, "CI_DocType": 18, "CI_HouseUser": 0, "CI_OwnerType": 0, "CI_SideCode": 0, "CI_UsingGroup": 0, "CI_UsingType": 0, "CI_ViewCode": 0, "Comments": "", "CommercialGapWidth": 0, "DevotionName": "", "DocComments": "", "DocExportDate": "", "DocTransferDate": "", "FloorDone": 0, "NidAddress": "68ad8ced-f5d7-4441-a4cc-45e8d5669449", "NidBase": "94b5ef7c-acd3-47cd-8f93-0211860499d9", "Plack": "34", "Populations": 0, "PostOfficePrice": null, "RegisterSection": "", "TafkikComments": "", "TafkikDate": "999", "TafkikNo": "", "Telephone": "6780886", "TrusteeName": "", "Vahed": null, "ViewArea": 0, "ViewCommitment": null, "ViewCommitmentDate": null }, "Base_ControllerInfo": null, "Base_CurrentUsing": null, "Base_CutTrees": null, "Base_Dig": null, "Base_Door": [], "Base_DutyExemption": null, "Base_Edge": [], "Base_Estehfazi": null, "Base_File": null, "Base_Front": [], "Base_Gap": null, "Base_GreenSpace": [], "Base_HouseInfo": { "ActDate": null, "AreaAfterEdit": 0, "AreaAfterScuttle": 0, "ArsehDocNo": null, "AyanDocNo": null, "BusyAreaWidth": null, "CI_BoundCode": 0, "CI_GeoStatus": 0, "CI_GlasshouseType": 0, "CI_HouseStatus": 0, "CI_HouseType": 0, "CI_IncloseType": 0, "CI_MotherDocStatus": null, "CI_ParvanehType": 0, "CI_PoolType": 0, "CI_ShaftType": 0, "CI_SpecialStatus": 0, "CadastreCode": null, "CurrentArea": 0, "DeepShaftCount": 0, "DocArea": "100.00", "GharesiArea": null, "GlasshouseArea": 0, "HasPenalty": null, "HoughogheErtefaghi": null, "MamarArea": 0, "MotherDocArea": null, "NidBase": "00000000-0000-0000-0000-000000000000", "PieceNo": null, "PoolArea": 0, "PoolCubature": 0, "RemainArea": 0 }, "Base_HouseInfo_Config": null, "Base_HouseInfo_Revisit": null, "Base_Info": { "EumBaseInfoGroup": 1, "EumRevisitGroup": 0, "NidBase": "db83f317-8e4f-4641-b9ea-bdaf43a6134e", "NidNosaziCode": "57acf745-8bf3-4ec6-b19c-a300ac39bdd3", "NidRevisit": "afc2f57f-a77c-458e-aa28-a10d38856399" }, "Base_Info_House": { "EumBaseInfoGroup": 1, "EumRevisitGroup": 0, "NidBase": "94b5ef7c-acd3-47cd-8f93-0211860499d9", "NidNosaziCode": "877208b2-29bb-4c96-9853-a8c330db8408", "NidRevisit": "afc2f57f-a77c-458e-aa28-a10d38856399" }, "Base_Installation": [ { "Area": null, "CI_InstallationType": 2, "Height": null, "InstallationValue": 54, "Length": null, "NidBase": "db83f317-8e4f-4641-b9ea-bdaf43a6134e", "NidInstallation": "d8f82ac4-8b5b-4889-af68-7ff1639403c2", "Volume": null, "Width": null, "uniqueID": "1bd58aaf-7313-43a0-987d-dc113d301a91" } ], "Base_JobInfo": null, "Base_Letter": null, "Base_MultiBuilding": null, "Base_Neighbor": [], "Base_NosaziCode": { "Apartment": "0", "Block": "61", "Building": "1", "CI_City": 2, "CreateDate": "1393/03/13", "CreateTime": "08:02:42", "DeleteDate": null, "DeleteTime": null, "DeletedID": 0, "DeletedNidUser": null, "DeletedUserName": null, "District": 12, "EumNosaziCodeGroup": 0, "EumNosaziCodeObjType": 5, "House": "12", "IsEncrypted": false, "NidNosaziCode": "57acf745-8bf3-4ec6-b19c-a300ac39bdd3", "NidNosaziCode_Parent": "877208b2-29bb-4c96-9853-a8c330db8408", "NidUser": "8ff63218-89ba-4ab4-8a28-6b4300629abc", "Region": "17", "Shop": "0", "UserName": "محمد پرهيرگار (m-parhizgar)" }, "Base_NosaziCode_House": { "Apartment": "0", "Block": "61", "Building": "0", "CI_City": 2, "CreateDate": "1393/03/13", "CreateTime": "08:02:38", "DeleteDate": null, "DeleteTime": null, "DeletedID": 0, "DeletedNidUser": null, "DeletedUserName": null, "District": 12, "EumNosaziCodeGroup": 0, "EumNosaziCodeObjType": 2, "House": "12", "IsEncrypted": false, "NidNosaziCode": "877208b2-29bb-4c96-9853-a8c330db8408", "NidNosaziCode_Parent": "aea1213c-cbdf-441c-967d-3da0fe478da7", "NidUser": "8ff63218-89ba-4ab4-8a28-6b4300629abc", "Region": "17", "Shop": "0", "UserName": "محمد پرهيرگار (m-parhizgar)" }, "Base_OtherEquipment": [ { "CI_OtherEquipmentGroup": 1, "CI_OtherEquipmentType": 250, "CI_ShahrsazRequestType": null, "CI_Suggest": null, "Comments": "09:41:35", "CreateDate": null, "NidBase": "db83f317-8e4f-4641-b9ea-bdaf43a6134e", "NidOther": "fcad98f6-04fa-4a8d-acac-de2497b0fc9a", "OtherEquipmentValue": "1403/05/01", "uniqueID": "499c6c20-9244-443f-ba97-377a38a1e8e9" } ], "Base_Owner": [], "Base_OwnerHistory": null, "Base_Parking": [], "Base_ParkingLackInParkingGroup": null, "Base_ParkingLackInPlan": null, "Base_ParkingRequirement": null, "Base_ParkingRequirementInDensity": null, "Base_ParkingSupplyInParkingGroup": null, "Base_ParkingSupplyInPlan": null, "Base_PlanForWork": null, "Base_PlanMojaz": null, "Base_PlanMosavab": null, "Base_PreCodeInfo": [], "Base_RegisterPlack": [], "Base_RenovationPaymentHistory": null, "Base_ResourceInfo": null, "Base_Scuttle": [], "Base_ShahrsaziArchive": [], "Base_ShahrsaziArchiveHouse": null, "Base_SharingInfrastructure": null, "Base_ShopInfo": null, "Base_SubScription": [], "Base_SupplyParking": [], "Base_Using": [ { "ActDate": null, "BuildingNo": 1, "BusyArea": null, "CI_BuildingKind": 4, "CI_BuildingStep": 2, "CI_BuildingType": null, "CI_HowChangeBuilding": null, "CI_Repair": null, "CI_RoofType": 1, "CI_SazehType": 6, "CI_UsingGroup": 11, "CI_UsingPlace": null, "CI_UsingStatus": null, "CI_UsingType": 401, "CI_ViewCode": 99, "CI_WallType": 0, "ConversionDate": null, "CreateYearFrom": 0, "CreateYearTo": 0, "DWGObjectID": "0", "DWGObjectName": "0", "Dahaneh": 0, "Depth1Area": null, "Depth1No": null, "Depth2Area": null, "Depth2No": null, "Depth3Area": null, "Depth3No": null, "EditUsingArea": 0, "FloorNo": 0, "GarbageUnit": null, "GenerateDate": "1403/02/31", "IllegalInfrastructure": null, "MassDistance_Main": null, "MassDistance_Sub": null, "NidBase": "db83f317-8e4f-4641-b9ea-bdaf43a6134e", "NidUsing": "15aea06b-e4be-4bd7-aa8e-34c29b3b1447", "OverOnArea": 30.104, "OverOnLengthNear": "0", "OverOnTarakom": null, "OverOrNoParvaneh": null, "ProgressPercent": 0, "RepairArea": null, "RoofThickness": 0.3, "UnUsefulHeight": null, "UnitCount": 1, "UnitNo": 0, "UnitNoShenasnameFani": null, "UsefulHeight": 3, "UsingArea": 56, "UsingArea_Cur": 0, "UsingDepth": 0, "uniqueId": "66c15d9f-aef1-4f54-a6c7-acfbab72d937" }, { "ActDate": null, "BuildingNo": 1, "BusyArea": null, "CI_BuildingKind": 4, "CI_BuildingStep": 2, "CI_BuildingType": null, "CI_HowChangeBuilding": null, "CI_Repair": null, "CI_RoofType": 1, "CI_SazehType": 6, "CI_UsingGroup": 11, "CI_UsingPlace": null, "CI_UsingStatus": null, "CI_UsingType": 401, "CI_ViewCode": 99, "CI_WallType": 0, "ConversionDate": null, "CreateYearFrom": 0, "CreateYearTo": 0, "DWGObjectID": "0", "DWGObjectName": "0", "Dahaneh": 0, "Depth1Area": null, "Depth1No": null, "Depth2Area": null, "Depth2No": null, "Depth3Area": null, "Depth3No": null, "EditUsingArea": 0, "FloorNo": 0, "GarbageUnit": null, "GenerateDate": "1385/04/10", "IllegalInfrastructure": null, "MassDistance_Main": null, "MassDistance_Sub": null, "NidBase": "db83f317-8e4f-4641-b9ea-bdaf43a6134e", "NidUsing": "8ff0a9ec-63d0-4548-9747-f0ce7f7b2ef6", "OverOnArea": 30.104, "OverOnLengthNear": "0", "OverOnTarakom": null, "OverOrNoParvaneh": null, "ProgressPercent": 0, "RepairArea": null, "RoofThickness": 0.3, "UnUsefulHeight": null, "UnitCount": 1, "UnitNo": 0, "UnitNoShenasnameFani": null, "UsefulHeight": 3, "UsingArea": 56, "UsingArea_Cur": 0, "UsingDepth": 0, "uniqueId": "4fdcfc18-b6ad-473e-a8cb-7870b3ff2c52" } ], "Base_Using_Paging": null, "Base_Wall": [], "ErrorResult": { "BizErrors": [], "Requirements": [] }, "IsForDeletedItems": false, "MapImage": "", "NidBase_Parvandeh_HouseOrDastgah": "15e50799-57f1-40d6-9fd3-e5c9bc0a986d", "NidProc": "00000000-0000-0000-0000-000000000000", "Revisit_History": null, "Security_EncryptCode": "hq3zH4FxZ9JuhljySxr0ugEQUALEQUAL", "Security_RequestGuid": "2ea1a0e6-f9e4-4f08-9334-0c6a89e6264b", "Sh_BaroKaf": null, "Sh_FinancePrice": null, "_nidBase": "db83f317-8e4f-4641-b9ea-bdaf43a6134e", "Base_ControllerInfo_EngineerSubSys": null, "NidRevisit": "00000000-0000-0000-0000-000000000000" }, "pUser": { "isZeroAdmin": true, "NidUser": "6ADBDE3E-1FA3-42D0-AA28-177C4460BCBB", "IDNumber": "0010604960", "birthDate": "1368/04/26", "description": "", "domain": [ "0" ], "email": "alireza.kafili@manmail.ir", "enabled": true, "endActiveDate": null, "firstName": "علیرضا", "isSysAdmin": true, "lastName": "کفیلی", "mobile": "09151061136", "startActiveDate": "2020-05-26T00:00:00.000Z", "tel": "", "username": "kafili", "fatherName": "", "isSys3rdParty": false, "isSysApp": false, "jobLocation": { "NidJobLocation": "DA6B1D80-71BC-469A-9987-E989173DCC4D", "name": "صفارایانه", "startDate": "1399/03/06", "endDate": null, "CI_JobType": "1", "allowDomains": "1,2,3,4,5,6,7,8,9,10,11,12,80", "allowedIP": [ "" ], "post": "کارشناس پشتیبان صفارایانه", "organPost": "تست", "createdBy": "F5C9DE10-0907-11EA-84EF-DF66E7274BEE", "createdByName": "admin admin(admin)", "createdAt": "2024-01-14T13:50:31.216Z", "_id": "65a3e6a7dfc6c2749c2eb65c" }, "lastLoginDate": "2024-10-22T10:43:22.094Z", "id": null, "mustLoginByCamera": false, "domains": [], "domainNames": "all", "rel": { "domains": [ "0" ], "nidGroups": [ "D52600C1-1E36-4933-8354-BA8104F411DF", "4259E59F-4DDA-45EB-8C94-60771FE6D8DD", "CE4CA1C0-A018-11EB-8417-9702A4AF712F", "08D20B53-D68A-4D22-A0E0-B43EEC51461E", "097BB1DB-B2CF-42A0-B99F-B85B4D91389A" ], "nidRelations": [ "6ADBDE3E-1FA3-42D0-AA28-177C4460BCBB", "D52600C1-1E36-4933-8354-BA8104F411DF", "4259E59F-4DDA-45EB-8C94-60771FE6D8DD", "CE4CA1C0-A018-11EB-8417-9702A4AF712F", "08D20B53-D68A-4D22-A0E0-B43EEC51461E", "097BB1DB-B2CF-42A0-B99F-B85B4D91389A" ] }, "UserGuid": "6ADBDE3E-1FA3-42D0-AA28-177C4460BCBB", "FullName": "علیرضا کفیلی (kafili)", "UserName": "kafili", "Email": "alireza.kafili@manmail.ir", "FirstName": "علیرضا", "LastName": "کفیلی", "UserImage": [], "UserSignature": null, "UserHand": null, "DisplayDomain": "مدیر سیستم", "JobLocationGuid": "DA6B1D80-71BC-469A-9987-E989173DCC4D", "NidJobLocation": "DA6B1D80-71BC-469A-9987-E989173DCC4D", "JobLocationName": "صفارایانه", "UserGroups": [ { "GroupGuid": "D52600C1-1E36-4933-8354-BA8104F411DF", "GroupName": "نماینده فنی شهروند سپاری", "GroupTitel": "نماینده فنی شهروند سپاری", "GroupTitle": "نماینده فنی شهروند سپاری" }, { "GroupGuid": "4259E59F-4DDA-45EB-8C94-60771FE6D8DD", "GroupName": "جامع صفا رایانه-کارشناس ارشد", "GroupTitel": "جامع صفا رایانه-کارشناس ارشد", "GroupTitle": "جامع صفا رایانه-کارشناس ارشد" }, { "GroupGuid": "CE4CA1C0-A018-11EB-8417-9702A4AF712F", "GroupName": "AdminTask", "GroupTitel": "AdminTask", "GroupTitle": "AdminTask" }, { "GroupGuid": "08D20B53-D68A-4D22-A0E0-B43EEC51461E", "GroupName": "جامع شهرسازی- رییس شهرسازی منطقه ", "GroupTitel": "جامع شهرسازی- رییس شهرسازی منطقه ", "GroupTitle": "جامع شهرسازی- رییس شهرسازی منطقه " }, { "GroupGuid": "097BB1DB-B2CF-42A0-B99F-B85B4D91389A", "GroupName": "بازدید - ویرایش", "GroupTitel": "بازدید - ویرایش", "GroupTitle": "بازدید - ویرایش" } ] }, "pNidProc": "f2958b20-18cc-4d49-babc-000a2794a3bb", "PNidRevisit": "afc2f57f-a77c-458e-aa28-a10d38856399", "pDtoWorkflowData": { "StateName": null, "WorkflowGuid": "00000000-0000-0000-0000-000000000000" }, "_uid": "6ADBDE3E-1FA3-42D0-AA28-177C4460BCBB" } -->
