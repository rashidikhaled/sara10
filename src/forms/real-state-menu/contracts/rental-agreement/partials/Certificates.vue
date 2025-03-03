<template>
    <fit>
      <safa-grid
        v-model="value.ApprovalTask_Info"
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
        { field: "UserName", title: "نام کاربر", width: "" },
        { field: "ActionDate", title: "تاریخ", width: "" },
        { field: "ActionTime", title: "ساعت", width: "" },
        { field: "Comments", title: "توضیحات", width: "" }
      ]
    }
  }
}
</script>
