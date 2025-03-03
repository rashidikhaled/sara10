<template>
  <section>
    <safa-datatable
      helper="baseFront"
      :m="m"
      :data-items="value.Base_Front"
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
