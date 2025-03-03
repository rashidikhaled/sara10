<template>
  <fit>
    <safa-datatable
      helper="responsibleFormActivity"
      v-model="processInfoResults.Task"
      title="فعالیت ها"
      fit
      height="100%"
      :bordered="false"
    />

  </fit>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: {
    processInfoResults: Object
  }
}
</script>
