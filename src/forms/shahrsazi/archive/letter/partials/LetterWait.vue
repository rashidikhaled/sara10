<template>
  <fit>
    <safa-datatable
      v-model="results"
      :bordered="false"
      cdcName="letterKartablWait"
      fit
      height="100%"
      helper="letterKartablWait"
      maxHeight="100%"
      minHeight="100%"
      title="نامه های در انتظار تایید"
    ></safa-datatable>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      results: []
    }
  }
}
</script>
