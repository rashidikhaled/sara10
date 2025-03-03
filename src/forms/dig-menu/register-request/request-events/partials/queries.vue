<template>
  <fit>
    <safa-grid
      v-model="value.ClsRequestService_Info.RequestService_Inquiry"
      cdcName="RequestService_Inquiry"
      title="استعلامات"
      :columns="requestServiceInquiryColumns"
            fit
            paginate
      :m="m"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String

    }
  },
  data () {
    return {
      requestServiceInquiryColumns: [
        {
          title: "نام تابعه",
          field: "CI_RedirectName",
          editor: "combo",
          domain: "Dig"
        },
        {
          title: "نوع پاسخ",
          field: "CI_TypeAcceptInquiry",
          editor: "combo",
          domain: "Dig"
        },
        {
          title: "تاریخ استعلام",
          field: "Date"
        },
        {
          title: "تلفن",
          field: "Tell"
        },
        {
          title: "کاربر ایجاد کننده",
          field: "CreatorUserName"
        },
        {
          title: "تاریخ پاسخ استعلام",
          field: "AcceptDate"
        },
        {
          title: "کاربر پاسخ دهنده",
          field: "AcceptUserName"
        },
        {
          title: "استعلام اولیه",
          field: "IsExpire"
        },
        {
          title: "گزارش",
          field: "Report"
        },
        {
          title: "توضیحات",
          field: "Description"
        }
      ]
    }
  }
}
</script>
