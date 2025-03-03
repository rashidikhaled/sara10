<template>
  <safa-form
    id="4bce7044-b4ae-471f-b422-64b509051141"
    caption="شهرسازی- جزئیات توافقنامه"
  >
    <fit>
      <safa-splitter
        v-model="splitterModel"
        horizontal
        class="fit"
        margin="0"
        style="min-height: 400px"
      >
        <template v-slot:before>
          <fit>
            <safa-grid
              title="کاربریها"
              v-model="formModel.Base_Using"
              cdcName="Base_Using"
              :columns="columns"
              :m="m"
              fit
              paginate
              max-height="100%"
              height="100%"
              ref="karbariha"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              title="پیش آمدگیها"
              v-model="formModel.Base_Front"
              cdcName="Base_Front"
              helper="pishamadegihaInAgreement"
              :m="m"
              fit
              paginate
              max-height="100%"
              height="100%"
            >
              <template #cell-CI_SideCode="{ row, col, onChangeCellValue }">
                <safa-combo2
                  ciName="CI_SideCode"
                  domainName="CI_SaraM1"
                  :value="row[col.field]"
                  @input="
                    onChangeCellValue({
                      field: col.field,
                      dataItem: row,
                      value: $event,
                    })
                  "
                />
              </template>
            </safa-grid>
          </fit>
        </template>
      </safa-splitter>
    </fit>
  </safa-form>
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
      items: [],
      splitterModel: 50,
      Chk_GenerateYear: false
    }
  },
  props: {
    formModel: {
      type: Object,
      default () {
        return {}
      }
    },
    m: {
      type: String,
      default: 'e'
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
          width: '103px',
          editor: 'numeric'
        },
        {
          field: 'FloorNo',
          title: 'شماره طبقه',
          width: '85px',
          editor: 'numeric'
        },
        // {
        //     field: 'CI_UsingGroup',
        //     title: 'اصلی / فرعی',
        //     label: 'اصلی / فرعی',
        //     cell: 'UsingGroupTemplate',
        //     width: '260px',
        //     options: {
        //         serviceUrl: 'GetCI_UsingType_FromCI_UsingGroup',
        //         responseKey: 'CI_UsingType_FromCI_UsingGroup',
        //         paramName: 'pCI_UsingGroup',
        //         from: {
        //             domainName: 'CI_SaraM1',
        //             ciName: 'CI_UsingGroup',
        //             field: 'CI_UsingGroup'
        //         },
        //         to: {
        //             field: 'CI_UsingType'
        //         }
        //     }
        // },
        {
          field: 'CI_UsingGroup',
          domain: 'CI_SaraM1',
          title: 'کاربری اصلی',
          width: 120,
          triggerCells: [['CI_UsingType']]
        },
        {
          field: 'CI_UsingType',
          title: 'نوع استفاده فرعی',
          width: 120,
          ignoreCi: true,
          editor: 'ADPGridTemplate',
          params: {
            serviceUrl: 'GetCI_UsingType_FromCI_UsingGroup',
            responseKey: 'CI_UsingType_FromCI_UsingGroup',
            paramName: 'pCI_UsingGroup',
            groupField: 'CI_UsingGroup'
          }
        },
        {
          field: 'UnitCount',
          title: 'تعداد واحد',
          width: '85px',
          editor: 'numeric'
        },
        {
          field: 'UsingArea',
          title: 'مساحت كاربري',
          width: '100px',
          editor: 'numeric'
        },
        {
          field: 'CI_UsingStatus',
          title: 'وضعیت کاربری',
          domain: 'CI_SaraM1',
          width: '120px',
          editor: 'combo'
        },
        {
          field: 'UsefulHeight',
          title: 'ارتفاع مفيد',
          width: '90px',
          editor: 'numeric'
        },
        {
          field: 'UnUsefulHeight',
          title: 'ارتفاع کف تا کف',
          width: '100px',
          editor: 'numeric'
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
          field: 'CI_RoofType',
          title: 'نوع سقف',
          domain: 'CI_SaraM1',
          width: '120px',
          editor: 'combo'
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
          field: 'RoofThickness',
          title: 'ضخامت سقف',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'Dahaneh',
          title: 'دهنه متوسط',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'CI_BuildingKind',
          title: 'نوع ساختمان',
          domain: 'CI_SaraM1',
          width: '120px',
          editor: 'combo'
        },
        {
          field: 'CI_SazehType',
          title: 'نوع سازه',
          domain: 'CI_SaraM1',
          width: '120px',
          editor: 'combo'
        },
        {
          field: 'CI_WallType',
          title: 'جنس ديوار',
          domain: 'CI_SaraM1',
          width: '120px',
          editor: 'combo'
        },
        {
          field: 'CI_BuildingStep',
          title: 'مرحله ساختماني',
          domain: 'CI_SaraM1',
          width: '120px',
          editor: 'combo'
        },
        // {
        //   field: 'CI_BuildingType',
        //   title: 'گروه ساختماني'
        // },
        {
          field: 'ProgressPercent',
          title: 'درصد پيشرفت',
          width: '120px',
          editor: 'percentage'
        },
        {
          field: 'EditUsingArea',
          title: 'مساحت تغيير کاربري',
          width: '130px',
          cell: 'numeric'
        },
        {
          field: 'UnitNo',
          title: 'شماره واحد',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'UsingDepth',
          title: 'عمق کاربری',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'CI_HowChangeBuilding',
          title: 'وضعیت زیربنا',
          domain: 'CI_SaraM1',
          width: '120px',
          editor: 'combo'
        },
        {
          field: 'BusyArea',
          title: 'سطح اشغال',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'OverOnArea',
          title: 'احداث مازاد بر سطح',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'OverOnTarakom',
          title: 'احداث مازاد بر تراکم',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'OverOnLengthNear',
          title: 'احداث مازاد بر طول مجاورین',
          width: '160px',
          editor: 'numeric'
        },
        {
          field: 'OverOrNoParvaneh',
          title: 'احداث مازاد يا بدون پروانه',
          width: '150px',
          editor: 'numeric'
        },

        {
          field: 'IllegalInfrastructure',
          title: 'زیربنای غیر مجاز در معبر',
          width: '160px',
          editor: 'numeric'
        },
        {
          field: 'CI_ViewCode',
          title: 'نوع نما',
          domain: 'CI_SaraM1',
          width: '120px',
          editor: 'combo'
        },
        {
          field: 'Depth1No',
          title: 'تعداد عمق اول',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'Depth2No',
          title: 'تعداد عمق دوم',
          width: '120px'
        },
        {
          field: 'Depth3No',
          title: 'تعداد عمق سوم',
          width: '120px',
          editor: 'numeric'
        },
        {
          field: 'Depth1Area',
          title: 'مساحت عمق اول',
          width: '120px',
          cell: 'numeric'
        },
        {
          field: 'Depth2Area',
          title: 'مساحت عمق دوم',
          width: '120px',
          cell: 'numeric'
        },
        {
          field: 'Depth3Area',
          title: 'مساحت عمق سوم',
          width: '120px',
          cell: 'numeric'
        },
        {
          field: 'MassDistance_Main',
          title: 'فاصله جرم گذاری اصلی',
          width: '140px',
          editor: 'numeric'
        },
        {
          field: 'MassDistance_Sub',
          title: 'فاصله جرم گذاری فرعی',
          width: '160px',
          editor: 'numeric'
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

<style lang="scss" scoped></style>
