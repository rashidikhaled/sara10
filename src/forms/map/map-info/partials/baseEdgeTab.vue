<template>
  <fit>
    <safa-datatable
      title="جهات اربعه"
      :bordered="false"
      m="r"
      fit
      height="100%"
      max-height="100%"
      helper="BaseEdgeMap"
      cdcName="baseEdge"
      v-model="model.Base_Edge"
      :allowMultipleSelection="false"
    >
    </safa-datatable>
  </fit>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    model: Object
  }
}
</script>
