<template>
  <fit>
    <safa-datatable
      v-model="value.Base_OtherEquipment"
      :bordered="false"
      :m="m"
      fit
      height="100%"
      helper="baseOtherEquipment"
      max-height="100%"
    />
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseOtherEquipmentTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
