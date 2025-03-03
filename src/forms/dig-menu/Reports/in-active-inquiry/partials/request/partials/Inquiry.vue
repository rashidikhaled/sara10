<template>
  <fit>
    <safa-notice type="warning" class="q-ma-sm"
      >مخاطب محترم استعلام : با سلام ، این شرکت/سازمان/شهرداری در نظر دارد در
      محل تعیین شده با مشخصات مندرج در فرم درخواست نسبت به انجام حفاری اقدام
      نماید لطفا طرح ها و تاسیسات موجود در محل مذکور در قالب نقشه و مشخصات کامل
      ضمیمه و اعلام گردد
    </safa-notice>
    <safa-grid
      v-model="value.ClsRequest_Info.Request_Inquiry"
      :columns="Request_InquiryColumns"
      fit
      height="100%"
      paginate
      cdcName="Request_Inquiry"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  props: {
    m: String,
    model2: Object,
    value: Object
  },
  data () {
    return {
      Request_InquiryColumns: [
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
        { field: "IsExpire", title: "استعلام اولیه", editor: "checkbox" },
        {
          field: "",
          title: "",
          editor: "action",
          isEditable: false,
          width: "80px",
          cellStyle: {
            padding: 0,
            margin: 5
          },
          btnTitle: "مشاهده پاسخ",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.BtnReport(params)
        },
        { field: "Description", title: "توضیحات" }
      ]
    }
  },
  methods: {
    async BtnReport (data) {
      debugger
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`

      const queryParams = {
        NId: data?.NIdInquiry,
        RequestType: "0"
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: data?.NIdInquiry,
        bizCodeTitle: "NIdInquiry"
      })
    }
  }
}
</script>
