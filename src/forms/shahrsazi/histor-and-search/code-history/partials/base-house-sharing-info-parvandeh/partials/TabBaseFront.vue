<template>
  <section class="row wrap">
    <safa-datagrid
      class="col-12"
      style="height: 20rem"
      helper="baseFront"
      :m="m"
      v-model="value.Base_Front"
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
