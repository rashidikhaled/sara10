<template>
  <fit>
    <safa-datatable
      v-model="value.Base_SharingInfrastructure"
      :bordered="false"
      :m="m"
      fit
      height="100%"
      helper="baseSharingInfrastructure"
      max-height="100%"
    />
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseSharingInfrastructureTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
