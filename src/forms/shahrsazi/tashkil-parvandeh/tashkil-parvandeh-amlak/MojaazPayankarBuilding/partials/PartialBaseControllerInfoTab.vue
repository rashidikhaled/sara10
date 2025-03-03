<template>
  <fit>
    <safa-datatable
      helper="baseControllerInfo"
      :m="m"
      v-model="value.Base_ControllerInfo"
      title="مهندسین"
      height="100%"
      max-height="100%"
      :bordered="false"
    />
  </fit>
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
