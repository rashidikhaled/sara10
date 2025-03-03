<template>
  <div>
    <safa-status class="col-12" :result="financialBaseResult"></safa-status>
    <safa-status class="col-12" :result="saveResult"></safa-status>
    <div class="row q-my-md">
      <div class="col-md-3">
        <safa-combo
          label="کد نوسازی"
          sourceType="local"
          :options="nosaziCode"
          v-model="code"
        >
        </safa-combo>
      </div>
    </div>
    <div class="form-row">
      <safa-datatable
        helper="dutyMafasaAccount"
        v-model="financialBaseResults.DutyFinancialBase"
        :m="mode"
        title="مفاصا حساب"
      />
    </div>
    <form-actions
      :m="mode"
      class="col-12 q-mt-md"
      @edit="isEditable = true"
      @save="save"
      @cancel="isEditable = false"
    >
    </form-actions>
  </div>
</template>
<script>
export default {
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
    results: Object
  },
  mounted () {
    let i = 0
    let nosaziCodeArray = this.results.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
    this.load()
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

      this.$services.SB.getDutyFinancialBase(data)
        .then(({ data }) => {
          this.financialBaseResult = this.getResponse(data)

          if (this.financialBaseResult.success) {
            this.financialBaseResults = this.financialBaseResult.data
          }
        })
        .catch(response => {
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

      this.$services.SB.saveDutyFinancialBase(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess('ذخیره با موفقیت انجام شد.')
            this.load()
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
