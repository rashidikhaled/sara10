<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :padding="true" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="getContractBuyInfoRes" />
        <safa-status :result="saveAssignRequestToUserRes" />
        <safa-status :result="saveContractBuyInfoRes" />
      </template>
      <fit>
        <safa-splitter v-model="spliterModel" class="fit">
          <!-- <template v-slot:before>
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in treeView"
                :key="index"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" icon="payment" />
                </q-item-section>
                <q-item-section>
                   قرارداد جدید
                </q-item-section>
              </q-item>
            </q-list>
          </template> -->
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
                  <tab-menu name="contractsInfo" label="مشخصات قرارداد" />
                  <tab-menu name="DebtOrCredit" label="بدهکاری / بستانکاری" />
                  <tab-menu
                    name="SeCretariatApprovals"
                    label="دبیرخانه/تاییدات"
                  />
                  <tab-menu name="HistoryOfPrinting" label="تاریخچه چاپ" />
                  <tab-menu name="OtherDetails" label="سایر اطلاعات" />
                </template>
                <tab-content name="contractsInfo">
                  <fit>
                    <contractsInfo v-model="model" :m="mode" />
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
                      :saveContractBuySecretariat="saveContractBuySecretariat"
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
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import SeCretariatApprovals from "./partials/SeCretariatApprovals.vue"
import HistoryOfPrinting from "./partials/HistoryOfPrinting"
import OtherDetails from "./partials/OtherDetails.vue"
import contractsInfo from "./contractsInfo/contractsInfo.vue"
import DebtOrCredit from "../../parvande/contract-buy-list/partials/DebtOrCredit.vue"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    },
    baseNosaziCode: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    SeCretariatApprovals,
    HistoryOfPrinting,
    OtherDetails,
    contractsInfo,
    DebtOrCredit
  },
  data () {
    return {
      title: "قرارداد - سوابق",
      formKey: "63F5717A-557F-42E8-A2EC-556A76AADA36",
      name: "UContractHistory",
      main: true,

      activeTab: "contractsInfo",
      spliterModel: 15,
      ContractHistoryDesc: null,
      treeView: [],
      // services
      loadObjRes: null,
      saveAssignRequestToUserRes: null,
      getContractBuyInfoRes: null,
      saveContractBuyInfoRes: null,

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
          SecretariatDate: currentDate(),
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
        UserInfo_GUID: "00000000-0000-0000-0000-000000000000",
        UserName: "",
        _CI_RequestType: "0",
        _NIdContractBuy: "00000000-0000-0000-0000-000000000000",
        _NIdProcess: "00000000-0000-0000-0000-000000000000",
        _NIdRequest: "00000000-0000-0000-0000-000000000000"
      }
    }
  },
  mounted () {
    this.loadObj()
  },
  watch: {
    selelectedItemTree () {
      this.loadObj()
    }
  },
  methods: {
    selectItem (item) {
      this.selelectedItemTree = { ...item }
      this.PNIdRequest = item.NidRequest
    },
    getName (item) {
      return `قرداد - ${item.ContractBuyDate}`
    },
    async loadObj () {
      try {
        this.showLoading()
        // const payload = {
        //   // pNidProc: "6ee58e84-dc58-4fd2-a671-2cf2231f1414"
        //   pNidProc:
        //   this.selectedRequest.NidProc ||
        //   "00000000-0000-0000-0000-000000000000"
        // }
        const { data } = await this.$services.ES.getContractBuyInfoRequestList({ pNIdProc:
          this.currentObj?.NIdProcess || "00000000-0000-0000-0000-000000000000" })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.treeView = this.loadObjRes?.data?.GetContractBuy_Info_RequestListResult
          if (this.treeView.length > 0) {
            this.selelectedItemTree = {
              ...this.treeView[this.treeView.length - 1]
            }
          }
          // {
          //   this.treeView = res.filter(
          //     (f) => f.NIdContractBuy !== "00000000-0000-0000-0000-000000000000"
          //   )
          // }
          this.PNIdContractBuy = this.treeView[0].NIdContractBuy
          this.PNIdRequest = this.treeView[0].NidRequest
          // this.NIdSession = this.loadObjRes.data
          // console.log(res)
          // this.model = this.loadObjRes.data
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
      this.showLoading()
      const payLoad = {
        PNIdContractBuy: this.selelectedItemTree.NIdContractBuy, // "5dfa172a-76f8-4fab-a4ff-5b435bece002",
        PNIdRequest: this.selelectedItemTree.NidRequest // "2dfad0bb-b77b-42d9-a935-aea7e1c160fe"
        // this.selelectedItemTree.NIdContractBuy
      }
      try {
        const { data } = await this.$services.ES.getContractBuyInfo(payLoad)
        this.getContractBuyInfoRes = this.getResponse(data)
        if (this.getContractBuyInfoRes.success) {
          this.model = this.getContractBuyInfoRes?.data?.GetContractBuy_InfoResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.selelectedItemTree,
            bizCodeTitle: "",
            saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveContractBuySecretariat () {
      this.showLoading()
      const payLoad = {
        PNIdProc: this.model._NIdProcess,
        PDistric: null
      }
      this.$services.ES.saveContractBuySecretariat(payLoad)
        .then(async ({ data }) => {
          this.saveOvjRes = this.getResponse(data)
          if (this.saveAssignRequestToUserRes.success) {
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
    // async loadObj () {
    //   this.showLoading()
    //   const payload = {
    //     "pNIdProc": "6ee58e84-dc58-4fd2-a671-2cf2231f1414"
    //   }
    //   if (this.selectedRequest) {
    //     this.NidProc = "6ee58e84-dc58-4fd2-a671-2cf2231f1414"
    //     // "6ee58e84-dc58-4fd2-a671-2cf2231f1414"
    //   }
    //   try {
    //     debugger
    //     const { data } = await this.$services.ES.getContractBuyInfoRequestList({
    //       pNIdProc: this.NidProc
    //     })
    //     this.loadObjRes = this.getResponse(data)
    //     if (this.loadObjRes.success) {
    //       debugger
    //       const res = this.loadObjRes.data.GetContractBuy_Info_RequestListResult
    // if (res && res.length > 0) {
    //   this.treeView = res.filter(
    //     (f) => f.NIdContractBuy !== "00000000-0000-0000-0000-000000000000"
    //   )
    // }
    // this.PNIdContractBuy = res[0].NIdContractBuy
    // this.PNIdRequest = res[0].NidRequest
    // // this.NIdSession = this.loadObjRes.data
    //       await this.log({
    //         action: this.logActions.view,
    //         bizCode: "",
    //         bizCodeTitle: ""
    //       })
    //       this.getContractBuyInfo()
    //     }
    //   } catch (e) {
    //     console.error(e)
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    saveObj () {
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
      this.showLoading()
      const payLoad = { PObj: { ...this.model } }
      this.$services.ES.saveContractBuyInfo(payLoad)
        .then(async ({ data }) => {
          this.saveContractBuyInfoRes = this.getResponse(data)
          if (this.saveContractBuyInfoRes.success) {
            this.model =
              this.saveContractBuyInfoRes.data.SaveContractBuy_InfoResult
            this.showError(
              "ذخیره اطلاعات با موفقیت انجام شد"
            )

            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره ی اطلاعات فرم ${this.title} انجام گردید.`

            })
          }
          await this.loadObj()
          this.isEditable = false
          this.$emit('afterSave')
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
