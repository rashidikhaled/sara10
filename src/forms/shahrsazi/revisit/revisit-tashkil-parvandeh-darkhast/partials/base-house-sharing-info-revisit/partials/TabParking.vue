<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      :min-height="$q.screen.lt.md ? '300px' : '200px'"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_Parking"
            :m="m"
            fit
            height="100%"
            helper="baseParking"
            max-height="100%"
            title="پارکینگ"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_SupplyParking"
            :m="m"
            fit
            height="100%"
            helper="baseSupplyParking"
            max-height="100%"
            title="نحوه تامین پارکینگ"
          />
        </fit>
      </template>
    </safa-splitter>
    <div class="q-mt-sm">
      <div class="row q-col-gutter-md">
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          :m="m"
          class="col-12 col-sm-4"
          label="تعداد واحد پارکینگ مورد نیاز"
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          :m="m"
          class="col-12 col-sm-4"
          label="تعداد واحد پارکينگ تامين شده "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingGet"
          :m="m"
          class="col-12 col-sm-4"
          label="کسری وصول شده پارکينگ"
          type="number"
        />
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabParking',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      horizontalSplitter: 50
    }
  }
}
</script>
