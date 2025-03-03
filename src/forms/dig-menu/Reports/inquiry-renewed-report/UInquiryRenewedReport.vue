<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="inquiryRenewedReportRes" />
        <safa-status :result="getDetailListRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              v-model="model.NidSelectedRedirect"
              cdcName="NidSelectedRedirect"
              ciName="CI_RedirectName"
              domain-name="Dig"
              label="شرکت درخواست دهنده"
              label-width="100px"
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
            <safa-combo
              v-model="model.NidSelectedResponsibleRedirect"
              cdcName="NidSelectedResponsibleRedirect"
              ciName="CI_RedirectName"
              domain-name="Dig"
              label="شرکت پاسخ دهنده"
              label-width="100px"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.FromDate"
              cdcName="FromDate"
              label="تاریخ صدور از"
              label-width="100px"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.ToDate"
              cdcName="ToDate"
              label="تا تاریخ "
              label-width="100px"
            />
          </FormControl>
          <div class="q-gutter-sm">
            <btn-default label="جستجو" @click="searchHandler" />
            <btn-default label="پاک کردن" @click="clearHandler" />
          </div>
        </FormRow>
        <safa-grid
          v-model="inquiryRenewedReportList"
          :columns="inquiryRenewedReportColumns"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :detailCellRendererParams="detailCellRendererParams"
          :masterDetail="true"
          fit
          paginate
          ref="documentref"
          cdcName="inquiryRenewedReportList"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

import PersianDate from "persian-date"

const defaultModel = {
  NidSelectedRedirect: 0,
  NidWorkItem: 0,
  NidSelectedResponsibleRedirect: 0,
  FromDate: "",
  ToDate: ""
}
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UInquiryRenewedReport",
      formKey: "7723837B-74BF-4D1B-91ED-C097BC56B8CD",
      title: "گزارش استعلام مجدد",
      main: true,
      inquiryRenewedReportList: [],
      inquiryRenewedReportRes: null,
      getDetailListRes: null,
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          // rowSelection: 'multiple',
          // suppressRowClickSelection: true,
          // enableRangeSelection: true,
          pagination: true,
          detailRowAutoHeight: true,
          detailRowHeight: 400,
          // paginationAutoPageSize: true,
          defaultColDef: {
            sortable: true,
            flex: 1
          },
          columnDefs: [
            { field: "NIdWorkItem", title: "کد رهگیری", width: "130px" },
            { field: "SelfRedirectName", title: "شرکت درخواست دهنده ", width: "200px" },
            { field: "Date", title: "تاریخ استعلام ", width: "130px" },
            { field: "RedirectName", title: "شرکت پاسخ دهنده ", width: "150px" },
            { field: "AcceptDate", title: "تاریخ پاسخ", width: "130px" },
            { field: "RequestTypeTitle", title: "نوع درخواست", width: "120px" },
            { field: "Description", title: "توضیحات", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(async () => {
            if (params.data) {
              const list = await this.getDetailList(
                params.data
              )
              let logDetail = list.map((m) => {
                return {
                  NIdWorkItem: m.NIdWorkItem || "",
                  SelfRedirectName: m.SelfRedirectName || "",
                  Date: m.Date || "",
                  RedirectName: m.RedirectName || "",
                  AcceptDate: m.AcceptDate || "",
                  RequestTypeTitle: m.RequestTypeTitle || "",
                  Description: m.Description || ""
                }
              })
              params.successCallback(logDetail)
            }
          }, 1000)
        }
      },
      inquiryRenewedReportColumns: [
        {
          field: "",
          title: "",
          width: "100px",
          cellRenderer: "agGroupCellRenderer",
          lockPosition: true,
          pinned: "right"
        },
        {
          field: "itemDetail",
          title: "",
          btnIcon: "keyboard_arrow_left",
          width: "120px",
          lockPosition: true,
          pinned: "right",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          btnTitle: "مشاهده پاسخ",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.showInquiry(params)
        },
        {
          field: "itemDetail",
          title: "",
          btnIcon: "keyboard_arrow_left",
          width: "120px",
          lockPosition: true,
          pinned: "right",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          btnTitle: "تاریخچه استعلام",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.showInquiryHistory(params)
        },
        { field: "NIdWorkItem", title: "کد رهگیری" },
        { field: "SelfRedirectName", title: "شرکت درخواست دهنده" },
        { field: "Date", title: "تاریخ استعلام", editor: "date" },
        { field: "RedirectName", title: "شرکت پاسخ دهنده" },
        { field: "AcceptDate", title: "تاریخ پاسخ", editor: "date" },
        { field: "Description", title: "توضیحات", width: "auto" }
      ],
      model: {
        ...defaultModel
      }
    }
  },
  mounted () {
    this.model.ToDate = this.updateToday()
    this.model.FromDate = this.CalculateStartDateBaseOnTimeSpan()
  },

  methods: {
    async getDetailList (item) {
      try {
        this.detailList = []
        this.showLoading()
        const { data } =
          await this.$services.excavation.getInquiryRenewedHistory({
            "pRequest": {
              "InquiryReportRenewed": {
                "NIdRequestService": item.NIdInquiry,
                "NidSelectedResponsibleRedirect": item.CI_RedirectName
              } } })
        this.getDetailListRes = this.getResponse(data)
        if (this.getDetailListRes.success) {
          return this.getDetailListRes.data.GetInquiryRenewedHistoryResult.InquiryReportRenewed.Result
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async showInquiry (item) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`
      const queryParams = {
        NId: item.NIdInquiry,
        RequestType: item.RequestType
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: item.NIdInquiry,
        bizCodeTitle: "NIdInquiry"
      })
    },
    async showInquiryHistory (item) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`
      const queryParams = {
        NId: item.NIdInquiry,
        RequestType: item.RequestType
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: item.NIdInquiry,
        bizCodeTitle: "NIdInquiry"
      })
    },
    updateToday () {
      PersianDate.toCalendar("persian")
      return new PersianDate().toLocale("en").format("L")
    },
    CalculateStartDateBaseOnTimeSpan (p) {
      if (this.model.ToDate === "" && this.model.FromDate === "") {
        this.model.FromDate = this.updateToday()
        this.model.ToDate = this.updateToday()
      }
      const date = this.model.ToDate
      const normalizeDate = new PersianDate(
        date.split("/").map((x) => Number(x))
      )

      return normalizeDate.subtract("months", 1).toLocale("en").format("L")
    },
    searchHandler () {
      this.showLoading()
      const payload = {
        pRequest: {
          InquiryReportRenewed: {
            FromDate: this.model.FromDate,
            NidSelectedRedirect: this.model.NidSelectedRedirect,
            NidSelectedResponsibleRedirect:
              this.model.NidSelectedResponsibleRedirect,
            NidWorkItem: this.model.NidWorkItem,
            ToDate: this.model.ToDate
          }
        }
      }
      this.$services.excavation
        .inquiryReportRenewed(payload)
        .then(({ data }) => {
          this.inquiryRenewedReportRes = this.getResponse(data)
          if (this.inquiryRenewedReportRes.success) {
            this.inquiryRenewedReportList =
              this.inquiryRenewedReportRes.data.InquiryReportRenewedResult.InquiryReportRenewed.Result
            console.log(this.inquiryRenewedReportList)
            this.log({
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
    },
    clearHandler () {
      this.model = { ...defaultModel }
    }
  }
}
</script>
