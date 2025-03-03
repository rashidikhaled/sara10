<template>
  <fit>
    <safa-datatable2
      title="کاربری ها"
      fit
      height="100%"
      max-height="100%"
      minHeight="150px"
      helper="shahrsazi.baseUsing"
      :m="m"
      v-model="value.Base_Using"
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
