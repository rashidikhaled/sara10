<template>
  <section class="row wrap">
    <safa-datagrid
      v-model="value.Base_ControllerInfo"
      :m="m"
      class="col-12"
      helper="baseControllerInfo"
      style="height: 20rem"
    />
  </section>
</template>

<script>
export default {
  name: 'TabBaseControllerInfo',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
