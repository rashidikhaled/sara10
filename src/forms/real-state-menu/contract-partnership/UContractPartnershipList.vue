<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :hideTitle="hideTitle" :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="getContractPartnershipInfoRes" />
        <safa-status :result="saveContractPartnershipInfoRes" />
        <safa-status :result="delContractPartnershipInfoRes" />
      </template>
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
            <safa-tabs v-model="activeTab">
              <template v-slot:tabs>
                <tab-menu
                  name="specificationsContract"
                  label="مشخصات قرارداد مشارکت"
                />
                <tab-menu name="partiesContract" label="طرفین قرارداد" />
                <tab-menu name="confirmations" label="تأییدات" />
                <tab-menu name="historyOfPrinting" label="تاریخچه چاپ" />
              </template>
              <tab-content name="specificationsContract">
                <SpecificationsContract
                  v-model="model.ContractPartnership_Info"
                  :m="mode"
                />
              </tab-content>
              <tab-content name="partiesContract">
                <PartiesContract v-model="model" :m="mode" />
              </tab-content>
              <tab-content name="confirmations">
                <Confirmations v-model="model" :m="mode" />
              </tab-content>
              <tab-content name="historyOfPrinting">
                <HistoryOfPrinting v-model="model" :m="mode" />
              </tab-content>
            </safa-tabs>
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
          <template>
            <btn-default label="حذف" @click="deleteObj" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import SpecificationsContract from "./partials/SpecificationsContract.vue"
import PartiesContract from "./partials/PartiesContract.vue"
import Confirmations from "./partials/Confirmations.vue"
import HistoryOfPrinting from "./partials/HistoryOfPrinting.vue"
export default {
  mixins: [baseFormMixin],
  components: {
    SpecificationsContract,
    PartiesContract,
    Confirmations,
    HistoryOfPrinting
  },
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
  data () {
    return {
      formKey: "4C979D47-86BA-4FCE-9BB9-95B6C0FD9C6D",
      name: "UContractPartnershipList",
      title: "قرارداد مشارکت",
      main: true,
      activeTab: "specificationsContract",
      PNIdContractPartnership: "",
      PNIdRequest: "",
      treeView: [],
      spliterModel: 16,

      // #region services
      getContractPartnershipInfoRes: null,
      saveContractPartnershipInfoRes: null,
      delContractPartnershipInfoRes: null,
      loadObjRes: null,
      selectedListBox: null,
      // #endregion

      model: {
        ApprovalTask_Info: [],
        ContractPartnership_AfterProject_1: [],
        ContractPartnership_AfterProject_2: [],
        ContractPartnership_Brought_1: [],
        ContractPartnership_Brought_2: [],
        ContractPartnership_Info: {
          ContractPartnershipDate: null,
          ContractPartnershipNo: null,
          Description: null,
          EstimateAmount: null,
          FinancierName: null,
          NIdContractPartnership: "00000000-0000-0000-0000-000000000000",
          NIdContractPartnership_tmp: 0,
          NidRequest: "00000000-0000-0000-0000-000000000000",
          ProjectArea: null,
          ProjectName: null
        },
        IsConfirmContractBuy: false,
        PrintLog_Info: []
      }
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.ES.getContractPartnershipInfoRequestList({
            pNIdProc: this.currentObj?.NIdProcess || "00000000-0000-0000-0000-000000000000"
          })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res =
            this.loadObjRes.data.GetContractPartnership_Info_RequestListResult
          if (res && res.length > 0) {
            this.treeView = res.filter(
              (f) =>
                f.NIdContractPartnership !==
                "00000000-0000-0000-0000-000000000000"
            )
          }
          this.PNIdContractPartnership = res[0].NIdContractPartnership
          this.PNIdRequest = res[0].NidRequest
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: ""
          })
          this.getContractPartnershipInfo()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getContractPartnershipInfo () {
      if (!this.PNIdContractPartnership) return
      this.showLoading()
      this.$services.ES.getContractPartnershipInfo({
        PNIdContractPartnership: this.PNIdContractPartnership // "a97e242f-2de3-4c4b-a6ea-775685e19a0e"
      })
        .then(({ data }) => {
          this.getContractPartnershipInfoRes = this.getResponse(data)
          if (this.getContractPartnershipInfoRes.success) {
            this.model =
              this.getContractPartnershipInfoRes.data.GetContractPartnership_InfoResult
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveObj () {
      this.model.ContractPartnership_Info.NidRequest = this.selectedListBox.NidRequest
      this.showLoading()
      const payLoad = { PObj: { ...this.model } }
      this.$services.ES.saveContractPartnershipInfo(payLoad)
        .then(async ({ data }) => {
          this.saveContractPartnershipInfoRes = this.getResponse(data)
          if (this.saveContractPartnershipInfoRes.success) {
            this.model =
              this.saveContractPartnershipInfoRes.data.SaveContractPartnership_InfoResult
            this.showSuccess("ذخیره اطلاعات فرم قرارداد مشارکت با موفقیت انجام شد !")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.loadObj()
            this.getContractPartnershipInfo()
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
    deleteObj () {
      this.showConfirm("آیا از حذف اطلاعات اطمینان دارید؟").onOk(() => {
        this.delContractPartnershipInfo()
      })
    },
    delContractPartnershipInfo () {
      this.showLoading()
      this.$services.ES.delContractPartnershipInfo({
        pNIdProc: this.currentObj?.NIdProcess
      })
        .then(({ data }) => {
          this.delContractPartnershipInfoRes = this.getResponse(data)
          if (this.delContractPartnershipInfoRes.success) {
            this.showSuccess("حذف اطلاعات باموفقیت انجام شد")
            // this.delet = this.delHousePlanInfoRes.data?.DelHousePlan_InfoResult ?? false
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getName (item) {
      return `قرارداد مشارکت - ${item.ContractPartnershipDate}`
    },
    selectItem (item) {
      console.log("selectItem", item)
      this.PNIdContractPartnership = item.NIdContractPartnership
      this.PNIdRequest = item.NidRequest
      this.selectedListBox = item
      this.getContractPartnershipInfo(this.selectedListBox.NIdContractPartnership)
      this.getContractPartnershipInfo(this.selectedListBox.NidRequest)
    }
  }
}
</script>
