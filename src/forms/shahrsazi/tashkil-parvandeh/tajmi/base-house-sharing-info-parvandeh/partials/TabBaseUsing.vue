<template>
  <fit>
    <safa-datatable
      helper="shahrsazi.baseUsing"
      :m="m"
      v-model="value.Base_Using"
      :selectable="false"
      :emptyRowLimit="1"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      title="کاربری ها"
      :bordered="false"
    />
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
