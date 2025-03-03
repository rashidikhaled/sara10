<template>
   <fit>
    <safa-grid
      v-model="value.ClsRevisit_RequestService.RequestService_Instrument"
      cdcName="RequestService_Instrument"
      title="ادوات ترافیکی"
      :columns="trafficToolsColumns"
      height="100%"
      max-height="100%"
      min-height="200px"
      fit
      m="r"
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
      name: "TrafficToolsReviewEve",
      trafficToolsColumns: [
        {
          field: "CI_Instrument",
          title: "نوع",
          width: "300px",
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
