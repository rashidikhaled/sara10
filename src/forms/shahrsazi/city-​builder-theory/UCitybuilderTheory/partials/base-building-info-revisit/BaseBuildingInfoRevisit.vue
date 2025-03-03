<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- بازدید ساختمان"
  >
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>

        <tab-menu name="baseUsing" label="کاربری ها"/>
        <tab-menu name="otherEquipment" label="سایر"/>
        <tab-menu name="parking" label="پارکینگ"/>
      </template>
      <tab-content name="baseUsing" :padding="false">
         <tab-base-using v-model="currentData" v-bind="passedProps"/>
         </tab-content>
         <tab-content name="otherEquipment" :padding="false">
         <tab-other-equipment  v-model="currentData" v-bind="passedProps"/>
         </tab-content>
         <tab-content name="parking" :padding="true">
         <tab-base-parking  v-model="currentData" v-bind="passedProps"/>
         </tab-content>
      </safa-tabs>
      <!-- <safa-tabs
        v-model="currentTab"
        :bordered="false"
        class="fit"
        height="100%"
      > -->
        <!-- <template v-slot:tabs>
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :label="title"
            :name="name"
          />
        </template> -->
        <!-- <tab-content name="buildingInfo" title="مشخصات ساختمان">
          <tab-base-building-info
            v-model="currentData"
            :formKey="formKey"
            :name="name"
            :title="title"
            v-bind="passedProps"
          />
        </tab-content> -->
        <!-- <tab-content name="other" title="سایر مشخصات">
          <tab-other v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content :padding="false" name="baseUsing" title="کاربری ها">
          <tab-base-using v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content :padding="false" name="baseFront" title="پیشامدگی ها">
          <tab-base-front v-model="currentData" v-bind="passedProps" />
        </tab-content> -->

        <!-- <tab-content
          :padding="false"
          name="sharingInfrastructure"
          title="مشترکات"
        >
          <tab-base-sharing-infrastructure
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content> -->
        <!-- <tab-content :padding="false" name="otherEquipment" title="سایر">
          <tab-other-equipment v-model="currentData" v-bind="passedProps" />
        </tab-content> -->

        <!-- <tab-content
          :padding="false"
          name="controllerInfo"
          title="مهندسین ناظر"
        >
          <tab-controller-info
            v-model="currentData"
            v-bind="passedProps"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content> -->
        <!-- <tab-content name="parking" title="پارکینگ">
          <tab-base-parking v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
        <!-- <tab-content name="explanation" title=" توضیحات">
          <tab-explanation v-model="currentData" v-bind="passedProps" />
        </tab-content> -->
      <!-- </safa-tabs> -->
      <q-separator />
      <form-actions
        v-if="!forceReadonly"
        :m="mode"
        class="q-py-sm q-pl-sm"
        editSPCaption="ویرایش"
        editSPId="8ac5d392-1994-4d23-9029-a2498736448f"
        @cancel="load"
        @edit="isEditable = true"
        @save="save"
      >
        <template #after>
          <btn-default
            label="کپی به مجاز پروانه"
            spCaption="کپی به مجاز پروانه"
            spId="0a72234c-4f16-424e-8ac8-d0d9cb9826d0"
          />
          <safa-securityPanel
            id="2e46d263-da64-498d-9d70-117f74b7238b"
            caption="کپی از مجاز پایانکار"
          >
            <btn-default
              label="کپی از مجاز پایانکار"
              @click="copyToMojazPayankar"
            />
          </safa-securityPanel>
          <safa-securityPanel
            id="64601c3b-90dd-46fb-b073-5edd45c1218f"
            caption="کپی از مجاز پروانه"
          >
            <btn-default
              label="کپی از مجاز پروانه"
              @click="copyToMojazParvaneh"
            />
          </safa-securityPanel>
          <safa-securityPanel
            id="e3a19a47-28eb-422e-96af-fd8525a7e5e7"
            caption="کپی از مهندسی ناظر"
          >
            <btn-default label="کپی از مهندسی ناظر" @click="copyToEng" />
          </safa-securityPanel>
          <!-- <btn-default
            label="aaaaکپی از مجاز پایانکار"
            @click="copyToMojazPayankar"
          /> -->
          <!-- <btn-default
            label="کپی از مجاز پروانه"
            @click="copyToMojazParvaneh"
          /> -->
          <!-- <btn-default label="کپی از مهندسی ناظر" @click="copyToEng"/> -->
        </template>
      </form-actions>
    </fit>
  </safa-form>
</template>

