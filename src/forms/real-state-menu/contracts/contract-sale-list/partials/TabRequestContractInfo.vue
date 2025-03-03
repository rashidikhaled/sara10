<template>
  <fit>
      <safa-grid
        v-model="value.RequestContractInfoList"
        :columns="colGrid1"
        :suppressRowClickSelection="false"
        fit
        paginate
        cdcName="grid1"
        m="r"
      />
  </fit>
</template>

<script>
export default {
  props: {
    m: { type: String },
    value: { type: Object, default: () => {} }
  },
  data () {
    return {
      name: "TabRequestContractInfo",

      // grid
      colGrid1: [
        {
          field: "IsSelected",
          title: "",
          editor: "checkbox",
          width: "60px"
        },
        {
          field: "CI_ContractProvision",
          title: "عنوان ماده",
          width: "100px",
          editor: "combo",
          domain: "Estate"
        },
        {
          field: "CI_ContractRemark",
          title: "عنوان تبصره",
          width: "100px",
          editor: "combo",
          domain: "Estate"
        },
        { field: "ProvisionComments", title: "توضیحات ماده", width: "100px" }
      ]
    }
  },
  methods: {}
}
</script>
