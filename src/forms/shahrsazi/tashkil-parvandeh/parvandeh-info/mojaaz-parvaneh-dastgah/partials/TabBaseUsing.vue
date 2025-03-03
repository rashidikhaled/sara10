<template>
  <fit>
    <safa-datatable2
      title="کاربری ها"
      :m="m"
      v-model="value.Base_Using"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      :bordered="false"
      :allowCopy="true"
      helper="baseUsing"
    />  <!-- ولیدیشن قرار داده شد -->
  </fit>
</template>

<script>
export default {
  name: 'TabBaseUsing',
  data () {
    return {
      columns: [
        {
          field: 'BuildingNo1',
          title: 'شماره ساختمان',
          editor: 'numeric'
        },
        {
          field: 'FloorNo',
          title: 'شماره طبقه',
          editor: 'numeric'
        },
        {
          field: 'UnitCount',
          title: 'تعداد واحد',
          editor: 'numeric'
        },
        {
          field: 'UsingArea',
          title: 'مساحت كاربری',
          editor: 'numeric',
          width: '89px'
        },
        {
          field: 'CI_UsingStatus',
          title: 'وضعیت کاربری',
          editor: 'combo',
          domain: 'CI_SaraM1'
        },
        {
          field: 'UsefulHeight',
          title: 'ارتفاع مفيد',
          editor: 'numeric'
        },
        {
          field: 'GenerateDate',
          title: 'تاریخ احداث کاربری',
          editor: 'date'
        },
        {
          field: 'CI_RoofType',
          title: 'نوع سقف',
          editor: 'combo',
          domain: 'CI_SaraM1'
        },
        {
          field: 'RoofThickness',
          title: 'ضخامت سقف'
        },
        {
          field: 'Dahaneh',
          title: 'دهنه متوسط',
          editor: 'numeric'
        },
        {
          field: 'CI_BuildingKind',
          title: 'نوع ساختمان',
          editor: 'combo',
          domain: 'CI_SaraM1'
        },
        {
          field: 'CI_SazehType',
          title: 'نوع سازه',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '160px'
        },
        {
          field: 'CI_WallType',
          title: 'جنس ديوار',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '160px'
        },
        {
          field: 'CI_ViewCode',
          title: 'نوع نما',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '170px'
        },
        {
          field: 'CI_BuildingStep',
          title: 'مرحله ساختماني',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '160px'
        },
        {
          field: 'CI_BuildingType',
          title: 'گروه ساختماني',
          editor: 'combo',
          domain: 'CI_SaraM1'
        },
        {
          field: 'ProgressPercent',
          title: 'درصد پيشرفت',
          editor: 'numeric'
        },
        {
          field: 'EditUsingArea',
          title: 'مساحت تغییر کاربری',
          editor: 'numeric'
        },
        {
          field: 'UnitNo',
          title: 'شماره واحد',
          editor: 'numeric'
        },
        {
          field: 'CI_HowChangeBuilding',
          title: 'وضعیت زیربنا',
          editor: 'combo',
          domain: 'CI_SaraM1'
        },

        {
          field: 'BusyArea',
          title: 'سطح اشغال',
          editor: 'numeric'
        },
        {
          field: 'OverOnArea',
          title: 'احداث مازاد بر سطح',
          editor: 'numeric'
        },
        {
          field: 'OverOnTarakom',
          title: 'احداث مازاد بر تراکم',
          editor: 'numeric'
        },
        {
          field: 'OverOnLengthNear',
          title: 'احداث مازاد بر طول مجاورین',
          editor: 'numeric'
        },
        {
          field: 'OverOrNoParvaneh',
          title: 'احداث مازاد يا بدون پروانه',
          editor: 'numeric'
        },
        {
          field: 'IllegalInfrastructure',
          title: 'زیربنای غیر مجاز در معبر',
          editor: 'numeric'
        },
        {
          field: 'UsingDepth',
          title: 'عمق کاربری',
          editor: 'numeric'
        },
        {
          field: 'Depth1No',
          title: 'تعداد عمق اول',
          editor: 'numeric'
        },
        {
          field: 'Depth2No',
          title: 'تعداد عمق دوم',
          editor: 'numeric'
        },
        {
          field: 'Depth3No',
          title: 'تعداد عمق سوم',
          editor: 'numeric'
        },
        {
          field: 'Depth1Area',
          title: 'مساحت عمق اول',
          editor: 'numeric'
        },
        {
          field: 'Depth2Area',
          title: 'مساحت عمق دوم',
          editor: 'numeric'
        },
        {
          field: 'Depth3Area',
          title: 'مساحت عمق سوم',
          editor: 'numeric'
        },
        {
          field: 'ConversionDate',
          title: 'تاریخ تبدیل',
          editor: 'date',
          domain: 'CI_SaraM1'
        },
        {
          field: 'MassDistance_Main',
          title: 'فاصله جرم گذاری اصلی',
          editor: 'numeric'
        },
        {
          field: 'MassDistance_Sub',
          title: 'فاصله جرم گذاری فرعی',
          editor: 'numeric'
        },
        {
          field: 'ActDate',
          title: 'تاریخ اثر',
          editor: 'date'
        },
        {
          field: 'GarbageUnit',
          title: 'واحد زباله ساز',
          editor: 'numeric'
        },
        {
          field: 'CI_Repair',
          title: 'نوع تعمیرات',
          domain: 'CI_SaraM1',
          editor: 'combo'
        },
        {
          field: 'RepairArea',
          title: 'مساحت تعمیرات',
          editor: 'numeric'
        }
      ]
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
