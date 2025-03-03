<template>
        <fit>
          <safa-grid
            v-model="value.RevisitRenewal_RequestService.RequestService_Inquiry"
            :columns="requestServiceInquiryColumns"
            :suppressRowClickSelection="false"
            fit
            paginate
            cdcName="RequestService_Inquiry"
          />
        </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      requestServiceInquiryColumns: [
        { field: "CI_RedirectName", title: "نام تابعه" },
        { field: "CI_TypeAcceptInquiry", title: "نوع پاسخ" },
        { field: "Date", title: "تاریخ استعلام" },
        { field: "Tell", title: "تلفن" },
        // { field: "Time", title: "زمان استعلام" },
        { field: "CreatorUserName", title: "کاربر ایجاد کننده" },
        { field: "AcceptDate", title: "تاریخ پاسخ استعلام" },
        { field: "AcceptUserName", title: "کاربر پاسخ دهنده" },
        { field: "ExpireInquiryDate", title: "تاریخ پایان مهلت استعلام" },
        { field: "IsExpire", title: "استعلام اولیه" },
        {
          field: "IsAnswerEnable",
          title: "گزارش",
          editor: "action",
          width: "120px",
          cellStyle: {
            padding: 0,
            margin: 5
          },
          btnTitle: "گزارش",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.BtnReport(params)
        },
        { field: "Description", title: "توضیحات" }
      ]
    }
  },
  methods: {
    async BtnReport (data) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`

      const queryParams = {
        NId: data.NIdInquiryService,
        RequestType: "0" // در سرا 8 هم به صورت هارد کد هست
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.view,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} گزارش داده شد.`
      })
    }
  }
}
</script>
