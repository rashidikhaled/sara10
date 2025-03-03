<template>
  <section>
    <safa-datatable
      minHeight="200px"
      title="سایر"
      helper="baseOtherEquipment"
      :m="m"
      v-model="value.Base_OtherEquipment"
    />
    <safa-datatable
      class="q-mt-lg"
      :margin="null"
      title="سهم العرصه ساختمان ها"
      helper="baseMultiBuilding"
      :m="m"
      v-model="value.Base_MultiBuilding"
    />
  </section>
</template>

<script>
export default {
  name: 'TabOther2',

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
