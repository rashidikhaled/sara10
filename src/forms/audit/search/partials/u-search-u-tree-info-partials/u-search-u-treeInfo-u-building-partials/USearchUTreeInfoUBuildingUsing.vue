<template>
  <fit>
    <div class="fit q-pa-sm">
      <safa-splitter v-model="splitterModel" horizontal>
        <template v-slot:before>
          <fit class="q-pa-sm">
            <safa-grid
              :columns="baseUsingColumns"
              fit
              :suppressRowClickSelection="false"
              title="کاربری ها"
              min-height="250px"
              height="100%"
              max-height="100%"
              :m="m"
              v-model="dataContext.mainContext.Base_Using"
              :allowMultipleSelection="false"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit class="q-pa-sm">
            <safa-grid
              :columns="baseFrontColumns"
              fit
              :suppressRowClickSelection="false"
              title="بالکن ها"
              min-height="250px"
              height="100%"
              max-height="100%"
              :m="m"
              v-model="dataContext.mainContext.Base_Front"
              :allowMultipleSelection="false"
            />
          </fit>
        </template>
      </safa-splitter>
    </div>
  </fit>
</template>

<script>
export default {
  name: "USearchUTreeInfoUBuildingUsing",

  props: {
    m: {
      type: String,
      default: "r"
    },
    dataContext: {
      type: Object,
      required: true
    },
    isLoadedFromMenu: Boolean
  },

  data () {
    return {
      splitterModel: 50,

      baseUsingColumns: [
        {
          field: "BuildingNo",
          title: "ساختمان",
          editor: "numeric",
          width: 120
        },
        {
          field: "FloorNo",
          title: "طبقه",
          editor: "numeric",
          width: 120
        },
        {
          field: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "کاربری اصلی",
          width: 140,
          triggerCells: [["CI_UsingType"]],
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_UsingType",
          title: "نوع استفاده فرعی",
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
          field: "UsingArea",
          title: "مساحت کاربری",
          width: "120px"
        },
        {
          field: "GenerateDate",
          title: "تاریخ احداث کاربری",
          editor: "date",
          width: 120
        },
        {
          field: "CI_SazehType",
          title: "نوع سازه",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_ViewCode",
          title: "نوع نما",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "CI_BuildingKind",
          title: "نوع ساختمان",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "UnitCount",
          title: "تعداد واحد",
          editor: "numeric",
          width: 120
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختماني",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "UsefulHeight",
          title: "ارتفاع مفيد",
          width: 120
        },
        {
          field: "CI_UsingStatus",
          title: "وضعیت کاربری",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "120px"
        },
        {
          field: "GarbageUnit",
          title: "واحد زباله ساز",
          width: 120
        }
      ],
      baseFrontColumns: [
        {
          field: "BuildingNo"
        },
        {
          field: "FloorNo"
        },
        {
          field: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "کاربری اصلی",
          width: 140,
          triggerCells: [["CI_UsingType"]],
          filter: "agMultiColumnFilter"
        },
        {
          field: "CI_UsingType",
          title: "نوع استفاده فرعی",
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
          field: "FrontArea",
          title: "مساحت بالکن"
        },
        {
          field: "CI_FrontType",
          title: "نوع بالکن"
        },
        {
          field: "CI_SideCode"
        },
        {
          field: "FrontHeight"
        },
        {
          field: "FrontWidth"
        },
        {
          field: "FrontLength"
        },
        {
          field: "FrontDepth"
        },
        {
          field: "CI_FrontIs"
        },
        {
          field: "CI_FrontPlace"
        },
        {
          field: "CI_FrontRoofStatus"
        },
        {
          field: "CI_BuildingStep"
        }
      ]
    }
  }
}
</script>
