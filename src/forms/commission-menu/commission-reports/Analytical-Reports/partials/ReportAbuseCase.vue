<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-datepicker
          label="از تاریخ"
          label-width="60px"
          v-model="value.FromDate"
          cdcName="FromDate"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تا تاریخ"
          label-width="60px"
          v-model="value.ToDate"
          cdcName="ToDate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کد منطقه"
          label-width="60px"
          v-model="value.CI_Region"
          cdcName="CI_Region"
          ci-name="CI_Region"
          domain-name="Commission100"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="سال وقوع"
          label-width="60px"
          v-model="value.CI_Years"
          cdcName="CI_Years"
          ciName="CI_Years"
          domainName="Commission100"
          :sortFunc="sortCombo"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="تخلف"
          label-width="60px"
          v-model="value.CI_TreepassType"
          cdcName="CI_TreepassType"
          ciName="CI_TreepassType"
          domainName="Commission100"
        />
      </FormControl>
      <div>
        <btn-default label="جستجو" @click="search"/>
      </div>
    </FormRow>
    <safa-splitter
      :limits="splitterLimit"
      class="fit"
      vertical
      margin="0"
      v-model="splitterValue"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="لیست گزارشات پرونده تخلفات"
            v-model="result.TrepassAnalyze"
            cdcName="trepassAnalyze"
            helper="trepassAnalyzeColumns"
            :customButtons="customButtons"
            :show-selected-checkbox="true"
            :allowMultipleSelection="false"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            fit
            m="r"
            height="100%"
            max-height="100%"
            min-height="200px"
            paginate
            :take="10"
            :pageSize="10"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <div class="q-px-md fit" style="border: 1px solid #ddd">
            <!-- :ref="`widget_${widgets[0].nidWidget}`" -->
            <DWidget
              :w="widgets[0].rowSpan"
              :h="widgets[0].colSpan"
              style="height: 100%"
              :widget="widgetsById[widgets[0].nidWidget]"
              :localDatasource="result.ChartResult"
              offlineMode
              ref="dwidget"
            />
          </div>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    result: Object
  },

  data () {
    return {
      name: 'ReportAbuseCase',
      title: 'گزارش پرونده تخلفات',

      customButtons: [
        {
          icon: 'bar_chart',
          onClick: this.toggleChart,
          text: ''
        }
      ],
      chartModel: {
        seriesItems: [
          {
            label: '',
            dataItems: ['0'],
            aggregate: 'None',
            autoFit: false,
            border: null,
            color: null,
            unit: ''
          }
        ],
        categories: [
          {
            label: '',
            color: null,
            tooltip: null
          }
        ],
        total: 0,
        extraInfo: null,
        overrideWidgetProps: {
          chartTitle: {
            title: '',
            color: null,
            background: null,
            font: null
          },
          chartLegend: null
        }
      },
      showChart: false,
      splitterValue: 100,
      splitterLimit: [0, 100],
      layout: null,
      widgets: null,
      widgetsById: null,
      widgetOptions: [
        {
          nidWidget: '63052293',
          title: '',
          chartType: ['Column', 'Column'],
          filters: [],
          groupName: 'Default',
          colSpan: 1,
          rowSpan: 1,
          exportable: true,
          chartTitle: {
            title: '',
            color: null,
            background: null,
            font: null
          },
          chartLegend: {
            position: 'Bottom',
            orientation: 'Horizontal',
            visible: true
          }
        }
      ]
    }
  },
  created () {
    this.loadWidgets()
  },
  methods: {
    search () {
      this.$emit('loadObj')
    },
    toggleChart () {
      this.showChart = !this.showChart
    },
    loadWidgets () {
      this.layout = []
      this.widgets = this.widgetOptions
      this.widgetsById = null
      this.$nextTick()
      this.widgetsById = this.widgets.reduce((obj, item) => {
        if (!obj) obj = {}
        obj[item.nidWidget] = item
        return obj
      }, {})

      let rowIndex = 0
      let colIndex = 0
      let maxRowH = 0
      this.layout = this.widgets.map((w) => {
        const obj = {
          x: colIndex,
          y: rowIndex,
          w: w.colSpan,
          h: w.rowSpan,
          i: w.nidWidget
        }
        maxRowH = Math.max(maxRowH, w.rowSpan)
        colIndex += w.colSpan
        if (colIndex >= 4) {
          colIndex = 0
          rowIndex += maxRowH
        }
        return obj
      })
    },
    fetchWidgetData () {
      this.$nextTick(() => {
        this.$refs.dwidget.fetchWidgetDataFromServer()
      })
    },
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  watch: {
    showChart () {
      this.fetchWidgetData()
      this.splitterLimit = this.showChart ? [0, Infinity] : [0, 100]
      this.splitterValue = this.showChart ? 70 : 100
    }
  }
}
</script>
