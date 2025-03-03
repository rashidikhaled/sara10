<template>
  <safa-form
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="getRequestReportRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="نوع درخواست حفاری"
              label-width="105px"
              v-model="filter.DigTypeSelected"
              cdcName="DigTypeSelected"
              :options="digTypeComboList"
              source-type="local"
              ref="digTypeRef"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="از تاریخ درخواست"
              label-width="105px"
              v-model="filter.FromDate"
              cdcName="FromDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تا تاریخ درخواست"
              label-width="105px"
              v-model="filter.ToDate"
              cdcName="ToDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="از تاریخ مجوز"
              label-width="105px"
              v-model="filter.FromLicenseDate"
              cdcName="FromLicenseDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تا مجوز از"
              label-width="105px"
              v-model="filter.ToLicenseDate"
              cdcName="ToLicenseDate"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="منطقه"
              label-width="105px"
              v-model="filter.RegionSelected"
              cdcName="Region"
              source-type="local"
              :options="regionOptions"
              type="multiple"
              ref="region"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="نوع درخواست"
              label-width="105px"
              v-model="filter.RequestTypeSelected"
              cdcName="RequestType"
              sourceType="local"
              :options="requestTypeOptions"
              type="multiple"
              ref="requestType"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="سطر"
              label-width="105px"
              v-model="filter.rowType"
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
              label-width="105px"
              v-model="filter.columnType"
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
              label-width="105px"
              v-model="filter.AggregationFuncSelected"
              cdcName="AggregationFuncSelected"
              :options="aggregationFuncOptions"
              source-type="local"
              required
              validations="required"
              ref="aggregationFunc"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="مقدار"
              label-width="105px"
              v-model="filter.AggregationFieldSelected"
              cdcName="AggregationFieldSelected"
              :options="aggregationFieldOptions"
              source-type="local"
              required
              validations="required"
              ref="aggregationField"
            />
          </FormControl>
          <div class="q-gutter-x-lg flex items-center">
            <safa-checkbox
              label="دارای مجوز"
              label-width="105px"
              v-model="filter.IsLicense"
              cdcName="IsLicense"
            />
            <safa-checkbox v-model="filter.isMap" label="حساس به نقشه" />
            <safa-checkbox
              v-model="filter.isMotionMap"
              label="حساس به حرکت نقشه"
            />

            <btn-search
              label="اعمال"
              title="دریافت گزارش تحلیلی درخواست ها"
              @click="searchObj"
            />
          </div>
        </FormRow>

        <safa-splitter v-model="spliterModel" :limits="spliterLimit">
          <template v-slot:before>
            <safa-grid
              title="اطلاعات گزارش"
              :columns="infoListColumns"
              v-model="infoList"
              cdcName="infoList"
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
                  v-if="
                    model.SearchID !== '00000000-0000-0000-0000-000000000000'
                  "
                  :w="widgetOptions[0].rowSpan"
                  :h="widgetOptions[0].colSpan"
                  style="height: 100%"
                  :widget="widgetsById[widgetOptions[0].nidWidget]"
                  :localDatasource="chartData"
                  offlineMode
                  ref="dwidget"
                />
              </div>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-default label="ترسیم محدوده" @click="drawscopeHandler" />
          <btn-default label="حذف محدوده" @click="deleteScopeHandler" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Joi from "joi"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "گزارش تحلیلی درخواست ها",
      formKey: "D798A39D-F3FD-4168-A34D-18BB966B408D",
      name: "URequestAnalyticalReport",
      main: true,
      // sidebarCompatible: true,

      // #region services
      getRequestReportRes: null,
      createLayerMapRes: null,

      // #region variables
      model: {
        FromDate: null,
        Result: null,
        SearchID: "00000000-0000-0000-0000-000000000000",
        ToDate: null,
        polygon: null,
        AggregationField: null,
        AggregationFieldSelected: null,
        AggregationFunc: null,
        AggregationFuncSelected: null,
        DigType: null,
        DigTypeSelected: null,
        FromLicenseDate: null,
        GroupItemSelected: null,
        GroupItems: null,
        IsLicense: false,
        MapResultRequest_Service: null,
        MapReultRequest: null,
        Region: null,
        RegionSelected: null,
        RequestType: null,
        RequestTypeSelected: null,
        SerieSelected: null,
        Series: null,
        Tmpresult: null,
        ToLicenseDate: null
      },
      infoList: [],
      infoListColumns: [],
      spliterModel: 100,
      spliterLimit: [50, 100],
      reportInfo: [],

      filter: {
        DigTypeSelected: null,
        FromDate: null,
        ToDate: null,
        FromLicenseDate: null,
        ToLicenseDate: null,
        RegionSelected: [],
        RequestTypeSelected: [],
        // rowType: null, // GroupItems
        // columnType: null, // Series
        AggregationFuncSelected: null,
        AggregationFieldSelected: null,
        IsLicense: false,
        isMap: false,
        isMotionMap: false
      },
      // #endregion

      // #region ComboOptions
      digTypeComboList: [],
      regionOptions: [],
      requestTypeOptions: [],
      rowTypeOptions: [],
      columnTypeOptions: [],
      aggregationFuncOptions: [],
      aggregationFieldOptions: [],
      // #endregion

      // #region chart
      chartData: {},
      widgets: null,
      widgetsById: null,
      widgetOptions: [
        {
          nidWidget: [],
          title: "گزارش تحلیلی درخواست ها",
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
      // #endregion

      // #region validations
      validations: {
        checkRowAndCol: Joi.custom(
          function (value, helper) {
            if (this.filter.rowType === this.filter.columnType) {
              return helper.message("فیلدهای سطر و ستون نمیتواند یکسان باشند.")
            }
            return true
          }.bind(this)
        )
      }
      // #endregion
    }
  },
  async created () {
    await this.loadObj({ SearchID: "00000000-0000-0000-0000-000000000000" })
    this.loadWidgets()
  },
  methods: {
    // showingMap () {
    //   this.showLoading()
    //   const payLoad = {
    //     Report: this.model
    //   }
    //   this.$services.excavation
    //     .createLayerMap(payLoad)
    //     .then(async ({ data }) => {
    //       this.createLayerMapRes = this.getResponse(data)
    //       if (this.createLayerMapRes.success) {
    //         this.reportInfo =
    //           this.createLayerMapRes.data.CreateLayerMapResult.MapReultRequest
    //         await this.log({
    //           action: this.logActions.view,
    //           bizCode: "",
    //           bizCodeTitle: ""
    //         })
    //       }
    //     })
    //     .catch((e) => {
    //       this.showError(e)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // },
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
        this.getRequestReportRes.data.GetRequestReportResult.Result || []
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
            unit: `(${this.filter.AggregationFuncSelected})`
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
        DigTypeSelected: this.filter.DigTypeSelected
          ? {
            Filed: this.filter.DigTypeSelected,
            Caption: this.$refs.digTypeRef.selectedItem.Title
          }
          : null,

        FromDate: this.filter.FromDate ?? "",
        ToDate: this.filter.ToDate ?? "",
        FromLicenseDate: this.filter.FromLicenseDate ?? null,
        ToLicenseDate: this.filter.ToLicenseDate ?? null,

        RegionSelected:
          this.$refs.region.selectedItem.length > 0
            ? this.$refs.region.selectedItem
            : null,
        RequestTypeSelected:
          this.$refs.requestType.selectedItem.length > 0
            ? this.$refs.requestType.selectedItem
            : null,

        AggregationFuncSelected: {
          Filed: this.filter.AggregationFuncSelected,
          Caption: this.$refs.aggregationFunc.selectedItem.Title
        },
        AggregationFieldSelected: {
          Filed: this.filter.AggregationFieldSelected,
          Caption: this.$refs.aggregationField.selectedItem.Title
        },
        GroupItemSelected: {
          Filed: this.filter.rowType,
          Caption: this.$refs.groupItems.selectedItem.Title
        },
        SerieSelected: {
          Filed: this.filter.columnType,
          Caption: this.$refs.series.selectedItem.Title
        },

        IsLicense: this.filter.IsLicense ?? false
      }
    },
    async loadObj (Report) {
      try {
        this.showLoading()
        const payload = { Report }
        const { data } = await this.$services.excavation.getRequestReport(
          payload
        )
        this.getRequestReportRes = this.getResponse(data)
        if (this.getRequestReportRes.success) {
          let res = this.getRequestReportRes.data.GetRequestReportResult
          this.model = res
          if (Report?.SearchID === "00000000-0000-0000-0000-000000000000") {
            this.getCombos(res)
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `نمایش گزارش تحلیلی درخواست ها `
            })
          } else {
            this.normalizeRowsAndCols(res)
            this.loadChart()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getCombos (res) {
      // #region start normalized combos
      this.digTypeComboList =
        res.DigType.map(({ Filed: ID, Caption: Title }) => {
          return { Title, ID }
        }) ?? []
      this.regionOptions =
        res.Region.map(({ ID, Title }) => {
          return { Title, ID }
        }) ?? []
      this.requestTypeOptions =
        res.RequestType.map(({ ID, Title }) => {
          return { Title, ID }
        }) ?? []
      this.rowTypeOptions =
        res.GroupItems.map(({ Filed: ID, Caption: Title }) => {
          return { Title, ID }
        }) ?? []
      this.columnTypeOptions =
        res.Series.map(({ Filed: ID, Caption: Title }) => {
          return { Title, ID }
        }) ?? []
      this.aggregationFuncOptions =
        res.AggregationFunc.map(({ Filed: ID, Caption: Title }) => {
          return { Title, ID }
        }) ?? []
      this.aggregationFieldOptions =
        res.AggregationField.map(({ Filed: ID, Caption: Title }) => {
          return { Title, ID }
        }) ?? []
      // #endregion

      // #region start filters for first load
      this.filter = {
        // ...this.filter,
        DigTypeSelected: res.DigTypeSelected?.Filed ?? null,
        FromDate: res.FromDate ?? null,
        ToDate: res.ToDate ?? null,
        FromLicenseDate: res.FromLicenseDate ?? null,
        ToLicenseDate: res.ToLicenseDate ?? null,
        RegionSelected: res.RegionSelected ?? [],
        RequestTypeSelected: res.RequestTypeSelected ?? [],
        rowType: null, // GroupItems
        columnType: null, // Series
        AggregationFuncSelected: res.AggregationFuncSelected ?? null,
        AggregationFieldSelected: res.AggregationFieldSelected ?? null,
        IsLicense: res.IsLicense ?? false,
        isMap: false,
        isMotionMap: false
      }
      // #endregion
    },
    normalizeRowsAndCols (e) {
      const { Result } = e
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
      const groupCaption = this.$refs.groupItems.selectedItem?.Title ?? ""

      console.log(this.filter.rowType)
      if (Result) {
        cols = [
          {
            field: "GroupCaption",
            title: groupCaption,
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
    },
    drawscopeHandler () {},
    deleteScopeHandler () {}
  }
}
</script>
