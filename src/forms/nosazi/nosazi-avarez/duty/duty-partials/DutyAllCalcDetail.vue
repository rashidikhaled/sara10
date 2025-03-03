<template>
  <safa-splitter
    v-model="splitterModel"
    horizontal
  >
    <template v-slot:before>
      <safa-datatable
        v-model="calcDetailsResult.DutySessionDetails"
        helper="dutySessionDetails"
        title="جزئیات"
        @row-click="showLog"
      />
    </template>
    <template v-slot:after>
      <safa-datatable
        v-model="logDetail"
        helper="dutyAllCalculationComments"
        title="لاگ جزئیات"
      />
    </template>
  </safa-splitter>
</template>
<script>
import converter from 'xml-js'

export default {
  props: { calcDetailsResult: Object },
  data () {
    return {
      splitterModel: 50,
      logDetail: []
    }
  },
  methods: {
    showLog (e) {
      if (e.CalculateLog) {
        let arrayOfClsLog = converter.xml2json(e.CalculateLog, {
          compact: true,
          ignoreDoctype: true,
          ignoreCdata: true
        })
        const clsLog = JSON.parse(arrayOfClsLog)
        this.logDetail = clsLog.ArrayOfClsLog.ClsLog
        this.logDetail = this.logDetail.map(x => {
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
}
</script>
