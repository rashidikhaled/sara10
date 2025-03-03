<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="getContractBuyInfoRequestListRes" />
        <safa-status :result="getContractBuyInfoRes" />
        <safa-status :result="saveContractBuyInfoRes" />
        <safa-status :result="getApprovalTaskByNIdProcUserRes" />
        <safa-status :result="saveApprovalTaskInfoRes" />
        <safa-status :result="delContractBuyInfoRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          :actions="false"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="کد ارجاع"
              v-model="NIdWorkItem"
              cdcName="NIdWorkItem"
              label-width="80px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نوع درخواست"
              v-model="RequestType"
              cdcName="RequestType"
              label-width="80px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام متقاضی"
              v-model="RequesterName"
              cdcName="RequesterName"
              label-width="80px"
              m="r"
            />
          </FormControl>
        </FormRow>
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
                  <tab-menu name="DetailsContracts" label="مشخصات قراردادها" />
                  <tab-menu name="DebtOrCredit" label="بدهکاری / بستانکاری" />
                  <tab-menu name="Printhistory" label="تاریخچه چاپ" />
                  <tab-menu name="OtherDetails" label="سایر اطلاعات" />
                </template>
                <tab-content name="DetailsContracts">
                  <fit>
                    <DetailsContracts
                      :m="mode"
                      v-model="model"
                      :formKey="formKey"
                      :title="title"
                      :name="name"
                    />
                  </fit>
                </tab-content>
                <tab-content name="DebtOrCredit">
                  <fit>
                    <DebtOrCredit
                      :m="mode"
                      :comboResult="comboResult"
                      v-model="model"
                      :formKey="formKey"
                      :title="title"
                      :name="name"
                    />
                  </fit>
                </tab-content>
                <tab-content name="Printhistory">
                  <fit>
                    <Printhistory
                      :m="mode"
                      v-model="model"
                      :formKey="formKey"
                      :title="title"
                      :name="name"
                    />
                  </fit>
                </tab-content>
                <tab-content name="OtherDetails">
                  <fit>
                    <OtherDetails
                      :m="mode"
                      v-model="model"
                      :formKey="formKey"
                      :title="title"
                      :name="name"
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
        >
          <template v-if="!isEditable">
            <btn-delete label="حذف" @click="deleteHandler"></btn-delete>
            <btn-save label="تایید صلحنامه" @click="confirmHandler"></btn-save>
            <btn-default label="صدور قبض" @click="ReportClick"></btn-default>
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import DetailsContracts from "./partials/DetailsContracts.vue"
import DebtOrCredit from "./partials/DebtOrCredit.vue"
import Printhistory from "./partials/Printhistory.vue"
import OtherDetails from "./partials/OtherDetails.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    DetailsContracts,
    Printhistory,
    OtherDetails,
    DebtOrCredit
  },
  data () {
    return {
      name: "UContractBuyList3",
      title: "تایید واگذاری",
      formKey: "B19C9D2E-D032-4ABB-8461-FC067277A8BA",
      main: true,

      // variables
      activeTab: "DebtOrCredit",
      spliterModel: 15,
      ListItem: [],
      ListItemDetails: [],
      baseNosaziCode: {},
      model: {
        ContractBuy_Info: {
          ApplyingArticle45Date: "",
          ApplyingArticle45No: "",
          CI_ContractBuySubject: 0,
          CI_ContractCancelReason: 0,
          CancelDate: "",
          CancelDesc: "",
          CancelNo: "",
          ConfirmDate: true,
          ContractBuyDate: "",
          ContractBuyNo: "",
          CouncilApprovedDate: "",
          CouncilApprovedNo: "",
          DebitCreditDesc: "",
          Description: "",
          IsArchived: false,
          MayorOrderDate: "",
          MayorOrderNo: "",
          NoticeDate: "",
          NoticeNo: ""
        },
        ContractBuy_Other: [],
        ContractBuy_Privilege: [],
        ContractBuy_Replacement: [],
        DebitCredit_Info_1: [],
        DebitCredit_Info_2: [],
        PrintLog_Info: [],
        Sum_DebitCredit_1: "",
        Sum_DebitCredit_2: ""
      },
      treeView: [],
      NIdWorkItem: "",
      RequestType: "",
      RequesterName: "",

      // services
      getContractBuyInfoRequestListRes: null,
      getContractBuyInfoRes: null,
      saveContractBuyInfoRes: null,
      getApprovalTaskByNIdProcUserRes: null,
      saveApprovalTaskInfoRes: null,
      delContractBuyInfoRes: null,
      confirmModel: {},
      preLoadObjRes: null,
      loadObjRes: null,
      saveObjRes: null,
      comboResult: [],
      NIdUser: "00000000-0000-0000-0000-000000000000",
      ContractBuyDate: ""
    }
  },
  created () {
    if (this.selectedRequest) {
      this.NidProc = this.selectedRequest.NidProc
    }
    this.loadObj()
    this.loadSelectedRequestInf()
    this.NIDProc = this.selectedRequest.NidProc
    this.NIdUser = this.getNidUser()
  },
  methods: {
    selectItem (item) {
      this.NIdContractBuy = item.PNIdContractBuy
      this.NIdRequest = item.PNIdRequest
      this.ContractBuyDate = item.ContractBuyDate
      this.loadObj()
    },
    getName (item) {
      return `قرارداد - ${item.ContractBuyDate} `
    },
    loadSelectedRequestInf () {
      let data = this.selectedRequest
      this.NIdWorkItem = data.NidWorkItem
      this.RequestType = ""
      this.RequesterName = data.ProcRequester
    },
    loadObj () {
      this.showLoading()
      const payload = {
        pNIdProc: this.NidProc
      }
      this.$services.ES.getContractBuyInfoRequestList(payload)
        .then(async ({ data }) => {
          this.getContractBuyInfoRequestListRes = this.getResponse(data)
          if (this.getContractBuyInfoRequestListRes.success) {
            const res =
              this.getContractBuyInfoRequestListRes.data
                .GetContractBuy_Info_RequestListResult
            if (res && res.length > 0) {
              this.treeView = res
                .filter(
                  (f) => f.NidRequest !== "00000000-0000-0000-0000-000000000000"
                )
                .orderBy((f) => f.NIdContractBuy)
            }
            debugger
            this.NIdContractBuy = res.NIdContractBuy
            this.NIdRequest = res.NidRequest
            this.getContractBuyInfo()
            await this.log({
              action: this.logActions.view,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: `بارگذاری اطلاعات ${this.title} انجام گردید.`
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
    getContractBuyInfo () {
      this.showLoading()
      const payload = {
        PNIdContractBuy: this.NIdContractBuy,
        PNIdRequest: this.NIdRequest
      }
      this.$services.ES.getContractBuyInfo(payload)
        .then(async ({ data }) => {
          this.getContractBuyInfoRes = this.getResponse(data)
          if (this.getContractBuyInfoRes.success) {
            this.model =
              this.getContractBuyInfoRes.data.GetContractBuy_InfoResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: ""
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
    confirmHandler () {
      this.showLoading()
      const payload = {
        PNIdProc: this.NidProc,
        PNIdUser: this.NIdUser
      }
      this.$services.ES.getApprovalTaskByNIdProcUser(payload)
        .then(async ({ data }) => {
          this.getApprovalTaskByNIdProcUserRes = this.getResponse(data)
          if (this.getApprovalTaskByNIdProcUserRes.success) {
            this.confirmModel =
              this.getApprovalTaskByNIdProcUserRes.data.GetApprovalTask_ByNIdProcUserResult.ApprovalTask_Info
            this.loadObj()
            this.saveApprovalTaskInfo()
            await this.log({
              action: this.logActions.view,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: ""
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
    saveApprovalTaskInfo () {
      this.showLoading()
      const payload = this.confirmModel
      this.$services.ES.saveApprovalTaskInfo(payload)
        .then(async ({ data }) => {
          this.saveApprovalTaskInfoRes = this.getResponse(data)
          if (this.saveApprovalTaskInfoRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: ""
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
    saveObj () {
      this.showLoading()
      if (this.model.IsConfirmContractBuy) {
        this.showError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
      }
      this.model.ContractBuy_Info.NidRequest = this.model._NIdRequest
      this.model.PrintLog_Info = null
      this.model.ApprovalTask_Info = null
      this.model.ContractBuy_Info.ConfirmDate =
        this.model.ContractBuy_Info.ConfirmDate === null
          ? ""
          : this.model.ContractBuy_Info.ConfirmDate
      this.model.ContractBuy_Info.Type = 1

      this.model.UserInfo_GUID = this.getNidUser()
      this.model.UserName = this.getUserDisplayName()

      let tmpNidLegalList = []
      this.model.ContractBuy_Replacement.map((e) => {
        if (e.NidLegal !== "00000000-0000-0000-0000-000000000000") {
          tmpNidLegalList.push(e.NidLegal)
        }
      })

      const payLoad = { PObj: this.model, pNidLegalList: tmpNidLegalList }
      this.$services.ES.saveContractBuyInfo(payLoad)
        .then(async ({ data }) => {
          this.saveContractBuyInfoRes = this.getResponse(data)
          if (this.saveContractBuyInfoRes.success) {
            debugger
            this.loadObj()
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.NIdRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: `ذخیره اطلاعات فرم تایید واگذاری برای شماره درخواست ${this.NIdRequest} انجام گردید.`
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
    ReportClick () {
      const reportPath = "/Estate/Rpt_Contract_Buy2_Fiche"
      const queryParams = {
        NidProc: this.NidProc
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.NIdRequest,
        bizCodeTitle: "NidRequest",
        nosaziCode: "",
        nidWorkItem: "",
        saveDesc: ""
      })
    },
    deleteHandler () {
      if (this.ContractBuyDate === "جدید" || this.ContractBuyDate === "") {
        return
      }
      this.showConfirm("آیا اطلاعات مورد نظر  حذف شود؟").onOk(async () => {
        this.showLoading()
        const payLoad = { PNIdContractBuy: this.NIdContractBuy }
        this.$services.ES.delContractBuyInfo(payLoad)
          .then(async ({ data }) => {
            this.delContractBuyInfoRes = this.getResponse(data)
            if (this.delContractBuyInfoRes.success) {
              this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
              this.LoadObj()
              await this.log({
                action: this.logActions.delete,
                bizCode: this.NIdRequest,
                bizCodeTitle: "NidRequest",
                nosaziCode: "",
                nidWorkItem: "",
                saveDesc: ``
              })
            } else {
              this.showError("خطا در حذف اطلاعات")
            }
          })
          .catch((e) => {
            this.showError(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
