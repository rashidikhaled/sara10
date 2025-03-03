<template>
  <safa-form
    :id="formKey"
    caption="امور مهندسین ناظر- دبیرخانه مهندسین"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :padding="false" title="دبیرخانه مهندسین">
      <template #header>
        <!-- <safa-status :result="getFilInfoRes" /> -->
        <safa-status :result="saveFilInfoRes" />
        <safa-status :result="calculateStatusEngineerRes" />
        <safa-status :result="saveFilInfoBySara8Res" />
      </template>

      <safa-tabs v-model="activeTab">
        <template #tabs>
          <tab-menu label="مشخصات پرونده" name="FileDetails" />
          <tab-menu label="سایر مشخصات" name="OtherDetails" />
          <tab-menu label="توضیحات" name="Comments" />
        </template>
        <tab-content name="FileDetails" title="مشخصات پرونده">
          <UFileDetails
            v-model="dm"
            :m="mode"
            @getCoordinatorEngineerInfo="getCoordinatorEngineerInfo"
            ref="UFileDetails"
          />
        </tab-content>
        <tab-content name="OtherDetails" title="سایر مشخصات">
          <UOtherDetails v-model="dm" :m="mode" ref="UOtherDetails" />
        </tab-content>
        <tab-content name="Comments" title="توضیحات">
          <UComments v-model="dm" :m="mode" ref="UComments" />
        </tab-content>
      </safa-tabs>

      <template #footer>
        <form-actions
          :m="mode"
          :showNewButton="true"
          @cancel="btnCancelClick"
          @edit="btnEditClick"
          editSPId="03c09517-dae8-43ff-b0f6-7bfd54560bc2"
          editFormId="aa96e4c0-93c0-4284-bda7-dee4287ea826"
          editSPCaption="ویرایش"
          @newInfo="btnNewClick_1"
          newSPId="6069f943-8872-4b73-bce3-742d5316853d"
          newSPCaption="جدید"
          @save="btnSaveClick"
        >
          <template #afterSave>
            <btn-save
              label="ذخیره بدون ارجاع پویا"
              @click="btnSaveWithoutDynamicReferClick"
              spId="ff303e91-ebb4-4058-8dd7-bc8c07cdd10a"
              spCaption="ذخیره بدون ارجاع پویا"
            />
          </template>
          <btn-edit
            v-show="!isEditable"
            label="ویرایش سوابق"
            @click="btnEditClick"
            spId="28ee982d-40fb-4fec-bde5-01194c72df13"
            spCaption="ویرایش سوابق"
          />
          <btn-default
            v-show="!isEditable"
            label="بازآوری اطلاعات از شهرسازی و ارجاع پویا"
            @click="btnRefreshClick"
            spId="b9c6e008-6ec2-4abb-9971-398467925c52"
            spCaption="باز آوری اطلاعات از شهرسازی"
          />
          <btn-default
            v-show="!isEditable"
            label="بازآوری"
            @click="btnOnlyRefreshClick"
            spId="35a06a44-3957-422c-9d28-d3bf40cae5e1"
            spCaption="بازآوری"
          />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UFileDetails from "./partials/UFileDetails"
import UOtherDetails from "./partials/UOtherDetails"
import UComments from "./partials/UComments"

import baseFormMixin from "src/mixins/baseFormMixin"

import { uid } from "quasar"
import pick from "just-pick"
import PersianDate from "persian-date"

const GuidEmpty = "00000000-0000-0000-0000-000000000000"

