<template>
  <fit>
    <safa-grid
      v-model="value.ClsRequest_Notice.Result_Request_Notice"
      cdcName="resultRequestNotice"
      helper="resultRequestNoticeColumns77"
      ref="RequestNoticeGrid"
      title="سوابق اخطار های قبلی"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      @row:dblclick="selectRow"
      :suppressRowClickSelection="false"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    selectRow ({ data: row }) {
      this.$emit("selectHistoryRow", row)
    }
  }
}
</script>
