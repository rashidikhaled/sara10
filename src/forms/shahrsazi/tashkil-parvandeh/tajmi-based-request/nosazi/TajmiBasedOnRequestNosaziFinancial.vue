<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-combo
        label="کد نوسازی"
        sourceType="local"
        :options="nosaziCode"
        v-model="code"
        class="col-md-3"
      >
      </safa-combo>
    </div>
    <safa-datatable
      helper="nosaziMafasaAccount"
      v-model="financialBaseResults.DutyFinancialBase"
      height="100%"
      min-height="100px"
      max-height="100%"
      title="پایه مالی"
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
    selectedNosaziCode: Object,
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
  methods: {
    financialBase () {
      this.showLoading()
      let data = {
        pNid: this.selectedNosaziCode.NidFrom,
        pSysCiDutyType: 1
      }

      this.$services.SB.getDutyFinancialBase(data)
        .then(async ({ data }) => {
          this.financialBaseResult = this.getResponse(data)

          if (this.financialBaseResult.success) {
            this.financialBaseResults = this.financialBaseResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.showError('خطایی رخ داده است')
          }
        })
        .catch(response => {
          this.financialBaseResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
