<template>
  <section class="row wrap">
    <safa-datagrid
      v-model="value.Base_OtherEquipment"
      :m="m"
      class="col-12"
      helper="AGbaseOtherEquipment"
      style="height: 20rem"
    />
  </section>
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
