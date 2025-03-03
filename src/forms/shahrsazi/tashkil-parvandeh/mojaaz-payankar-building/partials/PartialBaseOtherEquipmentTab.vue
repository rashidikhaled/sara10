<template>
  <fit>
    <safa-datatable
      helper="baseOtherEquipment"
      :m="m"
      v-model="value.Base_OtherEquipment"
      height="100%"
      max-height="100%"
      title="سایر"
      :bordered="false"
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
