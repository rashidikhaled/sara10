<template>
  <fit>
    <template>
      <safa-grid
        title="تاریخچه چاپ"
        v-model="value.PrintLog_info"
        :columns="colGrid1"
        :suppressRowClickSelection="false"
        fit
        paginate
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        spId="0112810D-77C1-4834-BD60-46764529A5E4"
        cdcName="PrintLog_info"
        :m="m"
      />
    </template>
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
      name: "HistoryOfPrinting",

      // grid
      colGrid1: [
        {
          field: "ReportTitel",
          title: "نام گزارش",
          width: "100px"
        },
        {
          field: "UserName",
          title: "نام کاربر",
          width: "100px"
        },
        { field: "PrintDate", title: "تاریخ", width: "100px", editor: "date" },
        { field: "PrintTime", title: "ساعت", width: "100px" }
      ]
    }
  },
  methods: {
  }
}
</script>
-->
