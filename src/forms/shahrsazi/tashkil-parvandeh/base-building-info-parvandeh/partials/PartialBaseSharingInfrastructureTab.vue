<template>
  <section>
    <safa-datagrid
      helper="baseSharingInfrastructure"
      :m="m"
      :data-items="value.Base_SharingInfrastructure"
      cdcName="Base_SharingInfrastructure"
    />
  </section>
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
