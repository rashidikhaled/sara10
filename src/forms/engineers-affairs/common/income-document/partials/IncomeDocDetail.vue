<template>
  <fit>
    <safa-datatable
      helper="incomeDocDetails"
      m="r"
      fit
      height="100%"
      max-height="100%"
      min-height="200px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      class="q-mt-sm"
      v-model="docDetails"
      @row-click="selectedRow"
      @DeleteClick="deleteHandler"
    />
  </fit>
</template>

<script>
export default {
  props: {
    docDetails: Array
  },
  data () {
    return {
      title: "جزئیات",
      name: "IncomeDocDetail",
      selectRow: false
    }
  },
  methods: {
    selectedRow (val) {
      this.$emit("selectedRow", val)
    },
    deleteHandler (val) {
      this.$emit("deleteRow", val)
    }
  }
}
</script>

<style>
</style>
