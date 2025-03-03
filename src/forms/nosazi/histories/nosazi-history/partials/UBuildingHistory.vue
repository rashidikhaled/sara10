<template>
  <fit>
    <safa-datatable
      v-model=" buildingResults.TmpBuilding"
      :loadingAnimation="false"
      :m="m"
      allowNewRow=true
      cdcName="buildingHistoryInHistory"
      fit
      height="100%"
      helper="nosazi.buildingHistoryInHistory"
      max-height="100%"
      title="تاریخچه ساختمان"
    ></safa-datatable>
  </fit>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    m: String,

    buildingResults: Object
  }
}
</script>
