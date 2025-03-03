<template>
  <fit>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="پارکینگ ها"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              helper="baseParking"
              :m="m"
              v-model="value.Base_Parking"
            />
          </fit>
        </div>

        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="نحوه تامین پارکینگ"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              helper="baseSupplyParking"
              :m="m"
              v-model="value.Base_SupplyParking"
            />
          </fit>
        </div>
      </div>
    </div>
    <div class="q-mt-sm">
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12 col-sm col-md-4"
          type="number"
          label="تعداد واحد پارکینگ مورد نیاز"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          label-width="150px"
        />
        <safa-text
          class="col-12 col-sm col-md-4"
          type="number"
          label="تعداد واحد پارکينگ تامين شده"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          label-width="150px"
        />
        <safa-text
          class="col-12 col-sm col-md-4"
          type="number"
          label="کسری وصول شده پارکينگ"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingGet"
          label-width="150px"
        />
      </div>
    </div>

  </fit>
</template>

<script>
export default {
  name: 'PartialBaseParkingTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
