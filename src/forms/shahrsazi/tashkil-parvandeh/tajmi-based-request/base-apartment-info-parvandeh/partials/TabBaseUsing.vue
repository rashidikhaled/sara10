<template>
  <fit>
    <safa-datatable2
      helper="shahrsazi.baseUsing"
      :m="m"
      v-model="value.Base_Using"
      :allowCopy="true"
      :copyWithCount="true"
      :selectable="true"
      :allowMultipleSelection="false"
      title="کاربری ها"
      fit
      height="100%"
      max-height="100%"
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
