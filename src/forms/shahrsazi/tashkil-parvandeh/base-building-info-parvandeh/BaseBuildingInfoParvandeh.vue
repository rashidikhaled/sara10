<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <fit>
      <safa-status :result="result" />
      <safa-status :result="resultSave" />

      <safa-tabs
        v-model="activeTabGlobal.currentTab"
        class="fit"
        height="100%"
        type="fixed"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu label="مشخصات ساختمان" name="buildingInfo" />
          <tab-menu label="سایر مشخصات" name="other" />
          <tab-menu label="نوع استفاده" name="baseUsing" />
          <tab-menu label="پیشامدگی ها" name="baseFront" />
          <tab-menu label="مشترکات" name="sharingInfrastructure" />
          <tab-menu label="سایر" name="otherEquipment" />
          <tab-menu label="لیست مهندسین ناظر" name="controllerInfo" />
          <tab-menu label="پارکینگ" name="parking" />
          <tab-menu label="توضیحات" name="explanation" />
        </template>
        <tab-content name="buildingInfo" title="مشخصات ساختمان">
          <tab-base-building-info v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="other" title="سایر مشخصات">
          <tab-other v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseUsing" title="نوع استفاده" :padding="false">
          <tab-base-using v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="baseFront" title="پیشامدگی ها" :padding="false">
          <tab-base-front v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content
          name="sharingInfrastructure"
          title="مشترکات"
          :padding="false"
        >
          <tab-base-sharing-infrastructure
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="otherEquipment" title="سایر" :padding="false">
          <tab-base-other-equipment
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content
          name="controllerInfo"
          title="لیست مهندسین ناظر"
          :padding="false"
        >
          <tab-base-controller-info
           :baseNosaziCode="baseNosaziCode"
            v-model="currentData"
            v-bind="passedProps"
          />
        </tab-content>
        <tab-content name="parking" title="پارکینگ" :padding="false">
          <tab-base-parking v-model="currentData" v-bind="passedProps" />
        </tab-content>
        <tab-content name="explanation" title="توضیحات">
          <tab-explanation v-model="currentData" v-bind="passedProps" />
        </tab-content>
      </safa-tabs>

      <form-actions
        v-if="!readOnly"
        :m="mode"
        class="q-pb-sm q-pl-sm"
        editSPId="fc232686-bf5c-4048-acf4-6b1dcfbaa3a5"
        @cancel="handleCancel"
        @edit="handleEdit"
        @save="save"
      >
        <template #after>
          <btn-default
            v-if="mode == 'r'"
            label="کپی به مجاز پروانه"
            @click="handleCopyBuildingToMojazParvaneh"
            spCaption="کپی به مجاز پروانه"
            spId="e8881df9-3e25-42ae-be59-f0f64b1dbe79"
          />

          <btn-default
            v-if="mode == 'r'"
            label="کپی از مجاز پروانه"
            spCaption="کپی از مجاز پروانه"
            @click="handleCopyFromMojazParvanehToBuildingParvandeh"
            spId="92071e6d-ce84-4d1a-aac3-77df397ae7a3"
          />

          <btn-default
            v-if="mode == 'r'"
            label="کپی به مجاز پایانکار"
            @click="handleCopyToMojazPayankar"
            spCaption="کپی به مجاز پایانکار"
            spId="77fcf73c-4155-4475-af2a-dad875b2bff0"
          />

          <btn-default
            v-if="mode == 'e'"
            label="کپی اطلاعات"
            @click="isShowCopyDataModal = true"
            spCaption="کپی اطلاعات"
            spId="dd1fde4e-47ef-440f-9764-b15af5f10e8b"
          />

          <btn-default v-if="mode == 'r'" label="گزارش" @click="print" />
        </template>
      </form-actions>
      <safa-popup
        v-model="isShowCopyDataModal"
        title="کپی اطلاعات تشکیل پرونده"
        width="400px"
        height="200px"
      >
        <form-wrapper :padding="false">
          <div class="row justify-center">
            <div class="col-auto">
              <nosazi-code-input
                v-model="baseNosaziCode"
                label="کد نوسازی مقصد"
                @input="handleBaseNosaziCodeChanged"
              />
            </div>
          </div>
          <template v-slot:footer>
            <div class="row flex justify-end">
              <btn-default @click="handleCopyAction" label="کپی" />
            </div>
            <!-- :disabled="disableCopyBtn" -->
          </template>
        </form-wrapper>
      </safa-popup>
      <!-- <copy-info-for-building
        v-model="actionState.isCopyInfo"
        :nosazi-code-template="selectedNosaziCodeObject"
        :parent="houseNosaziCode"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      /> -->
    </fit>
  </safa-form>
</template>

