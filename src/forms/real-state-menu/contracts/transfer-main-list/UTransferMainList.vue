<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="true" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="getTransferMainInfoRequestListRes" />
        <safa-status :result="saveTransferMainInfoRes" />
        <safa-status :result="getTransferMainInfoRes" />
      </template>
      <safa-splitter v-model="spliterModel" class="fit">
        <template v-slot:before>
          <!-- <safa-list
            :items="ListItem"
            actions
            cdcName="ListItem"
            titleField="ListItem"
          /> -->
          <q-list bordered>
            <q-item
              clickable
              v-ripple
              v-for="(item, index) in ListItem"
              :key="index"
              @click="selectItem(item)"
            >
              <q-item-section avatar size="sm">
                <q-avatar color="primary" icon="home" />
              </q-item-section>
              <q-item-section style="white-space: nowrap; overflow: hidden">
                صورتجلسه - {{ item.TransferMainMinutesDate }}
              </q-item-section>
            </q-item>
          </q-list>
        </template>
        <template v-slot:after>
          <safa-tabs v-model="activeTab">
            <template v-slot:tabs>
              <tab-menu name="transferInfo" label="مشخصات تحویل" />
              <tab-menu name="houseInfo" label="مشخصات ملک" />
              <tab-menu name="buildingInfo" label="مشخصات داخلی ساختمان" />
              <tab-menu name="shares" label="اشتراکات" />
              <tab-menu name="explantaion" label="توضیحات" />
            </template>
            <!-- first tab -->
            <tab-content name="transferInfo">
              <transferInfo
                v-model="model"
                :m="mode"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </tab-content>
            <!-- second tab -->
            <tab-content name="houseInfo" :padding="false">
              <houseInfo
                v-model="model"
                :m="mode"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </tab-content>
            <!-- third tab -->
            <tab-content name="buildingInfo" :padding="false">
              <buildingInfo
                v-model="model"
                :m="mode"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </tab-content>
            <!-- forth tab -->
            <tab-content name="shares" :padding="false">
              <shares
                v-model="model"
                :m="mode"
                :formKey="formKey"
                :title="title"
                :name="name"
              />
            </tab-content>
            <!-- fifth tab -->
            <tab-content name="explantaion">
              <div class="fit q-mb-sm">
                <text-template
                  type="textarea"
                  label="توضیحات"
                  label-width="90px"
                  :rows="2"
                  v-model="Description"
                  :m="mode"
                  cdcName="Description"
                />
              </div>
            </tab-content>
          </safa-tabs>
        </template>
      </safa-splitter>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="save"
        >
          <div>
            <btn-delete />
          </div>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import transferInfo from "./partials/transferInfo.vue"
import houseInfo from "./partials/houseInfo.vue"
import buildingInfo from "./partials/buildingInfo.vue"
import shares from "./partials/shares.vue"
const defaultModel = {
  IsConfirmContractBuy: false,
  TransferMain_Info: {
    CI_DestructionStatus: 0,
    CI_TransferStatus: 0,
    DocNo: "",
    IsMunicipalityOwner: false,
    NIdTransferMain: "00000000-0000-0000-0000-000000000000",
    NIdTransferMain_tmp: 0,
    NidRequest: "00000000-0000-0000-0000-000000000000",
    TmpBeneficDesc: "",
    TmpBeneficEndDate: "",
    TmpBeneficName: "",
    TmpBeneficStartDate: "",
    TransferMainDate: "",
    TransferMainDesc: "",
    TransferMainMinutesDate: "",
    TransferMainMinutesNo: ""
  },
  TransferMain_Item: {
    TransferMain_Item: {
      CI_TransferItemType: 0,
      Cnt: null,
      Description: "",
      Model: 0,
      NIdItem: "00000000-0000-0000-0000-000000000000",
      NIdItem_tmp: 0,
      NIdTransferMain: "00000000-0000-0000-0000-000000000000"
    }
  },
  TransferMain_Other01: [],
  TransferMain_Other02: [],
  TransferMain_Other03: [],
  TransferMain_Other04: [],
  TransferMain_Other05: [],
  TransferMain_Other06: [],
  TransferMain_Other07: [],
  TransferMain_Person_1: [],
  TransferMain_Person_2: [],
  _NIdTransferMain: "00000000-0000-0000-0000-000000000000"
}

