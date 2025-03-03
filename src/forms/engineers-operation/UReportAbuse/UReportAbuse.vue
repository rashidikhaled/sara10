<template>
  <safa-form
    appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getBuldingExeReportRes" />
        <safa-status :result="saveBuldingExeReportRes" />
        <safa-status :result="confirmBuildingExecReportRes" />
        <safa-status :result="createInstanceRes" />
        <safa-status :result="getBaseLibInNosaziCodeRes" />
        <safa-status :result="saveRequestInfoRes" />
        <safa-status :result="updateLastRequestRes" />
      </template>
      <fit>
        <safa-tabs v-model="currentTab" :padding="false">
          <template v-slot:tabs>
            <tab-menu name="main" label="گزارش تخلف" />
            <tab-menu name="kroki" label="کروکی" />
          </template>
          <tab-content name="kroki" title="کروکی" :padding="false">
            <TabCroque
              v-model="model"
              v-if="model.fil_Info.NidProc"
              :padding="false"
              :m="mode"
            />
          </tab-content>
          <tab-content name="main" title="گزارش تخلف" :padding="false">
            <form-wrapper hideTitle>
              <fit>
                <FormRow class="q-mb-sm">
                  <FormControl>
                    <safa-text
                      label="کد ارجاع"
                      label-width="80px"
                      v-model="model.fil_Info.NidWorkItem"
                      cdcName="NidWorkItem"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      label="مالک"
                      label-width="80px"
                      v-model="model.Fil_Owner.Name"
                      cdcName="OwnerName"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      label="تعداد سقف در پروانه"
                      label-width="80px"
                      v-model="model.fil_Info.Floor"
                      cdcName="Floor"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      label="زیربنای پروانه ساختمانی"
                      label-width="80px"
                      v-model="model.fil_Info.infrastructure"
                      cdcName="infrastructure"
                      m="r"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="مرحله ساختمانی"
                      label-width="80px"
                      v-model="ciExecLevel"
                      @input="loadObj"
                      source-type="local"
                      :options="ciExecLevelOptions"
                      cdcName="ciExecLevel"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-combo
                      label="طبقه گزارش"
                      label-width="80px"
                      v-model="selectedCI_ExecFloor"
                      cdcName="selectedCI_ExecFloor"
                      domainName="engineer"
                      ciName="CI_ExecFloor"
                      @input="loadObj"
                    />
                  </FormControl>
                  <safa-text
                    label="آدرس"
                    label-width="80px"
                    v-model="model.Fil_Owner.Address"
                    cdcName="Address"
                    m="r"
                    class="col-12"
                  />
                </FormRow>

                <safa-grid
                  title="برگ گزارش تخلف"
                  v-model="execRepList"
                  :singleClickEdit="true"
                  cdcName="execRepList"
                  :columns="execRepListColumns"
                  :defaultNewRow="{
                    ExecRep: '',
                    CI_ExecStatus: 0,
                    DetailComments: '',
                  }"
                  required
                  validations="required"
                  :paginationPageSize="50"
                  fit
                  :m="mode"
                  paginate
                  :add-row="false"
                  :delete-row="false"
                  @row:click="rowSelect"
                />
              </fit>
            </form-wrapper>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="loadObj"
        >
          <btn-default label="نمایش گزارش" @click="report" v-if="!isEditable" />
          <btn-default label="تأیید" @click="confirm" v-if="!isEditable" />
          <btn-default
            v-if="!isEditable"
            label="ثبت گزارش تخلف"
            @click="addRequest"
            color="primary"
          />
          <btn-default
            :label="
              currentTab === 'kroki' && !isEditable
                ? 'مشاهده کروکی'
                : 'رسم کروکی'
            "
            v-if="currentTab === 'kroki'"
            @load="loadObj"
            @click="showCroquie = true"
          />
        </form-actions>
      </template>
      <safa-popup
        v-model="showCroquie"
        :title="
          currentTab === 'kroki' && !isEditable ? 'مشاهده کروکی' : 'رسم کروکی'
        "
        width="980px"
        height="730px"
      >
        <UDrawCroque
          v-model="model"
          :m="isEditable"
          @cancel="showCroquie = false"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import TabCroque from "./partials/TabCroque"
