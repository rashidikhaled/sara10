<template>
  <fit>
    <safa-datatable
      v-model="attachResults.RequestListCanAttach"
      cdcName="RequestListCanAttach"
      ref="grid2"
      helper="requestSubmissionAttach"
      :allowMultipleSelection="false"
      :show-selected-checkbox="false"
      :show-row-number="false"
      :selectable="true"
      @row-click="click"
      class="fit"
      height="100%"
      max-height="100%"
      min-height="100%"
      margin="0"
      :bordered="false"
      title="پیوست"
    />
  </fit>
</template>

<script>
export default {
  data () {
    return {
      selectedRow: null
    }
  },
  props: {
    attachResults: {}
  },
  methods: {
    back () {
      this.$emit("backMainForm")
    },
    click (dataItem) {
      this.selectedRow = dataItem
      this.$emit("getAttachInfo", dataItem)
    },
    selectAttach () {
      if (this.selectedRow !== null) {
        this.back()
      } else {
        this.showError("درخواستی برای پیوست انتخاب نشده است.")
      }
    }
  }
}
</script>
