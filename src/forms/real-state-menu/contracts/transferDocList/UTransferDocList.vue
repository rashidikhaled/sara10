<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :padding="true" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="getTransferDocInfoRequestListRes" />
        <safa-status :result="getTransferDocInfoRes" />
        <safa-status :result="getTransferMainInfoMessageRes" />
        <safa-status :result="saveTransferDocInfoRes" />
        <safa-status :result="delTransferDocInfoRes" />
      </template>
      <fit>
        <safa-splitter v-model="spliterModel" class="fit">
          <template v-slot:before>
            <div class="flex column justify-between full-height">
              <fit>
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
              </fit>
            </div>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs v-model="activeTab">
                <template v-slot:tabs>
                  <tab-menu
                    name="DetailsTransmitterAndReceiver"
                    label="مشخصات انتقال سند"
                  />
                  <tab-menu
                    name="DetailsTransferDocList"
                    label="مشخصات انتقال دهنده/گیرنده"
                  />
                </template>
                <tab-content name="DetailsTransmitterAndReceiver">
                  <fit>
                    <DetailsTransmitterAndReceiver
                      v-model="model"
                      :m="mode"
                    />
                  </fit>
                </tab-content>
                <tab-content name="DetailsTransferDocList">
                  <fit>
                    <DetailsTransferDocList
                      v-model="model"
                      :m="mode"
                    />
                  </fit>
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
        <btn-default label="حذف" @click="deleteHandler" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import DetailsTransmitterAndReceiver from "./partials/DetailsTransmitterAndReceiver.vue"
