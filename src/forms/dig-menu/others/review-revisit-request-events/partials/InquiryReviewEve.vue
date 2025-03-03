<template>
    <fit>
      <div class="q-pt-sm q-px-sm">
        <safa-notice
          >مخاطب محترم استعلام : با سلام ، این شرکت/سازمان/شهرداری در نظر دارد در
          محل تعیین شده با مشخصات مندرج در فرم درخواست نسبت به انجام حفاری اقدام
          نماید. لطفا طرح ها و تاسیسات موجود در محل مذکور در قالب نقشه و مشخصات
          کامل ضمیمه و اعلام گردد.</safa-notice
        >
      </div>
      <safa-grid
        title="لیست استعلامات"
        cdcName="RequestService_Inquiry"
        v-model="value.ClsRevisit_RequestService.RequestService_Inquiry"
        :columns="InquiryColumns"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        m="r"
        fit
        paginate
      />
    </fit>
  </template>

<script>
export default {
  props: {
    value: Object
  },
  data () {
    return {
      name: "InquiryReviewEve",
      InquiryColumns: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CI_TypeAcceptInquiry",
          title: "نوع پاسخ",
          domain: "Dig",
          editor: "combo"
        },
        { field: "Date", title: "تاریخ استعلام", editor: "date" },
        { field: "Tell", title: "تلفن" },
        { field: "CreatorUserName", title: "کاربر ایجاد کننده" },
        { field: "AcceptDate", title: "تاریخ پاسخ استعلام", editor: "date" },
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
