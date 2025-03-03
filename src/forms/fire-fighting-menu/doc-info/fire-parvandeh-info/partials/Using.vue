<template>
  <fit>
    <!-- <safa-status :result="result" /> -->
    <fit>
      <safa-splitter v-model="SplitterModel" horizontal class="fit" margin="0">
        <template v-slot:before>
          <fit>
            <safa-grid
              :columns="UsingInfo"
              title="مشخصات طبقه و کاربری"
              fit
              height="100%"
              min-height="200px"
              max-height="100%"
              :m="m"
              :bordered="false"
              v-model="value.Base_Using"
              cdcName="Base_Using"
              :suppressRowClickSelection="false"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-splitter
              v-model="SplitterModel"
              cdcName="SplitterModel"
              vertical
              class="fit"
              margin="0"
            >
              <template v-slot:before>
                <fit>
                  <safa-grid
                    :columns="InfrastructureArea"
                    title="مساحت زیربنای مشترکات"
                    fit
                    height="100%"
                    min-height="200px"
                    max-height="100%"
                    :m="m"
                    v-model="value.Base_SharingInfrastructure"
                    cdcName="Base_SharingInfrastructure"
                    :suppressRowClickSelection="false"
                  />
                </fit>
              </template>
              <template v-slot:after>
                <fit>
                  <safa-grid
                    :columns="Numbers"
                    title="امتیازات"
                    fit
                    height="100%"
                    min-height="200px"
                    max-height="100%"
                    :m="m"
                    v-model="value.Base_SubScription"
                    cdcName="Base_SubScription"
                    :suppressRowClickSelection="false"
                  />
                </fit>
              </template>
            </safa-splitter>
          </fit>
        </template>
      </safa-splitter>
    </fit>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  name: "Using",
  mixins: [baseFormMixin],
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      SplitterModel: 50,
      // helper:InfrastructureArea
      InfrastructureArea: [
        {
          field: "FloorNo",
          title: "شماره طبقه",
          editor: "numeric",
          width: 100
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
        // {
        //   field: "CI_UsingGroup",
        //   title: "اصلی",
        //   width: 180,
        //   domain: "CI_SaraM1",
        //   editor: "combo"
        // },
        // {
        //   field: "CI_UsingType",
        //   title: "فرعی",
        //   width: 180,
        //   domain: "CI_SaraM1",
        //   editor: "combo"
        // },
        {
          field: "SharingInfrastructureArea",
          title: "مساحت",
          editor: "decimal"
        },
        {
          field: "CI_SharingInfrastructureState",
          title: "وضعیت زیربنای مشترکات",
          editor: "combo",
          domainName: "CI_SaraM1"
        },
        {
          field: "UsefulHeight",
          title: "ارتفاع مفید",
          editor: "decimal"
        }
      ],
      // helper="UsingInfo"
      UsingInfo: [
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          width: 120
        },
        {
          field: "FloorNo",
          title: "شماره طبقه",
          width: 100
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
        // {
        //   "field": "CI_UsingGroup",
        //   "title": "اصلی",
        //   "width": 100,
        //   "domain": "CI_SaraM1",
        //   "editor": "combo"
        // },
        // {
        //   "field": "CI_UsingType",
        //   "title": "فرعی",
        //   "width": 100,
        //   "domain": "CI_SaraM1",
        //   "editor": "combo"
        // },
        {
          field: "UnitCount",
          title: "تعداد واحد",
          width: 100
        },
        {
          field: "UsingArea",
          title: "مساحت کاربری",
          width: 120,
          editor: "decimal"
        },
        {
          field: "UsefulHeight",
          title: "ارتفاع مفید",
          width: 100,
          editor: "decimal"
        },
        {
          field: "GenerateDate",
          title: "تاریخ احداث کاربری",
          width: 140,
          editor: "date"
        },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          width: 100,
          domain: "CI_SaraM1"
        },
        {
          field: "CreateYearFrom",
          title: "قدمت ساختمان از",
          width: 130
        },
        {
          field: "CreateYearTo",
          title: " قدمت ساختمان تا",
          width: "130px",
          editor: "numeric"
        },
        {
          field: "RoofThickness",
          title: "ضخامت سقف ",
          width: "120px",
          editor: "decimal"
        },
        {
          field: "Depth1No",
          title: "تعداد عمق اول",
          width: "120px",
          editor: "numeric"
        },
        {
          field: "Depth2No",
          title: "تعداد عمق دوم",
          width: "120px",
          editor: "numeric"
        },
        {
          field: "Depth3No",
          title: "تعداد عمق سوم",
          width: "120px",
          editor: "numeric"
        },
        {
          field: "Depth1Area",
          title: "مساحت عمق اول",
          width: "140px",
          editor: "decimal"
        },
        {
          field: "Depth2Area",
          title: "مساحت عمق دوم",
          width: "140px",
          editor: "decimal"
        },
        {
          field: "Depth3Area",
          title: "مساحت عمق سوم",
          width: "140px",
          editor: "decimal"
        },
        {
          field: "Dahaneh",
          title: " دهنه ی متوسط",
          width: "120px",
          editor: "decimal"
        },
        {
          field: "CI_BuildingKind",
          title: " نوع ساختمان",
          domain: "CI_SaraM1",
          width: "110px"
        },
        {
          field: "CI_SazehType",
          title: " نوع سازه",
          domain: "CI_SaraM1",
          width: "111px"
        },
        {
          field: "CI_WallType",
          title: "جنس دیوار ",
          domain: "CI_SaraM1",
          width: "130px"
        },
        {
          field: "UsingDepth",
          title: "عمق کاربری",
          width: "100px",
          editor: "decimal"
        },
        {
          field: "BusyArea",
          title: "سطح اشغال",
          width: "120px",
          editor: "decimal"
        },
        {
          field: "OverOnArea",
          title: "احداث مازاد بر سطح",
          width: "140px",
          editor: "decimal"
        },
        {
          field: "OverOnTarakom",
          title: "احداث مازاد بر تراکم",
          width: "140px",
          editor: "decimal"
        },
        {
          field: "OverOnLengthNear",
          title: "احداث مازاد بر طول مجاورین",
          width: "180px",
          editor: "decimal"
        },
        {
          field: "CI_BuildingStep",
          title: " مرحله ی ساختمانی",
          domain: "CI_SaraM1",
          width: "140px"
        },
        {
          field: "ProgressPercent",
          title: " درصد پیشرفت",
          width: "120px"
        },
        {
          field: "UsingArea_Cur",
          title: "مساحت فعلی ",
          width: "117px",
          editor: "decimal"
        },
        {
          field: "OverOrNoParvaneh",
          title: "احداث مازاد یا بدون پروانه",
          width: "180px",
          editor: "decimal"
        },
        {
          field: "EditUsingArea",
          title: "مساحت تغییر کاربری",
          width: "160px",
          editor: "decimal"
        },
        {
          field: "CurUsingGroup",
          title: "کاربری اصلی-فعلی",
          width: "140px",
          editor: "numeric"
        },
        {
          field: "CurUsingType",
          title: "کاربری فرعی-فعلی",
          width: "140px",
          editor: "numeric"
        },
        {
          field: "UnitNo",
          title: "شماره واحد",
          width: "100px",
          editor: "numeric"
        }
      ],
      // helper="Numbers"
      Numbers: [
        {
          field: "CI_SubScriptionType",
          title: "نوع اشتراك",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "150px"
        },
        {
          field: "SubScriptionVal",
          title: "شماره اشتراك",
          editor: "texteditor",
          width: "110px"
        },
        {
          field: "CI_SubScriptionStatus",
          title: "وضعيت اشتراک",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "290px"
        },
        {
          field: "Ampere",
          title: "آمپر",
          editor: "decimal",
          width: "70px"
        },
        {
          field: "Phase",
          title: "فاز",
          editor: "decimal",
          width: "70px"
        },
        {
          field: "CI_SubScriptionUsingType",
          title: "نحوه برخورداري",
          domain: "CI_SaraM1",
          editor: "combo",
          width: "150px"
        },
        {
          field: "InstallationDate",
          title: "تاریخ نصب کنتور",
          editor: "date",
          width: "150px"
        },
        {
          width: "300px"
        }
      ]
    }
  }
}
</script>
