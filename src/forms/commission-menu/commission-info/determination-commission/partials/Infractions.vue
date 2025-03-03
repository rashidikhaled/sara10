<template>
  <safa-datatable
    title="تخلفات"
    fit
    :columns="gridColumns"
    :value="CI_TreepassTypeList"
    cdcName="CI_TreepassTypeList"
    @input="$emit('input', CI_TreepassTypeList)"
    m="r"
    height="100%"
    max-height="100%"
    min-height="200px"
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
      name: "Infractions",
      gridColumns: [
        { field: "Id", title: "کد تخلف", width: "60px" },
        { field: "Title", title: "تخلف", width: "250px" }
      ]
    }
  },

  methods: {
    selectedChange (e) {
      this.$emit("selectedItems", e.selectedItems)
    }
  },

  computed: {
    CI_TreepassTypeList () {
      if (this.value !== null || this.value !== []) return this.value
      return []
    }
  }
}
</script>
