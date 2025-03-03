<template>
  <safa-datatable
    title="نوع کمیسیون"
    fit
    :columns="gridColumns"
    :value="CI_CommissionTypeList"
    cdcName="CI_CommissionTypeList"
    @input="$emit('input', CI_CommissionTypeList)"
    m="r"
    height="100%"
    max-height="100%"
    min-height="100%"
    @selectedChange="selectedChange"
    :show-selected-checkbox="true"
    :allowMultipleSelection="true"
    :addRow="false"
    :deleteRow="false"
    :allowCopy="false"
    paginate
  />
</template>

<script>
export default {
  props: ["value"],

  data () {
    return {
      name: "Type",
      gridColumns: [{ field: "Title", title: "نوع کمیسیون", width: "400px" }]
    }
  },

  methods: {
    selectedChange (e) {
      this.$emit("selectedItems", e.selectedItems)
    }
  },
  computed: {
    CI_CommissionTypeList () {
      if (this.value !== null || this.value !== []) return this.value
      return []
    }
  }
}
</script>
