<template>
    <fit>
      <div class="fit q-pa-sm">
        <safa-grid
          :columns="baseOtherEquipmentColumns"
          fit
          :bordered="true"
          :suppressRowClickSelection="false"
          title="سایر امکانات"
          min-height="250px"
          height="100%"
          max-height="100%"
          :m="m"
          v-model="value.Base_OtherEquipment"
          :allowMultipleSelection="false"
        />
      </div>
    </fit>
  </template>

<script>
export default {
  name: "TabOtherFacilities",

  props: {
    m: {
      type: String,
      default: "r"
    },
    value: {
      type: Object,
      required: true
    },
    isLoadedFromMenu: Boolean
  },

  data () {
    return {
      baseOtherEquipmentColumns: [
        {
          field: "CI_OtherEquipmentType",
          domain: "CI_SaraM1",
          title: "گروه سایر امکانات",
          width: 140,
          triggerCells: [["CI_OtherEquipmentGroup"]],
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_OtherEquipmentGroup",
          title: "نوع سایر امکانات",
          width: 150,
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
            serviceUrl: "GetCI_OtherEquipmentType_FromCI_OtherEquipmentGroup",
            responseKey: "CI_OtherEquipmentType_FromCI_OtherEquipmentGroup",
            paramName: "pCI_OtherEquipmentGroup",
            groupField: "CI_OtherEquipmentType"
          },
          filter: "agMultiColumnFilter"
        },
        {
          field: "OtherEquipmentValue",
          title: "مقدار",
          editor: "numeric",
          width: 120
        },
        {
          field: "CI_Suggest",
          title: "اظهار نظر",
          editor: "combo",
          domain: "CI_SaraM1",
          width: 120
        },
        {
          field: "CreateDate",
          title: "تاریخ",
          editor: "date",
          width: 120
        },
        {
          field: "Comments",
          title: "توضيحات",
          width: 240
        }
      ]
    }
  }
}
</script>
