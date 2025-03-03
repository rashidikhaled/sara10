<template>
  <safa-form
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getRefToEngRes" />
        <safa-status :result="searchObjRes" />
        <safa-status :result="saveFilInfoRes" />
        <safa-status :result="referFilToEngineerRes" />
      </template>
      <fit>
        <FormRow class="q-pa-sm">
          <FormControl>
            <safa-text
              label="کد ارجاع درخواست"
              label-width="100px"
              v-model="UrbanNidKartablItem"
              type="number"
              @keyup.enter="serachObj"
            >
              <template v-slot:append>
                <q-icon
                  title="جستجو با کد ارجاع درخواست"
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="serachObj"
                  color="primary"
                  name="search"
                  class="cursor-pointer"
                />
              </template>
            </safa-text>
          </FormControl>
        </FormRow>
        <safa-tabs v-model="activeTab" :padding="true">
          <template v-slot:tabs>
            <tab-menu name="fileDetails" label="مشخصات پرونده" />
            <tab-menu name="Owners" label="مالکین" />
          </template>
          <tab-content name="fileDetails">
            <fit>
              <safa-notice
                >متراژ مازاد توسط سیستم محاسبه می شود. لطفا در صورت لزوم آن را
                تغییر دهید.</safa-notice
              >
              <FormRow class="q-mb-sm">
                <FormControl>
                  <safa-combo
                    :m="mode"
                    label="رشته تحصیلی"
                    label-width="100px"
                    v-model="studyFields"
                    source-type="local"
                    :options="studyFieldsOptions"
                    required
                    validations="required"
                    cdcName="studyFields"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    label="صلاحیت"
                    label-width="100px"
                    v-model="ability"
                    cdcName="ability"
                    source-type="local"
                    :options="abilityOptions"
                    :m="mode"
                    required
                    validations="required"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    m="r"
                    label="زیربنا"
                    label-width="100px"
                    v-model="model.fil_Info.infrastructure"
                    cdcName="infrastructure"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    m="r"
                    label="تعداد سقف"
                    label-width="100px"
                    v-model="model.fil_Info.Floor"
                    cdcName="Floor"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    label="تاریخ درخواست"
                    label-width="100px"
                    v-model="model.fil_Info.EnterDate"
                    cdcName="EnterDate"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    label="نوع پرونده"
                    label-width="100px"
                    v-model="model.fil_Info.CI_FilesType"
                    cdcName="CI_FilesType"
                    domainName="engineer"
                    ciName="CI_FilesType"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="نوع سازه"
                    label-width="100px"
                    v-model="model.fil_Info.CI_SazehType"
                    cdcName="CI_SazehType"
                    domainName="engineer"
                    ciName="CI_SazehType"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="درصد اعمال شده در سهمیه"
                    label-width="100px"
                    v-model="model.Eng_Info.PercentRestriction"
                    cdcName="qtaPercent"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="نوع ضابطه"
                    label-width="100px"
                    v-model="model.fil_Info.ZabeteType"
                    cdcName="ZabeteType"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="ارتفاع ساختمان"
                    label-width="100px"
                    v-model="model.fil_Info.Height"
                    cdcName="Height"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="متراژ اصلاحیه"
                    label-width="100px"
                    v-model="model.fil_Info.ParvanehMeterEdit"
                    cdcName="ParvanehMeterEdit"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="تعداد واحد"
                    label-width="100px"
                    v-model="model.fil_Info.UnitNo"
                    cdcName="ReferedPercent"
                    m="r"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="متراژ"
                    label-width="100px"
                    v-model="model.fil_Info.infrastructure"
                    cdcName="ReferedMeter"
                    :m="mode"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="متراژ گودبرداری"
                    label-width="100px"
                    v-model="model.fil_Info.MetrajGodBardari"
                    cdcName="MetrajGodBardari"
                    m="r"
                  />
                </FormControl>
                <nosazi-code-input
                  v-model="baseNosaziCode"
                  label="کد نوسازی"
                  label-width="63px"
                  cdcName="nosaziCode"
                  m="r"
                />
                <text-template
                  label="توضیحات ارجاع"
                  label-width="100px"
                  v-model="model.ClsRef_InfoToEngineer.Ref_Info.RefComments"
                  cdcvName="RefComments"
                  :rows="1"
                  class="col-12"
                  :m="mode"
                />
              </FormRow>
              <!-- ID="9D7CFC5B-DDD3-4D74-B6DD-87C1D0B036C2" -->
              <safa-grid
                title="لیست مهندسین ارجاع شده"
                v-model="model.AllReferToEngineer"
                cdcName="AllReferToEngineer"
                helper="referToEngineerListColumns"
                @row:click="selectedEng"
                paginate
                fit
              />
            </fit>
          </tab-content>
          <tab-content name="Owners">
            <fit>
              <FormRow class="q-mb-sm">
                <FormControl>
                  <safa-text
                    label="پلاک ثبتی"
                    label-width="100px"
                    v-model="model.fil_Info.RegisterPlack"
                    cdcName="RegisterPlack"
                    m="r"
                  />
                </FormControl>
              </FormRow>
              <safa-splitter v-model="spModel" vertical class="fit" margin="0">
                <template #before>
                  <fit>
                    <!-- ID="9D7CFC5B-DDD3-4D74-B6DD-87C1D0B036C2" -->
                    <safa-grid
                      title="لیست مهندسین ارجاع شده"
                      v-model="model.AllReferToEngineer"
                      cdcName="AllReferToEngineer"
                      helper="referToEngineerListColumns"
                      fit
                      m="r"
                      paginate
                    />
                  </fit>
                </template>
                <template #after>
                  <fit>
                    <!-- "3AADD4BB-55EA-4EAA-B72E-589561CE6A11" -->
                    <safa-grid
                      title="مشخصات مالک"
                      v-model="model.Fil_OwnerList"
                      cdcName="Fil_OwnerList"
                      helper="filOwnerListColumns"
                      fit
                      m="r"
                      paginate
                    />
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>

      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
          <btn-default
            label="بازآوری اطلاعات از شهرسازی"
            @click="checkExistOfFil"
          />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from "quasar"
