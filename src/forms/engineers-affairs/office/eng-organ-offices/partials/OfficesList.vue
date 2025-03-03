<template>
  <safa-datatable
    v-model="value.EngOrgan_OfficeInfoList"
    :columns="officeList"
    :show-selected-checkbox="true"
    :allowMultipleSelection="false"
    :addRow="false"
    :deleteRow="false"
    :allowCopy="false"
    @row-click="rowClick"
    title="لیست دفاتر"
    :take="20"
    :bordered="false"
    paginate
    cdcName="EngOrgan_OfficeInfoList"
  />
</template>

<script>
export default {
  props: ["value"],
  data () {
    return {
      officeList: [
        {
          field: "OfficeName",
          title: "نام دفتر",
          width: "200px"
        },
        {
          field: "OfficeCode",
          title: "کد دفتر",
          width: "100px"
        },
        {
          field: "RegisterDate",
          title: "تاریخ ثبت",
          editor: "date",
          width: "100px"
        },
        {
          field: "OfficePhone",
          title: "شماره تلفن",
          width: "120px"
        },
        {
          field: "OfficeFax",
          title: "نمابر",
          width: "120px"
        },
        {
          field: "OfficeAddress",
          title: "آدرس دفتر",
          width: "400px"
        }
      ]
    }
  },
  methods: {
    rowClick (row) {
      this.$emit("selectRow", row)
    }
  }
}
</script>
