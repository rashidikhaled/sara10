<template>
  <fit>
    <safa-splitter v-model="horizontalSplitterModel" horizontal class="q-mb-sm">
      <template v-slot:before>
        <fit>
          <!-- helper="usagesColumns" -->
          <safa-grid
            title="کاربری ها"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="value.Base_Using"
            :columns="usagesColumns"
            :m="m"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>

      <template v-slot:after>
        <fit>
          <!-- helper="basefrontsaAndUsagesColumns" -->
          <safa-grid
            title="پیش آمدگیها و سایر کاربریهای خاص"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="value.Base_Front"
            :columns="basefrontsaAndUsagesColumns"
            :m="m"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
        </fit>
      </template>
      <form-row class="q-mt-sm">
        <form-control>
          <safa-text
            label="نام کاربر ایجاد کننده"
            v-model="value.Base_BuildingInfo.UserName"
            label-width="100px"
            :m="m"
          />
        </form-control>

        <form-control>
          <safa-datepicker
            label="تاریخ ایجاد"
            v-model="value.Base_BuildingInfo.CreateDate"
            label-width="80px"
            :m="m"
          />
        </form-control>
      </form-row>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    m: {
      type: String,
      default: "r"
    }
  },

  data () {
    return {
      name: "usagesAndBasefronts",

      // spilliter
      horizontalSplitterModel: 50,

      usagesColumns: [
        {
          field: "CI_UsingGroup",
          domain: "Estate",
          title: "اصلی",
          width: 140,
          triggerCells: [["CI_UsingType"]],
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_UsingType",
          title: "فرعی",
          width: 150,
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            groupField: "CI_UsingGroup"
          },
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_BuildingKind",
          title: "نوع ساختمان",
          editor: "combo",
          domain: "Estate",
          cell: "grid-combo"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric"
        },
        {
          field: "UsingArea",
          title: "مساحت کاربری",
          cell: "grid-area-format"
        },
        {
          field: "FloorNo",
          title: "شماره طبقه",
          editor: "numeric"
        },
        {
          field: "UnitNo",
          title: "شماره واحد",
          editor: "numeric",
          width: "80px"
        }
      ],

      basefrontsaAndUsagesColumns: [
        {
          field: "CI_FrontBuildingCode",
          title: "نوع پیش آمدگی",
          domain: "Estate",
          editor: "combo",
          cell: "grid-combo",
          width: 350
        },
        {
          field: "CI_SideCode",
          title: "جهت معبر",
          domain: "Estate",
          editor: "combo",
          cell: "grid-combo"
        },
        {
          field: "CI_UsingGroup",
          domain: "Estate",
          title: "اصلی",
          width: 140,
          triggerCells: [["CI_UsingType"]],
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_UsingType",
          title: "فرعی",
          width: 150,
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            groupField: "CI_UsingGroup"
          },
          filter: "agMultiColumnFilter"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric"
        },
        {
          field: "FrontArea",
          title: "مساحت پيش آمدگي",
          cell: "grid-area-format",
          width: "auto"
        }
      ]
    }
  }
}
</script>
