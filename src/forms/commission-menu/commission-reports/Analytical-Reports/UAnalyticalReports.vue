<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :padding="false" :title="title">
    <fit>
      <safa-tabs v-model="activeTab" fit>
        <template v-slot:tabs>
          <tab-menu label="گزارشات" name="reports" />
          <!-- <tab-menu
                label="نمودار"
                name="chart"
              />
              <tab-menu
                label="خروجی"
                name="exit"
              /> -->
        </template>
        <tab-content name="reports" :padding="false">
          <Reports />
        </tab-content>
        <tab-content name="chart">
          <Chart />
        </tab-content>
        <tab-content name="exit">
          <Exit />
        </tab-content>
      </safa-tabs>
      <!-- </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              title="اطلاعات کلی"
              :columns="generalInfoColumns"
              m="r"
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              fit
              paginate
            />
          </fit>
        </template>
      </safa-splitter> -->
    </fit>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Reports from "./partials/Reports.vue"
import Chart from "./partials/Chart.vue"
import Exit from "./partials/Exit.vue"

export default {
  components: { Reports, Chart, Exit },
  mixins: [baseFormMixin],

  data () {
    return {
      title: "گزارشات تحلیلی",
      name: "UAnalyticalReports",
      formKey: "054CB500-20BE-4357-8C65-71789218F555",
      main: true,

      activeTab: "reports",
      splitterValue: 100,
      splitterLimit: [0, 100],
      showGeneralInfo: false,
      generalInfoColumns: [
        {
          field: "GroupName",
          title: "نوع",
          width: "100px"
        },
        {
          field: "GroupResult",
          title: "مقدار",
          width: "200px"
          // calculateFunc: ({ column, rows }) => {
          //   if (!rows) return ""
          //   const result = rows.reduce(function (a, b) {
          //     return a + parseFloat(b[column.field])
          //   }, 0)
          //   return `تعداد : ${result}`
          // }
        },

        {
          field: "Precent",
          title: "درصد",
          width: "100px"
          // calculateFunc: ({ column, rows }) => {
          //   if (!rows) return ""
          //   const result = rows.reduce(function (a, b) {
          //     return a + parseFloat(b[column.field])
          //   }, 0)
          //   return `جمع : ${result}`
          // }
        }
      ]
    }
  },

  methods: {
    toggleInfo () {
      this.showGeneralInfo = !this.showGeneralInfo
    }
  },

  watch: {
    showGeneralInfo () {
      this.splitterLimit = this.showGeneralInfo ? [0, Infinity] : [0, 100]
      this.splitterValue = this.showGeneralInfo ? 60 : 100
    }
  }
}
</script>
