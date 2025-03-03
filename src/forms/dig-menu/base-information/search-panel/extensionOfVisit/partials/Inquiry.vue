<template>
  <fit>
    <div class="q-pt-sm q-px-sm">
      <safa-notice>
      مخاطب محترم استعلام، با سلام، این شرکت/سازمان/شهرداری در نظر دارد در محل
      تعیین شده با مشخصات مندرج در فرم درخواست نسبت به انجام حفاری اقدام نماید
      لطفا طرح ها و تاسیسات موجود در محل مذکور در قالب نقشه و مشخصات کامل ضمیمه
      و اعلام گردد
      </safa-notice>
    </div>
    <fit class="q-mt-sm">
      <safa-grid
        v-model="requestInquiry"
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
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: Object,
    rowSelectData: Object
  },
  data () {
    return {
      requestInquiry: this.value?.RevisitRenewal_Request?.Request_Inquiry || [],
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
          // cellRenderer: (params) =>
          //   `<div style="${
          //     params.data?.DaysRemain > 0
          //       ? "background:#31e747;text-align:center"
          //       : "background:#f76666d9;text-align:center"
          //   }">${params.data?.DaysRemain || ""}</div>`,
          // callback: (params) => this.handleCompany(params)
        },
        {
          field: "description",
          title: "توضیحات",
          width: "200px"
        }
      ]
    }
  }
}
</script>
