<template>
  <fit>
    <div class="fit q-pa-sm">
      <safa-splitter v-model="splitterModel" horizontal>
        <template v-slot:before>
          <fit>
            <safa-grid
              :columns="baseOwnerColumns"
              fit
              :bordered="true"
              :suppressRowClickSelection="false"
              title="مالکین"
              min-height="250px"
              height="100%"
              max-height="100%"
              :m="m"
              v-model="dataContext.mainContext.Base_Owner"
              :allowMultipleSelection="false"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              :columns="baseEdgeColumns"
              fit
              :bordered="true"
              :suppressRowClickSelection="false"
              title="جهات اربعه"
              min-height="250px"
              height="100%"
              max-height="100%"
              :m="m"
              v-model="dataContext.mainContext.Base_Edge"
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
  name: "USearchUTreeInfoUHouseOnwerInfo",

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

      baseOwnerColumns: [
        {
          field: "OwnershipDate",
          title: "تاریخ تملک",
          editor: "date",
          width: 115
        },
        {
          field: "EumOwnerCharacter",
          title: "نوع مالکیت",
          editor: "combo",
          source: [
            { ID: "1", Title: "حقیقی" },
            { ID: "2", Title: "حقوقی" },
            { ID: "3", Title: "اتباع خارجی" }
          ],
          width: 150
        },
        {
          field: "OwnerName",
          title: "نام",
          width: 130
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی",
          width: 150
        },
        {
          field: "IDCardNo",
          title: "شماره شناسنامه",
          width: 125
        },
        {
          field: "OwnerFatherName",
          title: "نام پدر",
          width: 125
        },
        {
          field: "EmissionPlace",
          title: "محل صدور",
          width: 160
        },
        {
          field: "NationalCode",
          title: "کد ملی",
          width: 125
        },
        {
          field: "CellPhone",
          title: "شماره تلفن همراه",
          width: 140
        },
        {
          field: "ToftDang",
          title: "مقدار مالکیت طبق سند دانگ",
          width: 195
        },
        {
          field: "ToftImpart",
          title: "مقدار مالکیت طبق سند سهام",
          width: 195
        },
        {
          field: "OwnershipAyan",
          title: "وضعیت تملک اعیان",
          editor: "checkbox",
          width: 150
        },
        {
          field: "OwnershipArseh",
          title: "وضعیت تملک عرصه",
          editor: "checkbox",
          width: 150
        }
      ],
      baseEdgeColumns: [
        {
          field: "CI_SideCode"
        },
        {
          field: "PathName"
        },
        {
          field: "CI_PathType"
        },
        {
          field: "PathWidth"
        },
        {
          field: "EdgeBarDoc"
        },
        {
          field: "EdgeLenDoc"
        },
        {
          field: "EdgeBarCurrent"
        },
        {
          field: "EdgeLenCurrent"
        },
        {
          field: "Depth1"
        },
        {
          field: "Depth2"
        },
        {
          field: "Depth3"
        }
      ]
    }
  }
}
</script>
