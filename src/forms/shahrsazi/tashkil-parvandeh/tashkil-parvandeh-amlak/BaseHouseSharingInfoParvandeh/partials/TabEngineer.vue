<template>
  <fit>
    <safa-datatable
      title="مهندسین"
      helper="baseControllerInfo"
      :m="m"
      v-model="value.Base_ControllerInfo"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      :bordered="false"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabEngineer',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
