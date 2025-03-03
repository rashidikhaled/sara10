<template>
  <fit>
    <safa-datatable
      class="fit"
      margin="0"
      height="100%"
      max-height="100%"
      min-height="100px"
      helper="baseSharingInfrastructure"
      :m="m"
      v-model="value.Base_SharingInfrastructure"
      title="مشترکات"
      :bordered="false"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabBaseSharingInfrastructure',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
