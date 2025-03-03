<template>
  <section class="row wrap">
    <safa-datagrid
      :data-items="value.Base_SharingInfrastructure"
      :m="m"
      class="col-12"
      helper="baseSharingInfrastructure"
      style="height: 20rem"
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
