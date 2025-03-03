<template>
  <fit>
      <safa-notice
        >مخاطب محترم استعلام : با سلام ، این شرکت/سازمان/شهرداری در نظر دارد در
        محل تعیین شده با مشخصات مندرج در فرم درخواست نسبت به انجام حفاری اقدام
        نماید. لطفا طرح ها و تاسیسات موجود در محل مذکور در قالب نقشه و مشخصات
        کامل ضمیمه و اعلام گردد.
        </safa-notice>
      <safa-grid
         v-model="value.ClsRevisit_Request.Request_Inquiry"
         cdcName="inquiry"
         title="استعلامات"
         :columns="inquiryColumns"
         height="100%"
         max-height="100%"
         min-height="200px"
         fit
         m="r"
         paginate
         :pageSize="20"
      />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      inquiryColumns: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          width: "200px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "CI_TypeAcceptInquiry",
          title: "نوع پاسخ",
          width: "200px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          width: "200px",
          editor: "date"
        },
        {
          field: "Tell",
          title: "تلفن",
          width: "200px"
        },
        {
          field: "CreatorUserName",
          title: "کاربر ایجاد کننده",
          width: "200px"
        },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ استعلام",
          width: "200px"
        },
        {
          field: "AcceptUserName",
          title: "کاربر پاسخ دهنده",
          width: "200px"
        },
        {
          field: "IsExpire",
          title: "استعلام اولیه",
          width: "200px",
          editor: "checkbox"
        },
        {
          field: "report",
          title: "گزارش",
          width: "200px"
          // editor: "action",
          // cellStyle: {
          //   padding: 0,
          //   margin: 0,
          //   color: "red"
          // },
          // btnTitle: "",
          // btnIcon: "",
          // cellRenderer: (params) =>{},
          // callback: (params) => this.handleCompany(params)
        },
        {
          field: "description",
          title: "توضیحات",
          width: "200px"
        }
      ],
      RequestService_Inquiry: []
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
