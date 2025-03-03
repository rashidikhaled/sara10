<template>
  <section class="row wrap">
    <safa-datagrid
      :data-items="value.Base_OtherEquipment"
      :m="m"
      class="col-12"
      helper="AGbaseOtherEquipment"
      style="height: 20rem"
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
