<template>
  <fit>
    <safa-grid
      height="100%"
      max-height="100%"
      helper="agbaseUsing"
      :m="m"
      v-model="value.Base_Using"
      :bordered="false"
      title="نوع استفاده"
      fit
    />
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
