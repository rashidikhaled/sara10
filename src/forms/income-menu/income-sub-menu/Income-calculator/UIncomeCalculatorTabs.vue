<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <safa-status :result="incomeDetailsResults"/>
    <safa-status :result="baseLibResult"/>

    <form-wrapper
      title="ماشین حساب درآمد"
      :hasFooter="false"
    >
      <fit>
        <div class="row q-mb-sm">
          <safa-text
            label="شماره درخواست:"
            v-model="nidWorkItem"
            cdcName="nidWorkItem"
            @keyup.enter="reloadCalculator"
          />
        </div>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu
              name="incomeCalculates"
              label="محاسبات"
            />
            <tab-menu
              name="calculateMethods"
              label="روش های محاسبه"
            />
          </template>
          <tab-content
            name="incomeCalculates"
            title="محاسبات"
            :padding="false"
          >
            <UIncomeCalculates
              :incomeDetailsResults="incomeDetailsResults"
              @reloadCalculator="reloadCalculator"
              :task-info="taskInfo"
              :title="title"
              :formKey="formKey"
              :name="name"
              :NidProc="NidProc"
              :NidIncome="NidIncome"
              :loadFromMenu ="isSelectFromMenu"
            />
          </tab-content>
          <tab-content
            name="calculateMethods"
            title="روش های محاسبه"
            :padding="false"
          >
            <UCalculateMethods :incomeDetailsResults="incomeDetailsResults"  />
          </tab-content>
        </safa-tabs>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UIncomeCalculates from './partials/UIncomeCalculates'
import UCalculateMethods from './partials/UCalculateMethods'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: 'income/income-calculator',

  mixins: [baseFormMixin],
  components: {
    UIncomeCalculates,
    UCalculateMethods
  },
  data () {
    return {
      title: 'ماشین حساب درآمد',
      formKey: '19c5a4d3-ca41-4d89-ad9d-c5bce8bd4822',
      name: 'UIncomeCalculatorTabs',
      main: true,
      activeTab: 'incomeCalculates',
      baseLibResult: null,
      NidProc: '',
      NidIncome: '00000000-0000-0000-0000-000000000000',
      NidWorkflowDeff: '',
      nidWorkItem: '',
      incomeDetailsResult: null,
      incomeDetailsResults: {
        IncomeParameters: [],
        Income: {},
        Income_Calculation_ForChange: [],
        Income_LogMethod: []
      },
      isView: false
    }
  },
  mounted () {
    if (this.selectedRequest === null) {
      this.showError('لطفا کد درخواست را از کارتابل انتخاب نمایید..')
    } else {
      this.nidWorkItem = this.selectedRequest.NidWorkItem
      this.getBaseLibInNosaziCode()
    }
  },
  methods: {
    getBaseLibInNosaziCode () {
      this.showLoading()
      let data = { pNidWorkItem: this.nidWorkItem }
      this.$services.SA.getBaseLibInNidWorkItem(data)
        .then(async ({ data }) => {
          this.baseLibResult = this.getResponse(data)
          if (this.baseLibResult.success) {
            this.baseLibResult = this.baseLibResult.data
            if (this.baseLibResult.Sh_RequestInfo.EumRequestStatus !== 3) {
              this.NidProc = this.baseLibResult.Sh_RequestInfo.NidProc
              this.NidWorkflowDeff = this.baseLibResult.Sh_Workflow.NidWorkflowDeff
              this.getIncomeDetails()
            }
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: toString(this.nidWorkItem),
                bizCodeTitle: 'nidWorkItem'
              })
            }
            this.isView = true
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    getIncomeDetails () {
      this.showLoading()
      let data = {
        pNidIncome: this.NidIncome,
        PLoadFun: 'Income_LogMethod,Income,Income_Calculation_ForChange,NidBase'
      }
      this.$services.SD.getIncomeDetails(data)
        .then(({ data }) => {
          this.incomeDetailsResult = this.getResponse(data)

          if (this.incomeDetailsResult.success) {
            this.incomeDetailsResults = this.incomeDetailsResult.data
            this.getCiIncomeCalculation()
            //  if (SA.ClsCommon.IncomeSettings.DonotShowUserpriceColum) // todo
            //                             {
            //                                 grIncomeCalculation.Columns[2].IsVisible = false;
            //                             }
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    getCiIncomeCalculation () {
      this.showLoading()
      let data = {
        pNidIncome: this.NidIncome
      }
      this.$services.SD.getCIIncomeCalculationJustCalculate(data)
        .then(({ data }) => {
          this.ciIncomeResult = this.getResponse(data)

          if (this.ciIncomeResult.success) {
            this.ciIncomeResults = this.ciIncomeResult.data
            this.incomeDetailsResults = this.ciIncomeResults
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    reloadCalculator () {
      this.getBaseLibInNosaziCode()
    }
  }
}
</script>
