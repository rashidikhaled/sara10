<template>
  <fit>
    <safa-grid
      v-model="value.ContractSale_Other"
      cdcName="ContractSale_Other"
      title=" سایر اطلاعات"
      fit
      m="r"
      :suppressRowClickSelection="false"
      paginate
      max-height="100%"
      height="400px"
      minHeight="200px"
      :addRow="true"
      :deleteRow="true"
      :allowCopy="true"
      :columns="columns"
      @row:click="rowClick"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      name: "OtherDetails",

      // grid
      columns: [
        {
          field: "CI_ContractSale_Other",
          title: "کد پارامتر",
          width: "200px",
          editor: "combo",
          domain: "Estate"
        },
        { field: "Value", title: "مقدار", width: "200px" },
        { field: "Date", title: "تاریخ", editor: "date", width: "200px" },
        { field: "Description", title: "توضیحات", width: "200px" }
      ],
      selectedRow: []
    }
  },
  methods: {
    rowClick (e) {
      this.selectedRow = []
      this.selectedRow.push(e.data)
    }
  }
}
</script>
