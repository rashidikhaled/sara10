<template>
  <fit>
    <safa-datatable2
      title="کاربری ها"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper=shahrsazi.baseUsing
      :m="m"
      v-model="value.Base_Using"
      :bordered="false"
    />   <!-- ولیدیشن قرار داده شد -->
  </fit>
</template>

<script>
export default {
  name: 'TabBaseUsing',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
