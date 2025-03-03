<template>
  <fit>
    <safa-datatable
      v-model="value.RequestService_Instrument"
      :columns="RRequestServiceInstrumentColumns"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      fit
      paginate
      cdcName="RequestService_Instrument"
      m="r"
    />
  </fit>
</template>

<script>
export default {
  props: {
    formKey: String,
    title: String,
    name: String,
    value: Object

  },
  data () {
    return {
      RRequestServiceInstrumentColumns: [
        {
          field: "CI_Instrument",
          title: "نوع",
          domain: "Dig",
          editor: "combo"
        },
        { field: "Value", title: "مقدار" },
        { field: "Comments", title: "توضیحات" }
      ]
    }
  },
  methods: {}
}
</script>
