<template>
  <fit>
    <safa-grid
      v-model="value.Delivery_Inquiry"
      :columns="deliveryInquiryColumns"
      m="r"
      min-height="200px"
      fit
      paginate
      cdcName="Delivery_Inquiry"
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
      deliveryInquiryColumns: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          editor: "combo",
          domain: "Dig",
          width: "150px"
        },
        {
          field: "IsAccept",
          title: "نتیجه",
          width: "200px",
          editor: "checkbox"
        },
        {
          field: "No",
          title: "شماره",
          width: "100px"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          editor: "date",
          width: "100px"
        },
        {
          field: "Tell",
          title: "تلفن",
          width: "100px"
        },
        {
          field: "CreatorUserName",
          title: "کاربر ایجاد کننده",
          width: "150px"
        },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ استعلام",
          editor: "date",
          width: "150px"
        },
        { field: "AcceptUserName", title: "کاربر پاسخ دهنده", width: "135px" },
        {
          field: "", // IsAnswerEnable
          title: "گزارش",
          editor: "action",
          width: "80px",
          cellStyle: {
            padding: 0,
            margin: 5
          },
          btnTitle: "گزارش",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.BtnReport(params)
        }
      ]
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  },
  methods: {
    async BtnReport (data) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowDeliveryInquiry`
      const queryParams = {
        NId: data.NidDelivery_Inquiry,
        RequestType: "1" // در سرا 8 هم به صورت هارد کد هست
      }
      this.showReport(reportPath, queryParams)
    }
  }
}
</script>
