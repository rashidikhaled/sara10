<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="منطقه"
          label-width="95px"
          v-model="region"
          cdcName="Region"
          :options="regionOptions"
          source-type="local"
          ref="region"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع منبع تامین"
          label-width="95px"
          v-model="supplySourcesType"
          cdcName="supplySourcesType"
          :options="supplySourcesTypeOptions"
          source-type="local"
          type="multiple"
          ref="supplySourcesType"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="بهره برداری موجود"
          label-width="95px"
          v-model="beneficCurent"
          cdcName="beneficCurent"
          :options="beneficCurentOptions"
          source-type="local"
          type="multiple"
          ref="beneficCurent"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نحوه واگذاری"
          label-width="95px"
          v-model="cessionKind"
          cdcName="cessionKind"
          :options="cessionKindOptions"
          source-type="local"
          type="multiple"
          ref="cessionKind"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="مالکیت واگذاری"
          label-width="95px"
          v-model="cessionOwner"
          cdcName="cessionOwner"
          :options="cessionOwnerOptions"
          source-type="local"
          type="multiple"
          ref="cessionOwner"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نحوه دریافت"
          label-width="95px"
          v-model="gettingKind"
          cdcName="gettingKind"
          :options="gettingKindOptions"
          source-type="local"
          type="multiple"
          ref="gettingKind"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="مالکیت دریافتی"
          label-width="95px"
          v-model="gettingOwner"
          cdcName="gettingOwner"
          :options="gettingOwnerOptions"
          source-type="local"
          type="multiple"
          ref="gettingOwner"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت عرصه/اعیان از"
          label-width="95px"
          v-model="model.AreaFrom"
          cdcName="AreaFrom"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت عرصه/اعیان تا"
          label-width="95px"
          v-model="model.AreaTo"
          cdcName="AreaTo"
        />
      </FormControl>
      <!-- </FormRow>
    <FormRow class="q-mb-sm"> -->
      <FormControl>
        <safa-combo
          label="سطر"
          label-width="95px"
          v-model="rowType"
          cdcName="rowType"
          :options="rowTypeOptions"
          source-type="local"
          required
          :validations="['required', validations.checkRowAndCol]"
          ref="groupItems"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="ستون"
          label-width="95px"
          v-model="columnType"
          cdcName="columnType"
          :options="columnTypeOptions"
          source-type="local"
          required
          :validations="['required', validations.checkRowAndCol]"
          ref="series"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="تابع"
          label-width="95px"
          v-model="aggregationFunc"
          cdcName="aggregationFunc"
          :options="aggregationFuncOptions"
          source-type="local"
          required
          validations="required"
          ref="aggregationFunc"
        />
      </FormControl>
      <safa-checkbox v-model="isMap" label="حساس به نقشه" />
      <safa-checkbox v-model="isMotionMap" label="حساس به حرکت نقشه" />
      <div><btn-default label="جستجو" @click="searchObj" /></div>
    </FormRow>
    <safa-splitter v-model="spliterModel" :limits="spliterLimit">
      <template v-slot:before>
        <safa-grid
          title="اطلاعات گزارش"
          :columns="infoListColumns"
          v-model="infoList"
          cdcName="reportInfo"
          height="100%"
          min-height="150px"
          fit
          paginate
          showRowNumber
          allow-multiple-selection
          suppressRowClickSelection
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :pinnedBottomRowData="[{}]"
        />
      </template>
      <template v-slot:after>
        <fit>
          <div class="fit q-pa-sm" style="border: 1px solid #ddd">
            <DWidget
              :w="widgets[0].rowSpan"
              :h="widgets[0].colSpan"
              style="height: 100%"
              :widget="widgetsById[widgets[0].nidWidget]"
              :localDatasource="chartData"
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
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"
import Joi from "joi"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin, mapMixin],

  props: {
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      // filters
      rowType: null, // GroupItems
      groupCaptionTitle: "عنوان گروه", // groupCaptionTitle
      columnType: null, // Series
      region: [],
      aggregationFunc: null,
      supplySourcesType: [],
      beneficCurent: [],
      cessionKind: [],
      cessionOwner: [],
      gettingKind: [],
      gettingOwner: [],

      isMap: false,
      isMotionMap: false,

      // combo Options
      regionOptions: [],
      beneficCurentOptions: [],
      cessionKindOptions: [],
      cessionOwnerOptions: [],
      gettingKindOptions: [],
      gettingOwnerOptions: [],
      rowTypeOptions: [],
      columnTypeOptions: [],
      aggregationFuncOptions: [],
      supplySourcesTypeOptions: [],

      // services response
      getSupplySourcesReportRes: null,

      // chart
      chartData: {},
      widgets: null,
      widgetsById: null,
      widgetOptions: [
        {
          nidWidget: [],
          title: "گزارشات تحلیلی املاک و مستغلات",
          chartType: ["Line", "Bar"], // Statistics, Donut, Pie, Line, VerticalLine, Bar, Column, Grid, GridVertical, Area, Funnel, RadarLine,
          filters: [],
          groupName: "Default",
          colSpan: 1,
          rowSpan: 1,
          exportable: true,
          chartTitle: {
            title: "",
            color: null,
            background: null,
            font: null
          },
          chartLegend: {
            position: "Bottom", // Top, Bottom, Left, Right
            orientation: "Horizontal", //  Vertical, Horizontal
            visible: true
          }
        }
      ],

      // variables
      model: {
        FromDate: currentDate(),
        Result: null,
        SearchID: "00000000-0000-0000-0000-000000000000",
        ToDate: currentDate(),
        polygon: null,
        AggregationFunc: [],
        AggregationFuncSelected: null,
        AreaFrom: 0,
        AreaTo: 10000,
        GroupItemSelected: null,
        GroupItems: [],
        Region: [],
        BeneficCurent: [],
        SerieSelected: null,
        Series: [],
        SupplySourcesType: []
      },

      infoList: [],
      infoListColumns: [],
      spliterModel: 100,
      spliterLimit: [50, 100],
      totalSumCols: {},

      // validations
      validations: {
        checkRowAndCol: Joi.custom(
          function (value, helper) {
            if (this.rowType === this.columnType) {
              return helper.message("فیلدهای سطر و ستون نمیتواند یکسان باشند.")
            }
            return true
          }.bind(this)
        )
      }
    }
  },
  async created () {
    await this.loadObj({ SearchID: "00000000-0000-0000-0000-000000000000" })
    this.loadWidgets()
  },
  methods: {
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
    loadChart () {
      this.chartData = this.normalizeChartData(
        this.getSupplySourcesReportRes.data.GetSupplySourcesReportResult.Result || []
      )
      this.$nextTick(() => {
        this.$refs.dwidget.fetchWidgetDataFromServer()
      })
    },
    async searchObj () {
      if (!this.isValidForm()) return
      this.setFilters()
      await this.loadObj(this.model)
      this.spliterModel = 50
    },
    normalizeChartData (data) {
      if (!Array.isArray(data)) return { seriesItems: [], categories: [] }

      const groupField = "GroupCaption"
      const colorField = "Color"
      const seriesField = "Series"
      const valueField = "Value"

      const categories = data.reduce((result, item) => {
        const label = item[groupField]
        if (!result.some((c) => c.label === label)) {
          result.push({
            label,
            color: item[colorField],
            tooltip: label
          })
        }
        return result
      }, [])

      const seriesItems = data.reduce((result, item) => {
        if (!result.some((c) => c.label === item[seriesField])) {
          result.push({
            label: item[seriesField],
            dataItems: [],
            aggregate: "None",
            autoFit: true,
            border: true,
            color: null,
            unit: `(${this.aggregationFunc})`
          })
        }
        return result
      }, [])

      seriesItems.forEach((seri) => {
        categories.forEach((cat) => {
          const item = data.find(
            (s) => s[groupField] === cat.label && seri.label === s[seriesField]
          )
          if (item) seri.dataItems.push(`${item[valueField]}`)
          else seri.dataItems.push(`0`)
        })
      })
      return {
        seriesItems,
        categories,
        total: 0,
        extraInfo: "نمودار گزارشات تحلیلی",
        overrideWidgetProps: {
          chartTitle: {
            title: "نمودار گزارشات",
            color: null,
            background: null,
            font: null
          },
          chartLegend: null
        }
      }
    },
    setFilters () {
      this.model = {
        ...this.model,
        AggregationFuncSelected: this.model.AggregationFunc.find(
          (f) => f.Filed === this.aggregationFunc
        ),
        GroupItemSelected: this.model.GroupItems.find(
          (f) => f.Filed === this.rowType
        ),
        SerieSelected: this.model.Series.find(
          (f) => f.Filed === this.columnType
        ),
        Region:
          this.region === []
            ? this.$refs.region.selectedItems
            : this.model.Region,
        CessionKind:
          this.cessionKind === []
            ? this.$refs.cessionKind.selectedItems
            : this.model.CessionKind,
        BeneficCurent:
          this.beneficCurent === []
            ? this.$refs.beneficCurent.selectedItems
            : this.model.BeneficCurent
      }
    },
    async loadObj (pRequest) {
      try {
        this.showLoading()
        const { data } = await this.$services.ES.getSupplySourcesReport({
          pRequest
        })
        this.getSupplySourcesReportRes = this.getResponse(data)
        if (this.getSupplySourcesReportRes.success) {
          let res = this.getSupplySourcesReportRes.data.GetSupplySourcesReportResult
          this.model = res
          if (pRequest?.SearchID === "00000000-0000-0000-0000-000000000000") {
            this.getCombos(res)
          } else {
            // this.log({
            //   action: this.logActions.view,
            //   bizCode: this.model.SearchID,
            //   bizCodeTitle: "SearchID"
            // })
          }
          this.normalizeRowsAndCols(res)
          this.loadChart()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getCombos (res) {
      this.fromDate = res.FromDate ?? ""
      this.toDate = res.ToDate ?? ""
      this.rowTypeOptions =
        res.GroupItems?.map(({ Filed: ID, Caption: Title }) => {
          return { Title, ID }
        }) ?? []
      this.columnTypeOptions =
        res.Series?.map(({ Filed: ID, Caption: Title }) => {
          return { Title, ID }
        }) ?? []
      this.aggregationFuncOptions = res.AggregationFunc?.map(
        ({ Filed: ID, Caption: Title }) => {
          return { Title, ID }
        }
      )
      this.regionOptions = res.Region || []
      this.beneficCurentOptions = res.BeneficCurent || []
      this.cessionKindOptions = res.CessionKind || []
      this.cessionOwnerOptions = res.CessionOwner || []
      this.gettingKindOptions = res.GettingKind || []
      this.gettingOwnerOptions = res.GettingOwner || []
      this.supplySourcesTypeOptions = res.SupplySourcesType || []
    },
    normalizeRowsAndCols ({ Result }) {
      let rows = []
      let cols = []
      let tmpCols = []
      if (Result) {
        Result.map((m, i) => {
          let newKey = m.Series
          rows.push({
            ...m,
            [newKey]: m.Value
          })
        })
      }
      let tmpRows = this.mergeObjectsByKey(rows, "GroupCaption")
      let allRows = tmpRows.map((m) => {
        let obj = { ...m }
        delete obj.Color
        delete obj.GroupCaption
        delete obj.Series
        delete obj.Value
        return {
          ...m,
          total: Object.values(obj).reduce((a, b) => a + b, 0)
        }
      })
      this.infoList = allRows ?? []

      this.totalSumCols = {}
      let sums = {}
      for (let row of rows) {
        for (let key in row) {
          if (!sums[key]) {
            sums[key] = 0
          }
          sums[key] += row[key]
        }
      }
      this.totalSumCols = sums
      switch (this.rowType) {
        case "TitleRequestType":
          this.groupCaptionTitle = "نوع درخواست"
          break
        case "Distrcit":
          this.groupCaptionTitle = "منطقه"
          break
        case "Day":
          this.groupCaptionTitle = "روز"
          break
        case "Month":
          this.groupCaptionTitle = "ماه"
          break
        case "Year":
          this.groupCaptionTitle = "سال"
          break
        default:
          break
      }
      console.log(this.rowType)
      if (Result) {
        cols = [
          {
            field: "GroupCaption",
            title: this.groupCaptionTitle,
            width: "120px"
          }
        ]
        Result.map((m, i) => {
          cols.push({
            // ...m,
            field: m.Series,
            title: m.Series,
            width: "120px",
            cellRendererSelector: (params) => this.sysValueCellRenderer(params),
            cellClass: "custom-pinned-row"
          })
        })
        tmpCols = this.removeDuplicatesByKey(cols, "field")
        tmpCols.push({
          field: "total",
          title: "جمع",
          width: "120px",
          cellRendererSelector: (params) => this.sysTotalCellRenderer(params),
          cellClass: "custom-pinned-row",
          cellStyle: { "background-color": "#ffec009e" }
        })
      }

      this.infoListColumns = tmpCols ?? []

      console.log("cols :>> ", this.infoListColumns)
      console.log("rows :>> ", this.infoList)
    },
    sysTotalCellRenderer (params) {
      if (params.node.rowPinned === "bottom") {
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let total = 0
              try {
                total = this.infoList.reduce((a, { total: b }) => {
                  return a + parseFloat(b)
                }, 0)
              } catch (ex) {
                total = 0
              }
              console.log(`جمع کل : ${total}`)
              return `جمع کل : ${total}`
            }
          }
        }
      }
      return undefined
    },
    sysValueCellRenderer (params) {
      if (params.node.rowPinned === "bottom") {
        let colId = params.column.colId
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let total = 0
              try {
                let tmp = Object.entries(this.totalSumCols)
                for (let i = 0; i < tmp.length; i++) {
                  if (tmp[i][0] === colId) {
                    total = tmp[i][1]
                  }
                }
              } catch (ex) {
                total = 0
              }
              console.log(`جمع کل : ${total}`)
              return `جمع کل : ${total}`
            }
          }
        }
      }
      return undefined
    },
    mergeObjectsByKey (array, key) {
      var grouped = array.reduce(function (acc, obj) {
        var k = obj[key]
        if (acc[k]) {
          acc[k].push(obj)
        } else {
          acc[k] = [obj]
        }
        return acc
      }, {})
      var merged = Object.keys(grouped).map(function (k) {
        var arr = grouped[k]
        var obj = Object.assign({}, ...arr)
        return obj
      })
      return merged
    },
    removeDuplicatesByKey (array, key) {
      return array.filter(function (obj, index) {
        var firstIndex = array.findIndex(function (obj2) {
          return obj2[key] === obj[key]
        })
        return index === firstIndex
      })
    }
  }
}
</script>
