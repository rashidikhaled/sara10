<template>
    <fit>
      <safa-grid
           v-model="value.RequestService_Instrument"
           cdcName="RequestService_Instrument"
           title="ادوات ترافیکی"
           :columns="trafficToolsColumns"
           height="100%"
           max-height="100%"
           min-height="200px"
           fit
           :m="m"
           paginate
           :pageSize="20"
         />
    </fit>
  </template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      trafficToolsColumns: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: "CI_Instrument",
          title: "نوع",
          domain: "Dig",
          editor: "combo",
          width: "250px"
        },
        { field: "Value", title: "مقدار", width: "150px" },
        { field: "Comments", title: "توضیحات", width: "auto" }
      ]
    }
  }
}
</script>