export default {
  mixins: [baseFormMixin],
  components: { transferInfo, houseInfo, buildingInfo, shares },
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
      title: "تحویل",
      formKey: "4CC121A7-24EE-47B1-BA62-F9B32DEFDD3D",
      name: "UTransferMainList",
      main: true,
      sidebarCompatible: true,
      model: { transferMain: { ...defaultModel } },
      activeTab: "transferInfo",
      spliterModel: 16,
      Description: "",
      ListItem: [],
      selectedListBox: null,
      NIdTransferMain: '00000000-0000-0000-0000-000000000000',
      getTransferMainInfoRequestListRes: null,
      saveTransferMainInfoRes: null,
      getTransferMainInfoRes: null

    }
  },
  created () {
    if (this.selectedRequest) {
      this.loadObj()
    } else {
      this.showError("لطفا ابتدا ردیف مورد نظر را از کارتابل انتخاب کنید")
      this.hideSidebar(this.name)
    }
  },
  methods: {
    selectItem (e) {
      console.log("selectItem", e)
      this.selectedListBox = e
      this.getTransferMainInfo(this.selectedListBox.NIdTransferMain)
    },
    loadObj () {
      const payload = {
        // pNIdProc: "80189d0e-caa1-4dee-a699-d262eddbade1"
        pNIdProc:
          this.selectedRequest.NidProc ||
          "00000000-0000-0000-0000-000000000000"
      }
      this.showLoading()
      this.$services.ES.getTransferMainInfoRequestList(payload)
        .then(async ({ data }) => {
          this.getTransferMainInfoRequestListRes = this.getResponse(data)
          if (this.getTransferMainInfoRequestListRes.success) {
            this.ListItem =
              this.getTransferMainInfoRequestListRes?.data
                ?.GetTransferMain_Info_RequestListResult ?? []
            this.getTransferMainInfo(this.selectedListBox?.NIdTransferMain)
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest?.BizCode ?? "",
              bizCodeTitle: this.selectedRequest?.BizCode ?? "",
              saveDesc: "بارگذاری اطلاعات فرم تحویل انجام گردید."
            })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    getTransferMainInfo (value) {
      let payload
      if (value !== "00000000-0000-0000-0000-000000000000" && value !== undefined) {
        payload = {
        // pNIdProc: "80189d0e-caa1-4dee-a699-d262eddbade1"
          PNidTransferMain: value
        }
      } else {
        payload = {
        // pNIdProc: "80189d0e-caa1-4dee-a699-d262eddbade1"
          PNidTransferMain:
          this.selectedRequest.NidProc ||
          "00000000-0000-0000-0000-000000000000"
        }
      }
      this.showLoading()
      this.$services.ES.getTransferMainInfo(payload)
        .then(async ({ data }) => {
          this.getTransferMainInfoRes = this.getResponse(data)
          if (this.getTransferMainInfoRes.success) {
            this.model =
              this.getTransferMainInfoRes.data.GetTransferMain_InfoResult
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.model.TransferMain_Info.NidRequest = this.selectedListBox.NidRequest
      this.model._NIdTransferMain = this.selectedListBox.NIdTransferMain
      const payload = {
        PObj: this.model
      }
      this.showLoading()
      this.$services.ES.saveTransferMainInfo(payload)
        .then(async ({ data }) => {
          debugger
          this.saveTransferMainInfoRes = this.getResponse(data)
          if (this.saveTransferMainInfoRes.success) {
            this.showSuccess("ذخیره اطلاعات فرم تحویل با موفقیت انجام شد !")
            // this.model = this.saveTransferMainInfoRes.data.SaveTransferMain_InfoResult?

            this.isEditable = false
            this.loadObj()
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest?.BizCode ?? "",
              bizCodeTitle: this.selectedRequest?.BizCode ?? "",
              saveDesc: "ذخیره اطلاعات فرم تحویل انجام گردید."
            })
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
