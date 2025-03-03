<template>
  <fit>
    <safa-notice>
      مخاطب محترم استعلام ، با سلام این شرکت/سازمان شهرداری در نظر دارد در محل
      تعیین شده با مشخصات مندرج در فرم درخواست نسبت به انجام حفاری اقدام نماید
      لطفا طح ها و تاسیسات موجود در محل مذکور در قالب نقشه و مشخصات کامل ضمیمه و
      اعلام گردد.
    </safa-notice>
    <safa-grid
      v-model="value.ClsRequestService_Info.RequestService_Inquiry"
      cdcName="RequestService_Inquiry"
      :columns="requestServiceInquiryColumns"
      paginate
      m="r"
      fit
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    m: String,
    value: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      requestServiceInquiryColumns: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          editor: "combo",
          domain: "Dig",
          width: "80px"
        },
        {
          field: "CI_TypeAcceptInquiry",
          title: "نوع پاسخ",
          editor: "combo",
          domain: "Dig",
          width: "80px"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          editor: "date",
          width: "80px"
        },
        { field: "Tell", title: "تلفن", width: "80px" },
        { field: "CreatorUserName", title: "کاربر ایجاد کننده", width: "80px" },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ استعلام",
          editor: "date",
          width: "80px"
        },
        { field: "AcceptUserName", title: "کاربر پاسخ دهنده", width: "80px" },
        {
          field: "ExpireInquiryDate",
          title: "تاریخ پایان مهلت استعلام",
          editor: "date",
          width: "80px"
        },
        { field: "IsExpire", title: "استعلام اولیه", width: "80px" },
        { field: "IsAnswerEnable", title: "گزارش", width: "80px" },
        { field: "Description", title: "توضیحات", width: "auto" }
      ]
    }
  }
}
</script>
