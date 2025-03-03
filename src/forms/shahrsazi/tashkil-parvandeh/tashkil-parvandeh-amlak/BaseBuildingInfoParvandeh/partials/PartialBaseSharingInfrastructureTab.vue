<template>
  <fit>
    <safa-datatable
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper="baseSharingInfrastructure"
      :m="m"
      v-model="value.Base_SharingInfrastructure"
      :bordered="false"
      title="مشترکات"
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
