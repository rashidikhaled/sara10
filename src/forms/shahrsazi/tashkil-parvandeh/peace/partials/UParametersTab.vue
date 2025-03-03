<template>
  <fit>
    <safa-grid
      :columns="parametersinPeace"
      v-model="results.PeaceParameters"
      m="e"
      title="پارامترها"
      fit
      :bordered="false"
      max-height="100%"
      height="100%"
      min-height="300px"
      :addRow="false"
      :deleteRow="false"
      :suppressRowClickSelection="false"
    />
  </fit>
</template>

<script>
export default {
  name: "UParameters",
  props: {
    results: Object,
    m: String
  },
  data () {
    return {
      parametersinPeace: [
        {
          field: "isSelected",
          width: "100px",
          title: "ردیف",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false
        },
        {
          field: "Caption",
          title: "عنوان",
          width: "500px",
          editable: false
        },
        {
          field: "Value",
          title: "مقدار",
          width: "auto",
          editable: true
        }
      ]
    }
  }
}
</script>
