<template>
  <fit>
    <safa-grid
     helper="shahrsazi.baseUsingDastgah"
      :m="m"
      v-model="value.Base_Using"
      cdcName="Base_Using"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      title="کاربری ها"
      :bordered="false"
      :filterable="true"
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
