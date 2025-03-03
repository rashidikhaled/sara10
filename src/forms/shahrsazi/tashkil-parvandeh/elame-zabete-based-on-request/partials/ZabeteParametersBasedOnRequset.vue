<template>
  <safa-splitter
    v-model="gridSplitter"
    class="fit"
    vertical
    margin="0"
  >
    <template v-slot:before>
      <safa-datatable
        helper="zavabetRequestParamter"
        v-model="results.ZabetehParameters"
        cdcName="ZabetehParameters"
        title="پارامترها"
        class="fit"
        margin="0"
        height="100%"
        min-height="100px"
        :m="m"
      />
    </template>

    <template v-slot:after>
      <safa-datatable
        helper="zavabetEvent"
        v-model="results.Zabeteh_LogMethod"
        cdcName="Zabeteh_LogMethod"
        title="وقایع نگار"
        class="fit"
        margin="0"
        height="100%"
        min-height="100px"
      />
    </template>
  </safa-splitter>
</template>
<script>
export default {
  data: function () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
