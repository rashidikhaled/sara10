<template>
  <fit>
  <!-- helper="agPrintingHistoryColumns" -->
    <safa-grid
      title="تاریخچه چاپ"
      v-model="value.PrintLog_Info"
      helper="agPrintingHistoryColumns"
      :suppressRowClickSelection="false"
      fit
      paginate
      cdcName="PrintLog_info"
      :m="m"
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: { type: String },
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
      name: "HistoryOfPrinting"

      // agPrintingHistoryColumns: [
      //   {
      //     field: "ReportTitel",
      //     title: "نام گزارش",
      //     width: "100px"
      //   },
      //   {
      //     field: "UserName",
      //     title: "نام کاربر",
      //     width: "100px"
      //   },
      //   { field: "PrintDate", title: "تاریخ", width: "100px", editor: "date" },
      //   { field: "PrintTime", title: "ساعت", width: "100px" }
      // ]
    }
  },
  methods: {
    submitMailroom () {
      console.log("ثبت دبیرخانه")
    }
  }
}
</script>
