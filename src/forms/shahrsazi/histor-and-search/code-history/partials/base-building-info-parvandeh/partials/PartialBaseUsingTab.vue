<template>
  <section class="row wrap">
    <safa-datagrid
      :data-items="value.Base_Using"
      :m="m"
      class="col-12"
      helper="baseUsing"
      style="height: 20rem"
    />
  </section>
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
