<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    caption="لیست احکام ورود"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getEnterOrderListResult" />
        <safa-status :result="saveResult" />
        <safa-status :result="getEnterOrderResult" />
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="EntryList" label="لیست احکام" />
            <tab-menu name="details" label="جزئیات" v-if="showDetailTab" />
          </template>
          <tab-content name="EntryList" :padding="false">
            <EntryList :model="model" @detailsInfo="getRowInfo" />
          </tab-content>
          <tab-content name="details">
            <EntryOrderDetail :model="model" :m="mode" />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @newInfo="newObj"
          :showNewButton="activeTab === 'EntryList'"
          :showEditButton="activeTab === 'details'"
          :showSaveButton="activeTab === 'details'"
          :showCancelButton="activeTab === 'details'"
          @cancel="onCancel"
          @save="saveObj"
        >
          <template v-if="activeTab === 'details' && !isEditable">
            <btn-default label="چاپ" @click="print" />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import EntryList from "./partials/EntryList.vue"
import EntryOrderDetail from "./partials/EntryOrderDetail.vue"

export default {
  mixins: [baseFormMixin],
  components: { EntryList, EntryOrderDetail },
  props: { taskInfo: Object },
  data () {
    return {
      name: "UEntryOrder",
      title: "حکم ورود قضایی",
      formKey: "58819065-F293-4972-A718-E79C4E50D277",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true,
      activeTab: "EntryList",
      showDetailTab: false,
      model: {
        EnterOrderList: [],
        EnterOrder: {
          EnterOrderNo: "",
          EnterOrderDate: "",
          EnterOrderTime: "",
          CI_EnterOrderType: 0
        }
      },
      getEnterOrderListResult: null,
      getEnterOrderResult: null,
      nidEnterOrder: "00000000-0000-0000-0000-000000000000",
      saveResult: null
    }
  },

  created () {
    if (this.selectedRequest) {
      this.loadObj()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UEntryOrder")
      this.redirectToKartable()
    }
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        let payload = await this.$services.SH.getEnterOrderList({
          pNidProc: this.selectedRequest.NidProc
          // pNidProc: "036eb933-963b-45a1-865e-e4c1e452cbb4"
        })
        this.getEnterOrderListResult = this.getResponse(payload)
        if (this.getEnterOrderListResult.success) {
          this.model.EnterOrderList =
            this.getEnterOrderListResult.data.data.EnterOrderList || []
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode ?? "",
            bizCodeTitle: "کدنوسازی",
            nosaziCode: this.selectedRequest.BizCode ?? "",
            nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
            saveDesc: `نمایش حکم ورود قضایی برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getRowInfo (row) {
      this.nidEnterOrder = row.NidEnterOrder
      this.getEnterOrder()
      this.activeTab = "details"
      this.showDetailTab = true
    },
    async getEnterOrder () {
      try {
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pNidEnterOrder: this.nidEnterOrder
        }
        this.showLoading()
        const { data } = await this.$services.SH.getEnterOrder(payload)
        this.getEnterOrderResult = this.getResponse(data)
        if (this.getEnterOrderResult.success) {
          this.model = this.getEnterOrderResult.data
        }
      } catch (err) {
        console.error(err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      this.model.EnterOrder.NidProc = this.selectedRequest.NidProc
      this.model.EnterOrder.NidUser = this.getNidUser()
      this.model.EnterOrder.UserName = this.currentUser.username
      try {
        const payload = {
          pEnterOrder: {
            ...this.model
          }
        }
        this.showLoading()
        const { data } = await this.$services.SH.saveEnterOrder(payload)
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.BizCode ?? "",
            bizCodeTitle: "کدنوسازی",
            nosaziCode: this.selectedRequest.BizCode ?? "",
            nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
            saveDesc: `ذخیره حکم ورود قضایی برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
          })
          this.getEnterOrder()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    newObj () {
      this.isEditable = true
      this.showDetailTab = true
      this.activeTab = "details"
      this.getEnterOrder()
    },
    async print () {
      const reportPath =
        "/BuildingPolice/RptEntrance"
      const queryParams = {
        NidEntrance: this.nidEnterOrder
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.BizCode ?? "",
        bizCodeTitle: "کدنوسازی",
        nosaziCode: this.selectedRequest.BizCode ?? "",
        nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
        saveDesc: `چاپ گزارش حکم ورود قضایی برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
      })
    },
    onCancel () {
      this.isEditable = false
      this.getEnterOrder()
    }
  }
}
</script>
