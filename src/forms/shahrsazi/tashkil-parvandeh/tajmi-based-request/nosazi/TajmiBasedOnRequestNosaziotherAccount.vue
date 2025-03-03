<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <div class="col-md-3">
        <safa-combo
          label=" کد نوسازی"
          sourceType="local"
          :options="nosaziCode"
          v-model="code"
        >
        </safa-combo>
      </div>
      <div class="col-md-3">
        <safa-text
          label="سال تسویه "
          domainName="CI_SaraM1"
          ciName="CI_DutyYear"
          v-model="selectedDutyYear"
        >
        </safa-text>
      </div>
      <div class="col-md-3">
        <safa-text
          label="سال تسویه ملک"
         m="r">
        </safa-text>
      </div>
      <div class="col-md-3">
        <safa-combo
          label="علت تسویه "
          domainName="CI_SaraM1"
          ciName="CI_DutyPayoffCause"
          v-model="payOfYearResults.PayOffYear.CI_DutyPayoffCause"
        >
        </safa-combo>
      </div>
    </div>
    <div class="q-my-sm">
      <safa-checkbox
        label="عدم نمایش حساب های باطله"
        v-model="loadCancelOddment"
        @click="reloadOddmentDuty"
      ></safa-checkbox>
    </div>
    <fit>
      <safa-datatable
        helper="nosaziOtherAccount"
        v-model="oddmentResults.DutyOddmentAccount"
        title="لیست حساب ها"
        fit
        height="100%"
      />
    </fit>
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data: function () {
    return {
      nosaziCode: [],
      code: 0,
      oddmentResults: { DutyOddmentAccount: [] },
      selectedDutyYear: 0,
      payOfYearResult: null,
      payOfYearResults: {
        PayOffYear: {},
        Duty_PayOffHistory: [],
        HousePayOffYear: {}
      }
    }
  },
  mixins: [baseFormMixin],
  props: {
    results: Array,
    selectedNosaziCode: String,
    loadCancelOddment: Boolean,
    codeInfoResults: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },

  mounted () {
    let i = 0
    let nosaziCodeArray = this.codeInfoResults.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
    this.reloadOddmentDuty()
  },
  watch: {
    code () {
      this.reloadOddmentDuty()
    }
  },
  methods: {
    reloadOddmentDuty () {
      this.showLoading()
      let data = {
        pNid: this.codeInfoResults.NidList[this.code],
        pSysCiDutyType: 1,
        pUnLoadCancelOddment: this.loadCancelOddment
      }

      this.$services.SB.getDutyOddmentAccount(data)
        .then(async ({ data }) => {
          this.oddmentResult = this.getResponse(data)

          if (this.oddmentResult.success) {
            this.oddmentResults = this.oddmentResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.reloadGetPayOffYear()
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    reloadGetPayOffYear () {
      this.showLoading()
      let data = {
        pNidFK: this.oddmentResults.NidFk,
        pSysCiDutyType: 1
      }
      this.$services.SB.getPayOffYear(data)
        .then(async ({ data }) => {
          this.payOfYearResult = this.getResponse(data)

          if (this.payOfYearResult.success) {
            this.payOfYearResults = this.payOfYearResult.data
            this.payOfYearResults.Duty_PayOffHistory.forEach(item => {
              if (item.CI_DutyYear_Payoff === 0) {
                item.CI_DutyYear_Payoff = 'نامشخص'
              }
            })
            this.selectedDutyYear = this.payOfYearResults.PayOffYear.CI_DutyYear_Payoff

            await this.log({
              action: this.logActions.view
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
