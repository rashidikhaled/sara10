<template>
  <fit>
    <safa-datatable
      helper="baseOtherEquipment"
      :m="m"
      :allowCopy="true"
      :copyWithCount="true"
      :selectable="true"
      :allowMultipleSelection="false"
      v-model="value.Base_OtherEquipment"
      cdcName="Base_OtherEquipment"
      title="سایر"
      fit
      height="100%"
      max-height="100%"
      :bordered="false"
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
