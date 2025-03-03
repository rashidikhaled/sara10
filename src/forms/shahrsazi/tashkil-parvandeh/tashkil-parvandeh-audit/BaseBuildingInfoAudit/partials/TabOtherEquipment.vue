<template>
  <fit>
    <safa-datatable
      helper="baseOtherEquipment"
      :m="m"
      v-model="value.Base_OtherEquipment"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabOtherEquipment',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
