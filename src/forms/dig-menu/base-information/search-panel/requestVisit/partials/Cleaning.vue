<template>
  <fit>
    <safa-grid
      v-model="value.ClsRevisit_Request.RequestService_Scouring"
      cdcName="cleaning"
      title="نظافت"
      :columns="cleaningColumns"
      :suppressRowClickSelection="false"
      :deleteRow="true"
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
      name: "Cleaning",
      cleaning: [],
      cleaningColumns: [
        {
          field: "CI_Scouring",
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
  },
  methods: {},
  mounted () {}
}
</script>