<script>
import requestModel from "./config/requestModel"
// import TabBaseBuildingInfo from "./partials/TabBaseBuildingInfo"
// import TabOther from "./partials/TabOther"
import TabBaseUsing from "./partials/TabBaseUsing"
// import TabBaseFront from "./partials/TabBaseFront"
// import TabBaseSharingInfrastructure from "./partials/TabBaseSharingInfrastructure"
import TabOtherEquipment from "./partials/TabOtherEquipment"
// import TabControllerInfo from "./partials/TabControllerInfo"
import TabBaseParking from "./partials/TabBaseParking"
// import TabExplanation from "./partials/TabExplanation"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "BaseBuildingInfoRevisit",
  mixins: [baseFormMixin],
  components: {
    // TabBaseBuildingInfo,
    // TabOther,
    TabBaseUsing,
    // TabBaseFront,
    // TabBaseSharingInfrastructure,
    TabOtherEquipment,
    // TabControllerInfo,
    TabBaseParking
    // TabExplanation
  },

  props: {
    value: Object,
    name: String
  },

  data () {
    return {
      formKey: "5efe105e-d0b1-4d97-a427-26ef415cd26b",
      title: "اطلاعات بازدید ساختمان",
      result: null,
      resultSave: null,
      isView: false,
      currentTab: "buildingInfo",
      activeTab: "parking",
      currentData: { ...requestModel },
      tabs: [
        {
          name: "buildingInfo",
          title: "مشخصات ساختمان"
        },
        {
          name: "other",
          title: "سایر مشخصات"
        },
        {
          name: "baseUsing",
          title: "کاربری ها"
        },
        {
          name: "baseFront",
          title: "پیشامدگی ها"
        },
        {
          name: "sharingInfrastructure",
          title: "مشترکات"
        },
        {
          name: "otherEquipment",
          title: "سایر"
        },
        {
          name: "parking",
          title: "پارکینگ"
        },
        {
          name: "controllerInfo",
          title: "مهندسین ناظر"
        },
        {
          name: "explanation",
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
    copyToEng () {
      const handler = async () => {
        try {
          this.showLoading()
          const { data } =
            await this.$services.SC.copyMapControlEngineerToOtherGroups(
              {
                pNidProc: this.value.NidProc,
                pEumRevisitGroupTo: 0
              },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess(
              "کپی اطلاعات مجاز پروانه به تشکیل پرونده ساختمان با موفقیت انجام شد."
            )
            await this.log({
              action: this.logActions.copy,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی اطلاعات از مجاز پایانکار برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        "آیا از کپی اطلاعات  مهندس ناظر  بر روی طالاعات بازدید مطمئن هستید؟"
      ).onOk(handler)
    },
    copyToMojazParvaneh () {
      const handler = async () => {
        try {
          this.showLoading()
          const { data } =
            await this.$services.SC.copyFromMojazParvanehToRevisit(
              { pNidBase_Revisit: this.value.NidBase },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess(
              "کپی اطلاعات مجاز پروانه به تشکیل پرونده ساختمان با موفقیت انجام شد."
            )
            await this.log({
              action: this.logActions.copyToMojazParvaneh,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی اطلاعات مجاز پروانه به تشکیل پرونده ساختمان برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
            this.load()
          }
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
    copyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showLoading()
          const { data } =
            await this.$services.SC.copyFromMojazPayankarToRevisit(
              { pNidBase_Revisit: this.value.NidBase },
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
            this.load()
          }
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
          BuildingNo: m.BuildingNo || 0,
          BusyArea: m.BusyArea || 0,
          CI_BuildingKind: m.CI_BuildingKind || 0,
          CI_BuildingStep: m.CI_BuildingStep || 0,
          CI_BuildingType: m.CI_BuildingType || 0,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || 0,
          CI_Repair: m.CI_Repair || 0,
          CI_RoofType: m.CI_RoofType || 0,
          CI_SazehType: m.CI_SazehType || 0,
          CI_UsingGroup: m.CI_UsingGroup || 0,
          CI_UsingPlace: m.CI_UsingPlace || 0,
          CI_UsingStatus: m.CI_UsingStatus || 0,
          CI_UsingType: m.CI_UsingType || 0,
          CI_ViewCode: m.CI_ViewCode || 0,
          CI_WallType: m.CI_WallType || 0,
          ConversionDate: m.ConversionDate || null,
          CreateYearFrom: m.CreateYearFrom || 0,
          CreateYearTo: m.CreateYearTo || 0,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || 0,
          Dahaneh: m.Dahaneh || 0,
          Depth1Area: m.Depth1Area || 0,
          Depth1No: m.Depth1No || 0,
          Depth2Area: m.Depth2Area || 0,
          Depth2No: m.Depth2No || 0,
          Depth3Area: m.Depth3Area || 0,
          Depth3No: m.Depth3No || 0,
          EditUsingArea: m.EditUsingArea || 0,
          FloorNo: m.FloorNo || 0,
          GarbageUnit: m.GarbageUnit || 0,
          GenerateDate: m.GenerateDate || null,
          IllegalInfrastructure: m.IllegalInfrastructure || 0,
          MassDistance_Main: m.MassDistance_Main || 0,
          MassDistance_Sub: m.MassDistance_Sub || 0,
          OverOnArea: m.OverOnArea || 0,
          OverOnLengthNear: m.OverOnLengthNear || 0,
          OverOnTarakom: m.OverOnTarakom || 0,
          OverOrNoParvaneh: m.OverOrNoParvaneh || 0,
          ProgressPercent: m.ProgressPercent || 0,
          RepairArea: m.RepairArea || 0,
          RoofThickness: m.RoofThickness || 0,
          UnUsefulHeight: m.UnUsefulHeight || 0,
          UnitCount: m.UnitCount || 0,
          UnitNo: m.UnitNo || 0,
          UsefulHeight: m.UsefulHeight || 0,
          UsingArea: m.UsingArea || 0,
          UsingArea_Cur: m.UsingArea_Cur || 0,
          UsingDepth: m.UsingDepth || 0,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidUsing: m.NidUsing || "00000000-0000-0000-0000-000000000000"
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
          Area: m.Area || null,
          IsObserve: m.IsObserve || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidBezel: m.NidBezel || "00000000-0000-0000-0000-000000000000"
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
          TrespassYear: m.TrespassYear || null,
          Com100ParkingCount: m.Com100ParkingCount || null,
          SharedParkingCount: m.SharedParkingCount || null
        }
      })
    },
    normalizeBaseInstallation () {
      return this.currentData.Base_Installation.map((m) => {
        return {
          ...m,
          CI_InstallationType: m.CI_InstallationType || null,
          InstallationValue: m.InstallationValue || 0,
          Area: m.Area || null,
          Height: m.Height || null,
          Length: m.Length || null,
          Volume: m.Volume || null,
          Width: m.Width || null
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
          NidDoor: m.NidDoor || "00000000-0000-0000-0000-000000000000"
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
      try {
        this.showSending()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipmentRows()
        this.currentData.Base_Bezel = this.normalizeBaseBezel()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBaseFront()
        this.currentData.Base_Parking = this.normalizeBaseParking()
        this.currentData.Base_Gap = this.normalizeBaseGap()
        this.currentData.Base_Door = this.normalizeBaseDoor()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipment()
        this.currentData.Base_ParkingLackInPlan =
          this.normalizeBaseParkingLackInPlan()
        this.currentData.Base_ParkingLackInParkingGroup =
          this.normalizeBaseParkingLackInParkingGroup()
        this.currentData.Base_Installation = this.normalizeBaseInstallation()
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
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات بازدید ساختمان برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
          })
          await this.load()
        }
      } catch (e) {
        this.serverError()
        console.log("error", e)
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      // Reset State
      console.log("load building info revisit")
      // this.currentData = { ...requestModel }
      this.isEditable = false
      try {
        // this.showLoading();
        const { data } = await this.$services.SC.getRevisitBuilding(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              "Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_ParkingLackInPlan,Base_ParkingLackInParkingGroup,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Wall,Base_Door,Base_Bezel,Base_OtherEquipment,Base_Attachment,MapImage,Base_ControllerInfo,Base_Parking,Base_SharingInfrastructure",
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )

        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = { ...requestModel }
          this.$nextTick(() => {
            this.currentData = this.result.data
          })
          /* const { Base_Using, ...other } = this.result.data
        this.currentData = { ...requestModel }
        this.currentData = { ...other, Base_Using: {} }
        const self = this
        setTimeout(() => {
          self.currentData.Base_Using = Base_Using
        }, 3000) */

          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش اطلاعات بازدید ساختمان برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
          }
          this.isView = true
        } else return this.showError("اطلاعات بازدید بارگذاری نشد")
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.$nextTick(() => {
          this.hideLoading()
          console.log("hide loading building info revisit")
        })
      }
    }
  },

  async created () {
    this.currentData = { ...requestModel }
    await this.load()
  }
}
</script>
