<template>
  <fit>
    <safa-grid
      v-model="value.RequestService_Instrument"
      cdcName="RequestService_Instrument"
      title="سوابق شهرسازی ملک و تایید درخواست"
      :columns="requestServiceInstrumentColumns"
      height="100%"
      max-height="100%"
      min-height="200px"
      fit
      m="r"
      paginate
      :pageSize="20"
      :suppressRowClickSelection="false"
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
      requestServiceInstrumentColumns: [
        {
          field: "CI_Instrument",
          title: "نوع",
          width: "100px",
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
  }
}
</script>
