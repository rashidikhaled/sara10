<template>
  <section>
    <safa-datatable2
      helper="baseFront"
      :m="m"
      :data-items="value.Base_Front"
      height="calc(100px - 320px)"
    />   <!-- ولیدیشن قرار داده شد -->
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
