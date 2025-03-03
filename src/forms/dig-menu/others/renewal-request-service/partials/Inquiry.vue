<template>
  <fit>
    <safa-notice
      >مخاطب محترم استعلام : با سلام ، این شرکت/سازمان/شهرداری در نظر دارد در
      محل تعیین شده با مشخصات مندرج در فرم درخواست نسبت به انجام حفاری اقدام
      نماید. لطفا طرح ها و تاسیسات موجود در محل مذکور در قالب نقشه و مشخصات کامل
      ضمیمه و اعلام گردد.</safa-notice
    >
    <safa-grid
      cdcName="RequestService_Inquiry"
      v-model="value.RequestService_Inquiry"
      :columns="RequestServiceInquiryColumns"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      m="r"
      fit
      paginate
      :pageSize="20"
      :suppressRowClickSelection="false"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      RequestServiceInquiryColumns: [
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
        { field: "IsExpire", title: "استعلام اولیه" },
        {
          field: "", // IsAnswerEnable
          title: "",
          editor: "action",
          width: "80px",
          btnTitle: "گزارش",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.inquiryHandler(params)
        },
        { field: "Description", title: "توضیحات" }
      ],
      Request_Inquiry: []
    }
  },
  methods: {
    inquiryHandler ({ data }) {
      this.$emit("inquiryHandler", data)
    }
  }
}
</script>
