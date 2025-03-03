<template>
  <fit>
    <template>
      <safa-status :result="getRegionAnalyzeRes" />
      <safa-status :result="getCommissionAnalyzeRes" />
      <safa-status :result="getTrepassAnalyzeRes" />
      <safa-status :result="getViolatorsAnalyzeRes" />
    </template>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu label="عملکرد مناطق" name="regionAnalyze" />
        <tab-menu label="عملکرد کمیسیون" name="commissiomnAnalyze" />
        <tab-menu label="گزارش پرونده تخلفات" name="trepassAnalyze" />
        <tab-menu label="بانک اطلاعات متخلفین" name="violatorsAnalyze" />
        <!-- <tab-menu label="شکست آرا" name="defeatOfVotes" /> -->
      </template>
      <tab-content name="regionAnalyze">
        <PerformanceOfAreas
          v-model="model"
          :result="servicesRes.RegionAnalyze"
          @loadObj="getRegionAnalyze"
          ref="regionAnalyze"
        />
      </tab-content>
      <tab-content name="commissiomnAnalyze">
        <CommissionPerformance
          v-model="model"
          :result="servicesRes.CommissiomnAnalyze"
          @loadObj="getCommissionAnalyze"
          ref="commissiomnAnalyze"
        />
      </tab-content>
      <tab-content name="trepassAnalyze">
        <ReportAbuseCase
          v-model="model"
          :result="servicesRes.TrepassAnalyze"
          @loadObj="getTrepassAnalyze"
          ref="trepassAnalyze"
        />
      </tab-content>
      <tab-content name="violatorsAnalyze">
        <DatabaseOfViolators
          v-model="model"
          :result="servicesRes.ViolatorsAnalyze"
          @loadObj="getViolatorsAnalyze"
          ref="violatorsAnalyze"
        />
      </tab-content>
      <!-- <tab-content name="defeatOfVotes"> </tab-content> -->
    </safa-tabs>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PerformanceOfAreas from "./PerformanceOfAreas.vue"
import CommissionPerformance from "./CommissionPerformance.vue"
import ReportAbuseCase from "./ReportAbuseCase.vue"
import DatabaseOfViolators from "./DatabaseOfViolators.vue"
import defaultData from "./defaultData"

