<template>
  <fit>
    <safa-datatable2
      helper="baseFront"
      :m="m"
      v-model="value.Base_Front"
      height="100%"
      max-height="100%"
      title="پیشامدگی ها"
      :bordered="false"
    />   <!-- ولیدیشن قرار داده شد -->
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseFrontTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
