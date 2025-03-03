<template>
  <fit>
    <safa-datatable
      v-model="value.Base_Front"
      :allowCopy="true"
      :bordered="false"
      :m="m"
      :selectable="true"
      fit
      height="100%"
      helper="baseFront"
      max-height="100%"
      title="پیشامدگی ها"
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
