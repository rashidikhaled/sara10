<template>
  <fit>
    <safa-datatable2
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper="baseFront"
      :m="m"
      v-model="value.Base_Front"
      :bordered="false"
      title="پیشامدگی ها"
    />  <!-- ولیدیشن قرار داده شد -->
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
