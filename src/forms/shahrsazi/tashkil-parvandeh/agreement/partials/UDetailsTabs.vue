<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <fit>
    <safa-status :result="requestResult" />
    <safa-status :result="saveResult" />
    <safa-tabs ref="safaTabs" v-model="activeTab" :bordered="false">
      <template v-slot:tabs>
        <tab-menu name="agreementUsed" label="کاربریهای توافق شده" />
        <tab-menu name="agreementTafsil" label="طرح تفصیلی و تعین توافق" />
        <tab-menu name="parametersTab" label="پارامترها" />

        <tab-menu name="description" label="توضیحات" />
      </template>
      <tab-content
        name="agreementUsed"
        title="کاربریهای توافق شده"
        :padding="false"
      >
        <UAgreementUsed
          v-model="results"
          @onEmitopenNewTab="openNewTab"
          @dbclick="dbclick"
          :isNew="isNew"
          :formModel="formModel"
          :m="m"
          :selectedRequest="selectedRequest"
        />
      </tab-content>
      <tab-content name="agreementTafsil" title="طرح تفصیلی و تعین توافق">
        <UAgreementTafsil
          v-model="results"
          :isNew="isNew"
          :formModel="formModel"
          :m="m"
        />
      </tab-content>
      <tab-content name="parametersTab" title="پارامترها" :padding="false">
        <UParameters :formModel="formModel" :m="m" />
      </tab-content>
      <tab-content name="description" title="توضیحات">
        <UDescription :formModel="formModel" :m="m" />
      </tab-content>
    </safa-tabs>
  </fit>
  </safa-form>
</template>

