<template>
  <fit>
    <safa-grid
      ref="pishamad"
      v-model="value.Base_Front"
      cdcName="Base_Front"
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
      title="پیشامدگی ها"
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
  name: 'TabBaseFront',

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
          width: '94px'
        },
        {
          field: 'FloorNo',
          title: 'شماره طبقه',
          editor: 'numeric',
          width: '76px'
        },
        {
          field: 'UnitNo',
          title: 'شماره واحد',
          editor: 'numeric',
          width: '70px'
        },
        {
          field: 'FrontArea',
          title: 'مساحت پيش آمدگي',
          width: '124px',
          editor: 'numeric'
        },
        {
          field: 'FrontHeight',
          title: 'ارتفاع',
          editor: 'numeric',
          width: '70px'
        },
        {
          field: 'FrontWidth',
          title: 'عرض',
          editor: 'numeric',
          width: '70px'
        },
        {
          field: 'FrontLength',
          title: 'طول',
          editor: 'numeric',
          width: '70px'
        },
        {
          field: 'FrontDepth',
          title: 'عمق',
          editor: 'numeric',
          width: '70px'
        },
        {
          field: 'CI_SideCode',
          title: 'جهت معبر',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '130px'
        },
        {
          'field': 'CI_UsingGroup',
          'domain': 'CI_SaraM1',
          'title': 'کاربری اصلی',
          'width': 140,
          'triggerCells': [['CI_UsingType']]
        },
        {
          'field': 'CI_UsingType',
          'title': 'نوع استفاده فرعی',
          'width': 150,
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
          field: 'CI_FrontIs',
          title: 'چگونگي پيش آمدگي',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '120px'
        },
        {
          field: 'CI_FrontPlace',
          title: 'محل وقوع پيش آمدگي',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '127px'
        },
        {
          field: 'CI_RoofType',
          title: 'نوع سقف',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '112px'
        },
        {
          field: 'CI_FrontRoofStatus',
          title: 'وضعيت سقف پيش آمدگي',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '142px'
        },

        {
          field: 'CI_FrontType',
          title: 'نوع پيش آمدگي',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '160px'
        },
        {
          field: 'CI_FrontStatus',
          title: 'وضعیت پيش آمدگي',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '112px'
        },
        {
          field: 'CI_BuildingStep',
          title: 'مرحله ساختماني',
          domain: 'CI_SaraM1',
          editor: 'combo',
          width: '107px'
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
          ...(this.Chk_GenerateYear ? columnGenerateYear : columnGenerateDate)
        },
        {
          ...(this.Chk_GenerateYear
            ? columnConversionYear
            : columnConversionDate)
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
          if (this.$refs.pishamad && this.$refs.pishamad.fetchColumns) {
            this.$refs.pishamad.fetchColumns()
          }
        })
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      }
    }
  }
}
</script>
