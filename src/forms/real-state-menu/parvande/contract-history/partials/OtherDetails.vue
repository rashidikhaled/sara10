<template>
  <fit>
    <safa-grid
      v-model="value.ContractBuy_Other"
      cdcName="ContractBuy_Other"
      title=" سایر اطلاعات"
      fit
      paginate
      max-height="100%"
      height="100%"
      :suppressRowClickSelection="false"
      minHeight="100%"
      :addRow="true"
      :deleteRow="true"
      :allowCopy="true"
      :columns="columns"
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
          field: "CI_ContractBuy_Other",
          title: "کد پارامتر",
          width: "200px",
          editor: "combo",
          domain: "Estate"
        },
        { field: "Value", title: "مقدار", width: "200px" },
        { field: "Date", title: "تاریخ", editor: "date", width: "200px" },
        { field: "Description", title: "توضیحات", width: "200px" }
      ],
      rowGrid: []
    }
  }
}
</script>
