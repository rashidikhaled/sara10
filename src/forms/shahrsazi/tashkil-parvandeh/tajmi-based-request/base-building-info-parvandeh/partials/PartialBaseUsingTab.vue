<template>
  <section>
    <safa-datatable
      helper="baseUsing"
      :m="m"
      :data-items="value.Base_Using"
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
