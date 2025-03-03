<template>
  <fit>
    <safa-grid
      v-model="edgeResults.TmpEdge"
      :loadingAnimation="false"
      :m="m"
      allowNewRow=true
      cdcName="edgeHistoryInHistory"
      fit
      height="100%"
      helper="nosazi.edgeHistoryInHistory"
      max-height="100%"
      title="تاریخچه جهات اربعه"
    ></safa-grid>
  </fit>

</template>

<script>
export default {
  props: {
    m: String,

    edgeResults: Object
  }
}
</script>
