<template>
    <fit>
      <safa-splitter
        class="q-mb-sm"
        v-model="splitterModel"
        horizontal
        fit
        margin="0"
      >
        <template v-slot:before>
          <fit>
            <safa-grid
              title="پارکینگ ها"
              helper="agBaseParkingMapColumns"
              :m="m"
              v-model="value.Base_Parking"
              cdcName="Base_Parking"
              fit
              height="100%"
              min-height="100px"
              paginate
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-grid
              title="نحوه تامین پارکینگ"
              helper="agBaseSupplyParkingMapColumns"
              :m="m"
              v-model="value.Base_SupplyParking"
              cdcName="Base_SupplyParking"
              fit
              height="100%"
              min-height="100px"
              paginate
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
  </template>

<script>
export default {
  name: "UParkingMap",
  props: {
    value: Object,
    m: {
      type: String,
      default: "e"
    }
  },
  data () {
    return {
      splitterModel: 50
    }
  }
}
</script>
