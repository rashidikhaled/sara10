<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="true" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="getContractBuyInfoRes" />
        <safa-status :result="saveContractBuySecretariatRes" />
        <safa-status :result="ServicTabRequestContractInfoRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="delContractBuyConfirmRes" />
        <safa-status :result="delContractBuyInfoRes" />
        <safa-status :result="saveContractBuyConfirmRes" />
      </template>
      <fit>
        <safa-splitter v-model="spliterModel" class="fit">
          <template v-slot:before>
            <!-- <q-list bordered>
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
            </q-list> -->
            <safa-list
              :items="treeView"
              :actions="false"
              title="لیست توافقنامه ها"
              cdcName="treeView"
              titleField="ContractBuyListDescTitle"
              @selectItem="selectItem($event)"
            />
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs v-model="activeTab">
                <template v-slot:tabs>
                  <tab-menu name="DetailsAgreement" label="مشخصات توافقنامه" />
                  <tab-menu name="DebtOrCredit" label="بدهکاری/بستانکاری" />
                  <tab-menu
                    name="SeCretariatApprovals"
                    label="دبیرخانه/تأییدات"
                  />
                  <tab-menu name="HistoryOfPrinting" label="تاریخچه چاپ" />
                  <tab-menu name="OtherDetails" label="سایر اطلاعات" />
                  <tab-menu name="TabSign" label="امضا و اثر انگشت مالکین" />
                </template>
                <tab-content name="DetailsAgreement">
                  <DetailsAgreement v-model="model" :m="mode" :cmbContractBuyItemsSource="cmbContractBuyItemsSource" />
                </tab-content>
                <tab-content name="DebtOrCredit" :padding="false">
                  <DebtOrCredit
                    v-model="model"
                    :m="mode"
                    :formKey="formKey"
                    hideTitle
                  />
                </tab-content>
                <tab-content name="SeCretariatApprovals">
                  <SeCretariatApprovals
                    v-model="model"
                    :saveContractBuySecretariat="saveContractBuySecretariat"
                    :m="mode"
                  />
                </tab-content>
                <tab-content name="HistoryOfPrinting" :padding="false">
                  <HistoryOfPrinting v-model="model" :m="mode" />
                </tab-content>
                <tab-content name="OtherDetails">
                  <OtherDetails v-model="model" :m="mode" />
                </tab-content>
                <tab-content name="TabSign" :padding="false">
                  <TabSign
                    v-model="model"
                    :m="mode"
                    @SaveSignFingerPrint="SaveSignFingerPrint"
                  />
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer v-if="PNIdRequest !== ''">
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template>
            <btn-delete @click="delContractBuyInfo" />
            <btn-default
              label="تایید نهایی"
              @click="saveContractBuyConfirm"
              :disabled="showContractBuyConfirm"
            />
            <btn-default
              label="ابطال تایید نهایی"
              @click="delContractBuyConfirm"
              :disabled="!showContractBuyConfirm"
            />
            <btn-default
              label="گزارش"
              @click="print"
              spId="20f74760-075d-41ef-91bb-b1215c3cb914"
              spCaption="دکمه گزارش"
            />
            <btn-default
              label="صدور قبض"
              @click="sodorFiche"
              spId="20f74760-075d-41ef-91bb-b1215c3cb914"
              spCaption="صدور قبض"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import DetailsAgreement from "./partials/DetailsAgreement.vue"
