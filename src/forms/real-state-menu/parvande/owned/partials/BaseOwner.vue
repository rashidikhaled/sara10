<template>
  <fit>
    <safa-grid
      v-model="value.Base_Owner"
      fit
      cdcName="Base_Owner"
      :suppressRowClickSelection="false"
      paginate
      :m="m"
      helper="Base_OwnerCol"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String }
  },
  data () {
    return {
    }
  }
}
</script>
