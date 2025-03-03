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
                v-model="value.Base_Owner"
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
                title="جدول مشخصات زمین (عرصه)"
                min-height="250px"
                height="100%"
                max-height="100%"
                :m="m"
                v-model="value.Base_Edge"
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
  name: "TabOnwerInfo",

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
          field: "CI_SideCode",
          title: "جهت",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "PathName",
          title: "نام"
        },
        {
          field: "CI_PathType",
          title: "حدود",
          domain: "CI_SaraM1",
          editor: "combo"
        },
        {
          field: "PathWidth",
          title: "عرض معبر"
        },
        {
          field: "EdgeBarDoc",
          title: "طول بر طبق سند"
        },
        {
          field: "EdgeLenDoc",
          title: "طول ضلع طيق سند"
        },
        {
          field: "EdgeBarCurrent",
          title: "طول بر موجود"
        },
        {
          field: "EdgeLenCurrent",
          title: "طول ضلع موجود"
        },
        {
          field: "Depth1",
          title: "عمق اول"
        },
        {
          field: "Depth2",
          title: "عمق دوم"
        },
        {
          field: "Depth3",
          title: "مساحت پشت جبهه"
        }
      ]
    }
  }
}
</script>
