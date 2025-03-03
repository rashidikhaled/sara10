<template>
  <fit>
    <safa-grid
      title="لیست املاک واقع در طرح براساس نقشه"
      v-model="value.HouseInPlansProjectsMap"
      fit
      max-height="100%"
      height="100%"
      minHeight="300px"
      paginate
      :pageSize="20"
      :columns="houseInPlansProjectsMapColumns"
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
      houseInPlansProjectsMapColumns: [
        { field: "GroupId", title: "کد گروه", width: "100px" },
        { field: "RowNum", title: "ردیف", width: "100px" },
        { field: "Code", title: "کد", width: "100px" },
        { field: "Name", title: "نام", width: "200px" },
        { field: "InitialBudget", title: "بودجه", width: "100px" },
        { field: "EvaluationPrice", title: "مبلغ قیمت گذاری", width: "100px" },
        { field: "PrivilegePrice", title: "سایر مبالغ", width: "100px" },
        { field: "FinalPrice", title: "قیمت نهایی", width: "100px" },
        { field: "ContractBuyNo", title: "شماره توافق نامه", width: "200px" },
        {
          field: "ContractBuyDate",
          title: "تاریخ توافق نامه",
          editor: "date",
          width: "200px"
        },
        {
          field: "BudjetPriceRemain",
          title: "باقی مانده بودجه",
          width: "200px"
        },
        { field: "MapArea", title: "مساحت عرصه طبق نقشه", width: "200px" },
        {
          field: "OverLapArea",
          title: "مساحت عرصه در طرح طبق نقشه",
          width: "300px"
        }
      ]
    }
  }
}
</script>
