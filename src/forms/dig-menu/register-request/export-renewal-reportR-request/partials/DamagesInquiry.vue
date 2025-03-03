<template>
  <fit>
    <safa-grid
      v-model="value.Delivery.Delivery_Inquiry"
      :columns="Delivery_InquiryColumn"
      fit
      paginate
      cdcName="Delivery_Inquiry"
      m="r"
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
      Delivery_InquiryColumn: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "IsAccept",
          title: "نتیجه"
        },
        {
          field: "No",
          title: "شماره"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          editor: "date"
        },
        {
          field: "Tell",
          title: "تلفن",
          domain: "Dig"
        },
        {
          field: "CreatorUserName",
          title: "کاربر ایجاد کننده"
        },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ استعلام",
          editor: "date"
        },
        {
          field: "AcceptUserName",
          title: "کاربر پاسخ دهنده"
        },
        {
          field: "", // IsAnswerEnable
          title: "",
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
      ],
      DamagesInquiryList: []
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
      await this.log({
        action: this.logActions.printReport,
        bizCode: data?.NidDelivery_Inquiry,
        bizCodeTitle: "NidDelivery_Inquiry"
      })
    }
  }
}
</script>
