<template>
  <fit>
    <safa-grid
      v-model="value.Owned_SubScription"
      cdcName="Owned_Compensation"
      fit
      paginate
      :suppressRowClickSelection="false"
      :m="m"
      helper="Owned_SubScriptionCol"
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
    return {
    }
  }
}
</script>
