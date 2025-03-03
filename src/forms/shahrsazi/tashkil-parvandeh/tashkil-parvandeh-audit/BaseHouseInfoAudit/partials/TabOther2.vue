<template>
  <fit>
    <safa-datatable
      title="سایر"
      helper="baseOtherEquipment"
      :m="m"
      v-model="value.Base_OtherEquipment"
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
  name: 'TabOther2',

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    m: String
  }
}
</script>
