<template>
  <safa-datatable
    title="لیست اطلاعات شاکی"
    fit
    helper="complainantInfoColumns"
    v-model="value"
    cdcName="complainantInfo"
    m="r"
    height="100%"
    max-height="100%"
    min-height="200px"
    @row-click="selectedRow"
    :show-selected-checkbox="true"
    :allowMultipleSelection="false"
    :addRow="false"
    :deleteRow="false"
    :allowCopy="false"
    paginate
  />
</template>

<script>
export default {
  props: ["value", "m"],

  data () {
    return {
      name: "ComplainantInfo"
      // complainantInfoColumns: [
      //   { field: "EngName", title: "نام", width: "100px" },
      //   { field: "EngFamily", title: "نام خانوادگی", width: "100px" },
      //   { field: "MobileNo", title: "تلفن", width: "100px" },
      //   {
      //     field: "MobileNo",
      //     title: "تلفن همراه",
      //     cell: "PhoneNumberTemplate",
      //     width: "100px"
      //   },
      //   { field: "JobAgreementNo", title: "شماره وکالت نامه", width: "100px" },
      //   {
      //     field: "JobAgreementExpireDate",
      //     title: "تاریخ وکالت نامه",
      //     editor: "date",
      //     width: "100px"
      //   },
      //   { field: "MunicipalityCode", title: "آدرس", width: "200px" },
      //   { field: "ArchitectureCode", title: "کد پستی", width: "100px" }
      // ]
    }
  },

  methods: {
    selectedRow (row) {
      this.$emit("selectedRow", row)
    }
  }
}
</script>
