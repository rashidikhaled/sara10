<template>
  <section>
    <safa-datatable2
      helper="baseUsing"
      :m="m"
      :data-items="value.Base_Using"
    />   <!-- ولیدیشن قرار داده شد -->
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
