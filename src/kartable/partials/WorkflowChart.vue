<template>
  <div id="w-chart" style="z-index: 11;" class="fit column absolute-full"
       :class="$q.dark.isActive?'bg-dark':'bg-white'">
    <q-bar>
      <q-btn icon="chevron_right" label="بازگشت به کارتابل" size="12px" class="q-pr-sm" dense @click="$emit('back')"/>

      <!--      <q-space />-->
      <!--      <q-btn dense flat icon="minimize" />-->
      <!--      <q-btn dense flat icon="crop_square" />-->
      <!--      <q-btn dense flat icon="close" />-->
    </q-bar>

    <!--    <div class="w-nav column q-gutter-y-sm absolute-top-left">-->
    <!--      <span v-for="(item,i) in steps" :key="i"-->
    <!--            :class="{selected: currentStepIndex===i, hoverable: i<=currentStepIndex}"-->
    <!--            @click="goTo(i)">{{ i + 1 }}</span>-->
    <!--    </div>-->
    <div class="q-px-md w-chart-section flex justify-center">
      <!--      <div class="flex fit items-center justify-center">-->
      <!--        <q-resize-observer debounce="500" @resize="resizeChart"/>-->
      <!--        <donut-chart ref="chart" @click="chartClick" :data="currentStepItems" color-field="StrColor"-->
      <!--                     value-field="StrValue" label-field="StrTitel" :width="chartWidth" :height="chartHeight"/>-->
      <!--      </div>-->
      <Chart class="fit"
             id="chart"
             style="width:100%; direction: ltr"
             ref="chart"
             :series-defaults-type="'donut'"
             :series-defaults-start-angle="180"
             :theme="'sass'"
             :transitions="true"
             @seriesclick="onAxisLabelClick">
        <ChartTooltip :render="'renderTooltip'">
          <template v-slot:renderTooltip="{ props }">
            <div v-if="props">
              {{ props.point.category }} :
              {{ props.point.value }}
            </div>
          </template>
        </ChartTooltip>
        <ChartSeries>
          <ChartSeriesItem
            :type="'donut'"
            :data-items="seriesData[0].data"
            :category-field="'category'"
            :color-field="'StrColor'"
            :field="'value'"
          >
            <ChartSeriesLabels
              :color="'#000000'"
              :position="'outsideEnd'"
              :background="'none'"
              :content="labelContent"
            />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend :visible="false"/>
      </Chart>
    </div>
    <div class="col-auto q-pa-md">
      <div class="w-chart-bar">
        <span v-for="item in seriesData[0].data" :key="item.StrKey"
              :style="{backgroundColor: item.StrColor,width: calculatePercent(item)}"></span>
      </div>
    </div>
    <div class="w-chart-grid q-px-md q-pb-sm col">
      <fit>
        <safa-datatable
          :add-row="false"
          :delete-row="false"
          :allow-copy="false"
          v-model="seriesData[0].data"
          :columns="columns"
          :selectable="true"
          @dbclick="nextStep"
          :allow-multiple-selection="true">
        </safa-datatable>
      </fit>
    </div>
  </div>
</template>

<script>
/*: sections="chartData"
:total="totalStepsValue"
@section-click="handleSectionClick" */
// https://github.com/dumptyd/vue-css-donut-chart/blob/master/README.md#usage
// import { KendoChart } from '@progress/kendo-charts-vue-wrapper'
import { Chart, ChartLegend, ChartSeries, ChartSeriesItem, ChartSeriesLabels } from '@progress/kendo-vue-charts'

