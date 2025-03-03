<template>
  <safa-datatable
    helper="extra_zavabet"
    v-model="results.Zabeteh_Details"
    cdcName="Zabeteh_Details"
    class="fit"
    height="100%"
    max-height="100%"
    min-height="100%"
    margin="0"
    :bordered="false"
    :m="m"
  />
</template>
<script>
export default {
  props: {
    results: Object,
    m: String
  }
}
</script>
