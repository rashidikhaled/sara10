<template>
  <fit>
    <safa-splitter v-model="splitterValueHorizontal" horizontal>
      <template v-slot:before>
        <safa-splitter v-model="splitterValueVerticalR" vertical>
          <template v-slot:before>
            <fit>
              <safa-datatable
                title=" مشخصات طبقه و کاربری"
                fit
                min-height="100px"
                height="100%"
                max-height="100%"
                v-model="value.Base_Using"
                :columns="Base_Using"
                :m="m"
                :showRowNumber="false"
                :show-selected-checkbox="false"
                :allowMultipleSelection="false"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="مساحت زیربنای مشترکات"
                fit
                min-height="100px"
                height="100%"
                max-height="100%"
                v-model="value.Base_SharingInfrastructure"
                :columns="Base_SharingInfrastructure"
                :m="m"
                :showRowNumber="false"
                :show-selected-checkbox="false"
                :allowMultipleSelection="false"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter v-model="splitterValueVerticalL" vertical>
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="دهانه"
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="value.Base_Gap"
                  :columns="Base_Gap"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="امتیازات"
                  fit
                  min-height="100px"
                  height="100%"
                  max-height="100%"
                  v-model="value.Base_SubScription"
                  :columns="Base_SubScription"
                  :m="m"
                  :showRowNumber="false"
                  :show-selected-checkbox="false"
                  :allowMultipleSelection="false"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
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
      // splitter
      splitterValueHorizontal: 50,
      splitterValueVerticalR: 50,
      splitterValueVerticalL: 50,

      // columns:
      Base_Using: [
        {
          title: "اصلی",
          field: "CI_UsingGroup",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "فرعی",
          field: "CI_UsingType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "کد اسکلت",
          field: "CI_BuildingType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "نوع سقف",
          field: "CI_RoofType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "نوع سازه",
          field: "CI_SazehType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "مرحله ساختمان ",
          field: "CI_BuildingStep",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "جنس دیوار ",
          field: "CI_WallType",
          editor: "combo",
          domain: "Estate"
        },

        {
          title: "شماره ساختمان",
          field: "BuildingNo"
        },
        {
          title: "شماره طبقه",
          field: "FloorNo",
          editor: "numeric"
        },
        {
          title: "تعداد واحد ",
          field: "UnitCount"
        },
        {
          title: "مساحت کاربری ",
          field: "UsingArea"
        },
        {
          title: "ارتفاع مفید",
          field: "UsefulHeight"
        },
        {
          title: "تاريخ احداث كاربري  ",
          field: "GenerateDate"
        },
        {
          title: "قدمت ساختمان از ",
          field: "CreateYearFrom"
        },
        {
          title: "قدمت ساختمان تا ",
          field: "CreateYearTo"
        },
        {
          title: " ضخامت سقف",
          field: "RoofThickness"
        },
        {
          title: " الحاق",
          field: "Append"
        },
        {
          title: "تعداد عمق اول",
          field: "Depth1No"
        },
        {
          title: "  تعداد عمق دوم ",
          field: "Depth2No"
        },
        {
          title: "تعداد عمق سوم",
          field: "Depth3No"
        },
        {
          title: "  مساحت عمق اول ",
          field: "Depth1Area"
        },
        {
          title: "  مساحت عمق دوم ",
          field: "Depth2Area"
        },
        {
          title: "مساحت عمق سوم",
          field: "Depth3Area"
        },
        {
          title: "دهنه متوسط",
          field: "Dahaneh"
        },
        {
          title: " عمق کاربری",
          field: "UsingDepth"
        },
        {
          title: "سطح اشغال",
          field: "BusyArea"
        },
        {
          title: "احداث مازاد بر تراکم",
          field: "OverOnTarakom"
        },
        {
          title: " احداث مازاد بر سطح ",
          field: "OverOnArea"
        },
        {
          title: "    احداث مازاد بر طول مجاورین ",
          field: "OverOnLengthNear"
        },
        {
          title: " درصد پیشرفت",
          field: "ProgressPercent"
        },
        {
          title: "مساحت فعلی",
          field: "UsingArea_Cur"
        },
        {
          title: "احداث مازاد يا بدون پروانه",
          field: "OverOrNoParvaneh"
        },
        {
          title: " مساحت تغيير کاربري",
          field: "EditUsingArea"
        },
        {
          title: " کاربری اصلی - فعلی",
          field: "CurUsingGroup"
        },
        {
          title: "کاربری فرعی - فعلی",
          field: "CurUsingType"
        },
        {
          title: "شماره واحد",
          field: "UnitNo"
        }
      ],

      Base_SharingInfrastructure: [
        {
          title: "اصلی",
          field: "CI_UsingGroup",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "فرعی",
          field: "CI_UsingType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "كد وضعيت زير بناي مشتركات",
          field: "CI_SharingInfrastructureState",
          editor: "combo",
          domain: "Estate"
        }
      ],

      Base_Gap: [
        {
          title: "جهت",
          field: "CI_SideCode",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "طول بر",
          field: "BarLen"
        },
        {
          title: "مساحت حريم",
          field: "SpanArea"
        },
        {
          title: " عمق حریم",
          field: "SpanDepth"
        },
        {
          title: " عرض دهنه",
          field: "GapWidth"
        }
      ],

      Base_SubScription: [
        {
          title: "نوع اشتراک",
          field: "CI_SubScriptionType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "وضعیت اشتراک",
          field: "CI_SubScriptionStatus",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: " نحوه برخورداری",
          field: "CI_SubScriptionUsingType",
          editor: "combo",
          domain: "Estate"
        },
        {
          title: "شماره اشتراک",
          field: "SubScriptionVal"
        },
        {
          title: "آمپر",
          field: "Ampere"
        },
        {
          title: "فاز",
          field: "SubScriptionVal"
        }
      ]
    }
  }
}
</script>