const defaultModel = {
  ArchitectureCode: null,
  CI_RequestType: 0,
  CI_Years: 0,
  ClsFil_Info: {
    BuildingExecRep_Detail_Main: {
      CI_ExecLevel: 0,
      CI_ExecRep: 0,
      CI_ExecStatus: 0,
      CI_ExecStatusList: null,
      DetailComments: null,
      ExecRep: null,
      NIdBuildingExecRep: "00000000-0000-0000-0000-000000000000",
      NIdDetail: "00000000-0000-0000-0000-000000000000",
      StrDate: null,
      StrTime: null
    },
    CI_City: [],
    ConfirmStartWorkInfo: null,
    DtoWorkflowData: {
      StateName: "",
      WorkflowGuid: GuidEmpty
    },
    ErrorResult: {
      BizErrors: [],
      Requirements: []
    },
    Fil_Floors: [],
    Fil_Info: {
      AcceptMatchDate: "",
      Apartment: 0,
      AreaArseh: 0,
      Block: 0,
      Building: 0,
      CI_City: 0,
      CI_ConstructionStage: 0,
      CI_FileRequester: 0,
      CI_FilesType: 0,
      CI_Lab: 0,
      CI_QtaType: 0,
      CI_Region: 0,
      CI_RequestType: 0,
      CI_SazehType: 0,
      CI_UsingType: 0,
      CI_Years: 0,
      ChangeMapControl: null,
      CodeString: "",
      CommitmentSupervisionDate: "",
      CommitmentSupervisionNo: "",
      ComputationalInstructionNo: "",
      ComputerCode: "",
      ConfirmProjectLevel1Date: null,
      ConfirmProjectLevel1Time: null,
      ConfirmProjectLevel2Date: null,
      ConfirmProjectLevel2Time: null,
      District: 0,
      EnterDate: "",
      ExitDate: "",
      ExportLicenseDate: "",
      ExportLicenseNo: "",
      FileComments: "",
      FileDate: "",
      FileNumber: 0,
      Floor: 0,
      FloorDiff: 0,
      GreenCachetDate: "",
      HasSupportedStructure: false,
      Height: 0,
      House: 0,
      IdentityCodeCoordinator: "",
      IsChangeBuildingGroup: false,
      IsConfirmProjectLevel1: null,
      IsConfirmProjectLevel2: null,
      IsConfirmStartWork: null,
      IsFirefightingConfirmed: false,
      IsNezamReject: false,
      IsSara10: true,
      IsSendToNezam: null,
      MapNo: "",
      MatchComments: "",
      MetrajGodBardari: 0,
      MetrajMojaz: 0,
      MetrajMojod: 0,
      MotherCode: 0,
      NIdFil: GuidEmpty,
      NIdFil_tmp: 0,
      NIdKartablItem_tmp: 0,
      NezamConfirm: null,
      NezamConfirmDate: null,
      NezamConfirmTime: null,
      NezamProjectLevel: null,
      NezamRejectDate: null,
      NezamRejectTime: null,
      NidEngCoordinator: GuidEmpty,
      NidProc: GuidEmpty,
      NidWorkItem: 0,
      NoNeedToSendReports: null,
      ParvanehIdRef: null,
      ParvanehMeterEdit: null,
      PermanentKartablDate: null,
      Region: 0,
      RegisterPlack: "",
      RejectComment: null,
      RequestDate: "",
      SaghfMojaz: null,
      SaraRequestDate: null,
      Shop: 0,
      StrNoTownDabir: null,
      SysCI_MatchStatus: 0,
      SysCI_RequestBy: 0,
      SysCI_RequestStatus: 0,
      Underground: 0,
      UnitNo: 0,
      UrbanNidKartablItem: 0,
      UrbanNidRequest: null,
      UrbanRequestType: null,
      ZabeteType: null,
      ZabeteTypeID: null,
      infrastructure: 0,
      infrastructureDiff: 0
    },
    Fil_Owner: [],
    Fil_Text: [],
    IsRefreshOnly: false,
    NidFil_Info: GuidEmpty,
    NidWorkflowDeff: GuidEmpty,
    User: ""
  },

  NIdMem: null,
  NidCheckerGroup: GuidEmpty,
  NidEng: GuidEmpty,
  NidEngineer: null,
  NidFil: GuidEmpty,
  NidOffice: null,
  NidWorkitem: 0,
  ErrorResult: {
    BizErrors: [],
    Requirements: []
  },
  fil_Info: null,
  fil_InfoList: null
}

