<template>
  <safa-datatable
    v-model="refDelResults"
    helper="referFileToEngDeleted"
    min-height="200px"
    max-height="100%"
    height="100%"
    cdcName="refDelResults"
  />
</template>
<script>
export default {
  props: {
    refDelResults: Array
  }
}
</script>
