<template>
  <fit>
    <safa-grid
      v-model="value.ClsRenewal_Request.Request_Instrument"
      :columns="Request_InstrumentColumns"
      fit
      paginate
      cdcName="Request_Instrument"
      m="r"
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    model2: Object,
    value: Object
  },
  data () {
    return {
      Request_InstrumentColumns: [
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
