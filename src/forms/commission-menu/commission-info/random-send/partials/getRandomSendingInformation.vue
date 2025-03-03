<template>
  <fit>
    <safa-datatable
      helper="randomInformationColumns"
      v-model="value.SendRandomInfo"
      cdcName="SendRandomInfo"
      m="r"
      height="100%"
      max-height="100%"
      min-height="200px"
      fit
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      @selectedChange="selectedChange"
      paginate
      :pageSize="20"
      :take="20"
    />
  </fit>
</template>

<script>
export default {
  props: ["value", "m"],

  data () {
    return {}
  },
  methods: {
    selectedChange (row) {
      this.$emit("selectedItem", row.dataItem)
    }
  }
}
</script>
