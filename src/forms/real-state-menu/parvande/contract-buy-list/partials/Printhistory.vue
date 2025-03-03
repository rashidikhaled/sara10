<template>
  <fit>
    <template>
      <safa-grid
        title="سایر اطلاعات"
        v-model="value.PrintLog_Info"
        :columns="colGirid1"
        fit
        :suppressRowClickSelection="false"
        paginate
        cdcName="PrintLog_Info"
        m="r"
      />
    </template>
  </fit>
</template>

<script>
export default {

  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      horizontalSplitterModel: 50,
      colGirid1: [
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
        { field: "PrintDate", title: "تاریخ", width: "100px" },
        { field: "PrintTime", title: "ساعت", width: "100px" }

      ]
    }
  },
  methods: {}
}
</script>
