<template>
  <fit>
    <safa-datatable
      v-model="value.RequestService_Inquiry"
      :columns="RequestServiceInquiryColumns"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      fit
      paginate
      cdcName="RequestService_Inquiry"
      m="r"

    />
  </fit>
</template>

<script>
export default {
  props: {
    formKey: String,
    title: String,
    name: String,
    value: Object

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
        { field: "ExpireInquiryDate", title: "تاریخ پایان مهلت استعلام", editor: "date" },
        { field: "IsExpire", title: "استعلام اولیه" },
        { field: "", title: "گزارش" },
        { field: "Description", title: "توضیحات" }
      ]
    }
  },
  methods: {}
}
</script>
