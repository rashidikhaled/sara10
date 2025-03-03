<template>
  <fit>
    <safa-grid
      v-model="value.Delivery_Inquiry"
      cdcName="Delivery_Inquiry"
      :columns="deliveryInquiryColumns"
      paginate
      m="r"
      fit
    />
  </fit>
</template>

<script>
export default {
  props: { value: Object, m: String },
  data () {
    return {
      deliveryInquiryColumns: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          editor: "combo",
          domain: "Dig",
          width: "100px"
        },
        {
          field: "IsAccept",
          title: "نتیجه",
          width: "80px",
          editor: "checkbox"
        },
        {
          field: "No",
          title: "شماره",
          width: "80px"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          editor: "date",
          width: "80px"
        },
        {
          field: "Tell",
          title: "تلفن",
          width: "80px"
        },
        {
          field: "CreatorUserName",
          title: "کاربر ایجاد کننده",
          width: "120px"
        },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ استعلام",
          editor: "date",
          width: "135px"
        },
        { field: "AcceptUserName", title: "کاربر پاسخ دهنده", width: "135px" },
        {
          field: "", // IsAnswerEnable
          title: "",
          editor: "action",
          width: "80px",
          btnTitle: "گزارش",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.inquiryHandler(params)
        }
      ]
    }
  },
  methods: {
    inquiryHandler ({ data }) {
      this.$emit('inquiryHandler', data)
    }
  }
}
</script>
