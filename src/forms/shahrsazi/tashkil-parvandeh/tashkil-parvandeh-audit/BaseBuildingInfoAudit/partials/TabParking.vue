<template>
  <fit>
    <safa-datatable
      title="نحوه تامین پارکینگ"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper="baseSupplyParking"
      v-model="value.Base_SupplyParking"
      :m="m"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabParking',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
