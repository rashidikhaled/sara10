<template>
  <fit>
    <safa-grid
      title="کاربری ها"
      :columns="columnsUsing"
      v-model="value.Base_Using"
      :add-row="true"
      :allow-copy="true"
      :copy-with-count="true"
      cdcName="Base_Using"
      height="100%"
      max-height="100%"
      :m="m"
      :bordered="false"
      fit
    />

  </fit>
</template>
<script>
export default {
  data () {
    return {
      columnsUsing: [
        // مواردی که کامنت شدن در زمل نبودن
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: 'true',
          headerCheckboxSelection: 'true',
          lockPosition: 'true',
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: "BuildingNo1",
          title: "شماره ساختمان",
          editor: "numeric",
          width: "150px"
        },
        {
          field: "FloorNo",
          editor: "numeric",
          title: "طبقه",
          width: "100px"
        },
        {
          field: 'CI_UsingGroup',
          domain: 'CI_SaraM1',
          title: 'کاربری اصلی',
          width: '140',
          triggerCells: [['CI_UsingType']]
        },
        {
          field: 'CI_UsingType',
          title: 'نوع استفاده فرعی',
          width: '150',
          ignoreCi: 'true',
          editor: 'ADPGridTemplate',
          params: {
            serviceUrl: 'GetCI_UsingType_FromCI_UsingGroup',
            responseKey: 'CI_UsingType_FromCI_UsingGroup',
            paramName: 'pCI_UsingGroup',
            groupField: 'CI_UsingGroup'
          }
        },
        {
          field: "UsingArea",
          title: "مساحت کاربری",
          width: "120px",
          // cell: "grid-area-format",
          cell: "decimal"
        },
        {
          field: "CI_UsingStatus",
          title: "وضعیت کاربری",
          domain: "CI_SaraM1",
          width: "140px"
        },
        {
          field: "UnitCount",
          editor: "numeric",
          title: "تعداد واحد",
          width: "150px"
        },
        {
          field: "GenerateDate",
          title: "تاریخ احداث کاربری",
          width: "150px",
          editor: "date"
        },
        {
          field: "ConversionDate",
          title: "تاریخ تبدیل",
          editor: "date",
          width: "90px"
        },
        // {
        //   field: "OverOnLengthNear",
        //   editor: "numeric",
        //   title: "احداث مازاد بر طول مجاورين",
        //   width: "200px"
        // },

        // {
        //   field: "UnUsefulHeight",
        //   title: "ارتفاع کف تا کف",
        //   editor: "numeric",
        //   width: "110px"
        // },
        {
          field: "CreateYearFrom",
          title: "قدمت ساختمان از",
          editor: "numeric",
          width: "150px"
        },
        {
          field: "CreateYearTo",
          title: "قدمت ساختمان تا",
          editor: "numeric",
          width: "150px"
        },
        {
          field: "RoofThickness",
          title: "ضخامت سقف",
          editor: "numeric",
          width: "140px"
        },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "Dahaneh",
          title: "دهنه متوسط",
          editor: "numeric",
          width: "110px"
        },
        {
          field: "CI_BuildingKind",
          title: "نوع ساختمان",
          domain: "CI_SaraM1",
          width: "140px"
        },
        {
          field: "CI_SazehType",
          title: "نوع سازه",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_WallType",
          title: "جنس ديوار",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_ViewCode",
          title: "نوع نما",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختماني",
          domain: "CI_SaraM1",
          width: "150px"
        },
        {
          field: "ProgressPercent",
          title: "درصد پيشرفت",
          editor: "percentage",
          width: "120px"
        },
        {
          field: "EditUsingArea",
          title: "مساحت تغيير کاربري",
          cell: "grid-area-format",
          width: "160px"
        },
        {
          field: "UnitNo",
          title: "شماره واحد",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "UsingDepth",
          title: "عمق کاربری",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "BusyArea",
          editor: "numeric",
          title: "سطح اشغال",
          width: "100px"
        },
        {
          field: "OverOnTarakom",
          editor: "numeric",
          title: "احداث مازاد بر تراکم",
          width: "150px"
        },
        {
          field: "OverOnLengthNear",
          editor: "numeric",
          title: "احداث مازاد بر طول مجاورین",
          width: "200px"
        },
        {
          field: "OverOrNoParvaneh",
          editor: "numeric",
          title: "احداث مازاد يا بدون پروانه",
          width: "200px"
        },
        {
          field: "UsefulHeight",
          title: "ارتفاع مفيد",
          editor: "numeric",
          width: "110px"
        },
        {
          field: "IllegalInfrastructure",
          editor: "numeric",
          title: "زیربنای غیر مجاز در معبر",
          width: "200px"
        },
        {
          field: "Depth1Area",
          title: "مساحت عمق اول",
          width: "140px"
        },
        {
          field: "Depth2Area",
          title: "مساحت عمق دوم",
          width: "140px"
        },
        {
          field: "Depth3Area",
          title: "مساحت عمق سوم",
          width: "140px"
        }

        // {
        //   field: "CI_BuildingType",
        //   title: "گروه ساختماني",
        //   domain: "CI_SaraM1",
        //   width: "150px"
        // },
        // {
        //   field: "CI_DutyYear",
        //   title: "تاریخ احداث کاربری",
        //   domain: "CI_SaraM1",
        //   editor: "date",
        //   width: "130px"
        // },
        // {
        //   field: "Depth1No",
        //   title: "تعداد عمق اول",
        //   editor: "numeric",
        //   width: "110px"
        // },
        // {
        //   field: "Depth2No",
        //   editor: "numeric",
        //   title: "تعداد عمق دوم",
        //   width: "110px"
        // },
        // {
        //   field: "Depth3No",
        //   editor: "numeric",
        //   title: "تعداد عمق سوم",
        //   width: "110px"
        // },

        // {
        //   field: "CI_HowChangeBuilding",
        //   title: "وضعیت زیربنا",
        //   domain: "CI_SaraM1",
        //   width: "110px"
        // },
        // {
        //   field: "OverOnArea",
        //   editor: "numeric",
        //   title: "احداث مازاد بر سطح",
        //   width: "120px"
        // },
        // {
        //   field: "MassDistance_Main",
        //   editor: "numeric",
        //   title: "فاصله جرم گذاری اصلی",
        //   width: "200px"
        // },
        // {
        //   field: "MassDistance_Sub",
        //   editor: "numeric",
        //   title: "فاصله جرم گذاری فرعی",
        //   width: "200px"
        // },
        // {
        //   field: "ConversionDate",
        //   editor: "numeric",
        //   title: "سال تبدیل",
        //   width: "90px"
        // },

        // {
        //   field: "CI_UsingPlace",
        //   title: "محل وقوع",
        //   domain: "CI_SaraM1",
        //   width: "90px"
        // },
        // {
        //   field: "CI_Repair",
        //   title: "نوع تعمیرات",
        //   domain: "CI_SaraM1",
        //   width: "90px"
        // },
        // {
        //   field: "RepairArea",
        //   cell: "grid-area-format",
        //   title: "مساحت تعمیرات",
        //   width: "90px"
        // }
      ]
    }
  },
  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
