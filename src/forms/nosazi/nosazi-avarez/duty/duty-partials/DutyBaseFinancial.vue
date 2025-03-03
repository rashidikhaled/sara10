<template>
  <fit>
    <safa-status :result="financialBaseResult"></safa-status>
    <safa-status :result="saveResult"></safa-status>
    <div class="row q-mb-sm">
      <div class="col-md-3 col-sm-4 col-xl-12">
        <safa-combo
          v-model="code"
          :options="nosaziCode"
          cdcName="nosaziCode"
          label="کد نوسازی"
          sourceType="local"
        >
        </safa-combo>
      </div>
    </div>
    <safa-datatable
      v-model="financialBaseResults.DutyFinancialBase"
      :m="m"
      :margin="null"
      cdcName="DutyFinancialBase"
      fit
      height="100%"
      helper="dutyMafasaAccount"
      max-height="100%"
      minHeight="100%"
      title="مفاصا حساب"
    />
    <!-- <form-actions
      :m="mode"
      class="col-12 q-mt-md"
      @edit="isEditable = true"
      @save="save"
      @cancel="isEditable = false"
    >
    </form-actions> -->
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'DutyBaseFinancial',
  mixins: [baseFormMixin],
  data: function () {
    return {
      nosaziCode: [],
      code: 0,
      financialBaseResults: { DutyFinancialBase: [] },
      financialBaseResult: null,
      saveResult: null
    }
  },
  props: {
    results: Object,
    baseNosaziCode: Object,
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
    },
    m: String
  },
  mounted () {
    if (this.baseNosaziCode.District !== 0) {
      let i = 0
      let nosaziCodeArray = this.results.NickNameNids
      nosaziCodeArray.forEach((item) => {
        this.nosaziCode.push({ ID: i++, Title: item })
      })
      this.load()
    }
  },
  watch: {
    code () {
      this.load()
    }
  },
  methods: {
    load () {
      this.showLoading()
      let data = {
        pNid: this.results.NidList[this.code],
        pSysCiDutyType: 1
      }

      this.$services.SB.getDutyFinancialBase(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.financialBaseResult = this.getResponse(data)

          if (this.financialBaseResult.success) {
            this.financialBaseResults = this.financialBaseResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.results.NidList[this.code],
              bizCodeTitle: 'NidList'
            })
          }
        })
        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.showLoading()
      let data = {
        pFinancialBase: this.financialBaseResults
      }

      this.$services.SB.saveDutyFinancialBase(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false

            await this.log({
              action: this.logActions.save,
              bizCode: this.financialBaseResults.NidNosaziCode,
              bizCodeTitle: 'NidNosaziCode'
            })

            this.showSuccess('ذخیره با موفقیت انجام شد.')
            this.load()
          }
        })
        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
