<template>
  <fit>
    <div class="q-pb-sm">
      <div class="row q-col-gutter-x-sm items-center">
        <div class="col-md-auto col-sm-auto col-xs-auto">
          <safa-checkbox
            label="استفاده از پیش فرض"
            v-model="isDefaultUsage"
            cdcName="isDefaultUsage"
            @input="checkedChanged"
            :m="m"
          />
        </div>

        <div class="col-md-1 col-sm-2 col-xs-4">
          <safa-combo
            ciName="CI_IncomeDiscountDef"
            domainName="CI_SaraM1"
            :m="isEditableCombo"
            v-model="selectedIncomeDiscountDeff"
            cdcName="selectedIncomeDiscountDeff"
          />
        </div>
      </div>
    </div>
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
        @row-click="click"
        fit
        height="100%"
        max-height="100%"
        title="تخفیفات"
      > <!-- تاریخ ندارد  -->
        <template #cell-BeforeOddment="{ row, col, onChangeCellValue }">
            <safa-checkbox
              :value="row[col.field]"
              :m="m"
              @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
            />
          </template>
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

    <!-- <div class="col-3">
          <safa-text label="تعداد" :m="m" v-model="copySimilarRowCount" />
        </div>

        <div class="col-3">
          <q-btn
            label="کپی ردیفهای مشابه"
            class="btn-default"
            :disable="disableCopyRow"
            @click="copySimilarRow"
          />
        </div> -->
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from 'quasar'

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
      selectedRow: null,
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
  mounted () {
    // this.items = this.value.Income_Discount
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
  components: {},
  methods: {
    checkedChanged (e) {
      if (!e) {
        this.isDisabledCombo = "r"
      } else if (e) {
        this.isDisabledCombo = "e"
      }
    },
    click (row) {
      this.selectedRow = row
    },
    copySimilarRow () {
      if (this.selectedRow !== null) {
        if (this.copySimilarRowCount > 0) {
          this.$emit("copySimilarRowCount", this.copySimilarRowCount)
          for (var i = 0; i < this.copySimilarRowCount; i++) {
            this.incomeDetailResults.Income_Discount.push(this.selectedRow)
          }
        }
      } else {
        this.showError("لطفا یک ردیف تقسیط برای کپی را انتخاب نمایید.")
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
          // await this.log({
          //   action: this.logActions.view,
          // nosaziCode: this.selectedRequest.BizCode,
          // nidWorkItem: this.selectedRequest.NidWorkItem,
          //   bizCode: this.selectedIncomeDiscountDeff,
          //   bizCodeTitle: "selectedIncomeDiscountDeff"
          // })

          this.results = this.result.data
          let incomeDiscount = []
          this.results.Income_DiscountDef.forEach(item => {
            let tmpCalculated = this.incomeDetailResults.Income_Calculation_ForChange.find(a => a.CI_IncomeCalculation === item.CI_IncomeCalculation)
            if (tmpCalculated) {
              if (tmpCalculated.Value > 0 || tmpCalculated.SysValue > 0) {
                let tmpDiscount =
                                    {
                                      NidDiscount: uid(),
                                      CI_IncomeCalculation: item.CI_IncomeCalculation,
                                      CI_IncomeValueType: item.CI_IncomeValueType,
                                      Value: item.DiscountValue,
                                      CI_TakhfifFilterSelected: this.incomeCiIncomeCalcList.find(a => a.ID === item.CI_IncomeCalculation)
                                    }

                incomeDiscount.push(tmpDiscount)
              }
            }
          })
          this.incomeDetailResults.Income_Discount = incomeDiscount

          // this.tmpCalculatedList = this.results.Income_DiscountDef.map( // احتمالا این بخش باید ریفکتور شود برای محاسبه اشتباه value
          //   discount => {
          //     const incomeCalc = this.incomeDetailResults.Income_Calculation_ForChange.filter(
          //       x => x.Value || x.SysValue
          //     ).filter(
          //       x => x.CI_IncomeCalculation === discount.CI_IncomeCalculation
          //     )[0]
          //     if (incomeCalc) {
          //       return { ...incomeCalc, ...discount }
          //     }
          //   }
          // ).filter(x => x)
          // // x.Value or x.SysValue is not zero
          // // .filter(x => x.Value || x.SysValue) // <===> .filter(x => x.Value + x.SysValue)

          // // .forEach(x => {
          // //   this.tmpCalculatedList.push(x)
          // //   // y.CI_IncomeValueType
          // // })
          // this.incomeDetailResults.Income_Discount = this.tmpCalculatedList
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
