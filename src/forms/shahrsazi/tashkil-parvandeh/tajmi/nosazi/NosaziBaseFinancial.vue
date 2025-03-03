<template>
  <fit>
    <div class="row">
      <div class="col-md-3">
        <safa-combo
          label="کد نوسازی"
          sourceType="local"
          :options="nosaziCode"
          v-model="code"
          class="q-mb-sm"
        >

        </safa-combo>
      </div>
    </div>
    <safa-datatable
      helper="nosaziMafasaAccount"
      v-model="financialBaseResults.DutyFinancialBase"
      title="پایه مالی"
      fit
      height="100%"
    />

  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data: function () {
    return {
      nosaziCode: [],
      code: 0,
      financialBaseResults: { DutyFinancialBase: [] }
    }
  },
  mixins: [baseFormMixin],
  mounted () {
    let i = 0
    let nosaziCodeArray = this.codeInfoResults.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
    this.financialBase()
  },
  watch: {
    code () {
      this.financialBase()
    }
  },
  props: {
    codeInfoResults: Object,
    selectedNosaziCode: Object
  },
  methods: {
    financialBase () {
      this.showLoading()
      let data = {
        pNid: this.selectedNosaziCode.NidFrom,
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
    }
  }
}
</script>
