<template>
  <fit>
    <safa-datatable
      v-model="value.Base_Using"
      :bordered="false"
      :m="m"
      fit
      height="100%"
      helper=shahrsazi.baseUsing
      max-height="100%"
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
