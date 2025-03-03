<template>
  <fit>
    <safa-grid
      v-model="trafficTools"
      cdcName="trafficTools"
      title="سوابق شهرسازی ملک و تایید درخواست"
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
    rowSelectData: Object
  },
  data () {
    return {
      trafficTools: this.value?.ClsRenewal_Request?.Request_Instrument || Array.isArray(this.value?.ClsRenewal_Request?.Request_Instrument) ? this.value?.ClsRenewal_Request?.Request_Instrument : [],
      trafficToolsColumns: [
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
          width: "200px"
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
