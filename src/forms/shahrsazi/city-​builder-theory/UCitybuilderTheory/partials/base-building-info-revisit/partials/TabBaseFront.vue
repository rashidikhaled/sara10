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
      :defaultNewRow="defaultNew"
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
      defaultNew: () => ({
        CI_FrontStatus: null,
        DWGObjectName: null,
        ActDate: null,
        BuildingNo: 0,
        BusyArea: null,
        CI_BuildingKind: 0,
        CI_BuildingStep: 0,
        CI_BuildingType: null,
        CI_HowChangeBuilding: null,
        CI_Repair: null,
        CI_RoofType: 0,
        CI_SazehType: 0,
        CI_UsingGroup: 0,
        CI_UsingPlace: null,
        CI_UsingStatus: null,
        CI_UsingType: 0,
        CI_ViewCode: null,
        CI_WallType: 0,
        ConversionDate: null,
        CreateYearFrom: 0,
        CreateYearTo: 0,
        DWGObjectID: null,
        Dahaneh: 0,
        Depth1Area: null,
        Depth1No: null,
        Depth2Area: null,
        Depth2No: null,
        Depth3Area: null,
        Depth3No: null,
        EditUsingArea: 0,
        FloorNo: 0,
        GarbageUnit: null,
        GenerateDate: null,
        IllegalInfrastructure: null,
        MassDistance_Main: null,
        MassDistance_Sub: null,
        OverOnArea: null,
        OverOnLengthNear: null,
        OverOnTarakom: null,
        OverOrNoParvaneh: null,
        ProgressPercent: 0,
        RepairArea: null,
        RoofThickness: 0,
        UnUsefulHeight: null,
        UnitCount: 0,
        UnitNo: 0,
        UsefulHeight: 0,
        UsingArea: 0,
        UsingArea_Cur: 0,
        UsingDepth: 0,
        inEdit: false,
        isNew: false,
        selected: false,
        uniqueID: '00000000-0000-0000-0000-000000000000',
        NidBase: '00000000-0000-0000-0000-000000000000',
        NidUsing: '00000000-0000-0000-0000-000000000000'
      }),
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
