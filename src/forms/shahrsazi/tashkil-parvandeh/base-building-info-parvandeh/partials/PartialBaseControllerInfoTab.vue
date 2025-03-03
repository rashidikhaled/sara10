<template>
  <section>
    <safa-datatable
      helper="baseControllerInfo"
      :m="m"
      v-model="value.Base_ControllerInfo"
      cdcName="Base_ControllerInfo"
      height="calc(100px - 320px)"
      title="مهندسین"
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