<script>
import UAgreementUsed from "./udetails-tabs/UAgreementUsed.vue"
import UAgreementTafsil from "./udetails-tabs/UAgreementTafsil.vue"
import UDescription from "./udetails-tabs/UDescription.vue"
// import calculatePrequest from '../models/calculatePrequest.js'
import UParameters from "./udetails-tabs/UParameters"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
export default {
  //   formKey: '7721D24C-FC87-4A8B-B03D-C0A7A66289EF',
  data () {
    return {
      // title: "شهرسازی- جزئیات توافقنامه",
      // formKey: "4bce7044-b4ae-471f-b422-64b509051141",
      activeTab: "agreementUsed",
      isShowNewTab: false,
      isNew: false,
      results: {},
      engineerInfo: [],
      requestResult: {},
      saveResult: null,
      saveResults: { Sh_Agreement: {} },
      calcResult: null,
      formModel: {
        Sh_Agreement: {},
        Base_Front: [],
        Base_PlanForWork: [],
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        Base_Using: []
      },
      nidBaseInDetails: ""
    }
  },
  mounted () {
    this.$refs.safaTabs.changeTab("agreementUsed")
    this.loadData(this.selectedNidBase)
  },
  props: {
    selectedNidBase: String,
    copyLastRow: Boolean,
    isNewDetails: Boolean,

    nidBase: {
      type: String,
      default: ""
    },
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    m: String
  },
  mixins: [baseFormMixin],
  components: {
    UAgreementUsed,
    UAgreementTafsil,
    UDescription,
    UParameters
  },

  watch: {
    selectedNidBase () {
      this.loadData(this.selectedNidBase)
    }
  },
  methods: {
    async report () {
      const reportPath =
        "/Sara8Reports/RptAgreement_Sara10"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NIdUser: this.getNidUser(),
        RptDomain: "1@2@3",
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptAgreement",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    changeEditable (status) {
      this.$emit("changeEditable", status)
    },
    openNewTab () {
      this.isShowNewTab = true
      this.$refs.safaTabs.changeTab("agreementUsed")
      this.isNew = true
    },
    async updateLastRreqestUpdate () {
      try {
        let payLoad = {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: 'توافقنامه ذخیره'
        }
        const { data } = await this.$services.SC.updateLastRequestState(
          payLoad,
          this.config
        )
        this.updateResult = this.getResponse(data)
        if (this.updateResult) {
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: 'NidProc'
          })
        }
      } catch (response) {
        this.serverError()
      }
    },
    dbclick (dataItem) {
      this.engineerInfo = dataItem
      this.isShowNewTab = true
      this.activeTab = "agreementUsed"
      this.isNew = false
    },
    loadData (nidBase) {
      const checkResult = this.isSelectedRequest()
      if (checkResult) {
        this.showLoading()
        let payload = {
          pNidBase: nidBase,
          pNidProc: this.selectedRequest.NidProc,
          pIsLoadDeletedNosaziCode: false
        }
        this.$services.SC.loadOneAgreementFromList(payload, {
          config: { District: this.selectedDistrict }
        })
          .then((response) => {
            this.requestResult = this.getResponse(response.data)
            if (!this.requestResult.hasError) {
              this.formModel = this.requestResult.data
              if (this.isNewDetails) {
                this.formModel.Sh_AgreementLetter = []
              }
            }
          })
          .catch((error) => {
            console.log("load detail", error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    normalizeBaseUsing () {
      return this.formModel.Base_Using.map((m) => {
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
      return this.formModel.Base_Front.map((m) => {
        return {
          ...m,
          BuildingNo: m.BuildingNo || 0,
          CI_BuildingStep: m.CI_BuildingStep || 0,
          CI_FrontIs: m.CI_FrontIs || 0,
          CI_FrontPlace: m.CI_FrontPlace || 0,
          CI_FrontRoofStatus: m.CI_FrontRoofStatus || 0,
          CI_FrontStatus: m.CI_FrontStatus || 0,
          CI_FrontType: m.CI_FrontType || 0,
          CI_RoofType: m.CI_RoofType || 0,
          CI_SideCode: m.CI_SideCode || 0,
          CI_UsingGroup: m.CI_UsingGroup || 0,
          CI_UsingType: m.CI_UsingType || 0,
          ConversionDate: m.ConversionDate || 0,
          CreateYearFrom: m.CreateYearFrom || 0,
          CreateYearTo: m.CreateYearTo || 0,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || 0,
          FloorNo: m.FloorNo || 0,
          FrontArea: m.FrontArea || 0,
          FrontDepth: m.FrontDepth || 0,
          FrontHeight: m.FrontHeight || 0,
          FrontLength: m.FrontLength || 0,
          FrontWidth: m.FrontWidth || 0,
          GenerateDate: m.GenerateDate || "",
          HeightKaf: m.HeightKaf || 0,
          UnitNo: m.UnitNo || 0,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidFront: m.NidFront || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    saveData () {
      debugger
      this.showLoading()
      this.formModel.Base_Using = this.normalizeBaseUsing()
      this.formModel.Base_Front = this.normalizeBaseFront()
      // if (this.isNewDetails) {
      //   this.formModel.Sh_Agreement.NidBase =
      //     "00000000-0000-0000-0000-000000000000"
      //   this.formModel.NidBase = "00000000-0000-0000-0000-000000000000"
      // }
      let payLoad = {
        pAgreement_List: this.formModel,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.WorkflowTitel,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff
        },
        pUser: this.currentUser
      }
      console.log("saveOneAgreementFromListpayLoad:", payLoad)
      this.$services.SC.saveOneAgreementFromList(payLoad, {
        config: { District: this.selectedDistrict }
      })
        .then(async (response) => {
          this.saveResult = this.getResponse(response.data)

          if (!this.saveResult.hasError) {
            this.saveResults = this.saveResult.data
            this.showSuccess("ذخیره توافقنامه با موفقیت انجام شد")
            this.changeEditable(false)
            this.isNewDetails = false
            this.loadData(this.saveResults.Sh_Agreement.NidBase)
            this.updateLastRreqestUpdate()
            this.$emit("afterSaveDetails", this.isNewDetails)
            await this.log({
              action: this.logActions.save,
              saveDesc: `ذخیره توسط کاربر ${this.getUserDisplayName()}`,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch((error) => {
          this.serverError()
          console.log("saveOneAgreementFromList error", error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    calculate () {
      this.showLoading()
      let payload = {
        pAgreement: this.formModel,
        pNidProc: this.selectedRequest.NidProc,
        pParameters: this.formModel.AgreementParameters,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.WorkflowTitel,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff
        }
      }
      this.$services.SC.calculateOneAgreementFromList(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async (response) => {
          this.requestResult = this.getResponse(response.data)

          if (this.requestResult.success) {
            this.showSuccess("محاسبه توافقنامه با موفقیت انجام شد")
            await this.log({
              action: this.logActions.calculate,
              bizCode: this.selectedRequest.NidWorkItem.toString(),
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode
            })
            if (this.saveResult && this.saveResult.success) {
              this.isNewDetails = false
              this.loadData(this.saveResults.Sh_Agreement.NidBase)
            }
            this.loadData(this.selectedNidBase)
            this.updateLastRreqestUpdate()
          }
        })
        .catch((error) => {
          this.serverError()
          console.error("calculateOneAgreementFromList", error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    copyToMovafeghatOsooli () {
      this.showConfirm(
        "آیا از کپی اطلاعات توافقنامه به موافقت اصولی اطمینان دارید؟"
      ).onOk(() => {
        this.showLoading()
        let payLoad = {
          pNidProc: this.selectedRequest.NidProc,
          pFromFormName: 'UI.SC.UserControl.UAgreement_Details',
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.taskInfo.WorkflowTitel,
            WorkflowGuid: this.taskInfo.NidWorkflowDeff
          }
        }
        this.$services.SC.copyToMovafeghatOsooli(payLoad, {
          config: {
            District: this.selectedDistrict
          }
        })
          .then(async (response) => {
            this.requestResult = this.getResponse(response.data)

            if (!this.requestResult.hasError) {
              await this.log({
                action: this.logActions.copyToMovafeghatOsooli,
                bizCode: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "شماره درخواست",
                nosaziCode: this.selectedRequest.BizCode
              })

              this.showSuccess(
                "کپی توافقنامه به موافقت اصولی با موفقیت انجام شد"
              )

              this.loadData(this.selectedNidBase)
            }
          })
          .catch((error) => {
            this.serverError()
            console.log("copyToMovafeghatOsooli", error)
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
