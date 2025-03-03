<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      :limits="[20, Infinity]"
      vaertical
      class="fit"
      :min-height="$q.screen.lt.lg ? '500px' : '150px'"
    >
      <template #before>
        <fit>
          <safa-grid
            v-model="incomeDetailResults.Income_Calculation_ForChange"
            filterable
            sortable
            selectable
            :suppressRowClickSelection="true"
            allow-multiple-selection
            :m="m"
            ref="grv_calculation"
            id="grv_calculation"
            :columns="calculationColumns"
            @row:click="selectedChange"
          />
        </fit>
      </template>
      <template #after>
        <Calculatetabs v-model="incomeDetailResults" :logDetail="logDetail"/>
      </template>
    </safa-splitter>
    <div
      class="q-pa-sm full-width"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-blue-1'"
    >
      <div class="row items-center q-gutter-x-md">
        <div class="col-12 col-md-auto">
          <div class="flex q-col-gutter-x-md">
            <safa-custom-text
              label="مجموع مبلغ کاربر:"
              type="money"
              m="r"
              readonlyShowLabel
              :value="totalUserAmount"
              cdcName="totalUserAmount"
              style="width: 200px"
            />
            <safa-custom-text
              label="مجموع عوارض:"
              m="r"
              readonlyShowLabel
              v-model="totalSysAmount"
              cdcName="totalSystemAmount"
              style="width: 200px"
            />
          </div>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
import Calculatetabs from './CalculateTabs.vue'
import converter from 'xml-js'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'UCalculates',
  mixins: [baseFormMixin],
  components: { Calculatetabs },
  props: {
    incomeDetailResults: Object,
    buildingSettings: {
      type: Object,
      default: () => {
      }
    },
    m: {
      type: String,
      default: 'r'
    },
    totalUserAmount: {
      type: Number,
      default: 0
    },
    totalSysAmount: {
      type: Number,
      default: 0
    },
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      splitterValue: 60,
      selectedId: null,
      logDetail: []
    }
  },
  computed: {
    disabledUserSelectRows () {
      return (
        !!this.buildingSettings &&
        this.buildingSettings.calculateIncomeBaseOnSettings
      )
    },
    calculationColumns () {
      return [
        {
          field: 'selected',
          title: 'انتخاب',
          width: '94px',
          filterable: false,
          suppressMenu: true,
          editable: true,
          suppressGridEditable: true,
          showDisabledCheckboxes: true,
          cellRendererParams: {},
          lockPosition: true,
          editor: 'selection'
        },
        {
          field: 'IncomeCalculation_Title',
          title: 'نوع عوارض',
          width: '360px',
          editable: false
        },
        {
          field: 'SysValue',
          title: 'مبلغ سیستمی',
          name: 'SysValue',
          width: '200px',
          editor: 'money',
          editable: false
        },
        {
          field: 'Value',
          title: 'مبلغ کاربر',
          width: '200px',
          editor: 'money',
          type: 'numeric',
          // cell: 'money',
          editable: true
        },
        {
          field: 'Comments',
          title: 'توضیحات',
          width: 'auto',
          minWidth: '250px',
          flex: 1,
          editable: false
        },
        {
          field: 'UserName',
          title: 'کاربر محاسبه کننده',
          width: '150px',
          editable: false
        },
        {
          field: 'CalcDate',
          title: 'زمان محاسبه',
          width: '150px',
          editor: 'date',
          editable: false
        }
      ].filter((col) => col.field)
    }
  },
  beforeDestroy () {
    this.$root.$emit('removeButtons', 'ucalculate')
  },
  methods: {
    setSelectedRows (keys) {
      // console.log('setSelectedRows', keys)
      /* if (this.$refs.grv_calculation.gridApi) {
        this.$refs.grv_calculation.gridApi.forEachRowNode((node) => {
          // // console.log('node', node)
          node.setSelected(keys.includes(node.data.CI_IncomeCalculation))
        })
      } */
      this.value.Income_Calculation_ForChange.forEach((row) => {
        row.selected = keys.includes(row.CI_IncomeCalculation)
      })
    },
    selectedChange (params) {
      this.logDetail = []
      this.selectedId = params.data.CI_IncomeCalculation
      if (params.data.CalculateLog) {
        let arrayOfClsLog = converter.xml2json(params.data.CalculateLog, {
          compact: true
        })
        const clsLog = JSON.parse(arrayOfClsLog)
        this.logDetail = clsLog.ArrayOfClsLog.ClsLog.map((x) => {
          return {
            ...x,
            Subject: x.Subject._text,
            value: x.Value._text,
            Comment: x.Comment._text
          }
        })
      }
    },
    getSelectedRows () {
      if (this.disabledUserSelectRows) {
        return this.value.Income_Calculation_ForChange.filter(
          (x) => x.selected
        ).sort((a, b) => {
          if (a.SortID > b.SortID) return 1
          if (a.SortID < b.SortID) return -1
          return 0
        })
      }
      return (
        (this.$refs.grv_calculation &&
          this.$refs.grv_calculation.gridApi &&
          this.$refs.grv_calculation.gridApi.getSelectedRows()) ||
        this.value.Income_Calculation_ForChange.filter((x) => x.selected)
      ).sort((a, b) => {
        if (a.SortID > b.SortID) return 1
        if (a.SortID < b.SortID) return -1
        return 0
      })
    }
  }
}
</script>
