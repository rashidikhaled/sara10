<template>
  <fit>
    <safa-status :result="getClalculateLogForCommision77Res" />
    <safa-status :result="getDutyFicheSubsRes" />
    <safa-splitter v-model="splitterModel">
      <template #before>
        <safa-grid
          height="100%"
          max-height="100%"
          fit
          helper="subCalculate"
          m="r"
          v-model="DutyFicheSub"
          cdcName="DutyFicheSub"
          :allowMultipleSelection="false"
          title="ریز محاسبات فیش"
          paginate
        />
      </template>
      <template #after>
        <safa-grid
          height="100%"
          max-height="100%"
          fit
          helper="ficheDetails"
          cdcName="DutyFicheOtherFiled"
          m="r"
          v-model="DutyFicheOtherFiled"
          :allowMultipleSelection="false"
          title="جزئیات فیش"
          paginate
        />
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import converter from "xml-js"
export default {
  mixins: [baseFormMixin],
  props: {
    value: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      splitterModel: 50,
      nidFiche: "00000000-0000-0000-0000-000000000000",
      DutyFicheSub: [],
      DutyFicheOtherFiled: [],

      getClalculateLogForCommision77Res: null,
      getDutyFicheSubsRes: null,
      logDetail: null
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      this.nidFiche = this.value.NidFiche
      await this.getDutyFicheSubs()
      await this.getClalculateLogForCommision77()
    },
    async getDutyFicheSubs () {
      this.showLoading()
      await this.$services.SB.getDutyFicheSubs({
        pNidFiche: this.nidFiche
      })
        .then(async ({ data }) => {
          this.getDutyFicheSubsRes = this.getResponse(data)
          if (this.getDutyFicheSubsRes.success) {
            this.DutyFicheSub = this.getDutyFicheSubsRes.data.DutyFicheSub
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getClalculateLogForCommision77 () {
      this.showLoading()
      await this.$services.SB.getClalculateLogForCommision77({
        pNidFiche: this.nidFiche
      })
        .then(async ({ data }) => {
          this.getClalculateLogForCommision77Res = this.getResponse(data)
          if (this.getClalculateLogForCommision77Res.success) {
            this.logDetail =
              this.getClalculateLogForCommision77Res.data.DutyFicheOtherFiled
            if (this.logDetail) {
              let arrayOfClsLog = converter.xml2js(this.logDetail, {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              })
              if (
                arrayOfClsLog.ArrayOfClsLog &&
                arrayOfClsLog.ArrayOfClsLog.ClsLog
              ) {
                this.DutyFicheOtherFiled = arrayOfClsLog.ArrayOfClsLog.ClsLog
                this.DutyFicheOtherFiled = this.DutyFicheOtherFiled.map((x) => {
                  return {
                    ...x,
                    Subject: x.Subject._text,
                    Value: x.Value._text,
                    Comment: x.Comment._text
                  }
                })
              }
            }
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>

<style></style>
