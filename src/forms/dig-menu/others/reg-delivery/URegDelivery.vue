<template>
  <form-wrapper :title="title" :padding="false">
    <template #header>
      <safa-status :result="getDeliveryRes" />
      <safa-status :result="saveDeliveryRes" />
    </template>
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="totalInf" label="اطلاعات کلی" />
          <tab-menu name="defectsNotification" label="استعلام خسارت" />
          <tab-menu name="damageInquiry" label="اعلام نواقص" />
        </template>
        <tab-content name="totalInf">
          <TotalInf v-model="model.Delivery" :m="mode" />
        </tab-content>
        <tab-content name="defectsNotification" :padding="false">
          <DefectsNotification v-model="model.Delivery" :m="mode" />
        </tab-content>
        <tab-content name="damageInquiry">
          <DamageInquiry v-model="model.Delivery" :m="mode" />
        </tab-content>
      </safa-tabs>
    </fit>
    <template v-slot:footer>
      <FormActions
        :m="mode"
        :showEditButten="hideEditBtn"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveObj"
      >
        <template v-if="!isEditable">
          <btn-default label="اطلاعات مجوز" @click="reportClick" />
        </template>
      </FormActions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import TotalInf from "./partials/TotalInf.vue"
import DamageInquiry from "./partials/DamageInquiry.vue"
import DefectsNotification from "./partials/DefectsNotification.vue"

export default {
  mixins: [baseFormMixin],
  components: { TotalInf, DamageInquiry, DefectsNotification },
  props: {
    issuancecostsRequestType: Number, // 2
    formKey: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true }
  },
  data () {
    return {
      main: true,

      // variables
      isView: false,
      hideEditBtn: false,
      model: {
        Delivery: {
          CI_RequesterType: [],
          CompanyName: null,
          Consultant: null,
          Delivery: {
            AgentName: "",
            AgentTellNo: "",
            DeliveryDate: "",
            Description: "",
            IsRenewal: false,
            NId: "00000000-0000-0000-0000-000000000000",
            NidUser: null,
            RepairDate: null,
            StrDate: "",
            StrTime: "",
            UserName: null
          },
          DeliveryDefectList: [],
          Delivery_Inquiry: [],
          RequestService_Info: {
            CI_RedirectName: 0,
            CI_Region: 0,
            ExportLicenseDate: null,
            ExportLicenseNo: null,
            RequesterAddress: "",
            RequesterRegion: ""
          }
        }
      },
      activeTab: "totalInf",

      // services
      getDeliveryRes: null,
      saveDeliveryRes: null,
      RequestMessage: {}
    }
  },

  methods: {
    async loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          NidProc: this.selectedRequest.NidProc, // "b4701822-ab24-4d6c-90e5-a8e7dd7ad5ea" // "448cc365-b77c-4493-897a-f1ad9ee3f2e9",
          IssuancecostsRequestType: this.issuancecostsRequestType
        }
      }
      try {
        const { data } = await this.$services.excavation.getDelivery(payload)
        this.getDeliveryRes = this.getResponse(data)
        if (this.getDeliveryRes.success) {
          const res = this.getDeliveryRes.data.GetDeliveryResult
          if (res.Delivery.RequestService_Info !== null) {
            this.model = res
          } else {
            this.model = {
              ...res,
              Delivery: {
                ...res.Delivery,
                RequestService_Info: {
                  CI_RedirectName: 0,
                  CI_Region: 0,
                  ExportLicenseDate: null,
                  ExportLicenseNo: null,
                  RequesterAddress: "",
                  RequesterRegion: ""
                }
              }
            }
          }
          // GrdRequestDelivery.DataContext = res.Delivery.Delivery;
          // if (res.Delivery.DeliveryDefectList.some()) (TabControl.Items[3] as RadTabItem).Background = new SolidColorBrush(Color.FromArgb(255, 172, 252, 48));

          this.hideEditBtn = !!(
            this.taskInfo &&
            this.taskInfo.TaskTitel.includes("بررسي و بازديد تحويل موقت")
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات ${this.title}  برای در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      this.$services.excavation
        .saveDelivery({ pRequest: this.model })
        .then(async ({ data }) => {
          this.saveDeliveryRes = this.getResponse(data)
          if (this.saveDeliveryRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ذخیره اطلاعات ${this.title}  برای در خواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
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
    reportClick () {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`
      const queryParams = {
        NIdProc: this.selectedRequest.NidProc,
        RequestType: this.issuancecostsRequestType,
        SysCI_LicenseStatus:
          this.model.Delivery.RequestService_Info?.SysCI_RequestServiceStatus.toString(),
        Koroki: "",
        NIdRequest:
          this.model.Delivery.RequestService_Info?.NIdRequestService ??
          "00000000-0000-0000-0000-000000000000"
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidWorkItem,
        bizCodeTitle: "NidWorkItem",
        nosaziCode: this.selectedRequest.BizCode ?? "",
        nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
        saveDesc: `نمایش گزارش برای شماره ${this.selectedRequest.BizCode} انجام گردید.`
      })
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  }
}
</script>
