<template>
  <section class="row wrap">
    <safa-datagrid
      :m="m"
      :v-model="value.Base_SharingInfrastructure"
      class="col-12"
      helper="baseSharingInfrastructure"
      style="height: 20rem"
    />
  </section>
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
