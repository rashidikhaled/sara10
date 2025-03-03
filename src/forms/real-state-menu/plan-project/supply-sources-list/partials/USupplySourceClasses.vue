<template>
  <fit>
    <safa-grid
      v-model="value.SupplySources_DetailsCode"
      fit
      max-height="100%"
      height="100%"
      minHeight="100%"
      paginate
      helper="DetailsCodeColumns"
      m="r"

    />
  </fit>
</template>

<script>
export default {
  props: {
    title: String,
    formKey: String,
    name: String,
    m: String,
    value: Object

  },
  data () {
    return {
    }
  }
}
</script>
