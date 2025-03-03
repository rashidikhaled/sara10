<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <fit>
    <safa-datatable
      :columns="taskHistoryColumns"
      v-model="getTaskHistoryResult"
      cdcName="getTaskHistoryResult"
      :filterable="true"
      :allow-multiple-selection="false"
      class="fit"
      m="r"
      margin="0"
      height="100%"
      maxHeight="100%"
      minHeight="0"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
    />
  </fit>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UGardeshParvandehDetails",
      title: "جزئیات گردش پرونده",
      formKey: "30F037BA-CA35-490A-8A58-47924A497FBB",
      main: true,
      taskHistoryColumns: [
        { field: "TaskTitle", title: "نام فعالیت", width: "150px" },
        { field: "Name", title: "ارجاع دهنده", width: "200px" },
        {
          field: "StrDate",
          title: "تاریخ شروع",
          editor: "date",
          width: "110px"
        },
        { field: "StrTime", title: "ساعت شروع", width: "100px" },
        {
          field: "CloseDate",
          title: "تاریخ پایان",
          editor: "date",
          width: "100px"
        },
        { field: "CloseTime", title: "ساعت پایان", width: "100px" },
        {
          field: "IsSendExpert",
          title: "ارسال توسط کارشناس",
          editor: "checkbox",
          width: "100px"
        },
        { field: "Description", title: "توضیحات", width: "300px" }
      ],
      getTaskHistoryResult: []
    }
  },
  props: {
    NidCommission: {
      type: String,
      default: ""
    }
  },
  methods: {
    getTaskHistory () {
      if (this.NidCommission === null) return
      this.$services.commissions
        .getTaskHistory({ PRequest: { NIDCommission: this.NidCommission } })
        .then(async ({ data }) => {
          this.getTaskHistoryResult = data.GetTaskHistoryResult.WFHistory
          this.log({
            action: this.logActions.view,
            bizCode: this.NidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `بارگذاری اطلاعات در جزئیات گردش پرونده انجام گردید.`
          })
        })
        .catch((e) => {
          console.error(e, "error_getTaskHistory")
        })
    }
  },

  watch: {
    NidCommission: {
      async handler () {
        await this.getTaskHistory()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
