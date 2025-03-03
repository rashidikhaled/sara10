<template>
  <fit>
    <div class="q-pt-sm q-px-sm">
      <safa-notice
      >مخاطب محترم استعلام : با سلام ، این شرکت/سازمان/شهرداری در نظر دارد در
        محل تعیین شده با مشخصات مندرج در فرم درخواست نسبت به انجام حفاری اقدام
        نماید. لطفا طرح ها و تاسیسات موجود در محل مذکور در قالب نقشه و مشخصات
        کامل ضمیمه و اعلام گردد.
        </safa-notice>
    </div>
    <safa-grid
      title="لیست استعلامات"
      cdcName="RequestService_Inquiry"
      v-model="value.RequestService_Inquiry"
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
    value: Object,
    m: String
  },
  data () {
    return {
      InquiryColumns: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          domain: "Dig",
          editor: "combo",
          width: "100px"
        },
        {
          field: "IsAccept",
          title: "نتیجه",
          editor: "checkbox",
          width: "100px"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          editor: "date",
          width: "100px"
        },
        { field: "Tell", title: "تلفن", width: "100px" },
        {
          field: "CreatorUserName",
          title: "کاربر ایجاد کننده",
          width: "120px"
        },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ استعلام",
          editor: "date",
          width: "140px"
        },
        { field: "AcceptUserName", title: "کاربر پاسخ دهنده", width: "140px" },
        {
          field: "IsExpire",
          title: "استعلام اولیه",
          width: "120px",
          editor: "checkbox"
        },
        // service will be added
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
          callback: (params) => this.inquiryHandler(params)
        },
        { field: "Description", title: "توضیحات", width: "auto" }
      ]
    }
  },
  methods: {
    inquiryHandler ({ data }) {
      this.$emit("inquiryHandler", data)
    }
  }
}
</script>
