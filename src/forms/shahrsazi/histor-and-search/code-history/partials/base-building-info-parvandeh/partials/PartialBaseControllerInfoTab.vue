<template>
  <section class="row wrap">
    <safa-datagrid
      :data-items="value.Base_ControllerInfo"
      :m="m"
      class="col-12"
      helper="baseControllerInfo"
      style="height: 20rem"
    />
  </section>
</template>

<script>
export default {
  name: 'PartialBaseControllerInfoTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
