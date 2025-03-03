<template>
    <fit>
      <safa-grid
        v-model="value.ContractRent_Other"
        fit
        height="100%"
        max-height="100%"
        min-height="100%"
        paginate
        :suppressRowClickSelection="false"
        :columns="Informationcolumns"
        :m="m"
      />
    </fit>
</template>

<script>
export default {
  props: {
    formKey: String,
    title: String,
    name: String,
    m: String,
    value: Object
  },
  data () {
    return {
      // variables
      activeTab: "RentalAgreementDetails",

      //   // services

      //   // grids
      Informationcolumns: [
        {
          field: "CI_ContractRent_Other",
          title: "کد پارامتر",
          width: "",
          editor: "vombo",
          domain: "Estate"
        },
        { field: "Value", title: "مقدار", width: "" },
        { field: "Date", title: "تاریخ", width: "" },
        { field: "Description", title: "توضیحات", width: "" }
      ]
    }
  }
}
</script>
