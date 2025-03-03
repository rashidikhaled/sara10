<template>
  <fit>
    <safa-splitter
      v-model="splitterModel"
      horizontal
      fit
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="پارکینگ ها"
            helper="baseParking"
            :m="m"
            v-model="value.Base_Parking"
            fit
            margin="0"
            height="100%"
            min-height="100px"
            :bordered="false"
          />
           <q-separator/>
        </fit>

      </template>
      <template v-slot:after>
        <fit>
          <q-separator/>
          <safa-datatable
            title="نحوه تامین پارکینگ"
            helper="baseSupplyParking"
            :m="m"
            v-model="value.Base_SupplyParking"
            class="fit q-mb-sm"
            margin="0"
            height="100%"
            min-height="100px"
            :bordered="false"
          />
           <q-separator class="q-mb-sm"/>
        </fit>
      </template>
    </safa-splitter>
    <safa-group
      label-width="165px"
      :m="m"
    >

      <safa-text
        type="number"
        label="تعداد واحد پارکینگ مورد نیاز"
        v-model="value.Base_BuildingInfo.ParkingNeedCount"
      />
      <safa-text
        type="number"
        label="تعداد واحد پارکينگ تامين شده "
        v-model="value.Base_BuildingInfo.ParkingSupplyCount"
      />
      <safa-text
        type="number"
        label="کسری وصول شده پارکينگ "
        v-model="value.Base_BuildingInfo.ParkingGet"
      />
    </safa-group>

  </fit>
</template>

<script>
export default {
  name: 'TabBaseParking',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      splitterModel: 50
    }
  }
}
</script>
