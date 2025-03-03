<template>
  <fit>
    <safa-grid
      v-model="value.RevisitRenewal_RequestService.RequestService_Instrument"
      :columns="requestServiceInstrumentColumns"
      :suppressRowClickSelection="false"
      fit
      paginate
      cdcName="RequestService_Instrument"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      requestServiceInstrumentColumns: [
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
  }
}
</script>
