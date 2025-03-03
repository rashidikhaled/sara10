<template>
  <fit>
    <safa-datatable2
      fit
      height="100%"
      max-height="100%"
      minHeight="150px"
      title="پیشامدگی ها"
      helper="baseFront"
      :m="m"
      v-model="value.Base_Front"
    />   <!-- ولیدیشن قرار داده شد -->
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
