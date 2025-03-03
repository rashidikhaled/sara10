<template>
  <section>
    <safa-datatable
      helper="baseFront"
      :m="m"
      v-model="value.Base_Front"
      cdcName="Base_Front"
      height="calc(100px - 320px)"
    />
  </section>
</template>

<script>
export default {
  name: 'PartialBaseFrontTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
