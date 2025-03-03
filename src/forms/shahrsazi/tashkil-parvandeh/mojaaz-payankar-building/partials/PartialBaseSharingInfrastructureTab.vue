<template>
  <fit>
    <safa-datatable
      helper="baseSharingInfrastructure"
      :m="m"
      v-model="value.Base_SharingInfrastructure"
      height="100%"
      max-height="100%"
      title="مشترکات"
      :bordered="false"
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
