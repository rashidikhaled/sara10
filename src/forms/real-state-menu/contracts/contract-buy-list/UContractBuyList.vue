<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="true" :hideTitle="hideTitle">
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveContractBuySecretariatRes" />
      <safa-status :result="ServicTabRequestContractInfoRes" />
      <safa-status :result="saveObjRes" />
      <safa-status :result="delContractBuyConfirmRes" />
      <safa-status :result="delContractBuyInfoRes" />
      <safa-status :result="saveContractBuyConfirmRes" />
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
                  <tab-menu name="ContractBuyList" label="صلح نامه خرید" />
                  <tab-menu name="DebtOrCredit" label="بدهکاری / بستانکاری" />
                  <tab-menu
                    name="SeCretariatApprovals"
                    label="دبیرخانه/تاییدات"
                  />
                  <tab-menu name="HistoryOfPrinting" label="تاریخچه چاپ" />
                  <tab-menu name="OtherDetails" label="سایر اطلاعات" />
                  <tab-menu
                    v-if="showTabRequestContractInfo"
                    name="TabRequestContractInfo"
                    label="ماده و تباصر"
                  />
                  <tab-menu name="TabSign" label="امضا و اثر انگشت مالکین" />
                </template>
                <tab-content name="ContractBuyList">
                  <fit>
                    <ContractBuyList
                      v-model="model"
                      :m="mode"
                      :rbIsConfirm="rbIsConfirm"
                    />
                  </fit>
                </tab-content>
                <tab-content name="DebtOrCredit">
                  <fit>
                    <DebtOrCredit v-model="model" :m="mode" />
                  </fit>
                </tab-content>
                <tab-content name="SeCretariatApprovals">
                  <fit>
                    <SeCretariatApprovals
                      v-model="model"
                      :btnSaveSecretariatDisabled="btnSaveSecretariatDisabled"
                      @saveContractBuySecretariat="saveContractBuySecretariat"
                      :m="mode"
                    />
                  </fit>
                </tab-content>
                <tab-content name="HistoryOfPrinting">
                  <fit>
                    <HistoryOfPrinting v-model="model" :m="mode" />
                  </fit>
                </tab-content>
                <tab-content name="OtherDetails">
                  <fit>
                    <OtherDetails v-model="model" :m="mode" />
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
          editSPId="20391317-4951-492f-a5ad-7f77b069f75a"
        >
          <template>
            <btn-delete
              @click="delContractBuyInfo"
              label="حذف"
              spCaption="حذف"
              spId="a7152db4-3838-415b-8a5a-0897d8f74db3"
            />
            <btn-save
              label="تایید صلحنامه"
              @click="getApprovalTaskByNIdProcUser"
            />
            <btn-default
              label="تایید نهایی"
              @click="saveContractBuyConfirm"
              :disabled="disabledContractBuyConfirm"
            />
            <btn-default
              label="ابطال تایید نهایی"
              @click="delContractBuyConfirm"
              :disabled="!disabledContractBuyConfirm"
            />
            <btn-default
              label="گزارش"
              @click="print"
              spId="20f74760-075d-41ef-91bb-b1215c3cb914"
              spCaption="دکمه گزارش"
            />
            <btn-default
              label="صدور قبض"
              @click="print"
              spId="d11359b4-e3ba-4c84-805b-e6006fbfc39d"
              spCaption="صدور قبض"
            />
            <btn-default
              label="گزارش ماده و تباصر"
              v-if="activeTab === 'TabRequestContractInfo'"
              @click="btnReportRequestContractInfo"
              spCaption="دکمه گزارش ماده و تباصر"
            />
            <!-- spId="d0cef463-2ad6-4780-a640-aa9a4ca0db7b" -->
          </template>
          <p>{{ txtMessage }}</p>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ContractBuyList from "./partials/details-contracts/ContractBuyList.vue"
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
  CI_ContractBuy_Other: [],
  CI_ContractBuy_Other_Default: [],
  ContractBuy_Info: {
    ApplyingArticle45Date: null,
    ApplyingArticle45No: null,
    Barcode: null,
    CI_ContractBuySubject: "0",
    CI_ContractCancelReason: "0",
    CancelDate: null,
    CancelDesc: null,
    CancelNo: null,
    ConfirmDate: null,
    ContractBuyDate: null,
    ContractBuyDateRel: null,
    ContractBuyListDesc: null,
    ContractBuyNo: null,
    ContractBuyNoRel: null,
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
    NIdContractBuy: "00000000-0000-0000-0000-000000000000",
    NIdContractBuyRel: null,
    NIdContractBuy_tmp: "0",
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
  ContractBuy_InfoBaseOnNidProc: null,
  ContractBuy_Other: null,
  ContractBuy_Privilege: null,
  ContractBuy_Replacement: null,
  DebitCredit_Info_1: null,
  DebitCredit_Info_2: null,
  EvaluationDesc: null,
  Evaluation_Info_RequestList: [],
  Evaluation_Price: null,
  IsConfirmContractBuy: false,
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
  _NIdContractBuy: "00000000-0000-0000-0000-000000000000",
  _NIdProcess: "00000000-0000-0000-0000-000000000000",
  _NIdRequest: "00000000-0000-0000-0000-000000000000"
}

