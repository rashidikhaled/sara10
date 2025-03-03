<template>
  <fit>
    <safa-datatable
      v-model="value.Base_Front"
      :bordered="false"
      :m="m"
      fit
      height="100%"
      helper="baseFront"
      max-height="100%"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabBaseFront',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
