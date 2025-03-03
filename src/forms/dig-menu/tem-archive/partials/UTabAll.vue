<template>
  <fit>
  <!-- helper="resultBayganiColumns" -->
    <safa-grid
      :columns="resultBayganiColumns"
      v-model="model.ResultBaygani"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      :suppressRowClickSelection="false"
      @exitBayganiClick="exitBayganiHandler"
      paginate
      :pageSize="50"
    />
  </fit>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => []
    }
  },
  data () {
    return {
      name: "UTabAll",
      resultBayganiColumns: [
        {
          field: "",
          title: "خروج از بایگانی",
          editor: "action",
          width: "120px",
          filterable: false,
          lockPosition: false,
          pinned: "right",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.exitBayganiHandler(params)
        },
        { field: "NIdWorkItem", title: "کد رهگیری", width: "100px" },
        {
          field: "CI_Region",
          title: "منطقه",
          domain: "Dig",
          width: "100px",
          editor: "combo"
        },
        { field: "RequestTypeTitle", title: "نوع درخواست", width: "150px" },
        {
          field: "CodString",
          title: " کد نوسازی",
          width: "150px"
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست",
          width: "150px"
        },
        {
          field: "ExportLicenseNo",
          title: "شماره مجوز",
          width: "150px"
        },
        {
          field: "ExportLicenseDate",
          title: "تاریخ مجوز",
          width: "100px"
        },
        {
          field: "DateSend",
          title: "تاریخ ارسال به بایگانی",
          width: "150px"
        },
        {
          field: "TimeSend",
          title: "ساعت ارسال  به بایگانی",
          width: "200px"
        },
        {
          field: "UserName",
          title: "کاربر ارسال کننده",
          width: "250px"
        },
        {
          field: "Addres",
          title: "آدرس",
          width: "400px"
        }
      ]
    }
  },
  methods: {
    exitBayganiHandler (params) {
      this.$emit("getRow", params)
    }
  }
}
</script>
