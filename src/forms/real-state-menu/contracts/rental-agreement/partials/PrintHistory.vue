<template>
    <fit>
      <safa-grid
        v-model="value.PrintLog_info"
        fit
        height="100%"
        max-height="100%"
        min-height="100%"
        paginate
        :suppressRowClickSelection="false"
        :columns="Certificatescolumns"
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
    m: String,
    value: Object
  },
  data () {
    return {
      // grids
      Certificatescolumns: [
        { field: "ReportTitel", title: "نام گزارش", width: "" },
        { field: "UserName", title: "نام کاربر", width: "" },
        { field: "PrintDate", title: "تاریخ", width: "" },
        { field: "PrintTime", title: "ساعت", width: "" }
      ]
    }
  }
}
</script>
