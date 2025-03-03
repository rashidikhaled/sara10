<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getExportLicenseReportResult" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              v-model="model.CI_RequestType"
              cdcName="CI_RequestType"
              ciName="CI_RequestType"
              domain-name="Dig"
              label="نوع درخواست"
              label-width="100px"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="model.CI_RequesterType"
              cdcName="CI_RequesterType"
              ciName="CI_RequesterType"
              domain-name="Dig"
              label="شرکت خدماتی متقاضی"
              label-width="120px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="model.NidWorkItem"
              cdcName="NidWorkItem"
              label="کد رهگیری"
              label-width="100px"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.FromExportDate"
              cdcName="FromExportDate"
              label="تاریخ صدور از"
              label-width="100px"
              required
              validations="required"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.ToExportDate"
              cdcName="ToExportDate"
              label="تا تاریخ "
              label-width="80px"
              required
              validations="required"
            />
          </FormControl>
          <div>
            <btn-search @click="searchHandler" />
          </div>
        </FormRow>
        <safa-grid
          v-model="exportLicenseReportList"
          :columns="forkDeliveryColumns"
          title="نتایج"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          fit
          cdcName="exportLicenseReportList"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UExportLicenseReport",
      formKey: "CA7269AC-2EA6-4A32-BCD9-947B4D0F810E",
      title: "گزارش صدور مجوز",
      main: true,
      workflowCompatible: true,

      forkDeliveryColumns: [
        {
          field: "",
          title: "چاپ مجوز",
          editor: "action",
          width: "100px",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.exportLicenseClick(params)
        },
        { field: "CodeString", title: "کد نوسازی", width: "100px" },
        { field: "Region", title: "منطقه", width: "80px" },
        { field: "RType", title: "نوع درخواست", width: "120px" },
        { field: "NIdWorkItem", title: "کد رهگیری", width: "100px" },
        { field: "ExportLicenseDate", title: "تاریخ صدور", width: "100px" },
        { field: "ExportLicenseNo", width: "100px", title: "شماره صدور" },
        { field: "RequestType", width: "80px", title: "نوع مجوز" },
        { field: "Price", width: "100px", title: "مبلغ" },
        { field: "PaymentType", width: "100px", title: "نحوه پرداخت" },
        { field: "CrossType", width: "100px", title: "نام معبر" },
        { field: "NameCompany", width: "200px", title: "نام شرکت" },
        { field: "Addres", width: "250px", title: "آدرس" },
        { field: "DigPathLength", width: "100px", title: "طول مسیر حفاری" },
        { field: "UserName", width: "120px", title: "کاربر صادر کننده مجوز" },
        { field: "No", width: "120px", title: "کاربر ایجاد کننده درخواست" }
      ],
      model: {
        CI_RequestType: 0,
        CI_RequesterType: 1,
        NidWorkItem: 0,
        FromExportDate: "",
        ToExportDate: currentDate()
      },
      exportLicenseReportList: [],
      getExportLicenseReportResult: null
    }
  },
  methods: {
    exportLicenseClick (row) {
      this.selectedRow = row
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptLicence`
      const queryParams = {
        NIdProc: this.selectedRow.NIdProc,
        RequestType: this.selectedRow.CI_RequesterType,
        SysCI_LicenseStatus: this.selectedRow.SysCI_LicenseStatus,
        Koroki: "",
        NIdRequest: this.selectedRow.NIdRequest
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NIdRequest,
        bizCodeTitle: "NIdRequest"
      })
    },
    searchHandler () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        pReuqest: {
          ClsExportLicenseReport: {
            CI_RequesterType: this.model.CI_RequesterType,
            FromExportDate: this.model.FromExportDate,
            NidWorkItem: this.model.NidWorkItem,
            Requesttype: this.model.CI_RequestType,
            ToExportDate: this.model.ToExportDate
          }
        }
      }
      this.$services.excavation
        .getExportLicenseReport(payload)
        .then(async ({ data }) => {
          this.getExportLicenseReportResult = this.getResponse(data)
          if (this.getExportLicenseReportResult.success) {
            this.exportLicenseReportList =
              this.getExportLicenseReportResult.data.GetExportLicenseReportResult.ClsExportLicenseReport.ExportLicenses
            debugger
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
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
    }
  }
}
</script>
