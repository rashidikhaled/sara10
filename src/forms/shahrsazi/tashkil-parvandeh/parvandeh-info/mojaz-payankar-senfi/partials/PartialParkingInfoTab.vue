<template>
  <fit>
    <safa-splitter
      v-model="splitterValue"
      class="fit"
      horizontal
      margin="0"
      style="min-height:200px"
    >
      <template #before>
        <fit>
          <safa-datatable
            helper="parkingProductionMethod"
            height="100%"
            max-height="100%"
            title="نحوه تامین پارکینگ"
            v-model="value.Base_SupplyParking"
            fit
            :m="m"
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-datatable
            helper="baseGap"
            :m="m"
            v-model="value.Base_Gap"
            height="100%"
            max-height="100%"
            title="دهانه"
            fit
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'PartialParkingInfoTab',
  data () {
    return {
      splitterValue: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
