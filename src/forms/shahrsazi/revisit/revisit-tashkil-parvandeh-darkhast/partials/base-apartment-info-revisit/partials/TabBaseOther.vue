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
      title="سایر"
    />

  </fit>
</template>

<script>
export default {
  name: 'TabBaseOther',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
