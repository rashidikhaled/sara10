<template>
  <safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper vertical :title="title" :padding="false">
      <template #header>
        <form-header-by-nosazi-code actions from-request />
        <safa-status :result="loadResult" />
        <safa-status :result="saveResult" />
        <safa-status :result="calculateAndSaveRes" />
        <safa-status :result="copyToMovafeghatOsooliRes" />
        <safa-status :result="confirmOutputResult" />
        <safa-status :result="revokeCertificateResult" />
        <safa-status :result="dabirkhaneResult" />
        <safa-status :result="copyInfoToMapOrderRes" />
      </template>
      <ArchiveWrap
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :biz-code="archiveBizCode"
        v-if="hasSodor"
      />
      <safa-tabs v-else v-model="activeTab" :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="specifications" label="مشخصات" />
          <tab-menu
            name="karbarihaVaPishamadegiha"
            label="کاربری ها و پیش آمدگی ها"
          />
          <tab-menu
            name="parkingMap"
            label="پارکینگ"
          />
          <tab-menu name="description" label="توضیحات" />
        </template>
        <tab-content name="specifications">
          <USpecifications v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="karbarihaVaPishamadegiha" :padding="false">
          <UKarbarihaVaPishamadegiha v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="parkingMap" :padding="false">
          <UParkingMap v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="description">
          <UDescription v-model="model" :m="mode" />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <!-- <safa-securityPanel
          id="940a5676-1a71-4ea8-9473-936be27d6869"
          caption="ویرایش"
        > -->
        <!--Security form action-->
        <FormActions
          :showEditButton="!hasSodor"
          :m="mode"
          @edit="isEditable = true"
          @cancel="cancel"
          @save="saveObj"
        >
          <!-- editSPId="940a5676-1a71-4ea8-9473-936be27d6869" -->

          <template v-slot:after>
            <btn-default
              spid="bd0498ad-e9bb-4af7-99a1-e34e77fe7178"
              spcaption="محاسبه و ذخیره"
              label="محاسبه و ذخیره"
              @click="calculateAndSave"
              v-show="!hasSodor"
            />
            <btn-default
              spid="3ab2f62c-ef43-44a9-91bf-2e9f06059650"
              spcaption="کپی به موافقت اصولی"
              label="کپی به موافقت اصولی"
              @click="copyToMovafeghat"
              v-show="!hasSodor"
            />
            <btn-default
              spcaption="کپی اطلاعات به دستور نقشه"
              label="کپی اطلاعات به دستور نقشه"
              @click="btnCopyInfoFrom"
              spid="6a1b8208-cf32-4459-884f-a2a003058b95"
              v-show="!hasSodor"
            />

            <btn-default
              label="صدور گواهی"
              @click="certificatIssuance"
              spid="ff896ad6-7506-4b1f-adea-c7a8eee55f97"
              spcaption="صدور گواهی"
              v-show="!hasSodor"
            />
            <btn-default
              label="ابطال گواهی"
              @click="revokeCertificat"
              v-show="hasSodor"
              spid="4e1ad8a8-d6cb-4ca2-8655-03fd8fb809b4"
              spcaption="ابطال گواهی"
            />
            <!-- <btn-default label="ثبت دبیرخانه" @click="secregistration" /> -->
          </template>
        </FormActions>
        <!-- </safa-securityPanel> -->
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import USpecifications from "./partials/USpecifications"
import UKarbarihaVaPishamadegiha from "./partials/UKarbarihaVaPishamadegiha.vue"
import UParkingMap from "./partials/UParkingMap"
import UDescription from "./partials/UDescription"
// import calcAndSavePrequest from 'src/models/calculateAndSaveInCommandMapPrequest'
import baseFormMixin from "src/mixins/baseFormMixin"
import FormActions from "src/components/FormActions"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import PersianDate from "persian-date"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
// import loadMapCommandResponse from './models/loadMapCommandResponse.js'
export default {
  mixins: [baseFormMixin],
  components: {
    USpecifications,
    UKarbarihaVaPishamadegiha,
    UParkingMap,
    UDescription,
    FormActions
  },
  data () {
    return {
      title: "دستور نقشه",
      formKey: "657e15a2-0124-4878-959d-98b7ebc56e64",
      name: "UMapCommandTabs",
      main: true,

      // #region variables
      activeTab: "specifications",
      model: {
        Base_Parking: [],
        Base_SupplyParking: [],
        Base_BuildingInfo: {},
        Base_CommonEstate: { Comments: "" },
        Base_Edge: [],
        Base_Front: [],
        Base_HouseInfo: {
          CurrentArea: ""
        },
        Base_OtherEquipment: [],
        Base_PlanForWork: [],
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        Base_RegisterPlack: [],
        Base_Using: [],
        ErrorResult: {},
        NidBase_Parvandeh_House: "00000000-0000-0000-0000-000000000000",
        NidLib: {},
        Sh_PlanOrder: {
          Comments: "",
          PlanOrderNo: ""
        },
        ZabetehChidemanHistory: null
      },
      hasSodor: false,
      isView: false,
      // #endregion

      // #region services
      calculateAndSaveRes: null,
      copyInfoToMapOrderRes: null,
      copyToMovafeghatOsooliRes: null,
      saveResult: null,
      buildingSettings: {},
      checkIsConfirmOutputResult: null,
      confirmOutputResult: null,
      dabirkhaneResult: null,
      revokeCertificateResult: null,
      loadResult: null,
      archiveBizCode: ""
      // #endregion
    }
  },
  computed: {
    config () {
      return {
        config: { District: this.selectedDistrict }
      }
    },
    pEntityId () {
      if (!this.buildingSettings || !this.buildingSettings.ShahrsaziSettings) {
        return -1
      }
      return this.buildingSettings.ShahrsaziSettings.ArchiveMapCommandEntityId
    },
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore").district.ApprovalCertificate
    }
  },
  async created () {
    this.buildingSettings = await this.$stKartable.dispatch(
      "formSettings/getSettings",
      {
        key: "BuildingSettings",
        nidProc: GLOBAL_SETTINGS_GUID
      }
    )
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.checkIsConfirmOutput()
    } else this.hideSidebar(this.name)
  },
  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SC.loadPlanOrder(
        {
          pNidProc: this.selectedRequest.NidProc,
          pIsLoadDeletedNosaziCode: false
        },
        this.config
      )
        .then(async ({ data }) => {
          this.loadResult = this.getResponse(data)
          if (this.loadResult.success) {
            this.model = this.loadResult.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "شماره درخواست",
                nosaziCode: this.selectedRequest.BizCode,
                saveDesc: `نمایش فرم اطلاعات دستور نقشه برای درخواست با شماره ${this.selectedRequest.NidWorkItem}`
              })
            }
            this.isView = true
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
    calculateAndSave () {
      const payLoad = {
        pNidProc: this.selectedRequest.NidProc,
        pNidZabeteh: "00000000-0000-0000-0000-000000000000",
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: null,
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pParameters: null
      }
      this.showLoading()
      this.$services.SC.calculateZabetehChidemanAndSave(payLoad, this.config)
        .then(async ({ data }) => {
          this.calculateAndSaveRes = this.getResponse(data)
          if (this.calculateAndSaveRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.calculate,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `محاسبه و ذخیره برای درخواست با شماره ${this.selectedRequest.NidWorkItem} انجام گردید`
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
    copyToMovafeghat () {
      this.showConfirm(
        "آیا از کپی اطلاعات دستور نقشه به موافقت اصولی اطمینان دارید؟"
      ).onOk(() => {
        this.showLoading()
        const payLoad = {
          pNidProc: this.selectedRequest.NidProc,
          pFromFormName: "UI.SC.UserControl.UMapOrder",
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        this.$services.SC.copyToMovafeghatOsooli(payLoad, this.config)
          .then(async ({ data }) => {
            this.copyToMovafeghatOsooliRes = this.getResponse(data)
            if (this.copyToMovafeghatOsooliRes.success) {
              this.showSuccess(
                "کپی دستور نقشه به موافقت اصولی با موفقیت انجام شد"
              )
              await this.log({
                action: this.logActions.copyToMovafeghatOsooli,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "شماره درخواست",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `کپی دستور نقشه به موافقت اصولی برای درخواست با شماره ${this.selectedRequest.NidWorkItem} انجام گردید`
              })
              this.loadObj()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    btnCopyInfoFrom () {
      this.showConfirm("آیا از کپی اطلاعات به دستور نقشه اطمینان دارید؟").onOk(
        () => {
          this.showLoading()
          let payLoad = {
            pNidProc: this.selectedRequest.NidProc,
            pNidBase: "00000000-0000-0000-0000-000000000000"
          }
          this.$services.SC.copyInfoToMapOrder(payLoad, this.config)
            .then(async ({ data }) => {
              this.copyInfoToMapOrderRes = this.getResponse(data)
              if (this.copyInfoToMapOrderRes.success) {
                await this.log({
                  action: this.logActions.copy,
                  bizCode: this.selectedRequest.NidWorkItem,
                  bizCodeTitle: "شماره درخواست",
                  nosaziCode: this.selectedRequest.BizCode,
                  nidWorkItem: this.selectedRequest.NidWorkItem,
                  saveDesc: `کپی اطلاعات به دستور نقشه برای درخواست با شماره ${this.selectedRequest.NidWorkItem} انجام گردید`
                })
                this.showSuccess("اطلاعات به دستور نقشه کپی شد.")
              }
              this.loadObj()
            })
            .catch((e) => {
              console.error(e)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    },
    saveObj () {
      this.showLoading()
      this.model.Base_OtherEquipment = this.normalizeBaseOtherEquipmentRows()
      this.model.Base_Edge = this.normalizeBaseEdgeRows()
      this.model.Base_Using = this.normalizeBaseUsing()
      this.model.Base_Front = this.normalizeBaseFront()
      const buildingInfo = this.model.Base_BuildingInfo
      buildingInfo.AllowableDensityLicence =
        buildingInfo.AllowableDensityLicence || 0
      buildingInfo.ParkingNeedCount = buildingInfo.ParkingNeedCount || 0
      buildingInfo.Height = buildingInfo.Height || 0
      buildingInfo.Defilade = buildingInfo.Defilade || 0
      buildingInfo.Defilade = buildingInfo.Defilade || 0

      const houseInfo = this.model.Base_HouseInfo
      houseInfo.CurrentArea = houseInfo.CurrentArea || 0
      houseInfo.DocArea = houseInfo.DocArea || 0
      houseInfo.RemainArea = houseInfo.RemainArea || 0
      houseInfo.DocArea = houseInfo.DocArea || 0

      const planOrder = this.model.Sh_PlanOrder
      planOrder.PlanOrderNo = planOrder.PlanOrderNo || 0
      let tmpWorkflow = {
        pDtoWorkflowData: null,
        WorkflowGuid: "00000000-0000-0000-0000-000000000000"
      }
      if (this.selectedRequest) {
        // tmpWorkflow.pDtoWorkflowData = this.selectedRequest.WorkflowTitel آقای خوش آیین گفتن این پارامتر ارسال نشه
        tmpWorkflow.WorkflowGuid = this.selectedRequest.NidWorkflowDeff
      }
      const pRequest = {
        pPlanOrder: this.model,
        pUser: { ...this.currentUser },
        tmpWorkflow
      }

      this.$services.SC.savePlanOrder(pRequest, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره اطلاعات دستور نقشه برای درخواست با شماره ${this.selectedRequest.NidWorkItem} انجام گردید`
            })
            this.loadObj()
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
    certificatIssuance () {
      debugger
      this.showLoading()
      const nosaziObj = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      const payload = {
        pDtoOut: {
          ExportNidUser: this.getNidUser(),
          ExportUserName: this.getUserDisplayName(),
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_MapOrder",
          OutputDate: new PersianDate().toLocale("en").format("L"),
          OutputNo: this.model.Sh_PlanOrder.PlanOrderNo,
          OutputPerTitle: "دستور نقشه",
          ReportName: "/Sara8Reports/RptPlanOrder"
        },
        pNosaziCode: {
          Apartment: nosaziObj.Apartment,
          Block: nosaziObj.Block,
          Building: nosaziObj.Building,
          CI_City: 0,
          District: nosaziObj.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: nosaziObj.House,
          IsRoot: false,
          NidBase:
            (this.model.NidLib && this.model.NidLib.RHouse.NidBase) ||
            "00000000-0000-0000-0000-000000000000",
          NidNosaziCode:
            (this.model.NidLib && this.model.NidLib.RHouse.NidNosaziCode) ||
            "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit:
            (this.model.NidLib && this.model.NidLib.RHouse.NidRevisit) ||
            "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Region: nosaziObj.Region,
          Shop: nosaziObj.Shop
        },
        pReportPath: "/Sara8Reports/RptPlanOrder",
        pArchiveDomain: nosaziObj.District,
        pReportDomain: nosaziObj.District,
        pEntityId: this.pEntityId,
        pCurrentDate: true
      }
      this.$services.SC.confirmOutput(payload, this.config)
        .then(async ({ data }) => {
          this.confirmOutputResult = this.getResponse(data)
          if (this.confirmOutputResult.success) {
            this.showSuccess("صدور گواهی با موفقیت انجام شد.")
            this.checkIsConfirmOutput()
            await this.log({
              action: this.logActions.certificateExport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `صدور گواهی برای درخواست با شماره ${this.selectedRequest.NidWorkItem} انجام گردید`
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
    checkIsConfirmOutput () {
      debugger
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pOutputEngTitle: "Output_MapOrder"
      }
      this.$services.SC.checkIsConfirmOutput(payload, this.config)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.checkIsConfirmOutputResult = res.data
            if (this.checkIsConfirmOutputResult.Sh_Output) {
              this.hasSodor = true
              this.updateArchiveBizCode(
                this.checkIsConfirmOutputResult.Sh_Output.ArchiveBizCode
              )
              debugger
            } else {
              this.hasSodor = false
              this.loadObj()
            }
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
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    revokeCertificat () {
      this.showConfirm("آیا از ابطال گواهی اطمینان دارید؟").onOk(() => {
        const payload = {
          pDtoOut: {
            NidOutput: "00000000-0000-0000-0000-000000000000",
            NidProc: this.selectedRequest.NidProc,
            OutputEngTitle: "Output_MapOrder",
            OutputNo: null,
            OutputPerTitle: "دستور نقشه",
            ReportName: "/Sara8Reports/RptPlanOrder",
            RevokeDate: new PersianDate().toLocale("en").format("L"),
            RevokeNidUser: this.getNidUser(),
            RevokeUserName: this.getUserDisplayName()
          },
          pDomain: this.selectedDistrict
        }
        this.$services.SC.revokeOutput(payload, this.config)
          .then(async ({ data }) => {
            this.revokeCertificateResult = this.getResponse(data)
            if (this.revokeCertificateResult.success) {
              await this.log({
                action: this.logActions.revokeCertificate,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `ابطال گواهی روی شماره درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
              })
              this.showSuccess("ابطال گواهی با موفقیت انجام شد.")
              this.checkIsConfirmOutput()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    normalizeBaseOtherEquipmentRows () {
      return this.model.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_OtherEquipmentGroup: m.CI_OtherEquipmentGroup || "2",
          CI_OtherEquipmentType: m.CI_OtherEquipmentType || "535",
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
          CI_Suggest: m.CI_Suggest || null,
          Comments: m.Comments || "",
          CreateDate: m.CreateDate || "",
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidOther: m.NidOther || "00000000-0000-0000-0000-000000000000",
          OtherEquipmentValue: m.OtherEquipmentValue || "10"
        }
      })
    },
    normalizeBaseUsing () {
      return this.model.Base_Using.map((m) => {
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
      return this.model.Base_Front.map((m) => {
        return {
          ...m,
          CI_RoofType: m.CI_RoofType || null,
          CI_FrontStatus: m.CI_FrontStatus || null,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || null
        }
      })
    },
    normalizeBaseEdgeRows () {
      return this.model.Base_Edge.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || 0,
          AddLen: m.AddLen || 0,
          AfterEditBarLen: m.AfterEditBarLen || null,
          AfterEditSideLen: m.AfterEditSideLen || null,
          AfterEditWidth: m.AfterEditWidth || 0,
          BackwardLen: m.BackwardLen || null,
          BarLenEffective: m.BarLenEffective || 0,
          CI_Moshrefiat: m.CI_Moshrefiat || null,
          CI_PathType: m.CI_PathType || 0,
          CI_Privacy: m.CI_Privacy || null,
          CI_SideCode: m.CI_SideCode || 0,
          CI_ValBlockFord: m.CI_ValBlockFord || 0,
          CI_ViewCode: m.CI_ViewCode || null,
          Comments: m.Comments || "",
          Depth1: m.Depth1 || 0,
          Depth2: m.Depth2 || 0,
          Depth3: m.Depth3 || 0,
          DesignLen: m.DesignLen || 0,
          EdgeAndSideCurrent: m.EdgeAndSideCurrent || 0,
          EdgeAndSideDoc: m.EdgeAndSideDoc || 0,
          EdgeBarCurrent: m.EdgeBarCurrent || 0,
          EdgeBarDoc: m.EdgeBarDoc || 0,
          EdgeLenCurrent: m.EdgeLenCurrent || 0,
          EdgeLenDoc: m.EdgeLenDoc || 0,
          EntranceWith: m.EntranceWith || 0,
          GoFrontLen: m.GoFrontLen || 0,
          GoFrontLenAllow: m.GoFrontLenAllow || 0,
          GoFrontLenOther: m.GoFrontLenOther || 0,
          GoFrontLenOtherAllow: m.GoFrontLenOtherAllow || 0,
          PathKaf: m.PathKaf || 0,
          PathName: m.PathName || 0,
          PathWidth: m.PathWidth || 0,
          RegisterPlack: m.RegisterPlack || "",
          Remain: m.Remain || null,
          RemainBarLen: m.RemainBarLen || null,
          RemainSideLen: m.RemainSideLen || null,
          SideWalkWidth: m.SideWalkWidth || 0,
          ValBlockRowNo: m.ValBlockRowNo || null,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidEdge: m.NidEdge || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    cancel () {
      this.loadObj()
      this.isEditable = false
    }
    // secregistration() {
    //   const payload = {
    //     pRequestSec: {
    //       EumSecNoGroup: 6,
    //       NidProc: this.selectedRequest.NidProc,
    //       Sh_RequestSec: {
    //         EumSecNoGroup: 6,
    //         NidProc: this.selectedRequest.NidProc,
    //         NidSec: "00000000-0000-0000-0000-000000000000",
    //         ReportPath: "/Sara8Reports/RptPlanOrder",
    //       },
    //       pUser: this.currentUser,
    //       pDtoWorkflowData: {
    //         StateName: "00000000-0000-0000-0000-000000000000",
    //         WorkflowGuid: "00000000-0000-0000-0000-000000000000",
    //       },
    //     },
    //   };
    //   this.$services.SI.saveRequestSec(payload, this.config)
    //     .then(({ data }) => {
    //       this.dabirkhaneResult = this.getResponse(data);
    //       await this.log({
    //         action: this.logActions.save,
    //         bizCode: this.selectedRequest.NidProc,
    //         bizCodeTitle: "NidProc",
    //         nosaziCode: this.selectedRequest.BizCode,
    //       });
    //     })
    //     .catch((response) => {
    //       this.dabirkhaneResult = this.getResponse(response);
    //       this.serverError();
    //     })
    //     .finally(() => {
    //       this.hideLoading();
    //     });
    // },
  }
}
</script>
