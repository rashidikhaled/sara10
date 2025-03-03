<template>
  <fit>
    <safa-grid
      :title="title"
      :columns="printLogInfoColumns"
      v-model="value.PrintLog_Info"
      :suppressRowClickSelection="false"
      :m="m"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: String
  },
  data () {
    return {
      name: "HistoryOfPrinting",
      title: "تاریخچه چاپ",
      printLogInfoColumns: [
        {
          field: "userName",
          title: "نام گذارش"
        },
        {
          field: "date",
          title: "نام کاربر"
        },
        {
          field: "hour",
          editor: "date",
          title: "تاریخ"
        },
        {
          field: "description",
          title: "ساعت",
          width: "auto"
        }
      ]
    }
  }
}
</script>
