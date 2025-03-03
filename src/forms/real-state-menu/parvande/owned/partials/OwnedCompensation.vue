<template>
  <fit>
    <safa-grid
      v-model="value.Owned_Compensation"
      cdcName="Owned_SubScription"
      fit
      :m="m"
      :suppressRowClickSelection="false"
      helper="Owned_CompensationCol"
      paginate
    />
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    value: { type: Object, default: () => {} }
  },
  data () {
    return {}
  }
}
</script>
