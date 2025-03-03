<template>
  <fit>
    <safa-datatable2
      height="100%"
      max-height="100%"
      helper="baseUsing"
      :m="m"
      v-model="value.Base_Using"
      :bordered="false"
      title="نوع استفاده"
      fit
    />  <!-- ولیدیشن قرار داده شد -->
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseUsingTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
