<template>
  <fit>
    <template>
      <safa-grid
        title="سایر اطلاعات"
        v-model="value.ContractBuy_Other"
        :suppressRowClickSelection="false"
        :columns="colGirid1"
        fit
        paginate
        cdcName="ContractBuy_Other"
        m="r"
      />
    </template>
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
      horizontalSplitterModel: 50,
      colGirid1: [
        {
          field: "CI_ContractBuy_Other",
          title: "کد پارامتر",
          editor: "combo",
          domain: "Estate",
          width: "100px"
        },
        {
          field: "Value",
          title: "مقدار",
          width: "100px"
        },
        { field: "Date", title: "تاریخ", width: "140px", ediror: "date" },
        { field: "Description", title: "توضیحات", width: "400px" }
      ]
    }
  },
  methods: {}
}
</script>
