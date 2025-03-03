<template>
  <section >
    <safa-datatable
      helper="baseOtherEquipment"
      :m="m"
      v-model="value.Base_OtherEquipment"
      cdcName="Base_OtherEquipment"
    />
  </section>
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