export default {
  mixins: [baseFormMixin],
  components: { UFileDetails, UOtherDetails, UComments },

  data () {
    return {
      title: "دبیرخانه مهندسین",
      formKey: "aa96e4c0-93c0-4284-bda7-dee4287ea826",
      name: "UDabirkhaneEngineer",
      main: true,
      sidebarCompatible: true,

      // services
      getFilInfoRes: null,
      saveFilInfoRes: null,
      calculateStatusEngineerRes: null,
      saveFilInfoBySara8Res: null,

      // variables
      activeTab: "FileDetails",
      dm: {},
      isRefreshOnly: true,
      nidFil: null,
      engineerCoordinatorInfo: null
    }
  },

  computed: {
    currentCiCity () {
      return window.getConfigValue("CiCity", "")
    },
    config () {
      return { config: { District: this.selectedDistrict } }
    },
    selectedRequestEngineer () {
      console.debug(
        "this.taskInfo, engineer/lastRequest :>> ",
        this.taskInfo,
        this.$store.getters["engineer/lastRequest"]
      )
      if (this.taskInfo) return this.taskInfo // پرونده از سمت گردش کار انتخاب شده باشد
      return this.$store.getters["engineer/lastRequest"] || null // پرونده از سمت کارتابل پاسخگو انتخاب شده باشد
    }
  },

  methods: {
    async loadObj () {
      // # todo
      // cmbCity.ItemsSource = Common.ClsCommon.LstCI_City

      // //برای مشهد نمایش داده نشود
      // eslint-disable-next-line eqeqeq
      if (this.currentCiCity == "2") {
        this.$nextTick(() => {
          this.$refs.UComments.fileCommentsMode = "r"
        })
      }

      if (!this.selectedRequestEngineer) {
        return this.showError("لطفا یک پرونده انتخاب نمایید.")
      }

      const { nidfil } = await this.$store.dispatch("engineer/getNidFil", {
        key: this.selectedNidProc,
        request: this.selectedRequestEngineer
      })

      this.nidFil = nidfil || GuidEmpty

      // eslint-disable-next-line eqeqeq
      if (this.nidFil != GuidEmpty) {
        this.dm.NidFil = this.nidFil
      }

      this.$refs.UFileDetails.grdOwnerMode = "r"
      this.$refs.UOtherDetails.grdFloorsMode = "r"

      if (this.nidFil && this.nidFil !== GuidEmpty) {
        this.getFilInfo()
      } else {
        // در شرایطی به این بخش میرود که مقدار
        // nidFill
        // برابر با نال یا
        // GuidEmpty
        // باشد.
        this.checkExistOfFil()
      }
    },

    async getFilInfo () {
      try {
        this.showLoading()
        console.debug('payload getFilInfo :>> ', this.dm.NidFil)
        const { data } = await this.$services.engineers.getFilInfo({
          pRequest: { NidFil: this.dm.NidFil }
        })
        this.getFilInfoRes = this.getResponse(data)
        // if (this.getFilInfoRes.success) {
        this.isRefreshOnly = false
        const res = this.getFilInfoRes?.data?.GetFil_InfoResult ?? JSON.parse(JSON.stringify(defaultModel))

        this.dm.ClsFil_Info = res.ClsFil_Info
        this.dm.ClsRef_InfoToEngineer = res.ClsRef_InfoToEngineer
        this.dm.ClsFil_Info.Fil_Info.IsChangeBuildingGroup = !!this.dm.ClsFil_Info.Fil_Info.HasSupportedStructure

        this.$refs.UFileDetails.txtIdentityCodeCoordinator = this.dm.ClsFil_Info.Fil_Info.IdentityCodeCoordinator
        if (this.$refs.UFileDetails.txtIdentityCodeCoordinator) {
          setTimeout(() => {
            this.$refs.UFileDetails.$refs.engineerInfoBox.getEngineer()
          }, 500)
        }

        this.$refs.UFileDetails.cmbCity =
            this.dm.ClsFil_Info.Fil_Info.CI_City

        if (
          this.dm.ClsFil_Info != null &&
            this.dm.ClsFil_Info.Fil_Info != null
        ) {
          if (
            this.dm.ClsFil_Info.Fil_Info.CodeString &&
              this.dm.ClsFil_Info.Fil_Info.CodeString.startsWith("0") === false
          ) {
            this.$refs.UFileDetails.nosaziCodeMode = "r"
            this.$refs.UFileDetails.strNoTownDabirMode = "r"
          } else {
            this.$refs.UFileDetails.nosaziCodeMode = "e"
            this.$refs.UFileDetails.strNoTownDabirMode = "e"
          }

          this.$refs.UFileDetails.comboCIRegionMode = this.dm.ClsFil_Info.Fil_Info.CI_Region === 0 ? "e" : "r"

          this.dm.CI_RequestType = res.ClsFil_Info.Fil_Info.CI_RequestType
          // eslint-disable-next-line eqeqeq
          if (this.dm.CI_RequestType == 70) {
            this.$refs.UFileDetails.comboRequestMode = "r"
            this.$refs.UOtherDetails.metrajMojodMode = "r"
          } else {
            this.$refs.UFileDetails.comboRequestMode = "e"
            this.$refs.UOtherDetails.metrajMojodMode = "e"
          }

          await this.log({
            action: this.logActions.view,
            bizCode: this.dm?.ClsFil_Info.Fil_Info?.NidWorkItem ?? "",
            bizCodeTitle: "NidWorkItem",
            nosaziCode: this.dm?.ClsFil_Info.Fil_Info?.CodeString ?? "",
            nidWorkItem: this.dm?.ClsFil_Info.Fil_Info?.NidWorkItem ?? "",
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
        // }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveFilInfo () {
      if (this.dm.ClsFil_Info.Fil_Info.CI_Years === 0) {
        return this.showError("لطفا سال را وارد نمایید.")
      }
      if (this.$refs.UFileDetails.cmbCity != null) {
        this.dm.ClsFil_Info.Fil_Info.CI_City = parseInt(
          this.$refs.UFileDetails.cmbCity
        )
      }

      if (this.dm.ClsFil_Info.Fil_Text != null) {
        try {
          this.dm.ClsFil_Info.Fil_Text.forEach((item) => {
            if (!item.UserName) {
              item.UserName = this.getUserDisplayName()
              item.UserID = this.getNidUser()
            }
          })

          let tmpWorkflow = {
            StateName: "",
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }

          if (this.dm.ClsFil_Info.DtoWorkflowData) {
            tmpWorkflow.StateName =
              this.dm.ClsFil_Info.DtoWorkflowData.StateName
            tmpWorkflow.WorkflowGuid =
              this.dm.ClsFil_Info.DtoWorkflowData.WorkflowGuid
          } else if (this.taskInfo != null || this.selectedRequest != null) {
            tmpWorkflow.StateName =
              this.taskInfo?.NidProc || this.selectedRequest?.NidProc
            tmpWorkflow.WorkflowGuid =
              this.taskInfo?.NidWorkflowDeff ||
              this.selectedRequest?.NidWorkflowDeff
          }

          const coordinator =
            this.$refs.UFileDetails.txtIdentityCodeCoordinator
          if (coordinator !== null && coordinator !== "") {
            const { NIdEng, IdentityCode } = this.engineerCoordinatorInfo
            this.dm.ClsFil_Info.Fil_Info.NidEngCoordinator = NIdEng
            this.dm.ClsFil_Info.Fil_Info.IdentityCodeCoordinator =
              IdentityCode
          }

          this.dm.ClsFil_Info.Fil_Info.HasSupportedStructure =
            !!this.dm.ClsFil_Info.Fil_Info.IsChangeBuildingGroup
          this.dm.ClsFil_Info.Fil_Info.IsSara10 = true

          const payload = {
            pRequest: {
              ArchitectureCode: null,
              ClsFil_Info: this.dm.ClsFil_Info,
              CI_RequestType:
                this.dm.ClsFil_Info.Fil_Info.CI_RequestType,
              UserGUID: this.getNidUser(),
              UserName: this.getUserDisplayName(),
              IsRefreshOnly: this.isRefreshOnly
              // ClsRef_InfoToEngineer: this.dm.ClsRef_InfoToEngineer,
              // NidFil: this.dm.NidFil
            },
            pUser: {
              ...pick(
                this.currentUser,
                "JobLocationGuid",
                "JobLocationName",
                "UserGuid",
                "UserName",
                "UserGroups"
              )
            },
            pDtoWorkflowData: tmpWorkflow
          }

          console.debug("payload saveFilInfo :>> ", payload)

          this.showLoading()
          // eslint-disable-next-line no-unreachable
          const { data } = await this.$services.engineers.saveFilInfo(payload)
          this.activeTab = "FileDetails"
          this.saveFilInfoRes = this.getResponse(data)
          if (this.saveFilInfoRes.success) {
            if (
              this.saveFilInfoRes?.data?.SaveFilInfoResult?.ClsFil_Info
                ?.ErrorResult != null
            ) {
              const err =
                this.saveFilInfoRes?.data?.SaveFilInfoResult?.ErrorResult
                  ?.BizErrors ?? null
              if (err != null && err.length > 0) {
                this.showError(err[0].ErrorTitel)
              }
              // eslint-disable-next-line eqeqeq
              if (err != null && err.every((a) => a.ErrorAction != 0)) {
                this.isEditable = false
                this.showSuccess("ذخیره با موفقیت انجام شد.")
                await this.log({
                  action: this.logActions.save,
                  bizCode:
                    this.dm?.ClsFil_Info.Fil_Info?.NidWorkItem ?? "",
                  bizCodeTitle: "NidWorkItem",
                  nosaziCode:
                    this.dm?.ClsFil_Info.Fil_Info?.CodeString ?? "",
                  nidWorkItem:
                    this.dm?.ClsFil_Info.Fil_Info?.NidWorkItem ?? "",
                  saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
                })
                this.getFilInfo()
              }
            }
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
    },

    checkExistOfFil () {
      const getEngineerDataCompleted = async (argsSara) => {
        if (argsSara) {
          try {
            let pDtoWorkflowData = {
              StateName: "",
              WorkflowGuid: GuidEmpty
            }

            if (this.dm.ClsFil_Info.DtoWorkflowData) {
              pDtoWorkflowData.StateName =
                this.dm.ClsFil_Info.DtoWorkflowData.StateName
              pDtoWorkflowData.WorkflowGuid =
                this.dm.ClsFil_Info.DtoWorkflowData.WorkflowGuid
            } else if (this.taskInfo != null || this.selectedRequest != null) {
              pDtoWorkflowData.StateName =
                this.taskInfo?.NidProc || this.selectedRequest?.NidProc
              pDtoWorkflowData.WorkflowGuid =
                this.taskInfo?.NidWorkflowDeff ||
                this.selectedRequest?.NidWorkflowDeff
            }

            // // eslint-disable-next-line eqeqeq
            // if (this.dm.ClsFil_Info.Fil_Info.NIdFil == GuidEmpty) { // این کد در زمل سرا 8 بود که منطقی نبیست
            //   this.dm.ClsFil_Info.Fil_Info.NIdFil = this.dm.ClsFil_Info.Fil_Info.NIdFil
            // }

            // eslint-disable-next-line eqeqeq
            if (this.dm.ClsFil_Info.NidFil_Info == GuidEmpty) {
              this.dm.ClsFil_Info.NidFil_Info =
                this.dm.ClsFil_Info.Fil_Info.NIdFil
            }

            this.dm.ClsFil_Info.Fil_Info.IsSara10 = true

            const payload = {
              pRequest: {
                ClsFil_Info: this.dm.ClsFil_Info,
                CI_RequestType:
                  this.dm.ClsFil_Info.Fil_Info.CI_RequestType,
                IsRefreshOnly: this.IsRefreshOnly
              },
              pUser: {
                ...pick(
                  this.currentUser,
                  "JobLocationGuid",
                  "JobLocationName",
                  "UserGuid",
                  "UserName",
                  "UserGroups"
                )
              },
              pDtoWorkflowData
            }
            console.log("payload saveFilInfoBySara8 :>> ", payload)
            const { data: args } = await this.$services.engineers.saveFilInfo(
              payload
            )
            this.saveFilInfoBySara8Res = this.getResponse(args)
            if (this.saveFilInfoBySara8Res.success) {
              this.isRefreshOnly = false
              const res = this.saveFilInfoBySara8Res.data.SaveFilInfoResult
              if (
                res.data?.SaveFilInfoResult?.ClsFil_Info?.NidFil_Info != null
              ) {
                if (
                  res.data?.SaveFilInfoResult?.ClsFil_Info?.ErrorResult != null
                ) {
                  if (
                    res.data.SaveFilInfoResult.ClsFil_Info.ErrorResult
                      .BizErrors != null &&
                    res.data.SaveFilInfoResult.ClsFil_Info.ErrorResult.BizErrors
                      .length > 0
                  ) {
                    this.showError(
                      res.data.SaveFilInfoResult.ClsFil_Info.ErrorResult
                        .BizErrors[0].ErrorTitel
                    )
                  }

                  if (
                    res.data.SaveFilInfoResult.ClsFil_Info.ErrorResult
                      .BizErrors != null &&
                    res.data.SaveFilInfoResult.ClsFil_Info.ErrorResult.BizErrors.every(
                      // eslint-disable-next-line eqeqeq
                      (a) => a.ErrorAction != 0
                    )
                  ) {
                    this.dm.ClsFil_Info =
                      res.data.SaveFilInfoResult.ClsFil_Info
                    this.dm.ArchitectureCode =
                      res.data.SaveFilInfoResult.ArchitectureCode
                    this.dm.NidFil =
                      this.dm.ClsFil_Info.Fil_Info.NIdFil

                    if (
                      res.data.SaveFilInfoResult.ClsFil_Info.Fil_Info
                        .CodeString != null
                    ) {
                      this.dm.ClsFil_Info.Fil_Info.CodeString =
                        res.data.SaveFilInfoResult.ClsFil_Info.Fil_Info.CodeString
                    } else {
                      this.showError(
                        "مقدار برگشتی کد نوسازی (CodeString) در متد SaveFilInfo Null می باشد"
                      )
                    }
                  }
                }
              }
              this.getFilInfo()
            }
          } catch (e) {
            console.error(e)
            this.serverError()
          }
        }
      }
      this.getEngineerDataFrom_Sara8(getEngineerDataCompleted)
    },

    async getEngineerDataFrom_Sara8 (completed) {
      try {
        if (this.dm.ClsFil_Info == null) this.clearContext()
        if (this.dm.ClsFil_Info.Fil_Info.NIdFil === GuidEmpty) {
          this.dm.ClsFil_Info.Fil_Info.NIdFil = uid()
        }

        this.nidFil = this.dm.ClsFil_Info.Fil_Info.NIdFil

        this.dm.ClsFil_Info.Fil_Info.SysCI_RequestBy = 1
        this.dm.ClsFil_Info.Fil_Info.NidProc = this.selectedNidProc
        this.dm.ClsFil_Info.Fil_Info.NidWorkItem = parseInt(
          this.selectedRequestEngineer.NidWorkItem
        )
        this.dm.ClsFil_Info.Fil_Info.NIdFil = this.nidFil
        this.dm.ClsFil_Info.NidWorkflowDeff =
          this.taskInfo?.NidWorkflowDeff ||
          this.selectedRequest?.NidWorkflowDeff

        const payload = {
          pNidProc: this.selectedNidProc,
          pUser: pick(this.currentUser, [
            "UserGuid",
            "UserName",
            "JobLocationGuid",
            "JobLocationName"
          ]),
          pDtoWorkflowData: {
            StateName: "",
            WorkflowGuid: GuidEmpty
          }
        }
        console.debug("payload calculateEngineer:", payload)
        const { data: argsSC } = await this.$services.SC.calculateEngineer(
          payload,
          this.config
        )
        this.calculateStatusEngineerRes = this.getResponse(argsSC)
        const calcRes = this.calculateStatusEngineerRes
        if (
          calcRes.data?.ErrorResult?.BizErrors != null &&
          // eslint-disable-next-line eqeqeq
          calcRes.data.ErrorResult.BizErrors.every((a) => a.ErrorAction != 0)
        ) {
          if (calcRes.data.DtoEngineer != null) {
            let { nidfil: tmpNidFil } = await this.$store.dispatch(
              "engineer/getNidFil",
              {
                key: this.selectedNidProc,
                request: this.selectedRequestEngineer
              }
            )

            // eslint-disable-next-line eqeqeq
            if (tmpNidFil && tmpNidFil != GuidEmpty) {
              this.dm.ClsFil_Info.Fil_Info.NIdFil = tmpNidFil
            }

            if (this.dm.ClsFil_Info.Fil_Info.NIdFil === GuidEmpty) {
              this.dm.ClsFil_Info.Fil_Info.NIdFil = uid()
            }

            const {
              // eslint-disable-next-line camelcase
              Sh_RequestInfo,
              FloorCount,
              InfrastructureArea,
              // eslint-disable-next-line camelcase
              CI_Sazeh,
              ZabeteType,
              ZabeteTypeID,
              UnitCount,
              // eslint-disable-next-line camelcase
              CI_BuildingStep,
              // eslint-disable-next-line camelcase
              CI_City,
              Height,
              // eslint-disable-next-line camelcase
              CI_UsingGroup,
              ParvandehType,
              Underground,
              FileDate,
              MetrajMojaz,
              MetrajMojod,
              ParvanehIdRef,
              ParvanehMeterEdit,
              MetrajGodBardari,
              // eslint-disable-next-line camelcase
              Base_RegisterPlack,
              SecretariatNo,
              // eslint-disable-next-line camelcase
              Base_NosaziCode,
              // eslint-disable-next-line camelcase
              Base_Owner,
              UsingList
            } = calcRes.data.DtoEngineer

            // eslint-disable-next-line camelcase
            if (Sh_RequestInfo != null) {
              this.dm.ClsFil_Info.Fil_Info.UrbanNidRequest = parseInt(
                Sh_RequestInfo.NidWorkItem
              )
              this.dm.ClsFil_Info.Fil_Info.UrbanNidKartablItem =
                parseInt(Sh_RequestInfo.NidWorkItem)
              this.dm.ClsFil_Info.Fil_Info.UrbanRequestType =
                Sh_RequestInfo.WorkflowTitel
              this.dm.ClsFil_Info.Fil_Info.RequestDate =
                Sh_RequestInfo.RequestDate
            }

            this.dm.ClsFil_Info.Fil_Info.CI_Years =
              this.getCurrentYear()
            this.dm.ClsFil_Info.Fil_Info.Floor =
              parseFloat(FloorCount)
            this.dm.ClsFil_Info.Fil_Info.infrastructure =
              parseFloat(InfrastructureArea)
            this.dm.ClsFil_Info.Fil_Info.CI_SazehType = Math.round(
              parseFloat(CI_Sazeh)
            )

            this.dm.ClsFil_Info.Fil_Info.ZabeteType = ZabeteType
            this.dm.ClsFil_Info.Fil_Info.ZabeteTypeID = ZabeteTypeID
            this.dm.ClsFil_Info.Fil_Info.UnitNo = Math.round(
              parseFloat(UnitCount)
            )
            this.dm.ClsFil_Info.Fil_Info.CI_ConstructionStage =
              Math.round(parseFloat(CI_BuildingStep))
            this.dm.ClsFil_Info.Fil_Info.CI_City = Math.round(
              parseFloat(CI_City)
            )
            this.dm.ClsFil_Info.Fil_Info.CI_UsingType = Math.round(
              parseFloat(CI_UsingGroup)
            )

            let tmpHeight = "0"
            if (Height) {
              tmpHeight = Height.split(".")[0].trim()
            }

            this.dm.ClsFil_Info.Fil_Info.Height =
              parseFloat(tmpHeight)
            this.dm.ClsFil_Info.Fil_Info.CI_UsingType = Math.round(
              parseFloat(CI_UsingGroup)
            )
            this.dm.ClsFil_Info.Fil_Info.CI_FilesType =
              parseFloat(ParvandehType)
            this.dm.ClsFil_Info.Fil_Info.Underground = Underground
            this.dm.ClsFil_Info.Fil_Info.FileDate = FileDate
            this.dm.ClsFil_Info.Fil_Info.MetrajMojaz = MetrajMojaz
            this.dm.ClsFil_Info.Fil_Info.MetrajMojod = MetrajMojod
            this.dm.ClsFil_Info.Fil_Info.ParvanehIdRef = ParvanehIdRef
            this.dm.ClsFil_Info.Fil_Info.ParvanehMeterEdit =
              parseFloat(ParvanehMeterEdit)
            this.dm.ClsFil_Info.Fil_Info.MetrajGodBardari =
              MetrajGodBardari

            // eslint-disable-next-line camelcase
            if (Base_RegisterPlack != null) {
              this.dm.ClsFil_Info.Fil_Info.RegisterPlack =
                Base_RegisterPlack.sort((a, b) => {
                  if (a.Priority > b.Priority) return 1
                  if (a.Priority < b.Priority) return -1
                  return 0
                })
                  .map((f) => f.RegisterPlackTypeValue)
                  .join("-")
            } else {
              this.showError("پلاک ثبتی وارد نشده است")
              completed(false)
            }

            this.dm.ClsFil_Info.Fil_Info.StrNoTownDabir =
              SecretariatNo
            // eslint-disable-next-line eqeqeq, camelcase
            if (Base_NosaziCode != null && Base_NosaziCode.District != 0) {
              this.dm.ClsFil_Info.Fil_Info.CI_Region =
                Base_NosaziCode.District
              this.dm.ClsFil_Info.Fil_Info.District =
                Base_NosaziCode.District
              this.dm.ClsFil_Info.Fil_Info.Region =
                Base_NosaziCode.Region
              this.dm.ClsFil_Info.Fil_Info.Block =
                Base_NosaziCode.Block
              this.dm.ClsFil_Info.Fil_Info.House =
                Base_NosaziCode.House
              this.dm.ClsFil_Info.Fil_Info.Building =
                Base_NosaziCode.Building
              this.dm.ClsFil_Info.Fil_Info.Apartment =
                Base_NosaziCode.Apartment
              this.dm.ClsFil_Info.Fil_Info.Shop = Base_NosaziCode.Shop
              this.dm.ClsFil_Info.Fil_Info.CodeString =
                Base_NosaziCode.District.toString() +
                "-" +
                Base_NosaziCode.Region.toString() +
                "-" +
                Base_NosaziCode.Block.toString() +
                "-" +
                Base_NosaziCode.House.toString() +
                "-" +
                Base_NosaziCode.Building.toString() +
                "-" +
                Base_NosaziCode.Apartment.toString() +
                "-" +
                Base_NosaziCode.Shop.toString()
            } else {
              let tmpBizCode = this.convertToNosaziCodeString(
                this.selectedNosaziCode
              )
              if (tmpBizCode) {
                this.dm.ClsFil_Info.Fil_Info.District = parseFloat(
                  tmpBizCode.split("-")[0]
                )
                this.dm.ClsFil_Info.Fil_Info.Region = parseFloat(
                  tmpBizCode.split("-")[1]
                )
                this.dm.ClsFil_Info.Fil_Info.Block = parseFloat(
                  tmpBizCode.split("-")[2]
                )
                this.dm.ClsFil_Info.Fil_Info.House = parseFloat(
                  tmpBizCode.split("-")[3]
                )
                this.dm.ClsFil_Info.Fil_Info.Building = parseFloat(
                  tmpBizCode.split("-")[4]
                )
                this.dm.ClsFil_Info.Fil_Info.Apartment = parseFloat(
                  tmpBizCode.split("-")[5]
                )
                this.dm.ClsFil_Info.Fil_Info.Shop = parseFloat(
                  tmpBizCode.split("-")[6]
                )
                this.dm.ClsFil_Info.Fil_Info.CodeString = tmpBizCode
              }
            }

            // eslint-disable-next-line camelcase
            if (Base_Owner != null) {
              this.dm.ClsFil_Info.Fil_Owner = Base_Owner.map((f) => {
                return {
                  Address: f.Address,
                  Family: f.OwnerLastName,
                  Name: f.OwnerName,
                  Tel: f.CellPhone,
                  NIdFil: this.dm?.ClsFil_Info?.Fil_Info?.NIdFil ?? null,
                  NIdOwner: f?.NidOwner ?? null,
                  NIdOwner_tmp: 0
                }
              })
            } else {
              this.showError("اطلاعات مالک وارد نشده است")
              completed(false)
            }

            if (UsingList != null) {
              this.dm.ClsFil_Info.Fil_Floors = UsingList.map((f) => {
                return {
                  BuildingStepID: f.BuildingStepID,
                  BuildingStepTitle: f.BuildingStepTitle,
                  CI_SazehType: Math.round(parseFloat(f.CI_SazehType)),
                  FloorNo: Math.round(parseFloat(f.FloorNo)),
                  infrastructure: parseFloat(f.Infrastructure),
                  Floor: parseFloat(f.FloorCount),
                  // NIdFil: Guid.Parse(TmpNidFil),
                  NIdFloor: uid(),
                  UsingID: f.UsingID,
                  UsingTitle: f.UsingTitle
                }
              })
            }

            this.dm.NidFil =
              this.dm.ClsFil_Info.Fil_Info.NIdFil

            if (this.dm.fil_Info == null) {
              this.dm.fil_Info = JSON.parse(
                JSON.stringify(defaultModel.ClsFil_Info.Fil_Info)
              )
            }
            this.dm.fil_Info = this.dm.ClsFil_Info.Fil_Info

            completed(true)
          } else {
            this.showError("اطلاعاتی از شهرسازی یافت نشد")
            completed(false)
          }
        } else {
          completed(false)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },

    editForm () {
      this.isEditable = true
      // eslint-disable-next-line eqeqeq
      if (this.currentCiCity == "2") {
        this.$refs.UComments.fileCommentsMode = "r"
      }
    },

    cancelForm () {
      this.isEditable = false
    },

    btnEditClick () {
      this.editForm()
    },

    btnSaveClick () {
      this.isRefreshOnly = false
      this.saveFilInfo()
    },

    btnCancelClick () {
      this.cancelForm()
    },

    btnNewClick_1 () {
      this.clearContext()
      this.editForm()
    },

    btnRefreshClick () {
      this.loadObj()
    },

    btnOnlyRefreshClick () {
      this.isRefreshOnly = true
      this.loadObj()
    },

    btnSaveWithoutDynamicReferClick () {
      this.isRefreshOnly = true
      this.saveFilInfo()
    },

    clearContext () {
      this.dm.ClsFil_Info = JSON.parse(
        JSON.stringify(defaultModel.ClsFil_Info)
      )
    },

    getCurrentYear () {
      return new PersianDate().toCalendar("persian").year()
    },

    getCoordinatorEngineerInfo (engineerInfo) {
      this.engineerCoordinatorInfo = engineerInfo ?? {
        IdentityCode: null,
        NIdEng: null,
        ArchitectureCode: null
      }
    }
  },

  created () {
    this.dm = JSON.parse(JSON.stringify(defaultModel))

    this.isRefreshOnly = true
    this.loadObj()
  }
}
</script>
