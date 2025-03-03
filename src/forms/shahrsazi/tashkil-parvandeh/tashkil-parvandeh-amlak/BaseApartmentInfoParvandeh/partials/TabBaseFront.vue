<template>
  <fit>
    <safa-datatable2
      title="پیشامدگی ها"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper="baseFront"
      :m="m"
      v-model="value.Base_Front"
      :bordered="false"
      class="q-mb-sm"
      :allowCopy="true"
      :copyWithCount="true"
    />  <!-- ولیدیشن قرار داده شد -->
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
