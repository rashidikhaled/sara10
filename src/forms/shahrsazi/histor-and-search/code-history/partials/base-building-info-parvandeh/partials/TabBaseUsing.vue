<template>
  <section class="row wrap">
    <safa-datatable
      v-model="value.Base_Using"
      :m="m"
      class="col-12"
      helper=shahrsazi.baseUsing
      style="height: 20rem"
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
