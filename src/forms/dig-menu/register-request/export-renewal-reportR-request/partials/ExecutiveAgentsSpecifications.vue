<template>
  <fit>
    <safa-grid
      v-model="value.ClsRenewal_Request.Request_Contractor"
      :columns="Request_ContractorColumns"
      :addRow="true"
      fit
      class="q-ma-sm"
      paginate
      cdcName="Request_Contractor"
      :m="m"
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
