<template>
  <fit>
    <safa-grid
      v-model="value.ClsRequest_Info.Request_Contractor"
      :columns="Request_ContractorColumns"
      fit
      class="q-ma-sm"
      paginate
      cdcName="Request_Contractor"
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
  components: {},
  data () {
    return {
      Request_ContractorColumns: [
        {
          field: "CompanyCaption",
          title: "شرکت",
          width: "100px"
        },
        { field: "ManagerMobile", title: "همراه مدیرعامل" },
        { field: "ManagerTel", title: "تلفن شرکت" },
        { field: "Description", title: "توضیحات" }
      ]
    }
  },
  methods: {}
}
</script>
