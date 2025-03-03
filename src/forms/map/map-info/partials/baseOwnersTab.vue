<template>
  <fit>
    <safa-datatable
      title="مالکین"
      :bordered="false"
      m="r"
      fit
      height="100%"
      max-height="100%"
      helper="BaseOwnerMap"
      cdcName="baseEdge"
      v-model="model.Base_Owner"
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
