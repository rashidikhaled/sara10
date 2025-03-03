<template>
  <fit>
    <safa-datatable
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper="baseControllerInfo"
      :m="m"
      v-model="value.Base_ControllerInfo"
      title="مهندسین"
    />
  </fit>
</template>
<script>
export default {
  name: 'TabController',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
