<template>
  <fit>
    <div class="fit q-mb-sm">
      <div class="row q-col-gutter-x-md full-height">
        <div class="col-12 col-md-6">
          <fit>
            <safa-datatable
              title="پارکینگ ها"
              helper="baseParking"
              :m="m"
              v-model="value.Base_Parking"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
        <div class="col-12 col-md-6">
          <fit>
            <safa-datatable
              title="نحوه تامین پارکینگ"
              helper="baseSupplyParking"
              :m="m"
              v-model="value.Base_SupplyParking"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <safa-text
        class="col-12 col-md-4"
        type="number"
        label="تعداد واحد پارکینگ مورد نیاز"
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingNeedCount"
        label-width="150px"
      />
      <safa-text
        class="col-12 col-md-4"
        type="number"
        label="تعداد واحد پارکينگ تامين شده "
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingSupplyCount"
        label-width="150px"
      />
      <safa-text
        class="col-12 col-md-4"
        type="number"
        label="کسری وصول شده پارکينگ "
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingGet"
        label-width="150px"
      />
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
  }
}
</script>
