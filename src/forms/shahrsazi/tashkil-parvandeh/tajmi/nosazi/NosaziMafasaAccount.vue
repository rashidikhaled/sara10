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
      helper="mafasaHesabList"
      v-model="mafasaHesabResults.DutyMafasaHesabList"
      title="مفاصا حساب"
      height="100%"
      min-height="100px"
      max-height="100%"
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
      mafasaHesabResults: { DutyMafasaHesabList: [] }
    }
  },
  mixins: [baseFormMixin],
  computed: {},
  mounted () {
    let i = 0
    let nosaziCodeArray = this.codeInfoResults.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
    this.mafasaHesab()
  },
  watch: {
    code () {
      this.mafasaHesab()
    }
  },
  props: {
    codeInfoResults: Object
  },
  methods: {
    mafasaHesab () {
      this.showLoading()
      let data = {
        pNid: this.codeInfoResults.NidList[this.code],
        pSysCiDutyType: 1
      }

      this.$services.SB.getDutyMafasaHesab(data)
        .then(({ data }) => {
          this.mafasaHesabResult = this.getResponse(data)

          if (this.mafasaHesabResult.success) {
            this.mafasaHesabResults = this.mafasaHesabResult.data
          }
        })
        .catch(response => {
          this.mafasaHesabResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
