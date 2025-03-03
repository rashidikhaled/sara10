<template>
  <fit>
    <safa-grid
      ref="karbariha"
      v-model="value.Base_Using"
      cdcName="Base_Using"
      :allowCopy="true"
      :bordered="false"
      :columns="columns"
      :copyWithCount="true"
      :m="m"
      :pagination="true"
      :selectable="true"
      fit
      height="100%"
      max-height="100%"
      min-height="100px"
      title="کاربری ها"
    />
  </fit>
</template>

<script>
import { GLOBAL_SETTINGS_GUID } from 'src/config/SETTINGS_CONSTs'

const columnGenerateYear = {
  field: 'GenerateDate',
  title: 'سال احداث کاربری',
  width: '160px',
  editor: 'ci',
  ciName: 'CI_DutyYear',
  domain: 'CI_SaraM1'
}
const columnGenerateDate = {
  field: 'GenerateDate',
  title: 'تاریخ احداث کاربری',
  editor: 'date',
  width: '160px'
}
const columnConversionYear = {
  field: 'ConversionDate',
  title: 'سال تبدیل',
  width: '160px',
  editor: 'ci',
  ciName: 'CI_DutyYear',
  domain: 'CI_SaraM1'
}
const columnConversionDate = {
  field: 'ConversionDate',
  title: 'تاریخ تبدیل',
  editor: 'date',
  width: '160px'
}
export default {
  name: 'TabBaseUsing',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      Chk_GenerateYear: false
    }
  },

  computed: {
    columns () {
      return [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: 'BuildingNo',
          title: 'شماره ساختمان',
          editor: 'numeric',
          width: '100px'
        },
        {
          field: 'FloorNo',
          title: 'طبقه',
          editor: 'numeric',
          width: '50px'
        },
        {
          field: 'UnitNo',
          title: 'شماره واحد',
          editor: 'numeric',
          width: '80px'
        },
        {
          'field': 'CI_UsingGroup',
          'domain': 'CI_SaraM1',
          'title': 'کاربری اصلی',
          'width': 200,
          'triggerCells': [['CI_UsingType']]
        },
        {
          'field': 'CI_UsingType',
          'title': 'نوع استفاده فرعی',
          'width': 200,
          ignoreCi: true,
          'editor': 'ADPGridTemplate',
          'params': {
            'serviceUrl': 'GetCI_UsingType_FromCI_UsingGroup',
            'responseKey': 'CI_UsingType_FromCI_UsingGroup',
            'paramName': 'pCI_UsingGroup',
            'groupField': 'CI_UsingGroup'
          }
        },
        {
          field: 'UsingArea',
          title: 'مساحت كاربری',
          width: '89px',
          editor: 'numeric'
        },
        {
          field: 'CI_UsingStatus',
          title: 'وضعیت کاربری',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '140px'
        },
        {
          field: 'UnitCount',
          title: 'تعداد واحد',
          editor: 'numeric',
          width: '70px'
        },
        {
          field: 'CI_BuildingKind',
          title: 'نوع ساختمان',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '250px'
        },
        {
          field: 'CI_RoofType',
          title: 'نوع سقف',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '160px'
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
          domain: 'CI_SaraM1',
          width: '160px'
        },
        {
          ...(this.Chk_GenerateYear ? columnGenerateYear : columnGenerateDate)
        },
        {
          ...(this.Chk_GenerateYear
            ? columnConversionYear
            : columnConversionDate)
        },
        {
          field: 'CreateYearFrom',
          title: 'قدمت ساختمان از',
          width: '160px',
          ciName: 'CI_DutyYear',
          domain: 'CI_SaraM1',
          editor: 'ci',
          comboSort: 'desc'
        },
        {
          field: 'CreateYearTo',
          title: 'قدمت ساختمان تا',
          width: '160px',
          ciName: 'CI_DutyYear',
          domain: 'CI_SaraM1',
          editor: 'ci',
          comboSort: 'desc'
        },
        {
          field: 'OverOnLengthNear',
          title: 'احداث مازاد بر طول مجاورين',
          width: '149px',
          editor: 'numeric'
        },
        {
          field: 'UsefulHeight',
          title: 'ارتفاع مفيد',
          editor: 'numeric',
          width: '70px'
        },
        {
          field: 'UnUsefulHeight',
          title: 'ارتفاع غیرمفید',
          width: '100px',
          editor: 'numeric'
        },
        {
          field: 'RoofThickness',
          title: 'ضخامت سقف',
          editor: 'numeric',
          width: '82px'
        },
        {
          field: 'Dahaneh',
          title: 'دهنه متوسط',
          editor: 'numeric',
          width: '83px'
        },
        {
          field: 'EditUsingArea',
          title: 'مساحت تغییر کاربری',
          width: '112px',
          editor: 'numeric'
        },
        {
          field: 'CI_HowChangeBuilding',
          title: 'وضعیت زیربنا',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '160px'
        },
        {
          field: 'ProgressPercent',
          title: 'درصد پيشرفت',
          editor: 'percentage',
          width: '88px'
        },
        {
          field: 'BusyArea',
          title: 'سطح اشغال',
          editor: 'numeric',
          width: '87px'
        },
        {
          field: 'OverOnArea',
          title: 'احداث مازاد بر سطح',
          width: '112px',
          editor: 'numeric'
        },
        {
          field: 'OverOnTarakom',
          title: 'احداث مازاد بر تراکم',
          width: '116px',
          editor: 'numeric'
        },
        {
          field: 'OverOrNoParvaneh',
          title: 'احداث مازاد يا بدون پروانه',
          width: '135px',
          editor: 'numeric'
        },
        {
          field: 'IllegalInfrastructure',
          title: 'زیربنای غیر مجاز در معبر',
          width: '131px',
          editor: 'numeric'
        },
        {
          field: 'UsingDepth',
          title: 'عمق کاربری',
          editor: 'numeric',
          width: '73px'
        },
        {
          field: 'Depth1No',
          title: 'تعداد عمق اول',
          width: '89px',
          editor: 'numeric'
        },
        {
          field: 'Depth2No',
          title: 'تعداد عمق دوم',
          width: '93px',
          editor: 'numeric'
        },
        {
          field: 'Depth3No',
          title: 'تعداد عمق سوم',
          width: '93px',
          editor: 'numeric'
        },
        {
          field: 'Depth1Area',
          title: 'مساحت عمق اول',
          width: '99px',
          cell: 'numeric'
        },
        {
          field: 'Depth2Area',
          title: 'مساحت عمق دوم',
          width: '110px',
          cell: 'numeric'
        },
        {
          field: 'Depth3Area',
          title: 'مساحت عمق سوم',
          width: '112px',
          cell: 'numeric'
        },
        {
          field: 'MassDistance_Main',
          title: 'فاصله جرم گذاری اصلی',
          width: '128px',
          editor: 'numeric'
        },
        {
          field: 'MassDistance_Sub',
          title: 'فاصله جرم گذاری فرعی',
          width: '133px',
          editor: 'numeric'
        },
        {
          field: 'ActDate',
          title: 'تاریخ اثر',
          editor: 'date',
          width: '110px'
        },
        {
          field: 'GarbageUnit',
          title: 'واحد زباله ساز',
          width: '88px',
          editor: 'numeric'
        },
        {
          field: 'CI_UsingPlace',
          title: 'محل وقوع',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '160px'
        },
        {
          field: 'CI_Repair',
          title: 'نوع تعمیرات',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '160px'
        },
        {
          field: 'RepairArea',
          title: 'مساحت تعمیرات',
          width: '115px',
          cell: 'numeric'
        }
      ]
    }
  },

  created () {
    this.loadFormSetting()
  },

  methods: {
    async loadFormSetting () {
      try {
        const settings = await this.$stKartable.dispatch(
          'formSettings/getSettings',
          {
            key: 'BuildingSettings',
            defaultValue: { ShahrsaziSettings: { Chk_GenerateYear: false } },
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
          }
        )
        this.Chk_GenerateYear =
          (settings &&
            settings.ShahrsaziSettings &&
            settings.ShahrsaziSettings.Chk_GenerateYear) ||
          false
        this.$nextTick().then(() => {
          if (this.$refs.karbariha && this.$refs.karbariha.fetchColumns) {
            this.$refs.karbariha.fetchColumns()
          }
        })
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      }
    }
  }
}
</script>
