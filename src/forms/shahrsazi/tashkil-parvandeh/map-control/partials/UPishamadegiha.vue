<template>
  <fit>
    <safa-grid
      v-model="results.Base_Front"
      cdcName="Base_Front"
      :m="m"
      title="پیش آمدگیها"
      fit
      :bordered="false"
      max-height="100%"
      height="100%"
      minHeight="100%"
      :allowCopy="true"
      :copyWithCount="true"
      :columns="columns"
      ref="pishamad"
      :filterable="true"
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
  data () {
    return {
      Chk_GenerateYear: false
    }
  },

  props: {
    results: Object,
    m: String
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
          field: 'FrontArea',
          title: 'مساحت پيش آمدگي',
          editor: 'numeric',
          width: '200px'
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
        // {
        //   field: 'CI_UsingGroup',
        //   title: 'کاربری اصلی / نوع استفاده فرعی',
        //   label: 'کاربری اصلی / نوع استفاده فرعی',
        //   cell: 'UsingGroupTemplate',
        //   width: '600px',
        //   options: {
        //     serviceUrl: 'GetCI_UsingType_FromCI_UsingGroup',
        //     responseKey: 'CI_UsingType_FromCI_UsingGroup',
        //     paramName: 'pCI_UsingGroup',
        //     from: {
        //       domainName: 'CI_SaraM1',
        //       ciName: 'CI_UsingGroup',
        //       field: 'CI_UsingGroup'
        //     },
        //     to: {
        //       field: 'CI_UsingType'
        //     }
        //   }
        // },
        {
          field: 'CI_UsingGroup',
          domain: 'CI_SaraM1',
          title: 'کاربری اصلی',
          width: 140,
          triggerCells: [['CI_UsingType']],
          filter: 'agMultiColumnFilter'
        },
        {
          field: 'CI_UsingType',
          title: 'نوع استفاده فرعی',
          width: 150,
          ignoreCi: true,
          editor: 'ADPGridTemplate',
          params: {
            serviceUrl: 'GetCI_UsingType_FromCI_UsingGroup',
            responseKey: 'CI_UsingType_FromCI_UsingGroup',
            paramName: 'pCI_UsingGroup',
            groupField: 'CI_UsingGroup'
          },
          filter: 'agMultiColumnFilter'
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
          field: 'UnitNo',
          title: 'شماره واحد',
          editor: 'numeric',
          width: '70px'
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
    this.reloadSettings()
  },

  watch: {
    'results.Base_Front' () {
      this.results.Base_Front.forEach((x) => {
        if (x.isNew) {
          x.BuildingNo = 1
        }
      })
    }
  },
  methods: {
    async reloadSettings () {
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
          if (this.$refs.pishamad && this.$refs.pishamad.fetchColumns) this.$refs.pishamad.fetchColumns()
        })
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      }
    }
  }
}
</script>