export default {
  mixins: [baseFormMixin],
  components: {
    ContractBuyList,
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
      name: "UContractBuyList",
      title: "صلح نامه خرید",
      formKey: "53A1BEC4-CD02-4BD6-8CAD-A4315D11E720",
      main: true,

      // variables
      disabledContractBuyConfirm: false,
      activeTab: "ContractBuyList",
      spliterModel: 16,
      NIdSession: "00000000-0000-0000-0000-000000000000",
      NidProc: "00000000-0000-0000-0000-000000000000",
      treeView: [],
      PNIdContractBuy: "",
      PNIdRequest: "",
      CI_RequestType: 0,
      rbIsConfirm: false,
      TmpStrSelectedItems: "", // for btnReportRequestContractInfo
      txtMessage: "",

      // // security
      showTabRequestContractInfo: true,

      // Cond
      btnSaveSecretariatDisabled: false,

      // services
      loadObjRes: null,
      getContractBuyInfoRes: null,
      saveContractBuySecretariatRes: null,
      ServicTabRequestContractInfoRes: null,
      delContractBuyConfirmRes: null,
      delContractBuyInfoRes: null,
      saveContractBuyConfirmRes: null,
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
    if (this.taskInfo) {
      this.loadObj()
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    async loadObj (nidProc) {
      // تکمیل
      this.showLoading()
      if (this.NidProc === "00000000-0000-0000-0000-000000000000") {
        this.NidProc = nidProc || (this.selectedRequest ? this.selectedRequest.NidProc : "00000000-0000-0000-0000-000000000000")
      }
      try {
        const { data } = await this.$services.ES.getContractBuyInfoRequestList({
          pNIdProc: this.NidProc // "973f60e6-55b4-4551-8817-32610e1b889c"//
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res =
            this.loadObjRes.data.GetContractBuy_Info_RequestListResult
          if (res && res.length > 0) {
            this.treeView = res.filter(
              (f) => f.NIdContractBuy !== "00000000-0000-0000-0000-000000000000"
            )
          }
          const endOfRes = res.length - 1
          this.PNIdContractBuy = res[endOfRes].NIdContractBuy
          this.PNIdRequest = res[endOfRes].NidRequest
          this.disabledContractBuyConfirm = !!res[endOfRes].ConfirmDate
          // await this.log({
          //   action: this.logActions.view,
          //   bizCode: this.NidProc,
          //   bizCodeTitle: "NidProc",
          //   saveDesc: "نمایش اطلاعات فرم صلح نامه خرید بارگذاری شد"
          // })
          this.getContractBuyInfo()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getContractBuyInfo () {
      // تکمیل
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getContractBuyInfo({
          PNIdContractBuy: this.PNIdContractBuy,
          PNIdRequest: this.PNIdRequest
        })
        this.getContractBuyInfoRes = this.getResponse(data)
        if (this.getContractBuyInfoRes.success) {
          this.model =
            this.getContractBuyInfoRes.data.GetContractBuy_InfoResult
          this.CI_RequestType = this.model._CI_RequestType
          this.NidProc = this.model._NIdProcess
          if (this.model.ContractBuy_Info.ContractBuyNo === null) {
            this.model.ContractBuy_Info.ContractBuyNo = ""
          }
          if (this.model.ContractBuy_Info.ContractBuyDate === null) {
            this.model.ContractBuy_Info.ContractBuyDate = ""
          }
          if (
            !this.model.ContractBuy_Info.SecretariatNo &&
            !this.model.ContractBuy_Info.SecretariatDate
          ) {
            this.btnSaveSecretariatDisabled = true
          }
          this.rbIsConfirm = !!this.model.ContractBuy_Info.ConfirmDate
          await this.log({
            action: this.logActions.view,
            bizCode: this.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: "نمایش اطلاعات فرم صلح نامه خرید بارگذاری شد"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveContractBuyConfirm () {
      // تکمیل
      this.showLoading()
      try {
        const { data } = await this.$services.ES.saveContractBuyConfirm({
          PNIdProc:
            this.NidProc ?? "00000000-0000-0000-0000-000000000000"
        })
        this.saveContractBuyConfirmRes = this.getResponse(data)
        if (this.saveContractBuyConfirmRes.success) {
          if (
            this.saveContractBuyConfirmRes.data.SaveContractBuy_ConfirmResult
          ) {
            this.disabledContractBuyConfirm = true
            this.showError("تایید نهایی صلحنامه با موفقیت انجام شد")
            this.getContractBuyInfo()
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
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async delContractBuyInfo () {
      // تکمیل
      this.showConfirm("آیا اطلاعات مورد نظر حذف شود؟").onOk(() => {
        this.confirmDelete()
      })
    },
    async confirmDelete () {
      // تکمیل
      try {
        this.showLoading()
        const { data } = await this.$services.ES.delContractBuyInfo({
          PNIdContractBuy: this.PNIdContractBuy
        })
        this.delContractBuyInfoRes = this.getResponse(data)
        if (this.delContractBuyInfoRes.success) {
          if (
            this.delContractBuyInfoRes.data.DelContractBuy_InfoResult === true
          ) {
            this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
            this.loadObj()
            await this.log({
              action: this.logActions.delete,
              bizCode: this.NidProc,
              bizCodeTitle: "NidProc",
              saveDesc: `حذف اطلاعات فرم صلح نامه خرید با شماره قرار داد ${
                this.model?.ContractBuy_Info?.ContractBuyNo ?? ""
              } انجام شد`
            })
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
    async delContractBuyConfirm () {
      // تکمیل
      this.showLoading()
      try {
        const { data } = await this.$services.ES.delContractBuyConfirm({
          PNIdProc:
            this.selectedNidProc ?? "00000000-0000-0000-0000-000000000000"
        })
        this.delContractBuyConfirmRes = this.getResponse(data)
        if (this.delContractBuyConfirmRes.success) {
          if (this.delContractBuyConfirmRes.data.DelContractBuy_ConfirmResult) {
            this.disabledContractBuyConfirm = false
            this.showError("ابطال تایید نهایی صلحنامه با موفقیت انجام شد")
            this.getContractBuyInfo()
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
      //  تکمیل نشده
      if (this.model.RequestOwnerSignFingerPrint.length > 0) {
        this.showError(
          "به دلیل ثبت امضا و اثر انگشت مالک قادر به تغییر اطلاعات نمی باشید"
        )
        return false
      }

      if (this.model.IsConfirmContractBuy) {
        this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
        return false
      }
      if (
        this.model.ContractBuy_Privilege?.filter(
          (b) => b.PrivilegePrice === null
        ).length > 0
      ) {
        this.showError("لطفا اطلاعات ارزش ریالی را وارد نمایید")
        this.hideLoading()
        return false
      }
      if (
        this.model.ContractBuy_Info.IsCapitaBelowSeparationCriterion === null
      ) {
        this.showError(
          'لطفا اطلاعات - "سهم سرانه زیر حد نصاب ضابطه تفکیک می باشد" -را وارد کنید'
        )
        return
      }
      if (this.model.ContractBuy_Info.IsMunicipalityTakenAsLand === null) {
        this.showError(
          'لطفا اطلاعات -"سهم شهرداری به صورت زمین اخذ می گردد"- را وارد کنید'
        )
        return
      }
      this.model.PrintLog_Info = null
      this.model.ApprovalTask_Info = null
      this.model.ContractBuy_Info.ConfirmDate =
        this.model.ContractBuy_Info.ConfirmDate === null
          ? ""
          : this.model.ContractBuy_Info.ConfirmDate
      this.model.ContractBuy_Info.Type = 0
      let tmpNidLegalList =
        this.model.ContractBuy_Replacement?.filter(
          (f) => f.NidLegal !== "00000000-0000-0000-0000-000000000000"
        ).map((f) => f.NidLegal) ?? []
      tmpNidLegalList = tmpNidLegalList.length === 0 ? null : tmpNidLegalList
      let tmpRequestContractInfoList = []
      if (this.model.RequestContractInfoList !== null) {
        tmpRequestContractInfoList =
          this.model.RequestContractInfoList.filter(
            (i) => i.IsSelected === true
          ) ?? []
      }
      // this.model.ContractBuy_Replacement.forEach

      this.showLoading()
      const payLoad = {
        PObj: {
          ...this.model,
          RequestContractInfoList: tmpRequestContractInfoList
        },
        pNidLegalList: {
          guid: tmpNidLegalList
        }
      }

      this.$services.ES.saveContractBuyInfo(payLoad)
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
              saveDesc: "ویرایش فرم صلح نامه خرید با موفقیت انجام شد"
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
    async saveContractBuySecretariat () {
      // تکمیل
      this.showLoading()
      // this.selectedRequest
      const payLoad = {
        PNIdProc: this.model._NIdProcess,
        PDistric: this.selectedRequest.BizCode.split("-")[0] ?? null
      }
      this.$services.ES.saveContractBuySecretariat(payLoad)
        .then(async ({ data }) => {
          this.saveContractBuySecretariatRes = this.getResponse(data)
          if (this.saveContractBuySecretariatRes.success) {
            if (
              !this.saveContractBuySecretariatRes.data
                .SaveContractBuy_SecretariatResult
            ) {
              this.showError("خطا در انجام عملیات")
              return
            }
            this.btnSaveSecretariatDisabled = true
            this.getContractBuyInfo()
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "saveContractBuySecretariat"
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
      this.PNIdContractBuy = item.NIdContractBuy
      this.PNIdRequest = item.NidRequest
      this.getContractBuyInfo()
    },
    getName (item) {
      return `صلحنامه خرید - ${item.ContractBuyListDesc}`
    },

    async print () {
      const reportPath = "/Estate/Rpt_Contract_Buy_New_2"
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
        saveDesc: `نمایش گزارش Rpt_Contract_Buy_New_2 برای صلح نامه خرید`
      })
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
      const reportPath = "/Estate/Rpt_RequestContractBuyInfo"
      const queryParams = {
        NIdRequest: this.PNIdRequest,
        SelectedItems: this.TmpStrSelectedItems
      }
      // NIdUser: this.getNidUser(),
      // UserName: this.getUserDisplayName()
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidProc,
        bizCodeTitle: "NidProc",
        saveDesc: `نمایش گزارش  ماده و تباصر برای صلح نامه خرید`
      })
      this.TmpStrSelectedItems = ""
    },

    // async sodorGhabz () {
    //   const reportPath =
    //     "/Estate/Rpt_Contract_Buy_Fiche"
    //   const queryParams = {
    //     NidProc: this.selectedNidProc,
    //     NIdUser: this.getNidUser(),
    //     UserName: this.getUserDisplayName()
    //   }
    //   this.showReport(reportPath, queryParams)
    //   await this.log({
    //     action: this.logActions.printReport,
    //     bizCode: this.selectedNidProc,
    //     bizCodeTitle: "NidProc",
    //     saveDesc: `نمایش گزارش Rpt_Contract_Buy_Fiche برای صلح نامه خرید`
    //   })
    // },
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
