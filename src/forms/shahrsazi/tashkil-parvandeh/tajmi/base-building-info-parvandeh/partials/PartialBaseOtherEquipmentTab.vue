<template>
  <section >
    <safa-datatable
      helper="baseOtherEquipment"
      :m="m"
      :data-items="value.Base_OtherEquipment"
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
