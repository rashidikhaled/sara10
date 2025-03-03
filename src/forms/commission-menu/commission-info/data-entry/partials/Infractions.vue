<template>
  <safa-datatable
    title="لیست تخلفات"
    fit
    helper="infractionsColumns"
    v-model="value"
    cdcName="infractions"
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
      name: "Infractions"
      // infractionsColumns: [
      //   {
      //     field: "Id",
      //     title: "تخلف",
      //     editor: "numeric",
      //     width: "100px"
      //   },
      //   {
      //     field: "CI_Years",
      //     title: "سال تخلف",
      //     width: "100px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "TrepassValue",
      //     title: "مقدار تخلف",
      //     editor: "numeric",
      //     width: "100px"
      //   },
      //   { field: "MinPenalty", title: "حداقل جریمه", width: "100px" },
      //   { field: "Floor", title: "طبقه", editor: "numeric", width: "100px" },
      //   {
      //     field: "UnitCountMojod",
      //     title: "تعداد واحد موجود",
      //     editor: "numeric",
      //     width: "100px"
      //   },
      //   {
      //     field: "CI_OtherEquipmentGroup",
      //     title: "گروه کاربری اصلی موجود",
      //     editor: "combo",
      //     domain: "Commission100",
      //     width: "150px"
      //   },
      //   {
      //     field: "",
      //     title: "کاربری فرعی",
      //     editor: "combo",
      //     domain: "Commission100",
      //     width: "150px"
      //   },
      //   {
      //     field: "K",
      //     title: "ارزش معاملاتی طبق تبصره 11 ماده صد (k)",
      //     width: "200px"
      //   },
      //   {
      //     field: "KCoeffiecient",
      //     title: "ضریب معاملاتی طبق تبصره 11 ماده صد (k)",
      //     width: "200px"
      //   },
      //   { field: "UrbanIdia", title: "تقاضای شهردار", width: "100px" },
      //   { field: "", title: "نوع اسکلت", width: "100px" },
      //   {
      //     field: "CI_BuildingStep",
      //     title: "مرحله ساختمانی",
      //     editor: "combo",
      //     domain: "Commission100",
      //     width: "100px"
      //   },
      //   {
      //     field: "UnitCountMojaz",
      //     title: "تعداد واحد مجاز",
      //     editor: "numeric",
      //     width: "100px"
      //   },
      //   {
      //     field: "AreaMojod",
      //     title: "متراژ موجود",
      //     editor: "numeric",
      //     width: "100px"
      //   },
      //   {
      //     field: "AreaMojaz",
      //     title: "متراژ مجاز",
      //     editor: "numeric",
      //     width: "100px"
      //   },
      //   { field: "Trepass_Comments", title: "توضیحات", width: "150px" },
      //   { field: "Note", title: "تبصره", width: "100px" }
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
