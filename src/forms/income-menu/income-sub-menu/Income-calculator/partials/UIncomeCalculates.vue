<template>
  <fit>
    <!-- <safa-status
      class="col-12"
      :result="calculatorIncomeResult"
    ></safa-status> -->
    <safa-splitter v-model="splitterModel" class="fit">
      <template v-slot:before>
        <fit>
          <!-- helper="avarezInmohasebatTab" -->

          <safa-datatable
            title="عوارض"
            ref="gridAvarez"
            name="grid"
            height="100%"
            max-height="100%"
            v-model="incomeDetailsResults.Income_Calculation_ForChange"
            cdcName="Income_Calculation_ForChange"
            :show-selected-checkbox="true"
            :allowMultipleSelection="true"
            :columns="columns"
            m="e"
            fit
            class="q-mb-sm"
            :bordered="false"
          />

          <div class="row q-col-gutter-md q-mb-sm">
            <safa-custom-text
              type="money"
              label="مجموع مبلغ کاربر"
              class="col-md-6 col-sm-6"
              m="r"
              style="width: 200px"
              v-model="totalUserAmount"
              cdcName="totalUserAmount"
            />
            <safa-custom-text
              label="مجموع عوارض"
              m="r"
              style="width: 200px"
              class="col-md-6 col-sm-6"
              v-model="totalIncomeAmount"
              cdcName="totalIncomeAmount"
            />
          </div>
        </fit>
      </template>
      <template v-slot:after>
        <UCalculateDetailsTabs :incomeDetailsResults="incomeDetailsResults" />
      </template>
    </safa-splitter>
    <div class="row q-gutter-sm">
      <btn-default label="محاسبه" @click="getCalculatorIncome" />
      <btn-delete @click="deleteClick" />
    </div>
  </fit>
</template>
<script>
import UCalculateDetailsTabs from "./calculate-details/UCalculateDetailsTabs"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      calculatorIncomeResult: null,
      calculatorIncomeResults: { Income_Calculation_ForChange: [] },
      selectedIncome: [],
      splitterModel: 50,
      columns: [
        {
          field: "IncomeCalculation_Title",
          title: "نوع عوارض",
          width: "350px",
          editable: false
        },
        {
          field: "Value",
          title: "مبلغ کاربر",
          cell: "grid-money-format",
          width: "120px"
        },
        {
          field: "SysValue",
          title: "مبلغ سیستم",
          cell: "grid-money-format",
          editable: false,
          width: "120px"
        },
        {
          field: "Comments",
          title: " توضیحات",
          width: "200px"
        },
        {
          field: "UserName",
          title: "کاربر محاسبه کننده ",
          editable: false,
          width: "120px"
        }
      ]
    }
  },
  // ci income calculation
  components: {
    UCalculateDetailsTabs
  },
  props: {
    incomeDetailsResults: Object,
    title: String,
    formKey: String,
    name: String,
    NidIncome: String,
    NidProc: String,
    loadFromMenu: Boolean
  },
  mounted () {},
  computed: {
    totalIncomeAmount () {
      return this.incomeDetailsResults.Income_Calculation_ForChange.reduce(
        (sum, one) => {
          if (!sum) sum = 0
          sum += parseInt(one.SysValue || "0")
          return sum
        },
        0
      )
    },
    totalUserAmount () {
      return this.incomeDetailsResults.Income_Calculation_ForChange.reduce(
        (sum, one) => {
          if (!sum) sum = 0
          sum += parseInt(one.Value || "0")
          return sum
        },
        0
      )
    }
  },
  methods: {
    getCalculatorIncome () {
      this.showLoading()
      let data = {
        IsCalculator: true,
        pNidProc: this.NidProc,
        pNidIncome: this.NidIncome,
        pSelectedList: this.$refs.gridAvarez.selectedRows,
        pInputParameters: this.incomeDetailsResults.IncomeParameters,
        // pSelectedList:this.selectedRows,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pIsLoadFromMenu: this.loadFromMenu
      }
      this.$services.SD.getCalculatorIncome(data)
        .then(async ({ data }) => {
          this.calculatorIncomeResult = this.getResponse(data)

          if (this.calculatorIncomeResult.success) {
            debugger
            await this.log({
              action: this.logActions.calculate,
              bizCode: this.NidProc,
              bizCodeTitle: "NidProc"
            })
            this.calculatorIncomeResults = this.calculatorIncomeResult.data
            this.incomeDetailsResults.Income_Calculation_ForChange =
              this.calculatorIncomeResults.Income_Calculation_ForChange
            // this.calculatorIncomeResults.Income_Calculation_ForChange.forEach(
            //   (x) => {
            //     this.totalIncomeAmount += x.SysValue
            //   }
            // )
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    deleteClick () {
      this.calculatorIncomeResult = null
      this.$emit("reloadCalculator")
    }
  }
}
</script>
