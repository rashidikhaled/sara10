<template>
  <fit>
    <safa-splitter v-model="splitterValue" horizontal>
      <template v-slot:before>
          <safa-grid
            v-model="value.Base_Using"
            :columns="usageColumn"
            fit
            title="کاربری ها"
            min-height="150px"
            height="100%"
            max-height="100%"
            :m="m"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
      </template>
      <template v-slot:after>
          <safa-grid
            v-model="value.Base_Front"
            :columns="baseFrontColumn"
            fit
            title="پیش آمدگی ها"
            min-height="150px"
            height="100%"
            max-height="100%"
            :m="m"
            :showRowNumber="false"
            :show-selected-checkbox="false"
            :allowMultipleSelection="false"
          />
      </template>
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
      splitterValue: 50,

      usageColumn: [
        {
          field: "CI_UsingGroup",
          editor: "combo",
          domain: "Estate",
          title: "اصلی",
          width: ""
        },
        {
          field: "CI_UsingType",
          editor: "combo",
          domain: "Estate",
          title: "فرعی",
          ignoreCi: false,
          width: ""
        },
        {
          field: "CI_BuildingKind",
          editor: "combo",
          domain: "Estate",
          title: "نوع ساختمان",
          width: ""
        },
        { field: "BuildingNo", title: "شماره ساختمان", width: "" },
        { field: "UsingArea", title: "مساحت کاربری", width: "" }
      ],

      baseFrontColumn: [
        {
          field: "CI_FrontBuildingCode",
          editor: "combo",
          domain: "Estate",
          title: "نوع پیشامدگی",
          width: ""
        },
        {
          field: "CI_SideCode",
          editor: "combo",
          domain: "Estate",
          title: "جهت معبر",
          width: ""
        },
        {
          field: "CI_UsingGroup",
          editor: "combo",
          domain: "Estate",
          title: "اصلی",
          width: ""
        },
        {
          field: "CI_UsingType",
          title: "فرعی",
          editor: "combo",
          ignoreCi: false,
          domain: "Estate",
          width: ""
        },
        { field: "BuildingNo", title: "شماره ساختمان", width: "" },
        { field: "FrontArea", title: "مساحت پیش آمدگی", width: "" }
      ]
    }
  }
}
</script>
