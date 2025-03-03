<template>
  <fit>
    <safa-datatable
      helper="baseControllerInfo"
      :m="m"
      v-model="value.Base_ControllerInfo"
      cdcName="Base_ControllerInfo"
      title="مهندسین"
      :emptyRowLimit="1"
      :selectable="false"
      fit
      height="100%"
      min-height="150px"
      maxHeight="100%"
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