<script>
import requestModel from "./config/requestModel"
import TabBaseBuildingInfo from "./partials/TabBaseBuildingInfo"
import TabOther from "./partials/TabOther"
import TabBaseUsing from "./partials/TabBaseUsing"
import TabBaseFront from "./partials/TabBaseFront"
import TabBaseSharingInfrastructure from "./partials/TabBaseSharingInfrastructure"
import TabBaseOtherEquipment from "./partials/TabBaseOtherEquipment"
import TabBaseControllerInfo from "./partials/TabBaseControllerInfo"
import TabBaseParking from "./partials/TabBaseParking"
import TabExplanation from "./partials/TabExplanation"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  name: "BaseBuildingInfoParvandeh",
  mixins: [baseFormMixin],
  components: {
    TabOther,
    TabBaseUsing,
    TabBaseFront,
    TabBaseParking,
    TabExplanation,
    TabBaseBuildingInfo,
    TabBaseOtherEquipment,
    TabBaseControllerInfo,
    TabBaseSharingInfrastructure
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
    baseNosaziCode: Object,
    value: Object,
    readOnly: Boolean,
    mainNosaziCodeInfo: Object
    // formKey: {// sheikhi added #297
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // title: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // name: {
    //   type: String,
    //   default: '',
    //   required: true
    // }
  },

  data () {
    return {
      isView: false,
      childTree: [],
      actionState: {
        isCopyInfo: false
      },
      title: "شهرسازی- تشکیل پرونده ساختمان",
      formKey: "b5723e30-f485-45ec-9fa4-992386e88eaa",
      name: "BaseBuildingInfoParvandeh",
      result: null,
      resultSave: null,
      currentTab: "buildingInfo",
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
          title: "نوع استفاده"
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
          name: "controllerInfo",
          title: "لیست مهندسین ناظر"
        },
        {
          name: "parking",
          title: "پارکینگ"
        },
        {
          name: "explanation",
          title: "توضیحات"
        }
      ],
      isShowCopyDataModal: false,
      requestResult: null,
      copyRequestResult: null,
      baseLibResults: { MainObj: {} },
      disableCopyBtn: true
      // baseNosaziCode: {
      //   District: 0,
      //   Region: 0,
      //   Block: 0,
      //   House: 0,
      //   Building: 0,
      //   Apartment: 0,
      //   Shop: 0
      // }
    }
  },

  computed: {
    houseNosaziCode () {
      const nickName = convertNosaziCodeObjectToString({
        ...this.selectedNosaziCodeObject,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      })
      return this.getNodeByKey(nickName) || {}
    },
    selectedNosaziCodeObject () {
      const { NidBase } = this.getNodeByKey(this.selectedNosaziCode) || {}
      return this.childTree.filter((x) => x.NidBase === NidBase)[0] || {}
    },
    config () {
      return {
        config: {
          District: this.value.District
        }
      }
    },
    passedProps () {
      return {
        m: this.mode,
        name: this.name,
        formKey: this.formKey,
        title: this.title
      } // sheikhi add  formKey ,title
    }
  },

  methods: {
    handleBaseNosaziCodeChanged () {
      this.getBaseLibInNosaziCode()
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            // this.disableCopyBtn = false;
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleCopyAction () {
      this.transferResult = null
      this.showConfirm("آیااز کپی اطلاعات اطمینان دارید؟").onOk(() => {
        this.copyInfo()
      })
    },
    copyInfo () {
      this.showLoading()
      let payLoad = {
        pFromNidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        pToNidBase:
          this.baseLibResults.MainObj && this.baseLibResults.MainObj.NidBase,
        pCount: 1,
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pFillGap: true
      }
      this.$services.SC.copy(payLoad)
        .then(async ({ data }) => {
          this.copyRequestResult = this.getResponse(data)

          if (this.copyRequestResult.success) {
            this.showSuccess("کپی اطلاعات با موفقیت انجام شد.")
            this.isShowCopyDataModal = false
            const nosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.copy,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `کپی اطلاعات پرونده - ساختمان با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async print () {
      const reportPath = "/Sara8Reports/RptBuildingInfo"
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
        District: this.baseNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
      const nosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.value.NidBase,
        bizCodeTitle: "NidBase",
        nosaziCode,
        saveDesc: `گزارش اطلاعات پرونده - ساختمان با موفقیت برای کدنوسازی ${nosaziCode
          .split("-")
          .reverse()
          .join("-")} انجام گردید`
      })
    },
    handleEdit () {
      this.isEditable = true
      this.$emit("changeEditMode", this.isEditable)
    },
    handleCancel () {
      this.load()
      this.isEditable = false
      this.$emit("changeEditMode", this.isEditable)
    },
    getNodeByKey (key) {
      if (this.$refs.tree) {
        return this.$refs.tree.getNodeByKey(key)
      }
    },
    handleNosaziCodeSuccess (nosaziCode) {
      this.baseNosaziCode = { ...nosaziCode }
      this.load()
    },
    handleCopyBuildingToMojazParvaneh () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } = await this.$services.SC.copyBuildingToMojazParvaneh(
            { pFromNidBase: this.value.NidBase },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("کپی به مجاز پروانه با موفقیت انجام شد")
            const nosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.copyToMojazParvaneh,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `کپی به مجاز پروانه اطلاعات پرونده - ساختمان با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی اطلاعات به مجاز پروانه اطمینان دارید؟").onOk(
        handler
      )
    },
    handleCopyFromMojazParvanehToBuildingParvandeh () {
      const handler = async () => {
        try {
          this.showSending()

          const { data } =
            await this.$services.SC.copyFromMojazParvanehToBuildingParvandeh(
              {
                pNidNosaziCode_Building: this.value.NidNosaziCode
              },
              this.config
            )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("کپی از مجاز پروانه با موفقیت انجام شد.")
            const nosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.copyFromMojazParvaneh,
              bizCode: this.value.NidNosaziCode,
              bizCodeTitle: "NidNosaziCode",
              nosaziCode,
              saveDesc: `کپی از مجاز پروانه اطلاعات پرونده - ساختمان با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
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
      this.showConfirm(
        "آیا از کپی اطلاعات از مجاز پروانه به تشکیل پرونده ساختمان اطمینان دارید؟"
      ).onOk(handler)
    },
    handleCopyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showSending()
          const { data } = await this.$services.SC.copyToMojazPayankar(
            {
              pFromNidBase: this.value.NidBase
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("کپی به مجاز پایانکار با موفقیت انجام شد")
            const nosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `کپی به مجاز پایانکار اطلاعات پرونده - ساختمان با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
          } else {
            this.showError("انجام نشد")
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        "آیا از کپی اطلاعات به مجاز پایانکار ساختمان اطمینان دارید؟"
      ).onOk(handler)
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
          BusyArea: m.BusyArea || null,
          CI_BuildingType: m.CI_BuildingType || null,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || null,
          CI_Repair: m.CI_Repair || null,
          CI_ViewCode: m.CI_ViewCode || null,
          CI_UsingStatus: m.CI_UsingStatus || 0,
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
          GarbageUnit: m.GarbageUnit || 0
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
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidBezel: m.NidBezel || "00000000-0000-0000-0000-000000000000",
          Area: m.Area || null
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
    normalizeBaseInstallationBuilding () {
      return this.currentData.Base_Installation.map((m) => {
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
    async save () {
      try {
        this.resultSave = null
        this.showLoading()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipmentRows()
        this.currentData.Base_Bezel = this.normalizeBaseBezel()
        this.currentData.Base_Using = this.normalizeBaseUsing()
        this.currentData.Base_Front = this.normalizeBaseFront()
        this.currentData.Base_Parking = this.normalizeBaseParking()
        this.currentData.Base_Door = this.normalizeBaseDoor()
        this.currentData.Base_OtherEquipment =
          this.normalizeBaseOtherEquipment()
        this.currentData.Base_Installation =
          this.normalizeBaseInstallationBuilding()

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
        this.currentData.Base_OtherEquipment.map((x) => {
          if (x.CI_ShahrsazRequestType === "") {
            x.CI_ShahrsazRequestType = null
          }
        })
        const { data } = await this.$services.SC.saveParvandehBuilding(
          {
            PObj: this.currentData,
            pUser: this.currentUser,
            PDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: "00000000-0000-0000-0000-000000000000"
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          const nosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          this.showSuccess("ذخیره با موفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.currentData._nidBase,
            bizCodeTitle: "NidBase",
            nosaziCode,
            saveDesc: `ذخیره اطلاعات پرونده - ساختمان با موفقیت برای کدنوسازی ${nosaziCode
              .split("-")
              .reverse()
              .join("-")} انجام گردید`
          })
          this.$emit("changeEditMode", false)
          this.load()
        }
      } catch (e) {
        console.debug("error", e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      if (!this.value.NidBase) {
        return
      }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getParvandehBuilding(
          {
            PNidBase: this.value.NidBase,
            PLoadFun:
              "Base_NosaziCode,Base_Using,Base_Front,Base_Installation,Base_SupplyParking,Base_CommonEstate,Base_BuildingInfo,Base_Gap,Base_Wall,Base_Door,Base_Bezel,Base_OtherEquipment,Base_ControllerInfo,Base_Attachment,MapImage,Base_Parking,Base_SharingInfrastructure"
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          if (!this.isView) {
            const nosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode,
              saveDesc: `ذخیره اطلاعات پرونده - ساختمان با موفقیت برای کدنوسازی ${nosaziCode
                .split("-")
                .reverse()
                .join("-")} انجام گردید`
            })
          }
          this.isView = true
          this.currentData = this.result.data
        }
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
    setTimeout(() => {
      this.load()
    }, 500)
  }
}
</script>
