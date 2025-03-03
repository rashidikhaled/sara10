<template>
  <fit>
    <safa-group :m="m" label-width="90px">
      <safa-combo
        label="بهره بردار"
        ci-name="CI_HouseUser"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_HouseUser"
      />
      <safa-text
        label="جمعیت"
        v-model="value.Base_CommonEstate.Populations"
        type="number"
      />
      <safa-text
        label="تعداد درب تجاری"
        v-model="value.Base_ApartmentInfo.CommercialDoorCount"
        type="number"
      />
      <safa-text
        label="عرض دهنه تجاری"
        v-model="value.Base_CommonEstate.CommercialGapWidth"
        type="number"
      />
    </safa-group>
    <safa-splitter v-model="splitterModel" horizontal fit margin="0">
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="منبع تامین پارکینگ"
            helper="baseSupplyParking"
            :m="m"
            v-model="value.Base_SupplyParking"
            fit
            height="100%"
            max-height="100%"
          />
          <q-separator />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <q-separator />
          <safa-datatable
            title="پارکینگ ها"
            helper="baseParking"
            :m="m"
            v-model="value.Base_Parking"
            fit
            height="100%"
            max-height="100%"
          />
          <q-separator class="q-mb-sm" />
        </fit>
      </template>
    </safa-splitter>
    <div class="q-mt-sm">
      <safa-group label-width="170px" :m="m">
        <safa-text
          label="تعداد واحد پارکینگ مورد نیاز"
          v-model="value.Base_ApartmentInfo.ParkingNeedCount"
          type="number"
        />
        <safa-text
          label="تعداد واحد پارکینگ تامین شده"
          v-model="value.Base_ApartmentInfo.ParkingSupplyCount"
          type="number"
        />
        <safa-text
          label="کسری وصول شده پارکينگ "
          v-model="value.Base_ApartmentInfo.ParkingGet"
          type="number"
        />
      </safa-group>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseParkings',
  data () {
    return {
      splitterModel: 50
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
