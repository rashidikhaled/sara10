<template>
  <fit>
    <safa-grid
      :title="title"
      :columns="confirmationsColumns"
      v-model="value.ApprovalTask_Info"
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
      name: "Confirmations",
      title: "تاییدات",
      confirmationsColumns: [
        {
          field: "userName",
          title: "نام کاربری"
        },
        {
          field: "date",
          editor: "date",
          title: "تاریخ"
        },
        {
          field: "hour",
          title: "ساعت"
        },
        {
          field: "description",
          title: "توضیحات",
          width: "auto"
        }
      ]
    }
  }
}
</script>
