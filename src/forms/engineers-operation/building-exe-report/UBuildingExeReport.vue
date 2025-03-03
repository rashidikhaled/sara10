<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="543f8a9b-107f-66fc-3367-7747df03a744"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes"/>
        <safa-status :result="getBuildingExecRepCommentsListRes"/>
        <safa-status :result="supervisorConfirmRes"/>
        <safa-status :result="sendBuildingExecRepRes"/>
        <safa-status :result="confirmBuildingExecReportRes"/>
        <safa-status :result="resLoadCoordinator"/>
        <safa-status :result="saveBuldingExeReportRes"/>
        <safa-status :result="saveBuildingExecRepCommentsRes"/>
        <safa-status :result="InsertFileRes"/>
      </template>
      <fit>
        <safa-tabs v-model="currentTab">
          <template #tabs>
            <tab-menu name="buildingExeReport" label="گزارش مرحله ای"/>
            <tab-menu name="tableReports" label="گزارش جدولی"/>
            <tab-menu name="descriptionList" label="لیست توضیحات"/>
            <tab-menu name="newDescription" label="توضیحات جدید"/>
          </template>
          <tab-content name="buildingExeReport">
            <BuildingExeReport
              @loadData="loadObj"
              v-model="model"
              :NIdFil="NIdFil"
              :NIdEng="NIdEng"
              :CIExecLevelList="CI_ExecLevel_List"
              :m="mode"
              ref="buildingExeReportRef"
            />
          </tab-content>
          <tab-content name="tableReports">
            <TableReports v-model="model.ClsBuildingExeReport" :m="mode"/>
          </tab-content>
          <tab-content name="descriptionList">
            <DescriptionList v-model="commentsList"/>
          </tab-content>
          <tab-content name="newDescription">
            <NewDescription v-model="nidBuildingExecRep" @submition="submition"/>
          </tab-content>
        </safa-tabs>
        <ImageUploader
          v-show="false"
          title=""
          accept=".png,.jpeg,.jpg"
          :maxFileSize="0.4"
          v-model="image"
          ref="imageUploader"
          m="e"
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template #after>
            <btn-default label="گزارش" v-if="!isEditable" @click="report"/>
            <btn-default label="بارگذاری فایل" @click="uploadFile"/>
            <btn-default label="تایید" @click="confirm"/>
            <btn-default
              label="ارسال گزارش"
              v-if="!isEditable"
              @click="acceptReports"
            />
            <btn-default label="سوابق" @click="historyReport"/>
            <safa-securityPanel
              caption="تایید ناظر هماهنگ کننده"
              id="b1f35c02-2283-4905-b384-f0d3b99a3a7a"
            >
              <btn-default
                label="تایید ناظر هماهنگ کننده"
                @click="supervisorConfirm"
              />
            </safa-securityPanel>
            <btn-default label="نمایش فایل" @click="openArchive"/>

            <div
              class="q-gutter-sm flex justify-end items-center"
              style="width: 100%"
            >
              <span v-if="successToReport === true" style="color: green"
              >ارسال گزارش انجام گردید.&nbsp;<q-icon
                color="green"
                name="check_circle"
                size="sm"
              /></span>
              <span v-if="successToReport === false" style="color: red"
              >ارسال گزارش با خطا مواجه شد.&nbsp;<q-icon
                color="red"
                name="error"
                size="sm"
              /></span>
            </div>
          </template>
        </form-actions>
      </template>
      <!-- فقط به خاطر گرفتن توکن موقت این بخش رو گذاشتم تا به نتیجه برسیم -->

    </form-wrapper>

    <safa-popup
      v-model="showReportModal"
      title="سوابق"
      height="400px"
      width="800px"
    >
      <ReportFileHistory
        :showreportList="showreportList"
        :model="model"
        :NIdFil="NIdFil"
        :NIdEng="NIdEng"
        :name="name"
        :title="title"
        :formKey="formKey"
      />
    </safa-popup>
    <safa-popup
      v-model="showArchive"
      title="آپلود تصویر"
      height="400px"
      width="800px"
    >
      <UploadBuildingExeReportImage :archiveBizCode="archiveBizCode"/>
    </safa-popup>
    <safa-popup
      v-model="showSaveMissionStart"
      title="ثبت تاریخ شروع عملیات"
      height="400px"
      width="800px"
    >
      <USaveMissionStart :pNidFil="NIdFil"/>
    </safa-popup>
    <safa-popup
      v-model="showInsertArchive"
      title="بارگزاری فایل"
      height="800px"
      width="900px"
    >
      <InsertArchive :archiveBizCode="archiveBizCode"/>
    </safa-popup>
  </safa-form>
