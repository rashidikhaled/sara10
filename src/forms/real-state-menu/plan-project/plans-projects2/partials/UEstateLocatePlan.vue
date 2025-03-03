<template>
  <fit>
    <safa-grid
      title="لیست املاک واقع در طرح"
      v-model="value.HouseInPlansProjects"
      cdcName="HouseInPlansProjects"
      :columns="houseInPlansProjectsColumns"
      fit
      max-height="100%"
      height="100%"
      minHeight="300px"
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
      houseInPlansProjectsColumns: [
        { field: "CodeString", title: "کد نوسازی", width: "150px" },
        { field: "Classe", title: "کلاسه پرونده", width: "150px" },
        { field: "TotalPrice", title: "مبلغ کل", width: "150px" },
        {
          field: "CurrentAreaInPlan",
          title: "مساحت عرصه در پروژه",
          width: "200px"
        },
        {
          field: "CurrentAreaRemain",
          title: "مساحت عرصه باقی مانده",
          width: "200px"
        },
        {
          field: "BuildingInPaln",
          title: "مساحت زیربنا در طرح",
          width: "200px"
        },
        {
          field: "BuildingRemain",
          title: "مساحت زیربنا باقی مانده",
          width: "200px"
        },
        { field: "RowOnMap", title: "ردیف در نقشه", width: "200px" },
        {
          field: "AreaOnPlanMap",
          title: "مساحت در طرح طبق نقشه",
          width: "200px"
        },
        {
          field: "ContractBuyDate",
          title: "تاریخ تملک",
          editor: "date",
          width: "100px"
        },
        { field: "Description", title: "توضیحات", width: "400px" }
      ]
    }
  }
}
</script>
