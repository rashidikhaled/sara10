<template>
  <fit>
    <safa-datatable
      helper="senfiAllCalcHistory"
      v-model="calcuateHistoryResult"
      class="col-12"
      title="محاسبات"
      fit
      height="100%"
      max-height="100%"
      min-height="100px"
    />
  </fit>
</template>
<script>
export default {
  props: {
    calcuateHistoryResult: Object
  }
}
</script>
