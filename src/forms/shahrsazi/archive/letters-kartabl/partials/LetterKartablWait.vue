<template>
  <fit>
    <safa-datatable
      ref="grid2"
      v-model="results"
      :bordered="false"
      :filterable="true"
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
