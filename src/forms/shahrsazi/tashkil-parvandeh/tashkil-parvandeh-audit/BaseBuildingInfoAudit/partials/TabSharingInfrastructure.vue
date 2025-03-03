<template>
  <fit>
    <safa-datatable
      helper="baseSharingInfrastructure"
      :m="m"
      v-model="value.Base_SharingInfrastructure"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabSharingInfrastructure',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
