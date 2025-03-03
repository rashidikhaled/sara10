<template>
  <fit>
    <safa-grid
      pagination
      v-model="value.ClsRequest_Info.ListRequest_Info"
      cdcName="HistoryColumn"
      helper="expertHistoryList"
      fit
      m="r"
      height="100%"
      min-height="200px"
      max-height="100%"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      :bordered="false"
      :allowMultipleSelection="false"
    />
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