import pick from "just-pick"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"
import { currentDate, currentTime } from "src/utils/index"
import PersianDate from "persian-date"

const ziroGuid = "00000000-0000-0000-0000-000000000000"
const defaultModel = {
  CI_RequestType: 0,
  ClsFil_Info: {
    CI_City: "",
    ConfirmStartWorkInfo: "",
    DtoWorkflowData: "",
    ErrorResult: "",
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
      CI_Years: 1400,
      District: 0,
      EnterDate: "",
      ExitDate: "",
      ExportLicenseDate: "",
      ExportLicenseNo: 0,
      FileComments: "",
      FileDate: "",
      FileNumber: 0,
      Floor: 0,
      FloorDiff: 0,
      GreenCachetDate: "",
      HasSupportedStructure: false,
      Height: 0,
      House: 0,
      IsChangeBuildingGroup: false,
      IsConfirmStartWork: false,
      IsFirefightingConfirmed: false,
      IsNezamReject: false,
      IsSendToNezam: false,
      MapNo: 0,
      MatchComments: 0,
      MetrajGodBardari: 0,
      MetrajMojaz: 0,
      MetrajMojod: 0,
      MotherCode: 0,
      NIdFil: ziroGuid,
      NIdFil_tmp: 0,
      NIdKartablItem_tmp: 0,
      NidProc: "00000000-0000-0000-0000-000000000000",
      NidWorkItem: 0,
      Region: 0,
      RequestDate: null,
      SaghfMojaz: null,
      SaraRequestDate: null,
      Shop: 0,
      infrastructureDiff: 0
    },
    Fil_Owner: [],
    Fil_Text: [],
    IsRefreshOnly: false,
    NidFil_Info: "00000000-0000-0000-0000-000000000000",
    NidWorkflowDeff: "00000000-0000-0000-0000-000000000000",
    User: ""
  },
  fil_Info: {
    infrastructure: "",
    Floor: "",
    EnterDate: "",
    CI_FilesType: "",
    CI_SazehType: "",
    ZabeteType: "",
    Height: "",
    ParvanehMeterEdit: "",
    MetrajGodBardari: "",
    RegisterPlack: ""
  },
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
    CI_Years: 1400,
    District: 0,
    EnterDate: "",
    ExitDate: "",
    ExportLicenseDate: "",
    ExportLicenseNo: 0,
    FileComments: "",
    FileDate: "",
    FileNumber: 0,
    Floor: 0,
    FloorDiff: 0,
    GreenCachetDate: "",
    HasSupportedStructure: false,
    Height: 0,
    House: 0,
    IsChangeBuildingGroup: false,
    IsConfirmStartWork: false,
    IsFirefightingConfirmed: false,
    IsNezamReject: false,
    IsSendToNezam: false,
    MapNo: 0,
    MatchComments: 0,
    MetrajGodBardari: 0,
    MetrajMojaz: 0,
    MetrajMojod: 0,
    MotherCode: 0,
    NIdFil: "00000000-0000-0000-0000-000000000000",
    NIdFil_tmp: 0,
    NIdKartablItem_tmp: 0,
    NidProc: "00000000-0000-0000-0000-000000000000",
    NidWorkItem: 0,
    Region: 0,
    RequestDate: null,
    SaghfMojaz: null,
    SaraRequestDate: null,
    Shop: 0,
    infrastructureDiff: 0
  },
  Eng_Info: {},
  ClsRef_InfoToEngineer: {
    DontCheck: false,
    NIdRef: "00000000-0000-0000-0000-000000000000",
    Ref_Info: {
      CI_Years: 1402,
      ReferedPercent: 0,
      ReferedMeter: 0,
      NIdRef: "00000000-0000-0000-0000-000000000000",
      NIdRef_tmp: 0,
      RefComments: ""
    },
    Qta_Info: {
      CI_Years: 1402
    }
  },
  ClsRef_InfoToEngineerTemp: {},
  NidFil: "00000000-0000-0000-0000-000000000000"
}

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "درخواست ارجاع کار",
      formKey: "ba4de235-3edc-45ec-99bf-86d76d3228f1",
      name: "UEngineerReferRequest",
      main: true,

      // #region service
      getRefToEngRes: null,
      saveFilInfoRes: null,
      referFilToEngineerRes: null,
      searchObjRes: null,
      // #endregion

      // #region variables
      spModel: 50,
      studyFields: null,
      studyFieldsOptions: [],
      ability: null,
      abilityOptions: [],

      model: {
        ...defaultModel
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      UrbanNidKartablItem: "",
      activeTab: "fileDetails",
      selectedNIdEng: null
      // #endregion
    }
  },

  created () {
    this.loadEngInfo()
  },

  methods: {
    normalizeAbilityOps () {
      let tmpStudy = this.model.AllStudyFields.find((e) => e)
      let abilityObj =
        this.model.EngineerAbility.filter(
          (f) => f.CI_StudyField === tmpStudy.ID
        ) || []
      return (
        abilityObj.map((m) => {
          return {
            ID: m.ID,
            Title: m.Base ? m.Title + " " + m.Base : m.Title
          }
        }) ?? []
      )
    },
    normalizeStudyFieldsOps () {
      return (
        this.model.AllStudyFields.map(({ Title, ID }) => {
          return { ID, Title }
        }) ?? []
      )
    },
    loadEngInfo () {
      this.showLoading()
      this.$services.engineers
        .getRefToEngineerWithNidEng({
          Prequest: { NidEngineer: this.getNidUser() }
        })
        .then(({ data }) => {
          this.getRefToEngRes = this.getResponse(data)
          if (this.getRefToEngRes.success) {
            const res =
              this.getRefToEngRes.data.GetRefToEngineerWithNidEngResult
            if (res.EngineerLastOffice) {
              this.model.EngineerLastOffice = res.EngineerLastOffice
              this.model.EngineerAbility = res.EngineerAbility
              this.model.AllStudyFields = res.AllStudyFields

              if (
                this.model.EngineerAbility &&
                this.model.EngineerAbility.length > 0
              ) {
                this.model.ClsRef_InfoToEngineer.Ref_Info.CI_Base =
                  this.model.EngineerAbility.find((e) => e).CI_Base

                this.abilityOptions = this.normalizeAbilityOps()
                this.ability = this.abilityOptions[0]?.ID ?? null

                this.studyFieldsOptions = this.normalizeStudyFieldsOps()
                this.studyFields = this.studyFieldsOptions[0]?.ID ?? null
              } else {
                this.studyFieldsOptions = []
                this.abilityOptions = []
              }

              if (this.model.EngineerLastOffice) {
                this.model.ClsRef_InfoToEngineer.Ref_Info.NIdEng =
                  this.model.EngineerLastOffice.NIdEng
                this.model.ClsRef_InfoToEngineer.Ref_Info.NIdMem =
                  this.model.EngineerLastOffice.NIdMem
                this.model.NIdMem = this.model.EngineerLastOffice.NIdMem
              } else {
                this.showError("اطلاعاتی با این کد یافت نشد.")
              }
            } else {
              this.showError("اطلاعاتی با این کد یافت نشد.")
            }
            this.fil_Info = this.getRefToEngRes.data
          }
        })
        .catch((e) => {
          console.error(e)
          this.showServer()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    serachObj () {
      if (this.UrbanNidKartablItem) {
        this.doSearchNidWorkItem()
      } else this.showError("لطفا کد ارجاع را وارد کنید.")
    },

    doSearchNidWorkItem () {
      this.showLoading()
      this.$services.engineers
        .getReferAllToEngineerInNidWorkItem({
          pNidWorkItem: this.UrbanNidKartablItem,
          pNidEng: this.getNidUser()
        })
        .then(async ({ data }) => {
          this.searchObjRes = this.getResponse(data)
          if (this.searchObjRes.success) {
            const res =
              this.searchObjRes.data.GetReferAllToEngineer_InNidWorkItemResult
            if (res.fil_Info) {
              this.model.AllReferToEngineer = res.AllReferToEngineer
              this.model.fil_Info = res.fil_Info
              this.model.Fil_OwnerList = res.Fil_OwnerList
              this.model.ADPStudyFieldRelTable = res.ADPStudyFieldRelTable
              this.model.Eng_Info = res.Eng_Info
              if (this.model.fil_Info.IsFirefightingConfirmed) {
                this.showError(
                  "به دلیل تغییر گروه ساختمانی کسر سهمیه مجدد باید صورت گیرد."
                )
              }
              this.baseNosaziCode = convertStringToNosaziCodeObject(
                this.model.fil_Info.CodeString
              )
              await this.log({
                action: this.logActions.view,
                bizCode: this.UrbanNidKartablItem,
                bizCodeTitle: "UrbanNidKartablItem",
                saveDesc: `جستجو درخواست ارجاع کار برای کد ارجاع ${this.UrbanNidKartablItem}`,
                nosaziCode: this.model.fil_Info.CodeString,
                nidWorkItem: this.UrbanNidKartablItem
              })
            } else this.showError("اطلاعاتی با این کد یافت نشد.")
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

    checkExistOfFil () {
      // let tmpExtendedProp = TaskInfo.ExtendedProp.PropList.find(f => f.PropName === "IsBack");
      // let tmpNidFil = Getparameter("NidFil");
      const getEngineerDataCompleted = (argsSara) => {
        if (argsSara) {
          let tmpWorkflow = {
            StateName: "",
            WorkflowGuid: ziroGuid
          }
          if (this.model.ClsFil_Info.DtoWorkflowData) {
            tmpWorkflow.StateName =
              this.model.ClsFil_Info.DtoWorkflowData.StateName || ""
            tmpWorkflow.WorkflowGuid =
              this.model.ClsFil_Info.DtoWorkflowData.WorkflowGuid || ziroGuid
          }
          if (this.model.ClsFil_Info.Fil_Info.NIdFil === ziroGuid) {
            this.model.ClsFil_Info.Fil_Info.NIdFil =
              this.model.ClsFil_Info.Fil_Info.NIdFil
          }
          if (this.model.ClsFil_Info.NidFil_Info === ziroGuid) {
            this.model.ClsFil_Info.NidFil_Info =
              this.model.ClsFil_Info.Fil_Info.NIdFil
          }
          const payload = {
            pRequest: {
              ClsFil_Info: this.model.ClsFil_Info,
              CI_RequestType: this.model.ClsFil_Info.Fil_Info.CI_RequestType
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
          this.$services.engineers
            .saveFilInfo(payload)
            .then(({ data: args }) => {
              this.saveFilInfoRes = this.getResponse(args)
              if (this.saveFilInfoRes.success) {
                if (
                  this.saveFilInfoRes.data.SaveFilInfoResult.ClsFil_Info
                    .Fil_Info.CodeString
                ) {
                  this.baseNosaziCode =
                    this.saveFilInfoRes.data.SaveFilInfoResult.ClsFil_Info.Fil_Info.CodeString
                } else {
                  this.showError(
                    "مقدار برگشتی کد نوسازی (CodeString) در متد SaveFilInfo Null می باشد"
                  )
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
        }
      }
      this.getEngineerDataFrom_Sara8(getEngineerDataCompleted)
    },
    async getEngineerDataFrom_Sara8 (completed) {
      this.showLoading()
      if (this.model.ClsFil_Info === null) {
        this.model.ClsFil_Info = { ...defaultModel }
      }
      if (this.model.ClsFil_Info.Fil_Info.NIdFil === ziroGuid) {
        this.model.ClsFil_Info.Fil_Info.NIdFil = uid()
      }
      this.nidFil = this.model.ClsFil_Info.Fil_Info.NIdFil
      this.model.ClsFil_Info = { ...defaultModel.ClsFil_Info }
      this.model.ClsFil_Info.Fil_Info.SysCI_RequestBy = 1
      this.model.ClsFil_Info.Fil_Info.NidProc = this.model.fil_Info.NidProc
      this.model.ClsFil_Info.Fil_Info.NidWorkItem =
        this.model.fil_Info.NidWorkItem
      this.model.ClsFil_Info.Fil_Info.NIdFil = this.nidFil
      const payload = {
        pNidProc: this.model.fil_Info.NidProc || ziroGuid,
        pUser: pick(this.currentUser, [
          "UserGuid",
          "UserName",
          "JobLocationGuid",
          "JobLocationName"
        ]),
        pDtoWorkflowData: {
          StateName: "",
          WorkflowGuid: ziroGuid
        }
      }

      await this.$services.SC.calculateEngineer(payload, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          const calculateEngineerRes = this.getResponse(data)

          if (
            calculateEngineerRes.data?.ErrorResult?.BizErrors !== null &&
            calculateEngineerRes.data.ErrorResult.BizErrors.every(
              (a) => a.ErrorAction !== 0
            )
          ) {
            const dtoEng = calculateEngineerRes.data.DtoEngineer
            if (dtoEng != null) {
              if (this.model.ClsFil_Info.Fil_Info.NIdFil === ziroGuid) {
                this.model.ClsFil_Info.Fil_Info.NIdFil = uid()
              }

              if (dtoEng.Sh_RequestInfo !== null) {
                this.model.ClsFil_Info.Fil_Info.UrbanNidRequest = parseInt(
                  dtoEng.Sh_RequestInfo.NidWorkItem
                )
                this.model.ClsFil_Info.Fil_Info.UrbanNidKartablItem = parseInt(
                  dtoEng.Sh_RequestInfo.NidWorkItem
                )
                this.model.ClsFil_Info.Fil_Info.UrbanRequestType =
                  dtoEng.Sh_RequestInfo.WorkflowTitel
                this.model.ClsFil_Info.Fil_Info.RequestDate =
                  dtoEng.Sh_RequestInfo.RequestDate
              }

              this.model.ClsFil_Info.Fil_Info.CI_Years = this.getCurrentYear()
              this.model.ClsFil_Info.Fil_Info.Floor = parseInt(
                dtoEng.FloorCount
              )
              this.model.ClsFil_Info.Fil_Info.infrastructure = parseInt(
                dtoEng.InfrastructureArea
              )
              this.model.ClsFil_Info.Fil_Info.CI_SazehType = parseInt(
                dtoEng.CI_Sazeh
              )

              this.model.ClsFil_Info.Fil_Info.ZabeteType = dtoEng.ZabeteType
              this.model.ClsFil_Info.Fil_Info.ZabeteTypeID =
                dtoEng.ZabeteTypeID
              this.model.ClsFil_Info.Fil_Info.UnitNo = parseInt(
                dtoEng.UnitCount
              )
              this.model.ClsFil_Info.Fil_Info.CI_ConstructionStage = parseInt(
                dtoEng.CI_BuildingStep
              )
              this.model.ClsFil_Info.Fil_Info.CI_City = parseInt(
                dtoEng.CI_City
              )
              this.model.ClsFil_Info.Fil_Info.CI_UsingType = parseInt(
                dtoEng.CI_UsingGroup
              )

              let tmpHeight = "0"
              if (dtoEng.Height) {
                tmpHeight = dtoEng.Height.split(".")[0].trim()
              }

              this.model.ClsFil_Info.Fil_Info.Height = parseInt(tmpHeight)
              this.model.ClsFil_Info.Fil_Info.CI_UsingType = parseInt(
                dtoEng.CI_UsingGroup
              )
              this.model.ClsFil_Info.Fil_Info.CI_FilesType = parseInt(
                dtoEng.ParvandehType
              )

              this.model.ClsFil_Info.Fil_Info.Underground = dtoEng.Underground
              this.model.ClsFil_Info.Fil_Info.FileDate = dtoEng.FileDate
              this.model.ClsFil_Info.Fil_Info.MetrajMojaz = dtoEng.MetrajMojaz
              this.model.ClsFil_Info.Fil_Info.MetrajMojod = dtoEng.MetrajMojod

              this.model.ClsFil_Info.Fil_Info.ParvanehIdRef =
                dtoEng.ParvanehIdRef
              this.model.ClsFil_Info.Fil_Info.ParvanehMeterEdit = parseInt(
                dtoEng.ParvanehMeterEdit
              )

              this.model.ClsFil_Info.Fil_Info.MetrajGodBardari =
                dtoEng.MetrajGodBardari

              if (dtoEng.Base_RegisterPlack !== null) {
                this.model.ClsFil_Info.Fil_Info.RegisterPlack =
                  dtoEng.Base_RegisterPlack.sort((a, b) => {
                    if (a.Priority > b.Priority) return 1
                    if (a.Priority < b.Priority) return -1

                    return 0
                  })
                    .map((f) => f.RegisterPlackTypeValue)
                    .join("-")
              } else {
                this.hideLoading()
                this.showError("پلاک ثبتی وارد نشده است")
                completed(false)
              }

              this.model.ClsFil_Info.Fil_Info.StrNoTownDabir =
                dtoEng.SecretariatNo
              const nosaziObj = dtoEng.Base_NosaziCode
              if (nosaziObj !== null && nosaziObj.District !== 0) {
                this.model.ClsFil_Info.Fil_Info.CI_Region = nosaziObj.District
                this.model.ClsFil_Info.Fil_Info.District = nosaziObj.District
                this.model.ClsFil_Info.Fil_Info.Region = nosaziObj.Region
                this.model.ClsFil_Info.Fil_Info.Block = nosaziObj.Block
                this.model.ClsFil_Info.Fil_Info.House = nosaziObj.House
                this.model.ClsFil_Info.Fil_Info.Building = nosaziObj.Building
                this.model.ClsFil_Info.Fil_Info.Apartment = nosaziObj.Apartment
                this.model.ClsFil_Info.Fil_Info.Shop = nosaziObj.Shop
                this.model.ClsFil_Info.Fil_Info.CodeString =
                  convertNosaziCodeObjectToString(nosaziObj)
              } else {
                let tmpBizCode = this.convertToNosaziCodeString(
                  this.selectedNosaziCode
                )

                if (tmpBizCode) {
                  this.model.ClsFil_Info.Fil_Info.District = parseFloat(
                    tmpBizCode.split("-")[0]
                  )
                  this.model.ClsFil_Info.Fil_Info.Region = parseFloat(
                    tmpBizCode.split("-")[1]
                  )
                  this.model.ClsFil_Info.Fil_Info.Block = parseFloat(
                    tmpBizCode.split("-")[2]
                  )
                  this.model.ClsFil_Info.Fil_Info.House = parseFloat(
                    tmpBizCode.split("-")[3]
                  )
                  this.model.ClsFil_Info.Fil_Info.Building = parseFloat(
                    tmpBizCode.split("-")[4]
                  )
                  this.model.ClsFil_Info.Fil_Info.Apartment = parseFloat(
                    tmpBizCode.split("-")[5]
                  )
                  this.model.ClsFil_Info.Fil_Info.Shop = parseFloat(
                    tmpBizCode.split("-")[6]
                  )

                  this.model.ClsFil_Info.Fil_Info.CodeString = tmpBizCode
                }
              }

              if (dtoEng.Base_Owner !== null) {
                this.model.ClsFil_Info.Fil_Owner = dtoEng.Base_Owner.map(
                  (f) => {
                    return {
                      Address: f.Address,
                      Family: f.OwnerLastName,
                      Name: f.OwnerName,
                      Tel: f.CellPhone
                      // NIdFil : newNidFil,
                      // NIdOwner : uid().toUpperCase(),
                      // NIdOwner_tmp : 0
                    }
                  }
                )
              } else {
                this.hideLoading()
                this.showError("اطلاعات مالک وارد نشده است")
                completed(false)
              }

              if (dtoEng.UsingList !== null) {
                this.model.ClsFil_Info.Fil_Floors = dtoEng.UsingList.map(
                  (f) => {
                    return {
                      BuildingStepID: f.BuildingStepID,
                      BuildingStepTitle: f.BuildingStepTitle,
                      CI_SazehType: parseInt(f.CI_SazehType),
                      FloorNo: parseInt(f.FloorNo),
                      infrastructure: f.Infrastructure,
                      // NIdFil: Guid.Parse(TmpNidFil),
                      NIdFloor: uid(),
                      UsingID: f.UsingID,
                      UsingTitle: f.UsingTitle
                    }
                  }
                )
              }

              if (this.model.fil_Info == null) {
                this.model.fil_Info = { ...defaultModel.Fil_Info }
              }

              this.model.fil_Info = this.model.ClsFil_Info.Fil_Info
              this.model.NidFil = this.model.ClsFil_Info.Fil_Info.NIdFil

              completed(true)
            } else {
              this.hideLoading()
              completed(false)
              this.showError("اطلاعاتی از شهرسازی یافت نشد")
            }
          } else {
            this.hideLoading()
            completed(false)
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    selectedEng ({ data }) {
      this.selectedNIdEng = data
    },
    normalizeSaveModel () {
      const abilityObj = this.abilityOptions.find((f) => f.ID === this.ability)
      if (abilityObj) {
        let year = this.getCurrentYear()
        if (abilityObj.ID !== 1) {
          this.model.ClsRef_InfoToEngineer.DontCheck = true
          let tmp = this.model.AllReferToEngineer.find(
            (p) =>
              p.CI_Years === year &&
              p.NIdEng === this.getNidUser() &&
              p.CI_Ability === abilityObj.ID
          )
          // let tmp = null
          this.model.ClsRef_InfoToEngineer.CorrectionalArea = 0

          // اگر رکورد در سال جاری موجود نبود پس باید متراژ مابه تفاوت به عنوان رکورد جدید ذخیره شود
          if (tmp == null) {
            // اطلاعات سال قبلی
            tmp = this.model.AllReferToEngineer.find(
              (p) =>
                p.CI_Years === year - 1 &&
                p.NIdEng === this.getNidUser() &&
                p.CI_Ability === abilityObj.ID
            )

            if (tmp == null) {
              // اطلاعات مربوط به هر سالی
              tmp = this.model.AllReferToEngineer.find(
                (p) =>
                  p.NIdEng === this.getNidUser() &&
                  p.CI_Ability === abilityObj.ID
              )
            }

            // اگر یک مهندس دیگر کار را انجام داده بود و الان متراژ تغییر کرد، باید مابقی متراژ به این مهندس برسد
            if (tmp == null) {
              let OtherMeter = this.model.AllReferToEngineer.filter(
                (p) =>
                  p.CI_Ability === abilityObj.ID &&
                  p.CI_CancelType === 0 /* کنسل نکرده */ &&
                  p.NIdEng !== this.getNidUser() &&
                  p.CI_StudyField ===
                    this.model.ADPStudyFieldRelTable.CI_StudyField
              )
              // let sum = 0
              // OtherMeter.forEach((row) => {
              //   sum = OtherMeter.Sum((p) => p.Metraj ?? 0)
              // })
              const sum = OtherMeter.reduce((accumulator, object) => {
                return accumulator + object.Metraj
              }, 0)

              this.model.ClsRef_InfoToEngineer.Ref_Info.ReferedMeter -= sum
            }

            if (tmp != null) {
              // ممکن است کلا اطلاعات موجود نباشد پس کلا ویرایشی در کار نیست
              this.model.ClsRef_InfoToEngineer.Ref_Info.ReferedMeter -=
                tmp.Metraj
            }

            // در درصد هم ضرب شود
            this.model.ClsRef_InfoToEngineer.CorrectionalArea =
              this.model.ClsRef_InfoToEngineer.Ref_Info.ReferedMeter ?? 0
          } else {
            // اگر در این سال موجود بود ممکن است در سالهای قبل هم موجود باشه که فقط باید مابه تفاوت سال جدید آپدیت شود
            let old = this.model.AllReferToEngineer.filter(
              (p) =>
                p.CI_Years !== year &&
                p.NIdEng === this.getNidUser() &&
                p.CI_Ability === abilityObj.ID
            )

            let sum = 0
            if (old != null && old.length > 0) {
              sum = old.reduce((a, b) => a + b.Metraj || 0, 0)
            }
            console.log("sum", sum)
            this.model.ClsRef_InfoToEngineer.Ref_Info.ReferedMeter -= sum

            this.model.ClsRef_InfoToEngineer.Ref_Info.NIdRef = tmp.NIdRef
            this.model.ClsRef_InfoToEngineer.NIdRef = tmp.NIdRef
            // this.model.ClsRef_InfoToEngineer.Qta_Info.NIdQta = tmp.nidq;
            this.model.ClsRef_InfoToEngineer.CorrectionalArea =
              this.model.ClsRef_InfoToEngineer.Ref_Info.ReferedMeter -
                tmp.Metraj ?? 0
          }
        }

        if (abilityObj.ID !== null) {
          this.model.ClsRef_InfoToEngineer.Ref_Info.CI_Ability = abilityObj.ID
        }
        // if (!string.IsNullOrWhiteSpace(TxtMetraj.Text))
        // {
        //    CalculatePercent();
        // }

        this.model.ClsRef_InfoToEngineer.Ref_Info.CI_Ability = abilityObj.ID

        if (this.model.NIdMem != null && this.model.NIdMem !== ziroGuid) {
          this.model.ClsRef_InfoToEngineer.Ref_Info.NIdMem = this.model.NIdMem
        }

        if (
          this.model.ClsRef_InfoToEngineer.CorrectionalArea !== null &&
          this.model.ClsRef_InfoToEngineer.CorrectionalArea !== 0
        ) {
          this.model.ClsRef_InfoToEngineer.Ref_Info.ReferDate = currentDate()
          // this.model.ClsRef_InfoToEngineer.Qta_Info.ConfirmDate = currentDate()
          this.model.ClsRef_InfoToEngineer.Qta_Info.StrDate = currentDate()
          this.model.ClsRef_InfoToEngineer.Qta_Info.StrTime = currentTime()
        }

        if (this.model.ClsRef_InfoToEngineer.DontCheck) {
          this.model.ClsRef_InfoToEngineer.Qta_Info.CreditValue =
            this.model.ClsRef_InfoToEngineer.Ref_Info.ReferedMeter * -1
        }

        if (!this.model.fil_Info) {
          this.showError("اطلاعات پرونده یافت نشد.")
          return false
        }
        this.model.ClsRef_InfoToEngineer.Ref_Info.NIdFil =
          this.model.fil_Info.NIdFil

        this.model.ClsRef_InfoToEngineer.Qta_Info.CI_Base =
          this.model.ClsRef_InfoToEngineer.Ref_Info.CI_Base

        // this.model.ClsRef_InfoToEngineer.Qta_Info.ConfirmDate =
        //   this.model.ClsRef_InfoToEngineer.Ref_Info.DateOfRefrence
        this.model.ClsRef_InfoToEngineer.Qta_Info.ConfirmDate = currentDate()

        this.model.ClsRef_InfoToEngineer.Qta_Info.CI_Years =
          this.model.ClsRef_InfoToEngineer.Ref_Info.CI_Years

        this.model.ClsRef_InfoToEngineer.Qta_Info.CI_StudyField =
          this.studyFieldsOptions.find((f) => f.ID === abilityObj.ID)
            ? this.studyFieldsOptions.find((f) => f.ID === abilityObj.ID).ID
            : this.studyFields

        this.model.ClsRef_InfoToEngineer.Qta_Info.NIdEng =
          this.model.ClsRef_InfoToEngineer.Ref_Info.NIdEng
        this.model.ClsRef_InfoToEngineer.Qta_Info.NIdRef =
          this.model.ClsRef_InfoToEngineer.Ref_Info.NIdRef

        this.model.ClsRef_InfoToEngineer.Qta_Info.QtaComments = `ارجاع پرونده به شماره ${this.model.fil_Info.NidWorkItem} سال ${this.model.ClsRef_InfoToEngineer.Ref_Info.CI_Years}`
        this.model.ClsRef_InfoToEngineer.Qta_Info.LetterNo = ""
        this.model.ClsRef_InfoToEngineer.Qta_Info.SysCI_QuotaType = 1
        this.model.ClsRef_InfoToEngineer.Qta_Info.CI_Ability =
          this.model.ClsRef_InfoToEngineer.Ref_Info.CI_Ability

        if (!this.model.ClsRef_InfoToEngineer.Ref_Info.IsSwitchEngineer) {
          this.model.ClsRef_InfoToEngineer.Ref_Info.SwitchEngineerDate = ""
        }
      }
      this.model.ClsRef_InfoToEngineer.ReferType = 2
      this.model.ClsRef_InfoToEngineer.MetrajGodbardari =
        this.model.fil_Info.MetrajGodBardari ?? 0
    },
    async saveObj () {
      try {
        // if (!this.selectedNIdEng) {
        //   return this.showError("لطفا مهندس مورد نظر را انتخاب نمایید")
        // }
        if (this.model.fil_Info == null) {
          this.showError('اطلاعات پرونده یافت نشد.')
          return
        }
        this.normalizeSaveModel()

        const payload = {
          pRequest: {
            Fil_OwnerList: this.model.Fil_OwnerList ?? [],
            AllReferToEngineer: this.model.AllReferToEngineer ?? [],
            NidFil: this.model.fil_Info?.NIdFil || ziroGuid,
            fil_Info: this.model.fil_Info,
            ADPStudyFieldRelTable: this.model.ADPStudyFieldRelTable,
            Eng_Info: this.model.Eng_Info,
            ClsRef_InfoToEngineer: this.model.ClsRef_InfoToEngineer,
            UserGUID: this.getNidUser()
          },
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: ziroGuid
          }
        }
        this.showLoading()
        const { data } = await this.$services.engineers.referFilToEngineer(
          payload
        )
        this.referFilToEngineerRes = this.getResponse(data)
        if (this.referFilToEngineerRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.UrbanNidKartablItem,
            bizCodeTitle: "UrbanNidKartablItem",
            saveDesc: `
            درخواست ارجاع کار برای کد ارجاع ${this.UrbanNidKartablItem}

            ${this.model.ClsRef_InfoToEngineer.Qta_Info.QtaComments}
            `,
            nosaziCode: this.model.fil_Info.CodeString,
            nidWorkItem: this.UrbanNidKartablItem
          })
          this.serachObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.isEditable = false
        this.hideLoading()
      }
    },

    getCurrentYear () {
      return new PersianDate().toCalendar("persian").year()
    }
  }
}
</script>
