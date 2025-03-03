<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="true" :hideTitle="hideTitle">
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveContractSaleSecretariatRes" />
      <safa-status :result="ServicTabRequestContractInfoRes" />
      <safa-status :result="saveObjRes" />
      <safa-status :result="delContractSaleConfirmRes" />
      <safa-status :result="delContractSaleInfoRes" />
      <safa-status :result="saveContractSaleConfirmRes" />
      <safa-status :result="saveApprovalTaskInfoRes" />
      <safa-status :result="contractReportArchiveRes" />
      <fit>
        <safa-splitter v-model="spliterModel" class="fit">
          <template v-slot:before>
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in treeView"
                :key="index"
                @click="selectItem(item)"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" icon="mark_chat_read" />
                </q-item-section>
                <q-item-section>
                  {{ getName(item) }}
                </q-item-section>
              </q-item>
            </q-list>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs v-model="activeTab">
                <template v-slot:tabs>
                  <tab-menu
                    name="ContractSaleList"
                    label="مشخصات صلح نامه فروش"
                  />
                  <tab-menu name="DebtOrCredit" label="بدهکاری / بستانکاری" />
                  <tab-menu name="OtherDetails" label="سایر اطلاعات" />
                  <tab-menu name="SeCretariatApprovals" label="تاییدات" />
                  <tab-menu name="HistoryOfPrinting" label="تاریخچه چاپ" />
                  <tab-menu
                    v-if="showTabRequestContractInfo"
                    name="TabRequestContractInfo"
                    label="ماده و تباصر"
                  />
                  <tab-menu name="TabSign" label="امضا و اثر انگشت مالکین" />
                </template>
                <tab-content name="ContractSaleList">
                  <fit>
                    <ContractSaleList
                      v-model="model"
                      :m="mode"
                      :rbIsConfirm="rbIsConfirm"
                    />
                  </fit>
                </tab-content>
                <tab-content name="DebtOrCredit">
                  <fit>
                    <DebtOrCredit :NIdContractSale="PNIdContractSale" v-model="model" :m="mode" />
                  </fit>
                </tab-content>
                <tab-content name="OtherDetails">
                  <fit>
                    <OtherDetails v-model="model" :m="mode" />
                  </fit>
                </tab-content>
                <tab-content name="SeCretariatApprovals">
                  <fit>
                    <SeCretariatApprovals
                      v-model="model"
                      :m="mode"
                    />
                  </fit>
                </tab-content>
                <tab-content name="HistoryOfPrinting">
                  <fit>
                    <HistoryOfPrinting v-model="model" :m="mode" />
                  </fit>
                </tab-content>

                <tab-content
                  v-if="showTabRequestContractInfo"
                  name="TabRequestContractInfo"
                >
                  <fit>
                    <TabRequestContractInfo v-model="model" :m="mode" />
                  </fit>
                </tab-content>
                <tab-content name="TabSign">
                  <fit>
                    <TabSign
                      v-model="model"
                      :m="mode"
                      :PNIdRequest="PNIdRequest"
                      @SaveSignFingerPrint="SaveSignFingerPrint"
                    />
                  </fit>
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
          editSPId="55114964-fd9b-4cfd-a913-53798063a6ce"
        >
          <template>
            <btn-delete
              @click="delContractSaleInfo"
              label="حذف"
              spCaption="حذف"
              spId="b90449ca-6eb0-4a2e-84e4-d1d92286a56b"
            />
            <btn-default
              label="تایید صلحنامه"
              @click="getApprovalTaskByNIdProcUser"
              spCaption="تایید صلحنامه"
              spId="aef8c061-6ca0-4d79-b559-896acd4270ea"
            />
            <btn-default
              label="تایید نهایی"
              spCaption="تایید نهایی"
              @click="saveContractSaleConfirm"
              :disabled="disabledContractSaleConfirm"
              spId="3c0398ca-2a1f-4fa5-8a41-a0122e87eebd"
            />
            <btn-default
              label="ابطال تایید نهایی"
              spCaption="ابطال تایید نهایی"
              @click="delContractSaleConfirm"
              :disabled="!disabledContractSaleConfirm"
              spId="c05a2ec6-ca8c-4d6b-b86d-ef29fb6802ad"
            />
            <btn-default
              label="گزارش"
              @click="print"
              spId="559576bc-dab7-4f6c-910c-cfb47ef284ae"
              spCaption="دکمه گزارش"
            />
            <btn-default
              label="گزارش ماده و تباصر"
              v-if="activeTab === 'TabRequestContractInfo'"
              @click="btnReportRequestContractInfo"
              spCaption="دکمه گزارش ماده و تباصر"
              spId="4f58b2f3-1f48-43e3-b6de-f10980988861"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ContractSaleList from "./partials/details-contracts/ContractSaleList.vue"
