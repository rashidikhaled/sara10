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
      cdcName="Request_Inquiry"
      v-model="value.Request_Inquiry"
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
          field: "IsAnswerEnable",
          title: "گزارش",
          editor: "action",
          btnLabel: "مشاهده پاسخ",
          btnStyle: { outline: true }
        },
        { field: "Description", title: "توضیحات" }
      ]

    }
  }
}
</script>
