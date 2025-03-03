<template>
  <fit>
    <safa-grid
      title="ضوابط"
      helper="zavabet"
      v-model="results.Zabeteh_Details"
      cdcName="Zabeteh_Details"
      fit
      :m="m"
      max-height="100%"
      height="100%"
      minHeight="200px"
      :bordered="false"
    />
  </fit>
</template>
<script>
export default {
  props: {
    results: Object,
    m: String
  }
}
</script>
