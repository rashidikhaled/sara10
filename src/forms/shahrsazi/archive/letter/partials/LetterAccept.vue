<template>
  <fit>
    <safa-datatable
      v-model="results"
      :bordered="false"
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