import DebtOrCredit from "./partials/debt-or-credit/DebtOrCredit.vue"
import SeCretariatApprovals from "./partials/SeCretariatApprovals.vue"
import HistoryOfPrinting from "./partials/HistoryOfPrinting.vue"
import OtherDetails from "./partials/OtherDetails.vue"
import TabRequestContractInfo from "./partials/TabRequestContractInfo.vue"
import TabSign from "./partials/TabSign.vue"
import { currentDate, currentTime } from "src/utils/index"
import { uid } from "quasar"

const defaultModel = {
  ApprovalTask_Info: null,
  Base_Owner: null,
  Base_Owner_Attorney: null,
  CI_ContractSale_Other: [],
  CI_ContractSale_Other_Default: [],
  ContractSale_Info: {
    ApplyingArticle45Date: null,
    ApplyingArticle45No: null,
    Barcode: null,
    CI_ContractSaleSubject: "0",
    CI_ContractCancelReason: "0",
    CancelDate: null,
    CancelDesc: null,
    CancelNo: null,
    ConfirmDate: null,
    ContractSaleDate: null,
    ContractSaleDateRel: null,
    ContractSaleListDesc: null,
    ContractSaleNo: null,
    ContractSaleNoRel: null,
    CouncilApprovedDate: null,
    CouncilApprovedNo: null,
    DebitCreditDesc: null,
    Description: null,
    Description1: null,
    Description2: null,
    EvaluationPrice: null,
    IsArchived: false,
    IsCapitaBelowSeparationCriterion: true,
    IsHaveCouncil: null,
    IsMunicipalityTakenAsLand: false,
    MayorOrderDate: null,
    MayorOrderNo: null,
    NIdContractSale: "00000000-0000-0000-0000-000000000000",
    NIdContractSaleRel: null,
    NIdContractSale_tmp: "0",
    NIdEvaluation: null,
    NidRequest: "00000000-0000-0000-0000-000000000000",
    NidWorkItem2: null,
    NoticeDate: null,
    NoticeNo: null,
    PaymentType: null,
    SecretariatDate: null,
    SecretariatNo: null,
    Type: "0"
  },
  ContractSale_InfoBaseOnNidProc: null,
  ContractSale_Other: null,
  ContractSale_Privilege: null,
  ContractSale_Replacement: null,
  DebitCredit_Info_1: null,
  DebitCredit_Info_2: null,
  EvaluationDesc: null,
  Evaluation_Info_RequestList: [],
  Evaluation_Price: null,
  IsConfirmContractSale: false,
  PrintLog_Info: null,
  RequestContractInfo: null,
  RequestContractInfoList: [],
  RequestOwnerSignFingerPrint: null,
  Sum_DebitCredit_1: "0",
  Sum_DebitCredit_2: "0",
  Total_Price: null,
  UserInfo_GUID: "00000000-0000-0000-0000-000000000000",
  UserName: "",
  _CI_RequestType: 0,
  _NIdContractSale: "00000000-0000-0000-0000-000000000000",
  _NIdProcess: "00000000-0000-0000-0000-000000000000",
  _NIdRequest: "00000000-0000-0000-0000-000000000000"
}

