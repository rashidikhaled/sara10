<template>
  <fit>
    <safa-datatable
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper="baseOtherEquipment"
      :m="m"
      v-model="value.Base_OtherEquipment"
      :bordered="false"
      title="سایر امکانات"
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
