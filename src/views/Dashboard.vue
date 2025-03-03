<template>
  <div class="row Dashboard q-pa-md q-mb-md">
    <div class="col">
      <div class="row q-col-gutter-lg">
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label-shrink
          label="از تاریخ"
          v-model="dateFrom"
          @input="level1Load"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label-shrink
          label="تا تاریخ"
          v-model="dateTo"
          @input="level1Load"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label-shrink
          label="منطقه"
          :use-input="false"
          source-type="local"
          :options="districtOptions"
          v-model="districts"
          @input="level1Load"
        />
        <div class="col-12">
          <q-tab-panels
            animated
            keep-alive
            v-model="currentLevel"
          >
            <q-tab-panel name="level1">
              <q-btn
                flat
                dense
                round
                title="تغییر نمودار"
                :icon="chartType === 'donut' ? 'align_horizontal_left': 'donut_small'"
                @click="chartType = chartType === 'bar' ? 'donut': 'bar'"
              />
              <!--              <kendo-chart
                                ref="chart1"
                                style="height: 400px"
                                title-text=""
                                title-position="bottom"
                                chart-area-background=""
                                :legend-visible="false"
                                :series-defaults-type="chartType"
                                :series="level1.series"
                                :tooltip="tooltip"
                                :theme="'sass'"
                                @seriesclick="level1LabelClick"
                                @dblclick="level1DblClick"
                            ></kendo-chart>-->
              <div class="full-width row q-gutter-x-lg">
                <safa-checkbox
                  label="دائم"
                  :val="2"
                  v-model="level1.eumRequestStatuses"
                  @input="level1Load"
                />
                <safa-checkbox
                  label="موقت"
                  :val="1"
                  v-model="level1.eumRequestStatuses"
                  @input="level1Load"
                />
                <safa-checkbox
                  label="جاری"
                  :val="0"
                  v-model="level1.eumRequestStatuses"
                  @input="level1Load"
                />
                <safa-checkbox
                  label="حذف شده"
                  :val="3"
                  v-model="level1.eumRequestStatuses"
                  @input="level1Load"
                />
              </div>
              <div style="width: 80%; margin: 0 auto; height: 19px; display: flex; border: 1px solid #dbd7d7;">
                <div
                  v-for="data in level1.linerChart" :key="data.category"
                  class="text-center"
                  :title="data.value + ' ' + data.category + '(' + data.percentage + '%)'"
                  :style="{backgroundColor: data.color, width:data.percentage + '%'}"
                >
                  {{ data.percentage > '10.00' ? data.percentage + '%' : '' }}
                </div>
              </div>
              <safa-datatable
                class="full-width q-mt-md"
                height="300px"
                selectable
                primary-key="category"
                allow-multiple-selection
                :columns="level1.columns"
                :value="level1.data1"
                @selectedChange="level1SelectedChanged"
                @dbclick="level1DblClick"
              />
            </q-tab-panel>
            <q-tab-panel name="level2">
              <q-btn
                flat
                dense
                round
                title="برگشت"
                icon="east"
                @click="currentLevel = 'level1'"
              />
              <q-btn
                flat
                dense
                round
                title="تغییر نمودار"
                :icon="chartType === 'donut' ? 'align_horizontal_left': 'donut_small'"
                @click="chartType = chartType === 'bar' ? 'donut': 'bar'"
              />
              <span class="q-mx-lg">{{ level1.selected.eumShahrsaziArchiveGroupTitle }}</span>
              <!--<kendo-chart
                  ref="chart2"
                  style="height: 400px"
                  title-text=""
                  title-position="bottom"
                  chart-area-background=""
                  :legend-visible="false"
                  :series-defaults-type="chartType"
                  :series="level2.series"
                  :tooltip="tooltip"
                  :theme="'sass'"
                  @seriesclick="level2LabelClick"
              ></kendo-chart>-->
              <div class="full-width row q-gutter-x-lg">
                <safa-checkbox
                  label="دائم"
                  :val="2"
                  v-model="level1.eumRequestStatuses"
                  @input="level2Load"
                />
                <safa-checkbox
                  label="موقت"
                  :val="1"
                  v-model="level1.eumRequestStatuses"
                  @input="level2Load"
                />
                <safa-checkbox
                  label="جاری"
                  :val="0"
                  v-model="level1.eumRequestStatuses"
                  @input="level2Load"
                />
                <safa-checkbox
                  label="حذف شده"
                  :val="3"
                  v-model="level1.eumRequestStatuses"
                  @input="level2Load"
                />
              </div>
              <div style="width: 80%; margin: 0 auto; height: 19px; display: flex; border: 1px solid #dbd7d7;">
                <div
                  v-for="data in level2.linerChart" :key="data.category"
                  class="text-center"
                  :title="data.category + '(' + data.value + '%)'"
                  :style="{backgroundColor: data.color, width:data.value + '%'}"
                >
                  {{ data.value > '10.00' ? data.value + '%' : '' }}
                </div>
              </div>
              <safa-datatable
                class="full-width q-mt-md"
                height="300px"
                selectable
                primary-key="category"
                allow-multiple-selection
                :columns="level2.columns"
                :value="level2.data1"
                @selectedChange="level2SelectedChanged"
                @dbclick="level2DblClick"
              />
            </q-tab-panel>
            <q-tab-panel name="level3">
              <q-btn
                flat
                dense
                round
                title="برگشت"
                icon="east"
                @click="currentLevel = 'level2'"
              />
              <div class="full-width row q-gutter-x-lg">
                <safa-checkbox
                  label="دائم"
                  :val="2"
                  v-model="level1.eumRequestStatuses"
                  @input="level3Load"
                />
                <safa-checkbox
                  label="موقت"
                  :val="1"
                  v-model="level1.eumRequestStatuses"
                  @input="level3Load"
                />
                <safa-checkbox
                  label="جاری"
                  :val="0"
                  v-model="level1.eumRequestStatuses"
                  @input="level3Load"
                />
                <safa-checkbox
                  label="حذف شده"
                  :val="3"
                  v-model="level1.eumRequestStatuses"
                  @input="level3Load"
                />
              </div>
              <div style="width: 80%; margin: 0 auto; height: 19px; display: flex; border: 1px solid #dbd7d7;">
                <div
                  v-for="data in level3.linerChart" :key="data.category"
                  class="text-center"
                  :title="data.category + '(' + data.value + '%)'"
                  :style="{backgroundColor: data.color, width:data.value + '%'}"
                >
                  {{ data.value > '10.00' ? data.value + '%' : '' }}
                </div>
              </div>

              <safa-datatable
                class="full-width q-mt-md"
                height="600px"
                paginate
                server-serve
                :columns="level3.columns"
                :value="level3.data1"
                :count-data="level3.totalRow"
              />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dashboard',

  components: {
    // KendoChart
  },

  data () {
    return {
      loading: false,
      currentLevel: 'level1',
      chartType: 'donut',
      tooltip: {
        visible: true,
        template: '#=category # : #= value #'
      },
      dateFrom: '1399/01/01',
      dateTo: '1399/12/30',
      districts: 1,
      colors: [
        '#a2b9bc',
        '#b2ad7f',
        '#6b5b95',
        '#feb236',
        '#d64161',
        '#c1946a',
        '#ff7b25',
        '#b5e7a0',
        '#c4b7a6',
        '#86af49'
      ],
      level1: {
        timeout: null,
        series: [],
        data1: [],
        data2: [],
        linerChart: [],
        columns: [
          {
            field: 'category',
            title: 'نوع درخواست'
          },
          {
            field: 'value',
            title: 'تعداد'
          },
          {
            field: 'percentage',
            title: 'درصد از کل'
          }
        ],
        selected: [],
        eumRequestStatuses: [],
        eumShahrsaziArchiveGroup: null
      },
      level2: {
        timeout: null,
        series: [],
        data1: [],
        data2: [],
        linerChart: [],
        columns: [
          {
            field: 'category',
            title: 'وضعیت'
          },
          {
            field: 'value',
            title: 'تعداد'
          },
          {
            field: 'percentage',
            title: 'درصد از کل'
          }
        ],
        selected: [],
        eumShahrsaziArchiveGroup: null
      },
      level3: {
        isDblClick: false,
        data1: [],
        data2: [],
        linerChart: [],
        columns: [
          {
            field: 'nosaziCode',
            title: 'کد نوسازی'
          },
          {
            field: 'nidWorkItem',
            title: 'شماره درخواست'
          },
          {
            field: 'eumShahrsaziArchiveGroupTitle',
            title: 'گروه درخواست'
          },
          {
            field: 'shahrsaziArchiveKindTitle',
            title: 'نوع درخواست'
          },
          {
            field: 'requestDate',
            title: 'تاریخ درخواست'
          },
          {
            field: 'eumRequestStatusTitle',
            title: 'وضعیت درخواست'
          }
        ],
        totalRow: 0,
        fromRow: 0,
        toRow: 100
      }
    }
  },

  computed: {
    dashboardServiceURL () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('dashboard.serviceUrl')
    },
    districtOptions () {
      return [1, 2, 3].map(x => ({ ID: x, Title: x }))
    },
    level1WhereCondition () {
      const queries = []
      if (this.dateFrom) {
        queries.push(`a.RequestDate >= '${this.dateFrom}'`)
      }
      if (this.dateTo) {
        queries.push(`a.RequestDate <= '${this.dateTo}'`)
      }
      queries.push(`c.District in (${this.districts})`)
      if (this.level1.eumRequestStatuses.length) {
        queries.push(`a.EumRequestStatus in (${this.level1.eumRequestStatuses.join()})`)
      }
      return `pWhere=${queries.join(' AND ')}`
    },
    level2WhereCondition () {
      const eumShahrsaziArchiveGroups = this.level1.selected.map(({ payload }) => payload.eumShahrsaziArchiveGroup)
      if (eumShahrsaziArchiveGroups.length) {
        return `${this.level1WhereCondition} and b.EumShahrsaziArchiveGroup IN(${eumShahrsaziArchiveGroups.join()})`
      }
      return this.level1WhereCondition
    },
    level3WhereCondition () {
      let query = this.level2WhereCondition
      const ciShahrsaziArchiveKinds = this.level2.selected.map(({ payload }) => payload.cI_ShahrsaziArchiveKind)
      if (ciShahrsaziArchiveKinds.length) {
        query = `${query} AND b.CI_ShahrsaziArchiveKind IN(${ciShahrsaziArchiveKinds.join()})`
      }
      // if (this.level2.selected.eumRequestStatus !== null) {
      //   query = `${this.level2WhereCondition} and a.EumRequestStatus = ${this.level2.selected.eumRequestStatus}`
      // }
      query = `pFromRow=${this.level3.fromRow}&pToRow=${this.level3.toRow}&${query}`
      return query
    }
  },

  methods: {
    level1LabelClick (e) {
      if (!this.level1.timeout) {
        this.level1.timeout = setTimeout(() => {
          this.level1.timeout = null

          const { category } = e || {}
          const [record] = this.level1.data1.filter(x => x.category === category)
          this.$set(record, 'explode', !record.explode)
          this.$set(record, 'selected', record.explode)

          const widget = this.$refs.chart1.kendoWidget()
          widget.options.transitions = false
          widget.refresh()
          this.level1.selected = this.level1.selected.filter(x => x.category !== category)
          this.level1.selected.push(record)
        }, 200)
      } else {
        clearTimeout(this.level1.timeout)
        this.level1.timeout = null
        this.level2Load()
      }

      // if (record.explode && this.level1.selected.eumShahrsaziArchiveGroup !== null) {
      //   this.currentLevel = 'level2'
      //   this.level2Load()
      // }
    },
    level1SelectedChanged ({ selectedItems }) {
      const records = this.level1.data1
        .filter(x => selectedItems.some(y => x.category === y.category))
      this.level1.selected = this.level1.selected.concat(records)

      this.level1.data1.forEach(x => {
        x.selected = false
        x.explode = false
      })
      this.level1.selected.forEach(x => {
        x.selected = true
        x.explode = true
      })
      const widget = this.$refs.chart1.kendoWidget()
      widget.options.transitions = false
      widget.refresh()
    },
    level1DblClick () {
      if (this.level1.selected.length) {
        this.currentLevel = 'level2'
        this.level2Load()
      }
    },

    level2LabelClick (e) {
      if (!this.level2.timeout) {
        this.level2.timeout = setTimeout(() => {
          this.level2.timeout = null
          const { category } = e || {}
          const [record] = this.level2.data1.filter(x => x.category === category)
          this.$set(record, 'explode', !record.explode)
          this.$set(record, 'selected', record.explode)
          const widget = this.$refs.chart2.kendoWidget()
          widget.options.transitions = false
          widget.refresh()

          this.level2.selected = this.level2.selected.filter(x => x.category !== category)
          this.level2.selected.push(record)
        }, 200)
      } else {
        clearTimeout(this.level2.timeout)
        this.level2.timeout = null
        this.level3Load()
      }
      // this.level2.selected = record.payload
      // if (record.explode && this.level2.selected.eumRequestStatus !== null) {
      //   this.currentLevel = 'level3'
      //   this.level3Load()
      // }
    },
    level2SelectedChanged ({ selectedItems }) {
      const records = this.level2.data1
        .filter(x => selectedItems.some(y => x.category === y.category))
      this.level2.selected = this.level2.selected.concat(records)

      this.level2.data1.forEach(x => {
        x.selected = false
        x.explode = false
      })
      this.level2.selected.forEach(x => {
        x.selected = true
        x.explode = true
      })
      const widget = this.$refs.chart2.kendoWidget()
      widget.options.transitions = false
      widget.refresh()
    },
    level2DblClick () {
      if (this.level2.selected.length) {
        this.currentLevel = 'level3'
        this.level3Load()
      }
    },
    async getRequest (url) {
      try {
        const res = await fetch(url)
        const data = await res.json()
        return Promise.resolve(data)
      } catch (ex) {
        return Promise.reject(ex)
      }
    },

    async level1Load () {
      try {
        this.loading = true
        this.currentLevel = 'level1'
        const url1 = `${this.dashboardServiceURL}/GetTier1_1?${this.level1WhereCondition}`
        const url2 = `${this.dashboardServiceURL}/GetTier1_2?${this.level1WhereCondition}`

        const [response1, response2] = await Promise.all([
          this.getRequest(url1),
          this.getRequest(url2)
        ])

        const total1 = response1.data.reduce((state, record) => state + record.count, 0)
        this.level1.data1 = response1.data.map((x, i) => ({
          value: x.count,
          total: this.level1.total,
          color: this.colors[i] || 'red',
          payload: x,
          percentage: ((100 * x.count) / total1).toFixed(2),
          category: x.eumShahrsaziArchiveGroupTitle,
          explode: false,
          selected: false
        }))
        // this.level1.linerChart = this.level1.data1
        //   .map(x => ({
        //     category: x.category,
        //     color: x.color,
        //     value: x.percentage
        //   }))
        //   .sort((x, y) => x.value - y.value)

        this.level1.series = [
          {
            name: 'L1',
            data: this.level1.data1,
            labels: {
              visible: true,
              background: 'transparent',
              position: 'outsideEnd',
              template: '#=category # : #= value #'
            }
          }
        ]

        const total2 = response2.data.reduce((state, record) => state + record.count, 0)
        this.level1.linerChart = response2.data.map((x, i) => ({
          payload: x,
          value: x.count,
          color: this.colors[i] || 'red',
          category: x.eumRequestStatusTitle,
          percentage: ((100 * x.count) / total2).toFixed(2)
        }))
          .sort((x, y) => x.value - y.value)

        // this.$nextTick(() => {
        //   this.$refs.chart1.kendoWidget().refresh()
        // })

        // end
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async level2Load () {
      try {
        this.loading = true
        this.currentLevel = 'level2'
        const url1 = `${this.dashboardServiceURL}/GetTier2_1?${this.level2WhereCondition}`
        const url2 = `${this.dashboardServiceURL}/GetTier1_2?${this.level2WhereCondition}`
        const [response1, response2] = await Promise.all([
          this.getRequest(url1),
          this.getRequest(url2)
        ])

        const total1 = response1.data.reduce((state, record) => state + record.count, 0)
        this.level2.data1 = response1.data.map((x, i) => ({
          value: x.count,
          total: total1,
          color: this.colors[i] || 'red',
          payload: x,
          percentage: ((100 * x.count) / total1).toFixed(2),
          category: x.eumShahrsaziArchiveGroupTitle + ' - ' + x.shahrsaziArchiveKindTitle,
          explode: false,
          selected: false
        }))
        this.level2.series = [
          {
            name: 'L2',
            data: this.level2.data1,
            labels: {
              visible: true,
              background: 'transparent',
              position: 'outsideEnd',
              template: '#=category # : #= value #'
            }
          }
        ]

        const total2 = response2.data.reduce((state, record) => state + record.count, 0)
        this.level2.data2 = response2.data.map(x => ({
          payload: x,
          value: x.count,
          category: x.eumRequestStatusTitle,
          percentage: ((100 * x.count) / total2).toFixed(2)
        }))

        this.level2.linerChart = this.level2.data2
          .map((x, i) => ({
            category: x.category,
            color: this.colors[i] || 'red',
            value: x.percentage
          }))
          .sort((x, y) => x.value - y.value)

        this.$nextTick(() => {
          this.$refs.chart2.kendoWidget().refresh()
        })

        // end
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async level3Load () {
      try {
        this.loading = true
        this.currentLevel = 'level3'
        const url1 = `${this.dashboardServiceURL}/GetTier3_1?${this.level3WhereCondition}`
        const url2 = `${this.dashboardServiceURL}/GetTier1_2?${this.level3WhereCondition}`
        const [response1, response2] = await Promise.all([
          this.getRequest(url1),
          this.getRequest(url2)
        ])
        this.level3.totalRow = (response1.data[0] || {}).tableCount || 0
        this.level3.data1 = response1.data.map(x => ({
          ...x,
          nosaziCode: `${x.district}-${x.region}-${x.block}-${x.house}-${x.building}-${x.apartment}-${x.shop}`
        }))

        const total2 = response2.data.reduce((state, record) => state + record.count, 0)
        this.level3.data2 = response2.data.map(x => ({
          payload: x,
          value: x.count,
          category: x.eumRequestStatusTitle,
          percentage: ((100 * x.count) / total2).toFixed(2)
        }))

        this.level3.linerChart = this.level3.data2
          .map((x, i) => ({
            category: x.category,
            color: this.colors[i] || 'red',
            value: x.percentage
          }))
          .sort((x, y) => x.value - y.value)

        // end
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    }
  },

  mounted () {
    this.currentLevel = 'level1'
    this.level1Load()
  }
}
</script>
