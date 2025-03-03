<template>
  <fit>
    <safa-datatable2
      v-model="incomeDetailResults.Income_Discount"
      cdcName="Income_Discount"
      ref="grid"
      name="grid"
      helper="discountInIncomDetails"
      :m="m"
      :allowMultipleSelection="allowSelection"
      :show-selected-checkbox="true"
      :selectable="true"
      fit
      height="100%"
      max-height="100%"
      title="تخفیفات"
    > <!-- تاریخ ندارد  -->
      <template #cell-CI_IncomeCalculation="{ row, col, onChangeCellValue }">
        <safa-combo2
          :value="row[col.field]"
          @input="
            onChangeCellValue({
              field: col.field,
              dataItem: row,
              value: parseInt($event),
            })
          "
          source-type="local"
          :options="incomeCiIncomeCalcList"
          :m="m"
        />
      </template>
    </safa-datatable2>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      allowSelection: false,
      disableCopyRow: true,
      isEditableCombo: "r",
      items: [],
      isDefaultUsage: false,
      selectedIncomeDiscountDeff: null,
      result: null,
      results: { Income_DiscountDef: [] },
      getIncomeDiscountDefSpecialPrequest: {
        pCI_IncomeDiscountDef: ""
      },
      isDisabledCombo: "r",
      copySimilarRowCount: 0,
      tmpCalculated: [],
      tmpCalculatedList: []
    }
  },
  props: {
    // value: Object,
    incomeDetailResults: Object,
    incomeCiIncomeCalcList: Array,
    config: Object,
    m: String,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  watch: {
    m () {
      if (this.m === "e") {
        this.allowSelection = true
        this.disableCopyRow = false
      } else {
        this.allowSelection = false
        this.disableCopyRow = true
      }
    },
    isDefaultUsage () {
      if (this.isDefaultUsage) {
        this.isEditableCombo = "e"
      } else {
        this.isEditableCombo = "r"
      }
    },
    selectedIncomeDiscountDeff () {
      this.getIncomeDiscountDefSpecial()
    }
  },
  methods: {
    checkedChanged (e) {
      if (!e) {
        this.isDisabledCombo = "r"
      } else if (e) {
        this.isDisabledCombo = "e"
      }
    },
    getIncomeDiscountDefSpecial () {
      this.showLoading()
      this.tmpCalculated = []
      let data = {
        pCI_IncomeDiscountDef: this.selectedIncomeDiscountDeff
      }
      this.$services.SD.getIncomeDiscountDefSpecial(data, this.config)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success !== true) {
            return
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedIncomeDiscountDeff,
            bizCodeTitle: "selectedIncomeDiscountDeff"
          })

          this.results = this.result.data
          this.tmpCalculatedList = this.results.Income_DiscountDef.map(
            (discount) => {
              const incomeCalc =
                this.incomeDetailResults.Income_Calculation_ForChange.filter(
                  (x) => x.Value || x.SysValue
                ).filter(
                  (x) =>
                    x.CI_IncomeCalculation === discount.CI_IncomeCalculation
                )[0]
              if (incomeCalc) {
                return { ...incomeCalc, ...discount }
              }
            }
          ).filter((x) => x)
          this.incomeDetailResults.Income_Discount = this.tmpCalculatedList
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
