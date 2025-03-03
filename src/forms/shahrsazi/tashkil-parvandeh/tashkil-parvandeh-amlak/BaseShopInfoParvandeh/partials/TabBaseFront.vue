<template>
  <fit>
      <safa-datatable
        title="پیشامدگی ها"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
        helper="baseFront"
        :m="m"
        v-model="value.Base_Front"
        :bordered="false"
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
