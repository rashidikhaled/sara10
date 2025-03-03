<template>
  <fit>
    <safa-datatable2
      v-model="value.Base_Using"
      :bordered="false"
      :m="m"
      fit
      height="100%"
      helper=shahrsazi.baseUsing
      max-height="100%"
      title="کاربری ها"
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
