<template>
  <safa-form
    :id="formKey"
    caption="گزارش صدور تمدید انشعابات"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="searchHandlerRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              v-model="model.ExportRenewalReport.CI_RequesterType"
              cdcName="CI_RequesterType"
              label="شرکت خدماتی متقاضی"
              label-width=""
              ciName="CI_RequesterType"
              domainName="Dig"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="NidWorkItem"
              cdcName="NidWorkItem"
              label="شماره پیگیری"
              label-width=""
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.ExportRenewalReport.DateStart"
              cdcName="DateStart"
              label="تاریخ شروع"
              label-width=""
              required
              validations="required"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.ExportRenewalReport.DateEnd"
              cdcName="DateEnd"
              label="تاریخ پایان"
              label-width=""
            />
          </FormControl>
          <div>
            <btn-default label="جستجو" @click="searchHandler" />
          </div>
        </FormRow>
        <safa-grid
          v-model="model.ExportRenewalReport.ExportRenewalReport"
          :columns="forkDeliveryColumns"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          @row:click="handleClickRow"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          fit
          paginate
          cdcName="ExportRenewalReport"
          ref="documentref"
          :pinnedBottomRowData="[{}]"
        />
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default label="تقاضای تمدید" @click="renewalRequestHandler" />
          <btn-default label="تقاضای تحویل" @click="deliveryRequestHandler" />
        </div>
      </template>
      <safa-popup
        title="تمدید انشعابات شخصی"
        v-model="showRenewRequest"
        width="1000px"
        height="600px"
      >
        <fit>
          <RenewalRequest :selectedRow="selectedRow" />
        </fit>
      </safa-popup>
      <safa-popup
        title="تحویل"
        v-model="showDeliveryRequest"
        width="900px"
        height="600px"
      >
        <fit>
          <DeliveryRequest :title="title" :selectedRow="selectedRow" />
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

import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin],
  components: { RenewalRequest, DeliveryRequest },
  data () {
    return {
      name: "UExportRenewalReportRequest",
      formKey: "2F33B55C-3A92-4A02-8F94-933B1C08FCF1",
      title: "درخواست تمدید یا تحویل انشعابات",
      main: true,

      // variables
      selectedRow: null,
      forkDeliveryColumns: [
        { field: "Region", title: "منطقه", width: "100px" },
        { field: "RType", title: "نوع درخواست", width: "150px" },
        { field: "LicenceTitle", title: "نوع مجوز", width: "100px" },
        { field: "NIdWorkItem", title: "کد رهگیری", width: "100px" },
        { field: "ExportLicenseDate", title: "تاریخ صدور", width: "100px" },
        { field: "ExportLicenseNo", title: "شماره صدور", width: "100px" },
        { field: "EndDate", title: "تاریخ پایان عملیات", width: "150px" },
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
        { field: "Duration", title: "مدت زمان مجوز(روز)", width: "150px" },
        {
          field: "Price",
          title: "مبلغ",
          width: "100px",
          cellRendererSelector: (params) => this.sysValueCellRenderer(params)
        },
        { field: "PaymentType", title: "نحوه پرداخت", width: "130px" },
        { field: "UserName", title: "کاربر صادر کننده مجوز", width: "150px" },
        { field: "No", title: "کاربر ایجاد کننده درخواست", width: "150px" }
        // {
        //   field: "total",
        //   title: "جمع",
        //   width: "120px",
        //   cellRendererSelector: (params) => this.sysTotalCellRenderer(params),
        //   cellClass: "custom-pinned-row",
        //   cellStyle: { "background-color": "#ffec009e" }
        // }
      ],
      model: {
        ExportRenewalReport: {
          CI_RequesterType: "0",
          DateStart: "0",
          DateEnd: "",
          ExportRenewalReport: []
        }
      },
      NidWorkItem: "0",
      searchHandlerRes: null,
      showDeliveryRequest: false,
      showRenewRequest: false,
      renewalModal: {
        ClsRenewal_Request: {
          AreaCode: "",
          ClsIncomeFiche: "",
          ErrorResult: "",
          IsReview: false,
          NidRequest: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Request_Contractor: "",
          Request_Info: "",
          Request_Inquiry: "",
          Request_Instrument: "",
          Request_Line: "",
          Request_Operations: [],
          Request_Time: [],
          Request_TimeMojavez: [],
          UserName: ""
        }
      }
    }
  },
  mounted () {
    this.updateDate()
  },
  methods: {
    compareDays (date1 = "", date2 = "") {
      PersianDate.toCalendar("persian")
      const normalizeDate1 = new PersianDate(
        date1.split("/").map((x) => Number(x))
      )
      const normalizeDate2 = new PersianDate(
        date2.split("/").map((x) => Number(x))
      )
      return normalizeDate1.diff(normalizeDate2, "days")
    },
    sysTotalCellRenderer (params) {
      if (params.node.rowPinned === "bottom") {
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let total = 0
              try {
                total = this.infoList.reduce((a, { total: b }) => {
                  return a + parseFloat(b)
                }, 0)
              } catch (ex) {
                total = 0
              }
              console.log(`جمع کل : ${total}`)
              return `جمع کل : ${total}`
            }
          }
        }
      }
      return undefined
    },
    sysValueCellRenderer (params) {
      if (params.node.rowPinned === "bottom") {
        let colId = params.column.colId
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let total = 0
              try {
                let tmp = Object.entries(this.totalSumCols)
                for (let i = 0; i < tmp.length; i++) {
                  if (tmp[i][0] === colId) {
                    total = tmp[i][1]
                  }
                }
              } catch (ex) {
                total = 0
              }
              console.log(`جمع کل : ${total}`)
              return `جمع کل : ${total}`
            }
          }
        }
      }
      return undefined
    },
    searchHandler () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        pRequest: {
          ExportRenewalReport: this.model.ExportRenewalReport,
          NidWorkItem: this.NidWorkItem
        }
      }
      this.$services.excavation
        .getExportRenewalReport(payload)
        .then(({ data }) => {
          this.searchHandlerRes = this.getResponse(data)
          if (this.searchHandlerRes.success) {
            const today = currentDate()
            this.model.ExportRenewalReport.ExportRenewalReport =
              this.searchHandlerRes.data.GetExportRenewalReportResult.ExportRenewalReport.ExportRenewalReport.map(
                (e) => {
                  return {
                    ...e,
                    DaysRemain: this.compareDays(e.EndDate, today),
                    Duration: this.compareDays(e.EndDate, e.StartDate),
                    LicenceTitle: e.IsRenewal === true ? "تمدید" : "مجوز"
                  }
                }
              )
            this.log({
              action: this.logActions.view,
              bizCode: this.NidWorkItem ?? "",
              bizCodeTitle: "NidWorkItem"
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
    renewalRequestHandler () {
      if (!this.selectedRow) {
        this.showError("لطفا یک سطر را انتخاب کنید")
        return
      }
      this.showRenewRequest = true
    },
    deliveryRequestHandler () {
      if (!this.selectedRow) {
        this.showError("لطفا یک سطر را انتخاب کنید")
        return
      }

      this.showDeliveryRequest = true
    },
    updateDate () {
      this.model.ExportRenewalReport.DateEnd = currentDate()
    },
    handleClickRow (e) {
      this.selectedRow = e.data
    }
  }
}
</script>