export default {
  mixins: [baseFormMixin],
  components: {
    PerformanceOfAreas,
    CommissionPerformance,
    ReportAbuseCase,
    DatabaseOfViolators
  },

  data () {
    return {
      name: "Reports",
      activeTab: "regionAnalyze",

      getRegionAnalyzeRes: null,
      getCommissionAnalyzeRes: null,
      getTrepassAnalyzeRes: null,
      getViolatorsAnalyzeRes: null,
      model: {
        CI_Region: null,
        CI_TreepassType: null,
        CI_Commission: null,
        CI_VoteType: null,
        CI_Years: null,
        ISRelapse: false,
        FromDate: "",
        ToDate: ""
      },
      servicesRes: {
        RegionAnalyze: { ChartResult: {}, RegionAnalyze: [] },
        CommissiomnAnalyze: { ChartResult: {}, CommissiomnAnalyze: [] },
        TrepassAnalyze: { ChartResult: {}, TrepassAnalyze: [] },
        ViolatorsAnalyze: { ChartResult: {}, ViolatorsAnalyze: [] }
      }
    }
  },
  mounted () {
    this.servicesRes = this.normalizeObj(defaultData)
  },
  methods: {
    async getRegionAnalyze () {
      try {
        this.showLoading()
        const { data } = await this.$services.commissions.getRegionAnalyze({
          PRequest: this.model
        })
        this.getRegionAnalyzeRes = this.getResponse(data)
        if (this.getRegionAnalyzeRes.success) {
          if (this.getRegionAnalyzeRes.data.GetRegionAnalyzeResult) {
            this.servicesRes = this.normalizeObj(
              this.getRegionAnalyzeRes.data.GetRegionAnalyzeResult
            )
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          } else {
            this.servicesRes = this.normalizeObj(defaultData)
          }
        }
      } catch (e) {
        this.showError(e)
        // this.serverError() // test serverError
      } finally {
        this.hideLoading()
      }
    },
    async getCommissionAnalyze () {
      try {
        this.showLoading()
        const { data } = await this.$services.commissions.getCommissionAnalyze({
          PRequest: this.model
        })
        this.getCommissionAnalyzeRes = this.getResponse(data)
        if (this.getCommissionAnalyzeRes.success) {
          if (this.getCommissionAnalyzeRes.data.GetCommissionAnalyzeResult) {
            this.servicesRes = this.normalizeObj(
              this.getCommissionAnalyzeRes.data.GetCommissionAnalyzeResult
            )
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          } else {
            this.servicesRes = this.normalizeObj(defaultData)
          }
        }
      } catch (e) {
        this.showError(e)
        // this.serverError() // test serverError
      } finally {
        this.hideLoading()
      }
    },
    async getTrepassAnalyze () {
      try {
        this.showLoading()
        const { data } = await this.$services.commissions.getTrepassAnalyze({
          PRequest: this.model
        })
        this.getTrepassAnalyzeRes = this.getResponse(data)
        if (this.getTrepassAnalyzeRes.success) {
          if (this.getTrepassAnalyzeRes.data.GetTrepassAnalyzeResult) {
            this.servicesRes = this.normalizeObj(
              this.getTrepassAnalyzeRes.data.GetTrepassAnalyzeResult
            )
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          } else {
            this.servicesRes = this.normalizeObj(defaultData)
          }
        }
      } catch (e) {
        this.showError(e)
        // this.serverError() // test serverError
      } finally {
        this.hideLoading()
      }
    },
    async getViolatorsAnalyze () {
      try {
        this.showLoading()
        const { data } = await this.$services.commissions.getViolatorsAnalyze({
          PRequest: this.model
        })
        this.getViolatorsAnalyzeRes = this.getResponse(data)
        if (this.getViolatorsAnalyzeRes.success) {
          if (this.getViolatorsAnalyzeRes.data.GetViolatorsAnalyzeResult) {
            this.servicesRes = this.normalizeObj(
              this.getViolatorsAnalyzeRes.data.GetViolatorsAnalyzeResult
            )
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          } else {
            this.servicesRes = this.normalizeObj(defaultData)
          }
        }
      } catch (e) {
        this.showError(e)
        // this.serverError() // test serverError
      } finally {
        this.hideLoading()
      }
    },
    normalizeChartData (e) {
      let arr = Array.isArray(e) ? e : e.ClsChart
      let label = this.handleChartLable()
      let title = this.handleChartTitle()
      let seriesItems = arr.map((m) => {
        return {
          // ...m,
          label: m.GroupName,
          dataItems: [m.GroupResult],
          aggregate: "None",
          autoFit: false,
          border: null,
          color: null,
          unit: "بر حسب متر"
        }
      })
      const data = {
        seriesItems,
        categories: [{ label, color: null, tooltip: null }],
        total: 0,
        extraInfo: 'jkhfghfjh',
        overrideWidgetProps: {
          chartTitle: {
            title,
            color: null,
            background: null,
            font: null
          },
          chartLegend: null
        }
      }
      return data
    },
    normalizeObj (obj) {
      const tmp = { GroupName: "", GroupResult: "0" }
      return {
        ...obj,
        RegionAnalyze: obj.RegionAnalyze
          ? {
            ChartResult: this.normalizeChartData(
              obj.RegionAnalyze.ChartResult || tmp
            ),
            RegionAnalyze: Array.isArray(obj.RegionAnalyze.RegionAnalyze)
              ? obj.RegionAnalyze.RegionAnalyze
              : obj.RegionAnalyze.RegionAnalyze.SrvGetRegionAnalyze_Result
          }
          : {
            ChartResult: this.normalizeChartData(tmp),
            RegionAnalyze: []
          },

        CommissiomnAnalyze: obj.CommissiomnAnalyze
          ? {
            ChartResult: this.normalizeChartData(
              obj.CommissiomnAnalyze.ChartResult || tmp
            ),
            CommissiomnAnalyze: Array.isArray(
              obj.CommissiomnAnalyze.CommissiomnAnalyze
            )
              ? obj.CommissiomnAnalyze.CommissiomnAnalyze
              : obj.CommissiomnAnalyze.CommissiomnAnalyze
                .SrvGetCommissiomnAnalyze_Result
          }
          : {
            ChartResult: this.normalizeChartData(tmp),
            CommissiomnAnalyze: []
          },
        TrepassAnalyze: obj.TrepassAnalyze
          ? {
            ChartResult: this.normalizeChartData(
              obj.TrepassAnalyze.ChartResult || tmp
            ),
            TrepassAnalyze: Array.isArray(obj.TrepassAnalyze.TrepassAnalyze)
              ? obj.TrepassAnalyze.TrepassAnalyze
              : obj.TrepassAnalyze.TrepassAnalyze.SrvGetTrepassAnalyze_Result
          }
          : {
            ChartResult: this.normalizeChartData(tmp),
            TrepassAnalyze: []
          },
        ViolatorsAnalyze: obj.ViolatorsAnalyze
          ? {
            ChartResult: this.normalizeChartData(
              obj.ViolatorsAnalyze.ChartResult || tmp
            ),
            ViolatorsAnalyze: Array.isArray(
              obj.ViolatorsAnalyze.ViolatorsAnalyze
            )
              ? obj.ViolatorsAnalyze.ViolatorsAnalyze
              : obj.ViolatorsAnalyze.ViolatorsAnalyze
                .SrvGetViolatorsAnalyze_Result
          }
          : {
            ChartResult: this.normalizeChartData(tmp),
            ViolatorsAnalyze: []
          }
      }
    },
    handleChartTitle () {
      if (this.activeTab === "regionAnalyze") {
        return "گزارش عملکرد مناطق"
      }
      if (this.activeTab === "commissiomnAnalyze") {
        return "گزارش عملکرد کمیسیون ها"
      }
      if (this.activeTab === "trepassAnalyze") {
        return "گزارش پرونده تخلفات"
      } else {
        // (this.activeTab === "violatorsAnalyze")
        return "گزارش بانک اطلاعات متخلفین"
      }
    },
    handleChartLable () {
      if (this.activeTab === "regionAnalyze") {
        return "مناطق"
      }
      if (this.activeTab === "commissiomnAnalyze") {
        return "کمیسیون ها"
      }
      if (this.activeTab === "trepassAnalyze") {
        return "تخلفات"
      } else {
        // (this.activeTab === "violatorsAnalyze")
        return "بانک اطلاعات متخلفین"
      }
    }
  },
  watch: {
    activeTab () {
      this.servicesRes = this.normalizeObj(defaultData)
      this.model = {
        CI_Region: null,
        CI_TreepassType: null,
        CI_Commission: null,
        CI_VoteType: null,
        CI_Years: null,
        ISRelapse: false,
        FromDate: "",
        ToDate: ""
      }
      this.$refs.regionAnalyze.fetchWidgetData()
      this.$refs.commissiomnAnalyze.fetchWidgetData()
      this.$refs.trepassAnalyze.fetchWidgetData()
      this.$refs.violatorsAnalyze.fetchWidgetData()
    }
  }
}
</script>
