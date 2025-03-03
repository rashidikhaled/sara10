<template>
  <fit>
    <safa-datatable
      ref="grid2"
      v-model="results"
      :bordered="false"
      :filterable="true"
      cdcName="letterKartablAccept"
      fit
      height="100%"
      helper="letterKartablAccept"
      maxHeight="100%"
      minHeight="100%"
      title="نامه های تایید شده توسط شما"
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
