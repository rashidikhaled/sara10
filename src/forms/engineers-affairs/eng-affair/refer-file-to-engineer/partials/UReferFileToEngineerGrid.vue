<template>
  <safa-datatable
    title=""
    helper="referFileToEng"
    v-model="refResults"
    allowMultipleSelection
    min-height="200px"
    max-height="100%"
    height="100%"
    @row-click="rowClick"
    @selectedChange="selectedChange"
    cdcName="refResults"
  />
</template>

<script>
export default {
  props: {
    refResults: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    rowClick (row) {
      this.$emit("selectedGridRow", row)
    },
    selectedChange (e) {
      this.$emit("selectionGridRow", e)
    }
  }
}
</script>
