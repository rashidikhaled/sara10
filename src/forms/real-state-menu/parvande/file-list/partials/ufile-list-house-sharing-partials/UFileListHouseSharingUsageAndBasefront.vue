<template>
  <fit>
    <safa-splitter v-model="splitterValue" horizontal>
      <template v-slot:before>
          <safa-grid
            title="کاربریها"
            v-model="value.Base_Using"
            :columns="baseUsingColumn"
            fit
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
            title="پیش آمدگیها و سایر کاربریهای خاص"
            v-model="value.Base_Front"
            :columns="baseFrontAndOterUsingColumn"
            fit
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
      baseUsingColumn: [
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
          field: "CI_BuildingType",
          editor: "combo",
          domain: "Estate",
          title: "کد اسکلت",
          width: ""
        },
        {
          field: "CI_RoofType",
          editor: "combo",
          domain: "Estate",
          title: "نوع سقف",
          width: ""
        },
        {
          field: "CI_BuildingKind",
          editor: "combo",
          domain: "Estate",
          title: "نوع ساختمان",
          width: ""
        },
        {
          field: "CI_SazehType",
          editor: "combo",
          domain: "Estate",
          title: "نوع سازه",
          width: ""
        },
        {
          field: "CI_BuildingStep",
          editor: "combo",
          domain: "Estate",
          title: "مرحله ساختمان",
          width: ""
        },
        {
          field: "CI_WallType",
          editor: "combo",
          domain: "Estate",
          title: "جنس دیوار",
          width: ""
        },
        { field: "BuildingNo", title: "شماره ساختمان", width: "" },
        { field: "FloorNo", title: "شماره طبقه", editor: "numeric", width: "" },
        { field: "UnitCount", title: "تعداد واحد", width: "" },
        { field: "UsingArea", title: "مساحت کاربری", width: "" },
        { field: "UsefulHeight", title: "ارتفاع مفید", width: "" },
        { field: "GenerateDate", title: "تاریخ احداث کاربری", width: "" },
        { field: "CreateYearFrom", title: "قدمت ساختمان از", width: "" },
        { field: "CreateYearTo", title: "قدمت ساختمان تا", width: "" },
        { field: "RoofThickness", title: "ضخامت سقف", width: "" },
        { field: "Append", title: "الحاق", width: "" },
        { field: "Depth1No", title: "تعداد عمق اول", width: "" },
        { field: "Depth2No", title: "تعداد عمق دوم", width: "" },
        { field: "Depth3No", title: "تعداد عمق سوم", width: "" },
        { field: "Depth1Area", title: "مساحت عمق اول", width: "" },
        { field: "Depth2Area", title: "مساحت عمق دوم", width: "" },
        { field: "Depth3Area", title: "مساحت عمق سوم", width: "" },
        { field: "Dahaneh", title: "دهنه متوسط", width: "" },
        { field: "UsingDepth", title: "عمق کاربری", width: "" },
        { field: "BusyArea", title: "سطح اشغال", width: "" },
        { field: "OverOnTarakom", title: "احداث مازاد بر تراکم", width: "" },
        { field: "OverOnArea", title: "احداث مازاد بر سطح", width: "" },
        {
          field: "OverOnLengthNear",
          title: "احداث مازاد بر طول مجاورین",
          width: ""
        },
        { field: "ProgressPercent", title: "درصد پیشرفت", width: "" },
        { field: "UsingArea_Cur", title: "مساحت فعلی", width: "" },
        {
          field: "OverOrNoParvaneh",
          title: "احداث مازاد یا بدون پروانه",
          width: ""
        },
        { field: "EditUsingArea", title: "مساحت تغییر کاربری", width: "" },
        { field: "CurUsingGroup", title: "کاربری اصلی-فعلی", width: "" },
        { field: "CurUsingType", title: "کاربری فرعی-فعلی", width: "" },
        { field: "UnitNo", title: "شماره واحد", width: "" }
      ],
      baseFrontAndOterUsingColumn: [
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
          editor: "combo",
          domain: "Estate",
          ignoreCi: false,
          title: "فرعی",
          width: ""
        },
        {
          field: "CI_FrontIs",
          editor: "combo",
          domain: "Estate",
          title: "کد چگونگی پیشامدگی",
          width: ""
        },
        {
          field: "CI_FrontPlace",
          editor: "combo",
          domain: "Estate",
          title: "کد محل وقوع پیشامدگی",
          width: ""
        },
        {
          field: "CI_FrontRoofStatus",
          editor: "combo",
          domain: "Estate",
          title: "کد وضعیت سقف پیشامدگی",
          width: ""
        },
        {
          field: "CI_FrontType",
          editor: "combo",
          domain: "Estate",
          title: "کد نوع پیشامدگی",
          width: ""
        },
        {
          field: "CI_BuildingStep",
          editor: "combo",
          domain: "Estate",
          title: "مرحله ساختمان",
          width: ""
        },
        { field: "BuildingNo", title: "شماره ساختمان", width: "" },
        { field: "FloorNo", title: "شماره طبقه", editor: "numeric", width: "" },
        { field: "FrontArea", title: "مساحت پیشامدگی", width: "" },
        { field: "FrontHeight", title: "ارتفاع/طول", width: "" },
        { field: "FrontWidth", title: "عمق/عرض", width: "" },
        { field: "Depth1No", title: "تعداد عمق اول", width: "" },
        { field: "Depth2No", title: "تعداد عمق دوم", width: "" },
        { field: "Depth3No", title: "تعداد عمق سوم", width: "" },
        { field: "Depth1Area", title: "مساحت عمق اول", width: "" },
        { field: "Depth2Area", title: "مساحت عمق دوم", width: "" },
        { field: "Depth3Area", title: "مساحت عمق سوم", width: "" },
        { field: "FrontLength", title: "طول", width: "" },
        { field: "FrontWidth", title: "عمق", width: "" },
        { field: "HeightKaf", title: "ارتفاع از کف", width: "" },
        { field: "UnitNo", title: "شماره واحد", width: "" },
        { field: "CreateYearFrom", title: "قدمت ساختمان از", width: "" },
        { field: "CreateYearTo", title: "قدمت ساختمان تا", width: "" }
      ]
    }
  }
}
</script>