</template>

<script>
// import USaveMissionStart from "../../engineers-operation/USaveMissionStart/USaveMissionStart.vue"
import TableReports from "./partials/TableReports"
import NewDescription from "./partials/NewDescription"
import DescriptionList from "./partials/DescriptionList"
import BuildingExeReport from "./partials/BuildingExeReport"
import ReportFileHistory from "./partials/ReportFileHistory"
import UploadBuildingExeReportImage from "./partials/UploadBuildingExeReportImage"
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"
// import { StringHelper } from 'ui-security'
import InsertArchive from "./partials/InsertArchive"

export default {
  components: {
    TableReports,
    NewDescription,
    DescriptionList,
    BuildingExeReport,
    ReportFileHistory,

    UploadBuildingExeReportImage,
    InsertArchive
  },
  mixins: [baseFormMixin, kartableReferencesMixin],
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveEngineer')
    }
  },
  data () {
    return {
      name: "UBuildingExeReport",
      title: "گزارشات مرحله ای",
      formKey: "315E26CF-13E2-42B9-961E-F7B3238D8EA8",
      main: true,

      // #region service
      loadObjRes: null,
      getBuildingExecRepCommentsListRes: null,
      getBuldingExeReport: null,
      confirmBuildingExecReportRes: null,
      sendBuildingExecRepRes: null,
      supervisorConfirmRes: null,
      resLoadCoordinator: null,
      saveBuldingExeReportRes: null,
      saveBuildingExecRepCommentsRes: null,
      InsertFileRes: null,
      baseLibResults: null,

      // #region variables
      isView: false,
      buildingExecRepIsSave: false,
      CI_ExecLevel_List: [],
      currentTab: "buildingExeReport",
      showReportModal: false,
      showSaveMissionStart: false,
      showArchive: false,
      showInsertArchive: false,
      NIdFil: "",
      NIdEng: "",
      nidBuildingExecRep: "",
      NIDProc: "",
      archiveBizCode: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        fil_Info: {
          NidWorkItem: null,
          Floor: null,
          RegisterPlack: "",
          infrastructure: null,
          CodeString: null
        },
        Fil_Owner: {
          Address: "",
          Family: "",
          NIdFil: "00000000-0000-0000-0000-000000000000",
          NIdOwner: "00000000-0000-0000-0000-000000000000",
          NIdOwner_tmp: 0,
          Name: "",
          Tel: ""
        },
        ClsBuildingExeReport: {
          BuildingExecRep_Info_Main: {
            AcceptDate: null,
            AcceptTime: null,
            ArchiveNidFile: null,
            BuildingExecDate: null,
            BuildingExecRepComments: null,
            BuildingExecTime: null,
            CI_ExecFloor: null,
            CI_ExecLevel: null,
            CI_ExecSendStatus: null,
            CI_InfringementResult: null,
            CI_Years: null,
            ChangeStatusDate: null,
            ChangeStatusTime: null,
            ChangeStatusUserId: null,
            ChangeStatusUserName: null,
            EumReportStatus: null,
            IsObservedBuilding: null,
            IsReportable: null,
            NIdBuildingExecRep: "00000000-0000-0000-0000-000000000000",
            NIdEng: "00000000-0000-0000-0000-000000000000",
            NIdEng2: null,
            NIdEng_Accept: null,
            NIdEng_Revoke: null,
            NIdFil: "00000000-0000-0000-0000-000000000000",
            OkDate: null,
            OkTime: null,
            RevisitExecDate: null,
            RevokeDate: null,
            RevokeTime: null,
            SecretariatDate: null,
            SecretariatNo: null,
            SendCount: null,
            SerialID: null
          },
          BuildingExecRep_Detail_Main: [],
          BuildingExecRep_FormOperation_Floors_Main: [],
          BuildingExecRep_FormOperation_Main: {
            CI_BuildingExecRep_FormOperation_Cause: 0,
            RequiredParkingCount: 0,
            SuppliedParkingCount: 0,
            SuppliedParkingLocation: 0,
            IsObservedAllowedLength: false,
            IsObservedNeighbourView: false,
            IsObservedRule: false,
            Comments: ""
          }
        }
      },
      image: null,
      commentsList: [],
      showreportList: {},
      successToReport: null
    }
  },
  async created () {
    if (this.selectedExecRep) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedExecRep.CodeString
      )
      await this.$store.dispatch("engineerOperation/fetchEngineersReports", {})
      await this.loadKartableInf()
      await this.getBaseLib()
    } else {
      this.showError("لطفا یک سطر از کارتابل ارجاعات انتخاب نمایید.")
      this.hideSidebar("UBuildingExeReport")
      this.redirectToKartableReferences()
    }
  },
  methods: {
    async getBaseLib () {
      this.showLoading()
      const payload = {
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

      this.$services.SA.getBaseLibInNosaziCode(payload, this.config)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.baseLibResults = this.loadObjRes.data
            if (this.baseLibResults.ArchiveWrapper) {
              this.showArchive = true
              this.updateArchiveBizCode(
                this.baseLibResults.ArchiveWrapper.BizCode
              )
            } else this.showArchive = false
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

    async loadObj () {
      try {
        if (this.NIdFil === "00000000-0000-0000-0000-000000000000") {
          this.showError("لطفا ابتدا یک مورد از کارتابل ارجاعات انتخاب کنید.")
          return
        }
        const payload = {
          pNidFil: this.NIdFil,
          pNidEngineer: this.NIdEng,
          pExecFloor:
            this.$refs.buildingExeReportRef?.selectedCI_ExecFloor ?? 0,
          pExecLevel: this.$refs.buildingExeReportRef?.selectedComboLevel ?? 0,
          pUser: this.getNidUser(),
          SaveViolation: false
        }

        this.showLoading()
        const { data } = await this.$services.engineers.getBuldingExeReport(
          payload
        )

        this.loadObjRes = this.getResponse(data)
        const res = this.loadObjRes.data?.GetBuldingExeReportResult

        const clsBuilExeRep =
          this.loadObjRes.data?.GetBuldingExeReportResult
            ?.ClsBuildingExeReport ?? null

        if (this.loadObjRes.success && clsBuilExeRep !== null) {
          this.$nextTick(async () => {
            this.CI_ExecLevel_List = clsBuilExeRep.CI_ExecLevel_List.filter(
              (f) => f.ID !== 254 && f.ID !== 255
            )
            this.model = { ...res }
            this.nidBuildingExecRep =
              clsBuilExeRep.BuildingExecRep_Info_Main.NIdBuildingExecRep

            this.$forceUpdate()
            this.getBuilExecRepComList()
            if (!clsBuilExeRep.IsAllowReport) {
              this.showError("مجوز صادر نشده")
              return
            }
            if (
              (res.Fil_Operation.Fil_Operation.NIdFil == null ||
                res.Fil_Operation.Fil_Operation.NIdFil ===
                "00000000-0000-0000-0000-000000000000") &&
              clsBuilExeRep.IsAllowReport
            ) {
              this.showSaveMissionStart = true
              this.NIDProc = clsBuilExeRep._NidProc
            }
            this.model.ClsBuildingExeReport.BuildingExecRep_Detail_Main =
              clsBuilExeRep?.BuildingExecRep_Detail_Main?.filter(
                (x) =>
                  x.CI_ExecLevel ===
                  this.$refs.buildingExeReportRef?.selectedComboLevel
              ) ?? []
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedExecRep.CodeString ?? "",
                bizCodeTitle: "CodeString",
                nosaziCode: this.selectedExecRep.CodeString ?? "",
                nidWorkItem: this.selectedExecRep.NidWorkItem ?? "",
                saveDesc: `عملیات نمایش اطلاعات برای شماره ارجاع ${
                  this.selectedExecRep.NidWorkItem ?? ""
                } با موفقیت انجام شد.`
              })
            }
            this.isView = true
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    saveObj () {
      // if (this.$refs.buildingExeReportRef.selectedComboLevel === null) {
      //   this.showError("لطفا مرحله گزارش را انتخاب نمایید.")
      //   return
      // }
      this.showLoading()
      this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.CI_ExecLevel =
        this.$refs.buildingExeReportRef.selectedComboLevel // base on xaml
      this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.CI_ExecFloor =
        this.$refs.buildingExeReportRef.selectedCI_ExecFloor // base on xaml
      this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.NIdEng =
        this.getNidUser()
      this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.NIdEng2 =
        this.getNidUser()
      // let tempBuildingExecRepDetailMain = this.model.ClsBuildingExeReport.BuildingExecRep_Detail_Main.filter(f => f.CI_ExecStatus !== 0)
      this.model.ClsBuildingExeReport.NidEng = this.getNidUser()
      this.$services.engineers
        .saveBuldingExeReport({
          pRequest: {
            CI_RequestType: 0,
            CI_Years: 0,
            pExecFloor: this.$refs.buildingExeReportRef.selectedCI_ExecFloor,
            pExecLevel: this.$refs.buildingExeReportRef.selectedComboLevel,
            pUser: this.getNidUser(),
            ClsBuildingExeReport: {
              ...this.model.ClsBuildingExeReport
              // BuildingExecRep_Detail_Main: tempBuildingExecRepDetailMain
            }
          }
        })
        .then(async (data) => {
          this.saveBuldingExeReportRes = this.getResponse(data)
          if (this.saveBuldingExeReportRes.success) {
            this.isEditable = false
            this.buildingExecRepIsSave = true
            this.showSuccess("عملیات ذخیره گزارش مرحله ای  با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedExecRep.CodeString ?? "",
              bizCodeTitle: "CodeString",
              nosaziCode: this.selectedExecRep.CodeString ?? "",
              nidWorkItem: this.selectedExecRep.NidWorkItem ?? "",
              saveDesc: `عملیات ذخیره برای شماره ارجاع ${
                this.selectedExecRep.NidWorkItem ?? ""
              } با موفقیت انجام شد.`
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
    async loadKartableInf () {
      this.NIdFil = this.selectedExecRep.NIdFil
      this.NIdEng = this.getNidUser()
      await this.loadObj()
      // this.showLoading()
      // const payload = { pNidRef: this.selectedNidRef }
      // this.$services.engineers
      //   .loadCoordinator(payload)
      //   .then(({ data }) => {
      //     const resLoadCoordinator = this.getResponse(data)
      //     if (resLoadCoordinator.success) {
      //       const inf = resLoadCoordinator.data.LoadCoordinatorResult.Ref_Info
      //       this.NIdFil = inf.NIdFil
      //       this.NIdEng = inf.NIdEng
      //       this.loadObj()
      //     }
      //   })
      //   .catch((e) => {
      //     console.error(e)
      //   })
      //   .finally(() => {
      //     this.hideLoading()
      //   })
    },
    async getBuilExecRepComList () {
      if (!this.nidBuildingExecRep) return
      this.showLoading()
      const payload = {
        pNIdBuildingExecRep: this.nidBuildingExecRep
      }
      try {
        const { data } = await this.$services.engineers.getBuildingExecRepCommentsList(payload)
        this.getBuildingExecRepCommentsListRes = this.getResponse(data)
        if (this.getBuildingExecRepCommentsListRes.success) {
          this.commentsList =
            this.getBuildingExecRepCommentsListRes.data
              ?.GetBuildingExecRepComments_ListResult
              ?.BuildingExecRepComments_List ?? []
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async report () {
      if (this.getReports !== null && this.getReports.length > 0) {
        let tmpReport = this.getReports.find(
          (f) => f.ReportName === "RptBuildingExecRep"
        )
        if (tmpReport == null) {
          this.showError("گزارش مورد نظر یافت نشد.")
          return
        }
        // const reportPath = `${tmpReport.ReportPath}`
        const reportPath = `${window.getConfigValue('engineersConfig.reportPath')}/RptBuildingExecRep`
        const queryParams = {
          NIdBuildingExecRep:
          this.model.ClsBuildingExeReport._NIdBuildingExecRep,
          UserName: this.getUserDisplayName()
          // NIdUser: this.getNidUser(),
        }

        this.showReport(reportPath, queryParams)
        await this.log({
          action: this.logActions.printReport,
          bizCode: this.NIdFil,
          bizCodeTitle: "NIdFil",
          nosaziCode: this.selectedExecRep.CodeString,
          nidWorkItem: this.selectedExecRep.NidWorkItem ?? "",
          saveDesc: `عملیات چاپ گزارش برای شماره ارجاع ${
            this.selectedExecRep.NidWorkItem ?? ""
          } با موفقیت انجام شد.`
        })
      } else {
        this.showError("گزارش مورد نظر تعریف نشده است")
      }
    },
    acceptReports () {
      this.showLoading()
      this.$services.engineers
        .sendBuildingExecRep({
          pNIdBuildingExecRep:
          this.model.ClsBuildingExeReport._NIdBuildingExecRep,
          pNidBuildingReportFormFloors: "00000000-0000-0000-0000-000000000000",
          pNidEng2: this.NIdEng
        })
        .then(async ({ data }) => {
          this.sendBuildingExecRepRes = this.getResponse(data)
          if (this.sendBuildingExecRepRes.success) {
            this.showSuccess(
              `عملیات ارسال گزارش برای شماره ارجاع ${
                this.selectedExecRep.NidWorkItem ?? ""
              } با موفقیت انجام شد.`
            )
            await this.log({
              action: this.logActions.send,
              bizCode: this.NIdFil,
              bizCodeTitle: "NIdFil",
              nosaziCode: this.selectedExecRep.CodeString,
              nidWorkItem: this.selectedExecRep.NidWorkItem ?? "",
              saveDesc: `عملیات ارسال گزارش برای شماره ارجاع ${
                this.selectedExecRep.NidWorkItem ?? ""
              } با موفقیت انجام شد.`
            })
            this.successToReport = true
          } else {
            this.successToReport = false
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    supervisorConfirm () {
      this.showLoading()
      let payload = {
        pNidFil: this.NIdFil
      }
      this.$services.engineers
        .setCompleteAndConfirmBuildingExecRep(payload)
        .then(async ({ data }) => {
          this.supervisorConfirmRes = this.getResponse(data)
          if (this.supervisorConfirmRes.success) {
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.NIdFil,
              bizCodeTitle: "NIdFil",
              nosaziCode: this.selectedExecRep.CodeString,
              nidWorkItem: this.selectedExecRep.NidWorkItem ?? "",
              saveDesc: `عملیات تایید ناظر هماهنگ کننده برای شماره ارجاع ${
                this.selectedExecRep.NidWorkItem ?? ""
              } با موفقیت انجام شد.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    confirm () {
      if (!this.buildingExecRepIsSave) {
        return this.showError("لطفا ابتدا عملیات ذخیره را انجام دهید.")
      }
      const payload = {
        pCodeString: convertNosaziCodeObjectToString(this.baseNosaziCode),
        pConfirmType: 0,
        pNidBuildingExecRep_Info_Main: this.nidBuildingExecRep,
        pNidEng: this.NIdEng,
        pNidFil: this.NIdFil
      }
      this.showLoading()
      this.$services.engineers
        .confirmBuildingExecReport(payload)
        .then(async ({ data }) => {
          this.confirmBuildingExecReportRes = this.getResponse(data)
          if (this.confirmBuildingExecReportRes.success) {
            const res =
              this.confirmBuildingExecReportRes.data
                .ConfirmBuildingExecReportResult
            console.log("res :>> ", res)
            this.showSuccess("عملیات تایید با موفقیت انجام شد")
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.NIdFil,
              bizCodeTitle: "NIdFil",
              nosaziCode: this.selectedExecRep.CodeString,
              nidWorkItem: this.selectedExecRep.NidWorkItem ?? "",
              saveDesc: `عملیات تایید برای شماره ارجاع ${
                this.selectedExecRep.NidWorkItem ?? ""
              } با موفقیت انجام شد.`
            })
            this.getBuilExecRepComList()
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

    async uploadFile () {
      this.showInsertArchive = true
      // this.$refs.imageUploader.uploadFile()
      // const oldCode = this.oldBizCode ?? ""
      // const newCode = this.getBaseLibResult?.ArchiveWrapper?.BizCode ?? ""
      // try {
      //   const BizCode = oldCode,
      //     DestBizCode = newCode
      //   this.showLoading()
      //   // eslint-disable-next-line no-undef
      //   const archiveAuth = archiveStore.archiveToken // by first login *resolve : #1798

      //   const url = `${this.$store.getters["archiveApi/baseUrl"]}Archive/InsertFile`
      //   const body = {
      //     pdata1: new StringHelper().convert({ BizCode, DestBizCode })
      //   }
      //   // const body = JSON.stringify({ BizCode, DestBizCode })
      //   const headers = new Headers()
      //   headers.append("Content-Type", "application/json")
      //   headers.append("Authorization", archiveAuth)
      //   const result = await fetch(url, {
      //     method: "POST",
      //     body: JSON.stringify(body),
      //     headers
      //   })
      //   const res = await result.json()
      //   if (res.success) {
      //     this.InsertFileRes = this.getResponse(res.data)
      //     if (this.InsertFileRes.success) {
      //       this.showError("عملیات انتقال آرشیو با موفقیت انجام گردید.")
      //       const strNosazi =
      //           convertNosaziCodeObjectToString(this.baseNosaziCode) ?? ""
      //       await this.log({
      //         action: this.logActions.transfer,
      //         bizCode: BizCode,
      //         bizCodeTitle: "BizCode",
      //         bizCodeArchive: DestBizCode ?? "",
      //         nosaziCode: strNosazi,
      //         saveDesc: `عملیات انتقال آرشیو برای ${strNosazi.split("-").reverse().join("-") ?? ''} با موفقیت انجام گردید`
      //       })
      //       this.$emit("hide")
      //       this.$emit("transfer")
      //     }
      //   } else {
      //     await this.$store.dispatch(
      //       "archiveApi/resetToken",
      //       this.archiveConfig
      //     )
      //     this.showError(res.errors[0].message)
      //   }
      // } catch (e) {
      //   console.error(e)
      //   this.serverError()
      // } finally {
      //   this.hideLoading()
      // }
    },
    openArchive () {
      this.showArchive = true
    },
    historyReport () {
      this.showReportModal = true
      this.showreportList = "showreportList"
    },
    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    },
    submition (newComment) {
      const payload = {
        pBuildingExecRepComments: {
          Comments: newComment,
          CommentsNidUser: this.getNidUser(),
          CommentsUserName: this.getUserDisplayName(),
          NIdBuildingExecRep: this.nidBuildingExecRep,
          NIdBuildingRepComments: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.showLoading()
      this.$services.engineers
        .saveBuildingExecRepComments(payload)
        .then(async ({ data }) => {
          this.saveBuildingExecRepCommentsRes = this.getResponse(data)
          if (this.saveBuildingExecRepCommentsRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.nidBuildingExecRep,
              bizCodeTitle: "NIdBuildingExecRep",
              nosaziCode: this.selectedExecRep.CodeString ?? "",
              nidWorkItem: this.selectedExecRep.NidWorkItem ?? "",
              saveDesc: `عملیات ثبت توضیحات جدید برای شماره ارجاع ${
                this.selectedExecRep.NidWorkItem ?? ""
              } با موفقیت انجام شد.`
            })
            this.getBuilExecRepComList()
            this.currentTab = "descriptionList"
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
  },
  watch: {
    image () {
      if (this.image !== null) {
        return this.showSuccess("فایل با موفقیت آپلود شد.")
      }
    }
  }
}
</script>
