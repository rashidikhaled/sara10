<template>
    <fit>
      <safa-datatable
        v-model="value.Delivery_Inquiry"
        :columns="DeliveryInquiryColumns"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        fit
        paginate
        m="r"
        cdcName="Delivery_Inquiry"

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
      DeliveryInquiryColumns: [
        {
          field: "CI_RedirectName",
          title: "نام تابعه",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "IsAccept",
          title: "نتیجه",
          editor: "checkbox"
        },
        {
          field: "No",
          title: "شماره",
          domain: "Dig"
        },
        {
          field: "Date",
          title: "تاریخ استعلام",
          domain: "Dig"
        },
        {
          field: "Tell",
          title: "تلفن",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "CreatorUserName",
          title: "کاربر ایجاد کننده",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "AcceptDate",
          title: "تاریخ پاسخ استعلام",
          domain: "Dig",
          editor: "combo"
        },
        {
          field: "AcceptUserName",
          title: "کاربر پاسخ دهنده",
          domain: "Dig",
          editor: "combo"
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
      ]
    }
  },
  methods: {
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
}
</script>
