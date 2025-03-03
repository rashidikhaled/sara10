<template>
  <fit>
    <safa-grid
      v-model="value.ClsRenewal_Request.Request_Instrument"
      cdcName="Request_Instrument"
      title="ادوات ترافیکی"
      :columns="RequestInstrumentColumns"
      :suppressRowClickSelection="false"
      height="100%"
      max-height="100%"
      min-height="200px"
      fit
      m="e"
      paginate
      :pageSize="20"
      :deleteRow="true"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      RequestInstrumentColumns: [
        {
          field: "CI_Instrument",
          title: "نوع",
          width: "200px",
          editor: "combo",
          domain: "Dig"
        },
        {
          field: "Value",
          title: "مقدار",
          width: "200px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "auto"
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
