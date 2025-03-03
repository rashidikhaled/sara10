<template>
  <fit>
    <safa-grid
      v-model="value.Base_Using"
      cdcName="Base_Using"
      :bordered="false"
      :m="m"
      fit
      height="100%"
      helper="agbaseUsing"
      id="revisitHouseSharing"
      max-height="100%"
      title=""
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