const labelContent = (e) => e.category
export default {
  name: 'WorkflowChart',
  components: {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels
    // KendoChart: {
    //   template: '<div>{{title}}</div>',
    //   name: 'Chart',
    //   data: {
    //     title: 'Chart'
    //   }
    // }
  },
  data () {
    return {
      labelContent,
      chartWidth: 300,
      chartHeight: 300,
      colors: ['#f45b5b', '#90ed7d', '#f7a35c', '#8085e9', 'lightblue', '#e4d354', '#2b908f', '#5dba4a', '#56bfb6'],
      columns: [
        {
          title: 'عنوان',
          field: 'category',
          render: ({ row }) => {
            return `<div class="title-preview row items-center q-gutter-x-sm"><span class="color-preview" style="background-color: ${row.StrColor}"></span><div class="ellipsis col">${row.category}</div></div>`
          },
          width: 'auto'
        },
        { title: 'تعداد', field: 'value', width: 100 }],
      currentStepIndex: 0,
      currentStepCKey: '',
      currentStepItems: [],
      stepCounts: 0,
      steps: []
    }
    // http://localhost:3001/GetWorkflowChart
    // {
    //
    //   "StrWhere":"and GroupName='ACE63A06-E835-457D-A1EA-3B477DD9E69B'"
    //
    //
    // }
  },
  computed: {
    selectedItems () {
      return this.currentStepItems.filter(x => x.selected)
    },
    totalValue () {
      return this.currentStepItems.reduce((x, y) => {
        return x + y.StrValue
      }, 0)
    },
    allChartItems () {
      return this.currentStepItems.map(x => ({
        category: `${x.StrTitel} (${x.StrValue})`,
        value: x.StrValue,
        StrColor: x.StrColor
      })).sort((a, b) => b.value - a.value)
    },
    seriesData () {
      let data = this.allChartItems
      const totalValueOfOthers = this.getTotalValue(data.slice(8).map(x => Number(x.value)))
      if (data.length > 8) {
        data = data.slice(0, 8)
        data.push({
          category: `دیگر... (${totalValueOfOthers})`,
          value: totalValueOfOthers,
          StrColor: '#ffd979'
        })
      }
      return [{
        name: 'تعداد درخواست ها',
        data
      }]
    }
  },
  methods: {
    getTotalValue (values) {
      return values.reduce((accumulator, value) => {
        return accumulator + value
      }, 0)
    },
    onAxisLabelClick (a) {
      console.log(a)
      // alert('click')
    },
    calculatePercent (item) {
      console.log(this.totalValue)
      return ((100 * item.StrValue) / this.totalValue) + '%'
    },
    resizeChart ({ width, height }) {
      this.chartWidth = width
      this.chartHeight = height
      this.redrawChart()
      // this.$refs.chart.drawChart()
    },
    redrawChart () {
      if (this.$refs.chart) {
        console.log(this.$refs.chart)
        // let c = this.$refs.chart.kendoWidget()
        // c.redraw()
      }
      this.$forceUpdate()
    },
    chartClick ({ data }) {
      const rows = this.currentStepItems.slice()
      const item = rows.find(x => x.StrKey === data.StrKey)
      if (item) {
        item.selected = !item.selected
      }
      this.currentStepItems = rows
      // this.$refs.chart.drawChart()
    },
    nextStep () {
      ++this.currentStepIndex
      if (this.currentStepIndex >= this.stepCounts) {
        this.currentStepIndex = this.stepCounts - 1
        return
      }
      this.loadData()
    },
    prevStep () {
      --this.currentStepIndex
      if (this.currentStepIndex < 0) {
        this.currentStepIndex = 0
        return
      }
      this.loadData()
    },
    goTo (index) {
      if (index >= this.currentStepIndex) return
      this.currentStepIndex = index
      this.loadData()
    },
    loadData () {
      return new Promise((resolve, reject) => {
        let strWhere = ''

        if (this.currentStepIndex > 0 && this.selectedItems.length > 0) {
          const values = this.selectedItems.map(x => x.StrKey)
          const query = values.map(val => `(${this.currentStepCKey} = ${typeof val === 'string' ? '\'' + val + '\'' : val})`).join(' OR ')
          strWhere = ' AND ' + query
        }

        this.$srvWorkflow.getWorkflowChart({ strWhere }).then(({ data }) => {
          this.steps = Object.keys(data.data)
          this.stepCounts = this.steps.length
          const step = data.data[this.steps[this.currentStepIndex]]
          this.currentStepCKey = step.CKey
          this.currentStepItems = step.Items.map((x, y) => {
            return {
              ...x,
              StrColor: x.StrColor || this.colors[y],
              selected: false
            }
          })
            .sort((a, b) => a.StrValue > b.StrValue ? -1 : 1)
          this.redrawChart()
          resolve(data.data)
          // || require('randomColor').randomColor({
          //   count: 1,
          //   format: 'rgb'
          // })[0]
        }).catch(reject)
      })
    }
  },
  async beforeMount () {
    await this.loadData()
  }
}
</script>

<style lang="scss">
.w-chart-section {
  height: 50%;
  width: 100%;
}

.color-preview {
  display: inline-block;
  min-width: 12px;
  min-height: 12px;
}

.title-preview {
  font-size: 13px;
}

.w-chart-bar {
  display: flex;
  align-items: center;

  > span {
    display: inline-block;
    height: 10px;
    box-shadow: -1px 3px 5px rgba(0, 0, 0, .2);
  }
}

.w-nav {
  z-index: 10;

  > span {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 18px;
    border-radius: 50px;
    background-color: #eee;
    border: 1px solid #ccc;
    color: #777;
    display: inline-block;
    transition: .25s all ease-in;
    position: relative;

    &.selected {
      border-color: $positive;
      color: #fff;
      background-color: $positive;
      transition: .25s all ease-in;
    }

    &.hoverable {
      cursor: pointer;

      &:hover:not(.selected) {
        border-color: #ddd;
        transition: .25s all ease-in;
      }
    }

    &:after {
      content: '';
      border-right: 1px solid #ccc;
      top: 18px;
      height: 9px;
      position: absolute;
      right: 8px;
    }

    &:last-child:after {
      display: none;
      content: none;
    }
  }
}
</style>