import DetailsTransferDocList from "./partials/DetailsTransferDocList.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    DetailsTransmitterAndReceiver,
    DetailsTransferDocList
  },
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      name: "UTransferDocList",
      title: "انتقال سند",
      formKey: "52889A1C-052F-47C0-AE28-0E1C7C46CCF7",
      main: true,

      // variables
      activeTab: "DetailsTransmitterAndReceiver",
      spliterModel: 15,
      NIdSession: "00000000-0000-0000-0000-000000000000", // "e99c5cbb-b620-42a0-98fb-1181914fc174",
      NidProc: "00000000-0000-0000-0000-000000000000",
      ListItemDetails: [],

      // services
      getTransferDocInfoRequestListRes: null,
      getTransferDocInfoRes: null,
      getTransferMainInfoMessageRes: null,
      saveTransferDocInfoRes: null,
      delTransferDocInfoRes: null,

      // grids
      model: {
        IsConfirmContractBuy: false,
        TransferDoc_Info: {
          ArseArea: "",
          AyanArea: "",
          Barcode: "",
          BuildingDocNo: "",
          BureauNo: "",
          CI_TransferDocType: 0,
          Dang: "",
          DeclarationNo: "",
          DocDate: "",
          EstateOfficeNo: "",
          EstateOfficePage: "",
          Impart: "",
          LandDocNo: "",
          NIdTransferDoc: "00000000-0000-0000-0000-000000000000",
          NIdTransferDoc_tmp: 0,
          NIdTransferMain: "00000000-0000-0000-0000-000000000000",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          OwnershipDocDate: "",
          OwnershipDocPrintNo: "",
          RegisterPlack: "",
          TransferDocDesc: "",
          TransferDoctNo: ""
        },
        TransferDoc_Person_1: [],
        TransferDoc_Person_2: [],
        _CodeString: "",
        _NIdTransferDoc: "00000000-0000-0000-0000-000000000000"
      },
      treeView: [],
      NIdTransferDoc: "00000000-0000-0000-0000-000000000000",
      NidRequest: "00000000-0000-0000-0000-000000000000",
      DocDate: ""

    }
  },
  created () {
    this.getTransferDocInfoRequestList()
    this.getTransferMainInfoMessage()
  },
  methods: {
    selectItem (item) {
      this.NIdTransferDoc = item.NIdTransferDoc
      this.getTransferDocInfo()
    },
    getName (item) {
      this.DocDate = item.DocDate
      return `${item.DocDate} - سند انتقال`
    },
    getTransferDocInfoRequestList () {
      this.showLoading()
      const payload = {
        pNIdProc:
        this.selectedRequest.NidProc ||
        "00000000-0000-0000-0000-000000000000" }
      this.$services.ES.getTransferDocInfoRequestList(payload)
        .then(async ({ data }) => {
          this.getTransferDocInfoRequestListRes = this.getResponse(data)
          if (this.getTransferDocInfoRequestListRes.success) {
            const res = this.getTransferDocInfoRequestListRes.data.GetTransferDoc_Info_RequestListResult
            if (res && res.length > 0) {
              this.NIdTransferDoc = res[0].NIdTransferDoc
              this.NidRequest = res[0].NidRequest
              this.treeView = res
                .filter(
                  (f) =>
                    f.NIdTransferDoc !== "00000000-0000-0000-0000-000000000000"
                )
                .orderBy((f) => f.SupplySourcesCode)
            }
            this.getTransferDocInfo()
            await this.log({
              action: this.logActions.view,
              bizCode: this.NidRequest,
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
    getTransferDocInfo () {
      this.showLoading()
      const payload = {
        PNidTransferDoc: this.NIdTransferDoc
      }
      this.$services.ES.getTransferDocInfo(payload)
        .then(async ({ data }) => {
          this.getTransferDocInfoRes = this.getResponse(data)
          if (this.getTransferDocInfoRes.success) {
            this.model = this.getTransferDocInfoRes.data.GetTransferDoc_InfoResult
            this.model.TransferDoc_Info.NidRequest = this.NidRequest
            await this.log({
              action: this.logActions.view,
              bizCode: this.NidRequest,
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
    getTransferMainInfoMessage () {
      this.showLoading()
      const payload = {
        pNIdProc:
          this.selectedRequest.NidProc ||
          "00000000-0000-0000-0000-000000000000"
      }
      this.$services.ES.getTransferMainInfoMessage(payload)
        .then(async ({ data }) => {
          this.getTransferMainInfoMessageRes = this.getResponse(data)
          if (this.getTransferMainInfoMessageRes.success) {
            // const res = this.result.data.GetTransferMain_Info_MessageResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.NidRequest,
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
      if (!this.isValidForm()) return
      this.showLoading()
      const payLoad = {
        PObj: this.model
      }
      this.$services.ES.saveTransferDocInfo(payLoad)
        .then(async ({ data }) => {
          this.saveTransferDocInfoRes = this.getResponse(data)
          if (this.saveTransferDocInfoRes.success) {
            this.isEditable = false
            this.getTransferDocInfoRequestList()
            this.getTransferMainInfoMessage()
            await this.log({
              action: this.logActions.save,
              bizCode: this.NidRequest,
              bizCodeTitle: "NidRequest",
              nosaziCode: "",
              nidWorkItem: "",
              saveDesc: `ذخیره اطلاعات فرم انتقال سند برای شماره درخواست ${this.NidRequest} انجام گردید.`
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
    deleteHandler () {
      if (this.treeView.length === 0 || this.DocDate === "جدید")
      { return }
      this.showConfirm("آیا اطلاعات مورد نظر  حذف شود؟").onOk(async () => {
        this.showLoading()
        const payLoad = {
          PNIdTransferDoc: this.NIdTransferDoc
        }
        this.$services.ES.delTransferDocInfo(payLoad)
          .then(async ({ data }) => {
            this.delTransferDocInfoRes = this.getResponse(data)
            if (this.delTransferDocInfoRes.success) {
              this.showSuccess("حذف اطلاعات باموفقیت انجام شد")
              this.getTransferDocInfoRequestList()
              this.getTransferMainInfoMessage()
              await this.log({
                action: this.logActions.delete,
                bizCode: this.NidRequest,
                bizCodeTitle: "NidRequest",
                nosaziCode: "",
                nidWorkItem: "",
                saveDesc: ""
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
      })
    }
  }
}
</script>
