<template>
  <section class="row wrap">
    <safa-datagrid
      class="col-12"
      style="height: 20rem"
      helper="baseUsing"
      :m="m"
      v-model="value.Base_Using"
    />
  </section>
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
