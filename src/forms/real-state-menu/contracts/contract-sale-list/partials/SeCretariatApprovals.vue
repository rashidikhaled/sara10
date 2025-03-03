<template>
  <fit>
    <safa-grid
      title="تاییدات"
      v-model="value.ApprovalTask_Info"
      :columns="colGrid1"
      :suppressRowClickSelection="false"
      fit
      paginate
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      spId="A850A1D7-7D9A-41D5-B1E4-EA1588802B08"
      cdcName="ApprovalTask_Info"
      m="r"
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
      name: "SeCretariatApprovals",
      isSubmit: false,

      // grid
      colGrid1: [
        {
          field: "UserName",
          title: "نام کاربر",
          width: "100px"
        },
        {
          field: "ActionDate",
          title: "تاریخ",
          width: "100px",
          editor: "date"
        },
        { field: "ActionTime", title: "ساعت", width: "100px" },
        { field: "Comments", title: "توضیحات", width: "400px" }
      ]
    }
  },
  methods: {

  }
}
</script>
