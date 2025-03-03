<template>
  <fit>
    <safa-datatable
      ref="technical-grid"
      v-model="results.PrintRequestList"
      :bordered="false"
      :m="m"
      cdcName="documentPhysicReqHistory"
      fit
      height="100%"
      helper="documentPhysicReqHistory"
      max-height="100%"
      minHeight="100%"
      name="grid"
      title="تاریخچه پرونده"
    ></safa-datatable>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: {
    m: String,
    results: {}
  }
}
</script>