export default {
  mixins: [baseFormMixin],
  components: {
    ContractSaleList,
    SeCretariatApprovals,
    HistoryOfPrinting,
    TabRequestContractInfo,
    TabSign,
    OtherDetails,
    DebtOrCredit
  },
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: "UContractSaleList",
      title: "صلح نامه فروش",
      formKey: "06449850-B222-4261-A7DD-B78C6F55F33E",
      main: true,

      // variables
      disabledContractSaleConfirm: false,
      activeTab: "ContractSaleList",
      spliterModel: 16,
      NIdSession: "00000000-0000-0000-0000-000000000000",
      NidProc: "00000000-0000-0000-0000-000000000000",
      treeView: [],
      PNIdContractSale: "",
      PNIdRequest: "",
      CI_RequestType: 0,
      rbIsConfirm: false,
      TmpStrSelectedItems: "", // for btnReportRequestContractInfo

      // // security
      showTabRequestContractInfo: true,

      // services
      loadObjRes: null,
      getContractSaleInfoRes: null,
      saveContractSaleSecretariatRes: null,
      ServicTabRequestContractInfoRes: null,
      delContractSaleConfirmRes: null,
      delContractSaleInfoRes: null,
      saveContractSaleConfirmRes: null,
      saveObjRes: null,
      saveApprovalTaskInfoRes: null,
      contractReportArchiveRes: null,

      // model
      model: { ...defaultModel }
    }
  },
  watch: {
    activeTab () {
      if (this.activeTab === "TabRequestContractInfo") {
        this.ServicTabRequestContractInfo()
      }
    }
  },
  mounted () {
    this.addResources()
  },
  created () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      // تکمیل
      this.showLoading()
      if (this.selectedRequest) {
        this.NidProc = this.selectedRequest.NidProc
      } else {
        this.NidProc = "00000000-0000-0000-0000-000000000000"
      }
      try {
        const { data } = await this.$services.ES.getContractSaleInfoRequestList({
          pNIdProc: this.NidProc // "973f60e6-55b4-4551-8817-32610e1b889c"//
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res =
            this.loadObjRes.data.GetContractSale_Info_RequestListResult
          if (res && res.length > 0) {
            this.treeView = res.filter(
              (f) => f.NIdContractSale !== "00000000-0000-0000-0000-000000000000"
            )
          }
          const endOfRes = res.length - 1
          this.PNIdContractSale = res[endOfRes].NIdContractSale
          this.PNIdRequest = res[endOfRes].NidRequest
          this.disabledContractSaleConfirm = !!res[endOfRes].ConfirmDate
          this.getContractSaleInfo()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getContractSaleInfo () {
      // تکمیل
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getContractSaleInfo({
          PNIdContractSale: this.PNIdContractSale,
          PNIdRequest: this.PNIdRequest
        })
        this.getContractSaleInfoRes = this.getResponse(data)
        if (this.getContractSaleInfoRes.success) {
          this.model =
            this.getContractSaleInfoRes.data.GetContractSale_InfoResult
          this.CI_RequestType = this.model._CI_RequestType
          this.NidProc = this.model._NIdProcess
          if (this.model.ContractSale_Info.ContractSaleNo === null) {
            this.model.ContractSale_Info.ContractSaleNo = ""
          }
          if (this.model.ContractSale_Info.ContractSaleDate === null) {
            this.model.ContractSale_Info.ContractSaleDate = ""
          }

          this.rbIsConfirm = !!this.model.ContractSale_Info.ConfirmDate
          await this.log({
            action: this.logActions.view,
            bizCode: this.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: "نمایش اطلاعات فرم صلح نامه فروش بارگذاری شد"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveContractSaleConfirm () {
      // تکمیل
      this.showLoading()
      try {
        const { data } = await this.$services.ES.saveContractSaleConfirm({
          PNIdProc:
            this.selectedNidProc ?? "00000000-0000-0000-0000-000000000000"
        })
        this.saveContractSaleConfirmRes = this.getResponse(data)
        if (this.saveContractSaleConfirmRes.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
          })
          if (
            this.saveContractSaleConfirmRes.data.SaveContractSale_ConfirmResult
          ) {
            this.disabledContractSaleConfirm = true
            this.showError("تایید نهایی صلحنامه با موفقیت انجام شد")
            this.getContractSaleInfo()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getApprovalTaskByNIdProcUser () {
      // تکمیل
      try {
        this.showLoading()
        const payload = {
          NIdProcess: this.selectedRequest.NidProc,
          NIdUser: this.getNidUser()
        }

        const { data } = await this.$services.ES.getApprovalTaskByNIdProcUser(
          payload
        )
        this.getApprovalTaskByNIdProcUserRes = this.getResponse(data)
        if (this.getApprovalTaskByNIdProcUserRes.success) {
          let result =
            this.getApprovalTaskByNIdProcUserRes.data
              .GetApprovalTask_ByNIdProcUserResult
          let tmpGuid =
            result._NIdApproval === "00000000-0000-0000-0000-000000000000"
              ? uid()
              : result._NIdApproval

          result.ApprovalTask_Info = {
            NIdApproval: tmpGuid,
            ActionDate: currentDate(),
            ActionTime: currentTime(),
            Comments: "",
            NIdApproval_tmp: 0,
            NIdProcess: this.selectedRequest.NidProc,
            NIdResource: this.formKey,
            NIdUser: this.getNidUser(),
            ResourceName: this.name,
            ResourceType: "",
            Result: "FormApproval",
            UserName: this.getUserDisplayName(),
            WorkflowStateName: this.TaskInfo?.WorkflowTitel ?? ""
          }
          this.saveApprovalTaskInfo(result)
          // this.showSuccess("تایید صلحنامه با موفقیت انجام شد.")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveApprovalTaskInfo (args) {
      // این سرویس چون در سرا 8 زده نمیشود نمیتوان پیلود را درست ارسال کرد
      try {
        this.showLoading()
        const payload = { PObj: { ...args } }
        const { data } = await this.$services.ES.saveApprovalTaskInfo(payload)
        this.saveApprovalTaskInfoRes = this.getResponse(data)
        if (this.saveApprovalTaskInfoRes.success) {
          // let result = this.saveApprovalTaskInfoRes.data.SaveApprovalTask_InfoResult
          this.showSuccess("تایید صلحنامه با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: `تایید صلحنامه با شماره قرارداد ${
              this.model?.ContractSale_Info?.ContractSaleNo ?? ""
            } با موفقیت انجام شد.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async delContractSaleInfo () {
      // تکمیل
      this.showConfirm("آیا اطلاعات مورد نظر حذف شود؟").onOk(() => {
        this.confirmDelete()
      })
    },
    async confirmDelete () {
      // تکمیل
      try {
        this.showLoading()
        const { data } = await this.$services.ES.delContractSaleInfo({
          PNIdContractSale: this.PNIdContractSale
        })
        this.delContractSaleInfoRes = this.getResponse(data)
        if (this.delContractSaleInfoRes.success) {
          if (
            this.delContractSaleInfoRes.data.DelContractSale_InfoResult === true
          ) {
            this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.delete,
              bizCode: this.NidProc,
              bizCodeTitle: "NidProc",
              saveDesc: `حذف اطلاعات فرم صلح نامه فروش با شماره قرار داد ${
                this.model?.ContractSale_Info?.ContractSaleNo ?? ""
              } انجام شد`
            })
            this.loadObj()
          } else {
            this.showError("خطا در حذف اطلاعات")
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async delContractSaleConfirm () {
      // تکمیل
      this.showLoading()
      try {
        const { data } = await this.$services.ES.delContractSaleConfirm({
          PNIdProc:
            this.selectedNidProc ?? "00000000-0000-0000-0000-000000000000"
        })
        this.delContractSaleConfirmRes = this.getResponse(data)
        if (this.delContractSaleConfirmRes.success) {
          if (this.delContractSaleConfirmRes.data.DelContractSale_ConfirmResult) {
            this.disabledContractSaleConfirm = false
            this.showSuccess("ابطال تایید نهایی صلحنامه با موفقیت انجام شد")
            this.getContractSaleInfo()
          } else {
            this.showError("خطا در ابطال تایید نهایی صلح نامه")
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      this.showLoading()

      if (this.model.IsConfirmContractBuy) {
        this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
        return false
      }
      if (
        this.model.ContractSale_Privilege?.filter(
          (b) => b.PrivilegePrice === null
        ).length > 0
      ) {
        this.showError("لطفا اطلاعات ارزش ریالی را وارد نمایید")
        this.hideLoading()
        return false
      }
      this.model.PrintLog_Info = null
      this.model.ApprovalTask_Info = null
      this.model.ContractSale_Info.NidRequest = this.PNIdRequest
      if (this.model.Total_Price === null) {
        this.model.Total_Price = 0
      }

      const payload = {
        PObj: {
          ...this.model
        }
      }
      console.log("=========================>", payload)

      this.$services.ES.saveContractSaleInfo(payload)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.isEditable = false
            this.loadObj()
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "ذخیره فرم صلح نامه فروش با موفقیت انجام شد"
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async ServicTabRequestContractInfo () {
      // تکمیل
      this.showLoading()
      const payLoad = {
        pRequestType: this.CI_RequestType
      }
      this.$services.ES.getRequestContractInfo(payLoad)
        .then(async ({ data }) => {
          this.ServicTabRequestContractInfoRes = this.getResponse(data)
          if (this.ServicTabRequestContractInfoRes.success) {
            debugger
            this.model.RequestContractInfoList =
              this.ServicTabRequestContractInfoRes.data.GetRequestContractInfoResult.RequestContractInfoList.map(
                (i) => {
                  return {
                    ...i,
                    IsSelected: false
                  }
                }
              )
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "ServicTabRequestContractInfo"
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    selectItem (item) {
      this.PNIdContractSale = item.NIdContractSale
      this.PNIdRequest = item.NidRequest
      this.getContractSaleInfo()
    },
    getName (item) {
      return `صلحنامه فروش - ${item.ContractSaleDate}`
    },

    async print () {
      const reportPath = "/Estate/Rpt_Contract_Sale"
      const queryParams = {
        NidProc: this.selectedNidProc,
        NIdUser: this.getNidUser(),
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
      this.contractReportArchive(reportPath)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidProc,
        bizCodeTitle: "NidProc",
        saveDesc: `نمایش گزارش Rpt_Contract_Sale برای صلح نامه فروش`
      })
      this.loadObj()
    },
    async contractReportArchive (reportPath) {
      this.showLoading()
      const payload = {
        pNIdProc: this.selectedNidProc,
        pReportPath: reportPath,
        pArchiveDomain_Estate: "Amlak",
        pUserName: this.getUserDisplayName()
      }
      try {
        const { data } = await this.$services.ES.contractReportArchive(payload)
        this.contractReportArchiveRes = this.getResponse(data)
        if (this.contractReportArchiveRes.success) {
          this.showSuccess("گزارش با موفقیت در آرشیو درج شد")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async btnReportRequestContractInfo () {
      // تکمیل
      this.model.RequestContractInfoList.forEach((i) => {
        if (i.IsSelected) {
          this.TmpStrSelectedItems +=
            "CI_ContractProvision=" +
            i.CI_ContractProvision +
            ",CI_ContractRemark=" +
            i.CI_ContractRemark +
            "***"
        }
      })
      const reportPath = "/Estate/Rpt_RequestContractSaleInfo"
      const queryParams = {
        NIdRequest: this.PNIdRequest,
        SelectedItems: this.TmpStrSelectedItems ?? []
      }
      // NIdUser: this.getNidUser(),
      // UserName: this.getUserDisplayName()
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidProc,
        bizCodeTitle: "NidProc",
        saveDesc: `نمایش گزارش  ماده و تباصر برای صلح نامه فروش`
      })
      this.TmpStrSelectedItems = ""
    },

    async addResources () {
      const appId = this.$stSecurity.getters["config/appId"] // NidWorkspace
      const appTitle = this.$stSecurity.getters["config/appTitle"] // workspace title
      const appName = this.$stSecurity.getters["config/appName"] // workspace name

      let resources = []
      resources.push({
        NidResource: "24fbf4d6-d5c7-4c3c-8c04-a83224ca9998".toUpperCase(),
        NidParent: this.formKey,
        name: "TabRequestContractInfo",
        title: "ماده و تباصر",
        type: "sp"
      })

      const payload = {
        NidWorkspace: appId,
        workspaceName: appName,
        workspaceTitle: appTitle,
        newAdd: true,
        resources
      }
      const result = await this.$services.security.resourceAddFetch(payload)
      // const result = await post('/v2/permission-forms/resource-add-fetch', payload, {})
      if (result.data.success) {
        this.allAccessSecurity = result.data.data
        this.showTabRequestContractInfo = this.checkSecurity(
          "24fbf4d6-d5c7-4c3c-8c04-a83224ca9998"
        ) // تب ماده و تباصر
      }
    },
    checkSecurity (e) {
      let help = this.allAccessSecurity.filter(
        (i) => i.NidResource.toUpperCase() === e.toUpperCase()
      )
      return help[0].allowed
    }
  }
}
</script>