import UDrawCroque from "./partials/UDrawCroque"
import requestModel from "./config/requestModel"

import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"

export default {
  mixins: [kartableReferencesMixin, baseFormMixin],
  components: { TabCroque, UDrawCroque },
  data () {
    return {
      title: "گزارش تخلف",
      name: "UReportAbuse",
      formKey: "CAEE4E1B-D590-4C95-A740-BC420DAD75D9",
      main: true,

      selectedRow: null,
      // #region services
      getBuldingExeReportRes: null,
      saveBuldingExeReportRes: null,
      confirmBuildingExecReportRes: null,
      createInstanceRes: null,
      getBaseLibInNosaziCodeRes: null,
      saveRequestInfoRes: null,
      updateLastRequestRes: null,
      SaveViolationNidWorkItemRes: false,
      // #endregion

      // #region variables
      isView: false,
      selectedCI_ExecFloor: 0,
      showCroquie: false,
      currentTab: "main",
      NIdFil: "",
      NIdEng: "",
      currentData: { ...requestModel },
      model: {
        ClsBuildingExeReport: {},
        fil_Info: {},
        Fil_Owner: {}
      },
      ciExecLevelOptions: [],
      ciExecLevel: 0,
      execRepList: [],
      execRepListColumns: [
        {
          field: "ExecRep",
          title: "عنوان تخلف",
          width: "280px",
          editable: false
        },
        {
          field: "CI_ExecStatus",
          title: "وضعیت",
          domain: "engineer",
          editor: "ci",
          width: "150px"
        },
        {
          field: "DetailComments",
          title: "شرح",
          width: "auto",
          validations: "required"
        }
      ],

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      procInfo: null,
      currentNidNosaziCode: "00000000-0000-0000-0000-000000000000"
      // #endregion
    }
  },

  async created () {
    if (await this.canOpenWindow()) {
      this.NIdFil = this.selectedExecRep.NIdFil
      this.NIdEng = this.selectedExecRep.NIdEng
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedExecRep.CodeString
      )
      this.loadObj()
      await this.getBaseLibInNosaziCode()
    }
  },
  methods: {
    async loadObj () {
      try {
        this.isEditable = false
        this.showLoading()
        const { data } = await this.$services.engineers.getBuldingExeReport({
          pNidEngineer: this.NIdEng,
          pNidFil: this.NIdFil,
          pUser: this.getNidUser(),
          pExecLevel: this.ciExecLevel,
          pExecFloor: this.selectedCI_ExecFloor,
          SaveViolation: true
        })
        this.getBuldingExeReportRes = this.getResponse(data)
        if (this.getBuldingExeReportRes.success) {
          this.model =
            this.getBuldingExeReportRes.data?.GetBuldingExeReportResult ?? {}

          this.ciExecLevelOptions =
            this.model.ClsBuildingExeReport?.CI_ExecLevel_List?.map((x) => ({
              ID: x.ID,
              Title: x.Title,
              origin: x
            })) ?? []
          if (this.ciExecLevelOptions.length > 0) {
            if (!this.ciExecLevelOptions.some((m) => m.ID === 0)) {
              this.ciExecLevelOptions.unshift({ ID: 0, Title: "نامشخص" })
            }
          }
          const tmp =
            this.model?.ClsBuildingExeReport?.BuildingExecRep_Detail_Main ?? []
          this.execRepList = this.normalizedList(tmp, this.ciExecLevel)
          await this.getBuildingExecRepCommentsList()
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedExecRep.CodeString,
              bizCodeTitle: "CodeString",
              nosaziCode: this.selectedExecRep.CodeString,
              nidWorkItem: this.selectedExecRep.NidWorkItem,
              saveDesc: `نمایش اطلاعات فرم گزارش تخلف برای درخواست با شماره ${this.selectedExecRep.NidWorkItem} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getBaseLibInNosaziCode () {
      try {
        const nosaziCodeObj = convertStringToNosaziCodeObject(
          this.selectedExecRep.CodeString
        )
        // nosaziCodeObj.Building = 1;
        // nosaziCodeObj.Apartment = 0;
        // nosaziCodeObj.Shop = 0;
        const payLoad = {
          pNosaziCode: {
            Apartment: nosaziCodeObj.Apartment,
            Block: nosaziCodeObj.Block,
            Building: nosaziCodeObj.Building,
            CI_City: 0,
            District: nosaziCodeObj.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: nosaziCodeObj.House,
            IsRoot: false,
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            Region: nosaziCodeObj.Region,
            Shop: nosaziCodeObj.Shop
          },
          pLoadFunc:
            "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payLoad,
          { config: { District: nosaziCodeObj.District } }
        )
        this.getBaseLibInNosaziCodeRes = this.getResponse(data)
        if (this.getBaseLibInNosaziCodeRes.success) {
          this.currentNidNosaziCode =
            this.getBaseLibInNosaziCodeRes?.data?._NidNosaziCode ??
            "00000000-0000-0000-0000-000000000000"
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getBuildingExecRepCommentsList () {
      const nid = this.model.ClsBuildingExeReport?._NIdBuildingExecRep
      if (!nid || nid === "00000000-0000-0000-0000-000000000000") return
      try {
        const { data } =
          await this.$services.engineers.getBuildingExecRepCommentsList({
            pNIdBuildingExecRep: nid
          })
        const res = this.getResponse(data)
        if (res.success) {
          console.log(
            "this.getBuildingExecRepCommentsListRes :>> ",
            this.getBuildingExecRepCommentsListRes
          )
          this.getBuildingExecRepCommentsListRes = res?.data?.GetBuildingExecRepComments_ListResult ?? []
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async saveObj () {
      try {
        this.showLoading()
        this.execRepList = this.normalizeExecRepListForSave()
        this.model.ClsBuildingExeReport.BuildingExecRep_Info_Main.CI_ExecFloor = this.selectedCI_ExecFloor

        const { data } = await this.$services.eng.saveBuldingExeReport({
          pRequest: {
            CI_RequestType: 0,
            CI_Years: 0,
            pExecFloor: 0,
            pExecLevel: this.ciExecLevel,
            pUser: this.getNidUser(),
            ClsBuildingExeReport: {
              ...this.model.ClsBuildingExeReport,
              BuildingExecRep_Detail_Main: this.execRepList
            }
          }
        })
        this.saveBuldingExeReportRes = this.getResponse(data)
        if (this.saveBuldingExeReportRes.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedExecRep.CodeString,
            bizCodeTitle: "CodeString",
            nosaziCode: this.selectedExecRep.CodeString,
            nidWorkItem: this.selectedExecRep.NidWorkItem,
            saveDesc: `ذخیره اطلاعات برای درخواست با شماره ${this.selectedExecRep.NidWorkItem} انجام گردید.`
          })
          this.isEditable = false
          this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.")
          this.model.fil_Info.NidProc = ""
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async report () {
      if (!this.checkNidBuildingExecRep()) return
      // const reportPath = "/Engineers/EngineerRpt/RptBuildingExecRepFoul"
      const reportPath = `${window.getConfigValue(
        "engineersConfig.reportPath"
      )}/RptBuildingExecRepFoul`
      const queryParams = {
        NIdBuildingExecRep:
          this.model?.ClsBuildingExeReport?.BuildingExecRep_Detail_Main[0]
            ?.NIdBuildingExecRep,
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedExecRep.CodeString,
        bizCodeTitle: "CodeString",
        nosaziCode: this.selectedExecRep.CodeString,
        nidWorkItem: this.selectedExecRep.NidWorkItem,
        saveDesc: `نمایش گزارش تخلف برای درخواست با شماره ${this.selectedExecRep.NidWorkItem} انجام گردید.`
      })
    },
    async confirm () {
      if (!this.checkNidBuildingExecRep()) return
      this.showLoading()
      this.$services.eng
        .confirmBuildingExecReport({
          pNidEng: this.NIdEng,
          pNidBuildingExecRep_Info_Main:
            this.model?.ClsBuildingExeReport?.BuildingExecRep_Detail_Main[0]
              ?.NIdBuildingExecRep,
          pNidFil: this.NIdFil,
          pCodeString: this.selectedNidRef.CodeString,
          pConfirmType: 1
        })
        .then(async ({ data }) => {
          this.confirmBuildingExecReportRes = this.getResponse(data)
          if (this.confirmBuildingExecReportRes.success) {
            this.showSuccess("تایید با موفقیت گزارش شد.")
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedExecRep.CodeString,
              bizCodeTitle: "CodeString",
              nosaziCode: this.selectedExecRep.CodeString,
              nidWorkItem: this.selectedExecRep.NidWorkItem,
              saveDesc: `تایید گزارش برای درخواست با شماره ${this.selectedExecRep.NidWorkItem} انجام گردید.`
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

    async addRequest () {
      if (!this.checkNidBuildingExecRep()) return
      if (this.hasReportInExecRepList()) {
        this.showError(
          "موردی جهت گزارش ثبت نشده است. برای ثبت درخواست رسیدگی به تخلفات در شهرسازی می بایست خلاصه وضعیت تخلفات مورد نظر در جدول گزارش تخلفات، اعمال و سپس ذخیره شود."
        )
        return
      }
      this.showLoading()
      try {
        console.log("addWorkItem")
        await this.addWorkItem()
        console.log("saveRequest")
        await this.saveRequest()

        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `عملیات ثبت درخواست رسیدگی به تخلفات در شهرسازی با شماره ${this.procInfo.NidWorkItem} انجام گردید.`
        })

        this.showSuccess(
          `درخواست شماره ${this.procInfo.NidWorkItem} جهت رسیدگی به تخلفات در شهرسازی با موفقیت ثبت گردید.`
        ).onDismiss(() => {
          this.hideLoading()
          this.redirectToKartable()
        })
      } catch (e) {
        console.error(e)
        await this.deleteRequest()
        await this.deleteProc()
        this.showError(
          "متاسفانه عملیات ثبت درخواست رسیدگی به تخلفات در شهرسازی متوقف شد."
        )
      } finally {
        this.hideLoading()
      }
    },
    rowSelect (e) {
      console.log("selected row", e)
      this.selectedRow = e.data
    },
    async SaveViolationNidWorkItemFunc () {
      let payload = {
        pNIdBuildingExecRep: this.model?.ClsBuildingExeReport?.BuildingExecRep_Info_Main?.NIdBuildingExecRep, pNidWorkItem: this.procInfo.NidWorkItem
      }
      await this.$services.engineers
        .SaveViolationNidWorkItem(payload)
        .then(({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            console.log("SaveViolationNidWorkItem is success")
          } else { this.SaveViolationNidWorkItemRes = false
            if (response.data.SaveViolationNidWorkItemResult.ErrorResult.BizErrors.length > 0) {
              return this.showError(response.data.SaveViolationNidWorkItemResult.ErrorResult.BizErrors[0].ErrorTitel)
            }
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async addWorkItem () {
      return new Promise(async (resolve, reject) => {
        let nidWorkflowDeff =
          window.getConfigValue("esupParams")?.EngResource?.NidWorkflowDeff ??
          null
        if (nidWorkflowDeff === null) {
          this.showError("تنظیمات NidWorkflowDeff در کانفیگ قرار دهید.")
          return
        }
        const nosaziCodeObj = convertStringToNosaziCodeObject(
          this.selectedExecRep.CodeString
        )
        nosaziCodeObj.Building = 1
        nosaziCodeObj.Apartment = 0
        nosaziCodeObj.Shop = 0
        let payload = {
          Domain: nosaziCodeObj.District,
          BizCode: convertNosaziCodeObjectToString(nosaziCodeObj),
          EumOwnerType: 1,
          NidWorkflowDeff: nidWorkflowDeff,
          ProcRequester: this.getUserDisplayName(),
          ProcInitiator: this.getNidUser(),
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "مهندسین ناظر",
          GroupName: "مهندسین ناظر و طراح",
          GroupTitel: "مهندسین ناظر و طراح",
          IsSara10Request: true
        }
        const { data } = await this.$srvWorkflow.createInstance(payload)
        this.createInstanceRes = this.getResponse(data)
        if (this.createInstanceRes.success) {
          if (
            this.createInstanceRes.data.status === 200 &&
            this.createInstanceRes.data.success
          ) {
            this.procInfo = this.createInstanceRes.data.data.ProcInfo
            return resolve()
          } else {
            return reject(this.createInstanceRes.errors[0].text)
          }
        } else {
          return reject(this.createInstanceRes.errors[0].text)
        }
      })
    },
    async saveRequest () {
      //  http://esup.isfahan.ir/JamSepari/ShahrsaziMan7/SC_M7/srvSC.svc/json/SaveRequestInfo
      return new Promise(async (resolve, reject) => {
        const payload = {
          PInfo: {
            HasNidProc: false,
            Info: {
              CI_Requester: 1,
              CI_RequesterOwnerType: 0,
              EumRequestStatus: 0,
              NidNosaziCode: this.currentNidNosaziCode,
              NidProc: this.procInfo.NidProc,
              NidWorkItem: this.procInfo.NidWorkItem,
              NidWorkflowDeff: this.procInfo.NidWorkflowDeff,
              PostCode: "3416865496", //  نسخه HTML - توی نسخه قبلی هم هارد کد بود همین مقدار ..... مشخص نیست چرا"
              RequesterAddress: " ",
              RequesterName: " ",
              RequesterNationalCode: " "
            }
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          },
          PFormName: "Request"
        }
        const { data } = await this.$services.SC.saveRequestInfo(
          payload,
          this.config
        )
        this.saveRequestInfoRes = this.getResponse(data)
        if (this.saveRequestInfoRes.success) {
          await this.updateLastReqState(this.procInfo.NidProc)
          console.log("SaveViolationNidWorkItem")
          await this.SaveViolationNidWorkItemFunc()
          this.loadObj()

          if (this.procInfo.NidWorkItem && this.SaveViolationNidWorkItemRes) {
            return resolve({
              msg: `درخواست با شماره "<b>${this.procInfo.NidWorkItem}</b>" ثبت گردید.`
            })
          } else return reject("متاسفانه عملیات موفقیت آمیز نبود.")
        } else {
          return reject(this.saveRequestInfoRes.errors[0].text)
        }
      })
    },
    async updateLastReqState () {
      const { data } = await this.$services.SC.updateLastRequestState(
        {
          pNidProc: this.procInfo.NidProc,
          pLastRequestState: "درخواست ثبت شد."
        },
        this.config
      )
      this.updateLastRequestRes = this.getResponse(data)
    },
    async deleteRequest () {
      try {
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          this.config
        )
        this.deleteResult = this.getResponse(data)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async deleteProc () {
      try {
        const { data } = await this.$srvWorkflow.deleteProc(
          { NidProc: this.procInfo.NidProc },
          this.config
        )
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    checkNidBuildingExecRep () {
      const NIdBuildingExecRep =
        this.model?.ClsBuildingExeReport?.BuildingExecRep_Detail_Main[0]
          ?.NIdBuildingExecRep
      if (
        !NIdBuildingExecRep ||
        NIdBuildingExecRep === "00000000-0000-0000-0000-000000000000"
      ) {
        this.showError("ابتدا گزارش را ذخیره نمایید.")
        return false
      }
      return true
    },

    normalizedList (a, b) {
      let tmp =
        a
          .filter((x) => x.CI_ExecLevel === b)
          ?.sort((x, y) => x.CI_ExecRep - y.CI_ExecRep) ?? []
      let list =
        tmp.map((m) => {
          return {
            ...m,
            ExecRep: m.ExecRep || "",
            CI_ExecStatus: m.CI_ExecStatus || 0,
            DetailComments:
              m.CI_ExecStatus === 0 || m.CI_ExecStatus === null
                ? ""
                : m.DetailComments
          }
        }) ?? []
      return list
    },
    normalizeExecRepListForSave () {
      return (
        this.execRepList.map((m) => {
          return {
            ...m,
            DetailComments: m.CI_ExecStatus === 0 ? "" : m.DetailComments
          }
        }) ?? []
      )
    },
    hasReportInExecRepList () {
      return !this.execRepList.some((s) => s.CI_ExecStatus !== 0)
    }
  },
  computed: {
    config () {
      return {
        config: {
          District:
            this.baseNosaziCode.District !== 0
              ? this.baseNosaziCode.District
              : 1
        }
      }
    }
  }
}
</script>