import DebtOrCredit from "./partials/DebtOrCredit.vue"
import SeCretariatApprovals from "./partials/SeCretariatApprovals.vue"
import HistoryOfPrinting from "./partials/HistoryOfPrinting.vue"
import OtherDetails from "./partials/OtherDetails.vue"
import TabSign from "./partials/TabSign.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    DetailsAgreement,
    DebtOrCredit,
    SeCretariatApprovals,
    HistoryOfPrinting,
    OtherDetails,
    TabSign
  },
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      formKey: "895ADEFE-2AAF-4DCF-BC76-2186DD883846",
      name: "UAgreementHistory",
      title: "توافقنامه",
      main: true,
      workflowCompatible: true,

      // variables
      activeTab: "DetailsAgreement",
      showContractBuyConfirm: false,
      showDelContractBuyConfirm: true,
      spliterModel: 16,
      NIdSession: "00000000-0000-0000-0000-000000000000",
      NidProc: "00000000-0000-0000-0000-000000000000",
      treeView: [],
      PNIdContractBuy: "",
      PNIdRequest: "",

      // services
      loadObjRes: null,
      getContractBuyInfoRes: null,
      saveContractBuySecretariatRes: null,
      ServicTabRequestContractInfoRes: null,
      delContractBuyInfoRes: null,
      delContractBuyConfirmRes: null,
      saveContractBuyConfirmRes: null,
      saveObjRes: null,

      // model
      model: {
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
          ContractBuyNo: null,
          ContractBuyNoRel: null,
          ContractBuyListDesc: null,
          IsCapitaBelowSeparationCriterion: true,
          CouncilApprovedDate: null,
          CouncilApprovedNo: null,
          DebitCreditDesc: null,
          Description: null,
          EvaluationPrice: null,
          IsArchived: false,
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
        ContractBuy_Privilege: [],
        ContractBuy_Replacement: [],
        DebitCredit_Info_1: null,
        DebitCredit_Info_2: [],
        EvaluationDesc: null,
        Evaluation_Info_RequestList: null,
        Evaluation_Price: null,
        IsConfirmContractBuy: false,
        PrintLog_Info: null,
        RequestContractInfo: null,
        RequestContractInfoList: null,
        RequestOwnerSignFingerPrint: null,
        Sum_DebitCredit_1: "0",
        Sum_DebitCredit_2: "0",
        Total_Price: null,
        cmbEvaluation: null,
        UserInfo_GUID: "00000000-0000-0000-0000-000000000000",
        UserName: "",
        _CI_RequestType: "0",
        _NIdContractBuy: "00000000-0000-0000-0000-000000000000",
        _NIdProcess: "00000000-0000-0000-0000-000000000000",
        _NIdRequest: "00000000-0000-0000-0000-000000000000"
      },

      cmbContractBuyItemsSource: []
    }
  },

  watch: {
    activeTab () {
      if (this.activeTab === "TabRequestContractInfo") {
        this.ServicTabRequestContractInfo()
      }
    }
  },

  methods: {

    async loadObj () {
      try {
        const { data } = await this.$services.ES.getContractBuyInfoRequestList({ pNIdProc: this.NidProc })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res =
            this.loadObjRes.data.GetContractBuy_Info_RequestListResult
          if (Array.isArray(res) && res.length > 0) {
            this.treeView = res.filter(
              (f) => f.NIdContractBuy !== "00000000-0000-0000-0000-000000000000"
            ).map(m => {
              return {
                ...m,
                ContractBuyListDescTitle: this.getName(m) ?? ''
              }
            })
            const endOfRes = res.length - 1
            this.PNIdContractBuy = res[endOfRes].NIdContractBuy
            this.PNIdRequest = res[endOfRes].NidRequest
            this.disabledContractBuyConfirm = !!res[endOfRes].ConfirmDate
            this.getContractBuyInfo()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
      }
    },
    async getContractBuyInfo () {
      this.activeTab = "DetailsAgreement"
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
          const l = this.loadObjRes?.data?.GetContractBuy_Info_RequestListResult ?? []
          const list = l.filter(f => f.NIdContractBuy !== this.model.ContractBuy_Info.NIdContractBuy)
          this.cmbContractBuyItemsSource = list.map(m => {
            return {
              ...m,
              ID: m.NIdContractBuy,
              Title: m?.ContractBuyNo ?? ''
            }
          })

          if (Array.isArray(this.model.ContractBuy_Info.DebitCredit_Info_2)) {
            this.model.Sum_DebitCredit_2 = this.model.DebitCredit_Info_2.reduce(
              (a, b) => a + parseFloat(b.DebitCreditPrice),
              0
            )
          }
          if (Array.isArray(this.model.ContractBuy_Info.DebitCredit_Info_1)) {
            this.model.Sum_DebitCredit_1 = this.model.DebitCredit_Info_1.reduce(
              (a, b) => a + parseFloat(b.DebitCreditPrice),
              0
            )
          }

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
            saveDesc: "نمایش اطلاعات فرم توافقنامه بارگذاری شد"
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
      this.showLoading()
      try {
        const { data } = await this.$services.ES.saveContractBuyConfirm({
          PNIdProc:
            this.selectedNidProc ?? "00000000-0000-0000-0000-000000000000"
        })
        this.saveContractBuyConfirmRes = this.getResponse(data)
        if (this.saveContractBuyConfirmRes.success) {
          if (
            this.saveContractBuyConfirmRes.data.SaveContractBuy_ConfirmResult
          ) {
            this.disabledContractBuyConfirm = true
            this.showError("تایید نهایی توافقنامه با موفقیت انجام شد")
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
    async delContractBuyInfo () {
      this.showConfirm("آیا اطلاعات مورد نظر حذف شود؟").onOk(() => {
        this.confirmDelete()
      })
    },
    async confirmDelete () {
      try {
        this.showLoading()
        const { data } = await this.$services.ES.delContractBuyInfo({
          PNIdContractBuy: this.PNIdContractBuy
        })
        this.delContractBuyInfoRes = this.getResponse(data)
        if (this.delContractBuyInfoRes.success) {
          this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async delContractBuyConfirm () {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.delContractBuyConfirm({
          PNIdProc:
            this.selectedNidProc ?? "00000000-0000-0000-0000-000000000000"
        })
        this.delContractBuyConfirmRes = this.getResponse(data)
        if (this.delContractBuyConfirmRes.success) {
          this.showContractBuyConfirm = false
          this.showError("ابطال تأیید نهایی توافقنامه با موفقیت انجام شد")
          this.getContractBuyInfo()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveObj () {
      this.showLoading()
      this.model.ContractBuy_Info.NidRequest = this.model._NIdRequest
      this.model.PrintLog_Info = null
      this.model.ApprovalTask_Info = null
      this.model.ContractBuy_Info.ConfirmDate =
        this.model.ContractBuy_Info.ConfirmDate === null
          ? ""
          : this.model.ContractBuy_Info.ConfirmDate
      this.model.ContractBuy_Info.Type = 1

      // this.model.ContractBuy_Info.NIdContractBuyRel = (cmbContractBuy.SelectedValue != null ? Guid.Parse(cmbContractBuy.SelectedValue.ToString()) : Guid.Empty);
      // this.model.ContractBuy_Info.NIdEvaluation = (cmbEvaluation.SelectedValue != null ? Guid.Parse(cmbEvaluation.SelectedValue.ToString()) : Guid.Empty);

      this.model.UserInfo_GUID = this.getNidUser()
      this.model.UserName = this.getUserDisplayName()
      // if (R_Have.IsChecked === true)
      //   this.model.ContractBuy_Info.IsHaveCouncil = true;
      // else if (R_DontHave.IsChecked === true)
      //   this.model.ContractBuy_Info.IsHaveCouncil = false;
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
      let request = {
        ...this.model
      }
      request._NIdProcess = this.NidProc

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
            await this.log({
              action: this.logActions.save,
              bizCode: this.NidProc,
              bizCodeTitle: "NidProc",
              saveDesc: "ویرایش اطلاعات فرم توافقنامه انجام شد"
            })
            this.loadObj()
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
    saveContractBuySecretariat () {
      this.showLoading()
      const payLoad = {
        PNIdProc: this.model._NIdProcess || this.currentObj?.NIdProcess,
        PDistric: null
      }
      this.$services.ES.saveContractBuySecretariat(payLoad)
        .then(async ({ data }) => {
          this.saveOvjRes = this.getResponse(data)
          if (this.saveAssignRequestToUserRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.NidProc,
              bizCodeTitle: "NidProc",
              saveDesc: "ویرایش اطلاعات فرم توافقنامه انجام شد"
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
    ServicTabRequestContractInfo () {
      this.showLoading()
      const payLoad = {
        pRequestType: "0" || this.currentObj.RequestType
      }
      this.$services.ES.getRequestContractInfo(payLoad)
        .then(async ({ data }) => {
          this.ServicTabRequestContractInfoRes = this.getResponse(data)
          if (this.ServicTabRequestContractInfoRes.success) {
            this.model.RequestContractInfoList =
              this.ServicTabRequestContractInfoRes.data.GetRequestContractInfoResult.RequestContractInfoList
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
    async SaveSignFingerPrint (e) {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.saveSignFingerPrint({
          _NIdRequest: this.PNIdRequest || this.currentObj.NidRequest,
          pType: e.SecretariatNo,
          pPic: e.SImageFingerPrint
        })
        this.saveSignFingerPrintRes = this.getResponse(data)
        if (this.saveSignFingerPrintRes.success) {
          this.showContractSaleConfirm = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.NidProc,
            bizCodeTitle: "NidProc",
            saveDesc: "ویرایش اطلاعات فرم توافقنامه انجام شد"
          })
          this.showSuccess("ذخیره با موفقیت انجام شد")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selectItem (item) {
      this.PNIdContractBuy = item.NIdContractBuy
      this.PNIdRequest = item.NidRequest
      this.getContractBuyInfo()
    },
    getName (item) {
      return `توافقنامه - ${item.ContractBuyListDesc}`
    },
    async print () {
      const reportPath = "/Estate/Rpt_Contract_Buy_New_2"
      const queryParams = {
        NidProc: this.selectedNidProc,
        UserID: this.getNidUser(),
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidProc,
        bizCodeTitle: "NidProc",
        saveDesc: `نمایش گزارش Rpt_Contract_Sale برای توافقنامه`
      })
    },
    async sodorFiche () {
      const reportPath = "/Estate/Rpt_Contract_Buy_Fiche"
      const queryParams = {
        NidProc: this.selectedNidProc,
        UserID: this.getNidUser(),
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidProc,
        bizCodeTitle: "NidProc",
        saveDesc: `نمایش گزارش Rpt_Contract_Buy_Fiche برای توافقنامه`
      })
    }
  },

  mounted () {
    this.NidProc =
      this.currentObj?.NidProc ??
      this.selectedRequest?.NidProc ??
      "00000000-0000-0000-0000-000000000000" // "973f60e6-55b4-4551-8817-32610e1b889c"
    this.loadObj(this.NidProc)
  }
}
</script>
