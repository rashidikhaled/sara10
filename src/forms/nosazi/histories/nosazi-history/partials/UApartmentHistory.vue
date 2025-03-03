<template>
  <fit>
    <safa-datatable
      v-model="apartmentResults.TmpApar"
      :loadingAnimation="false"
      :m="m"
      allowNewRow=true
      cdcName="apartmentHistoryInHistory"
      fit
      height="100%"
      helper="nosazi.apartmentHistoryInHistory"
      max-height="100%"
      title="تاریخچه آپارتمان"
    ></safa-datatable>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data () {
    return {}
  },
  mixins: [baseFormMixin],
  props: {
    m: String,
    apartmentResults: Object
  }
}
</script>
