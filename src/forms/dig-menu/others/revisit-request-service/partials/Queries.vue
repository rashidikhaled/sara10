<template>
  <fit>
    <safa-notice>
      مخاطب محترم استعلام ، با سلام این شرکت/سازمان شهرداری در نظر دارد در محل
      تعیین شده با مشخصات مندرج در فرم درخواست نسبت به انجام حفاری اقدام نماید
      لطفا طح ها و تاسیسات موجود در محل مذکور در قالب نقشه و مشخصات کامل ضمیمه و
      اعلام گردد.
    </safa-notice>
    <safa-grid
      v-model="value.RequestService_Inquiry"
      cdcName="RequestService_Inquiry"
      :columns="requestServiceInquiryColumns"
      paginate
      fit
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String
  },

  data () {
    return {
      requestServiceInquiryColumns: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "CI_TypeAcceptInquiry",
          title: "نوع پاسخ",
          editor: "combo",
          domain: "Dig",
          width: "120px"
        },
        {
          field: "No",
          title: "شماره",
          width: "120px"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          editor: "date",
          width: "120px"
        },
        { field: "Tell", title: "تلفن", width: "120px" },
        { field: "Time", title: "زمان استعلام", width: "120px" },
        { field: "CreatorUserName", title: "کاربر ایجاد کننده", width: "120px" },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ استعلام",
          editor: "date",
          width: "150px"
        },
        {
          field: "AcceptTime",
          title: "زمان پاسخ استعلام",
          width: "150px"
        },
        { field: "AcceptUserName", title: "کاربر پاسخ دهنده", width: "150px" },
        {
          field: "ExpireInquiryDate",
          title: "تاریخ پایان مهلت استعلام",
          editor: "date",
          width: "150px"
        },
        { field: "IsExpire", title: "استعلام اولیه", width: "120px" },
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
        { field: "Description", title: "توضیحات", width: "120px" }
      ]
    }
  },
  methods: {
    async BtnReport (data) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`

      const queryParams = {
        NId: data.NIdInquiryService,
        RequestType: "1" // در سرا 8 هم به صورت هارد کد هست
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions?.view ?? "",
        bizCode: this.selectedRequest?.NidProc ?? "",
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest?.BizCode ?? "",
        nidWorkItem: this.selectedRequest?.NidWorkItem ?? "",
        saveDesc: `برای شماره در خواست ${this.selectedRequest?.NidWorkItem ?? ""}  اطلاعات فرم ${this.title ?? ""} گزارش با شماره ${data?.No ?? ""} داده شد.`
      })
    }
  }
}
</script>
