<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="searchObjRes" />
      </template>
      <fit>
        <form-row class="q-mb-sm" :xs="1" :sm="1" :md="2" :lg="4" :xl="5">
          <FormControl>
            <safa-combo
              ciName="CI_RequesterType"
              domainName="Dig"
              label="شرکت خدماتی متقاضی"
              label-width="115px"
              v-model="ExportRenewalReport.CI_RequesterType"
              cdcName="CI_RequesterType"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره پیگیری"
              label-width="115px"
              v-model="WorkItem"
              cdcName="WorkItem"
              :validations="['required']"
              type="decimal"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="ExportRenewalReport.DateStart"
              cdcName="DateStart"
              label="تاریخ شروع"
              label-width="115px"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="ExportRenewalReport.DateEnd"
              cdcName="DateEnd"
              label="تاریخ پایان"
              label-width="115px"
            />
          </FormControl>
          <div>
            <btn-search @click="searchObj" />
          </div>
        </form-row>
        <safa-datatable
          min-height="100px"
          height="100%"
          max-height="100%"
          v-model="ExportRenewalReport.ExportRenewalReport"
          cdcName="recieptInfo"
          :columns="recieptInfoColumns"
          paginate
          fit
          @row-click="rowClick"
          :addRow="false"
        />
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default label="تقاضای تمدید" @click="RenewalRequestHandler" />
          <btn-default label="تقاضای تحویل" @click="DeliveryRequestHandler" />
        </div>
      </template>
      <safa-popup
        title="درخواست تمدید طرح های توسعه"
        v-model="showRenewRequest"
        width="900px"
        height="600px"
      >
        <fit>
          <RenewalRequest
            :title="title"
            :formKey="formKey"
            :name="name"
            :selectedRow="selectedRow"
          />
        </fit>
      </safa-popup>
      <safa-popup
        title="ثبت درخواست تحویل موقت طرح های توسعه"
        v-model="showDeliveryRequest"
        width="900px"
        height="600px"
      >
        <fit>
          <DeliveryRequest
            :title="title"
            :formKey="formKey"
            :name="name"
            :selectedRow="selectedRow"
          />
        </fit>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import RenewalRequest from "./partials/RenewalRequest.vue"
import DeliveryRequest from "./partials/DeliveryRequest.vue"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  components: { RenewalRequest, DeliveryRequest },
  data () {
    return {
      title: "درخواست تمدید یا تحویل طرح توسعه",
      formKey: "16B31A86-B5E4-41E1-B122-32F591217B75",
      name: "UExportRenewalReport",
      main: true,

      // #values
      selectedRow: null,
      ExportRenewalReport: {
        CI_RequesterType: 0,
        DateEnd: currentDate(),
        DateStart: "",
        ExportRenewalReport: {}
      },
      WorkItem: "0",
      showRenewRequest: false,
      showDeliveryRequest: false,
      recieptInfoColumns: [
        {
          field: "Region",
          title: "منطقه",
          width: "100px"
        },
        {
          field: "RType",
          title: "نوع درخواست",
          width: "120px"
        },
        {
          field: "LicenceTitle",
          title: "نوع مجوز",
          width: "100px"
        },
        {
          field: "NIdWorkItem",
          title: "کد رهگیری",
          width: "100px"
        },
        {
          field: "ExportLicenseDate",
          title: "تاریخ صدور",
          width: "100px"
        },
        {
          field: "ExportLicenseNo",
          title: "شماره صدور",
          width: "100px"
        },
        {
          field: "EndDate",
          title: "تاریخ پایان عملیات",
          width: "140px"
        },
        {
          field: "DaysRemain",
          title: "زمان باقی مانده(روز)",
          width: "150px",
          editor: "date",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          cellRenderer: (params) =>
            `<div style="${
              params.data?.DaysRemain > 0
                ? "background:#31e747;text-align:center"
                : "background:#f76666d9;text-align:center"
            }">${params.data?.DaysRemain || ""}</div>`
        },
        {
          field: "Duration",
          title: "مدت زمان مجوز (روز)",
          width: "150px"
        },
        {
          field: "Price",
          title: "مبلغ",
          width: "100px"
        },
        {
          field: "PaymentType",
          title: "نحوه پرداخت",
          width: "120px"
        },
        {
          field: "UserName",
          title: "کاربر صادر کننده مجوز",
          width: "160px"
        },
        {
          field: "No",
          title: "کاربر ایجاد کننده درخواست",
          width: "170px"
        }
      ],
      searchObjRes: null

    }
  },
  mounted () {
    this.updateDate()
  },
  methods: {
    async searchObj () {
      if (!this.isValidForm()) return
      if (this.CI_RequesterType === 0 || null) {
        this.showError("شماره پیگیری صحیح نمی باشد.")
      }
      this.showLoading()
      try {
        const payload = {
          pRequest: {
            ExportRenewalReport: this.ExportRenewalReport,
            IsBaygani: true

          }
        }
        const { data } = await this.$services.excavation.getExportRenewalReport(
          payload
        )
        this.searchObjRes = this.getResponse(data)
        if (this.searchObjRes.success) {
          this.ExportRenewalReport =
            this.searchObjRes.data.GetExportRenewalReportResult.ExportRenewalReport
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: ""
          })
        }
      } catch (e) {
        this.showError(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    RenewalRequestHandler () {
      if (!this.selectedRow) {
        this.showError("لطفا پرونده مورد نظر را انتخاب نمایید")
        return
      }
      this.showRenewRequest = true
    },
    DeliveryRequestHandler () {
      if (!this.selectedRow) {
        this.showError("لطفا پرونده مورد نظر را انتخاب نمایید")
        return
      }
      this.showDeliveryRequest = true
    },
    rowClick (row) {
      this.selectedRow = row
    },
    updateDate () {
      this.ExportRenewalReport.DateEnd = currentDate()
    }
  }
}
</script>
