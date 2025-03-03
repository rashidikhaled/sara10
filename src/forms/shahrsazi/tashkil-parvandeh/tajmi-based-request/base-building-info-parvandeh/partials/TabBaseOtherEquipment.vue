<template>
  <fit>
    <safa-datatable
      height="100%"
      max-height="100%"
      margin="0"
      class="fit"
      helper="baseOtherEquipment"
      :m="m"
      v-model="value.Base_OtherEquipment"
      title="سایر امکانات"
      :bordered="false"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabBaseOtherEquipment',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
