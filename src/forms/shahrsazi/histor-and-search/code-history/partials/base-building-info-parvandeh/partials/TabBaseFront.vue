<template>
  <section class="row wrap">
    <safa-datagrid
      v-model="value.Base_Front"
      :m="m"
      class="col-12"
      helper="baseFront"
      style="height: 20rem"
    />
  </section>
</template>

<script>
export default {
  name: 'TabBaseFront',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
