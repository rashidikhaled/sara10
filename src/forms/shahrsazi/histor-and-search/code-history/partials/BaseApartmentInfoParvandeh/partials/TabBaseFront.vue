<template>
  <fit>
    <safa-datatable2
      v-model="value.Base_Front"
      :allowCopy="true"
      :bordered="false"
      :copyWithCount="true"
      :m="m"
      class="q-mb-sm"
      fit
      height="100%"
      helper="baseFront"
      max-height="100%"
      min-height="150px"
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
