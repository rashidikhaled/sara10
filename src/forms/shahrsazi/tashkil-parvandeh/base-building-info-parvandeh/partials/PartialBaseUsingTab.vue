<template>
  <section>
    <safa-datatable
      helper="baseUsing"
      :m="m"
      v-model="value.Base_Using"
      cdcName="Base_Using"
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
