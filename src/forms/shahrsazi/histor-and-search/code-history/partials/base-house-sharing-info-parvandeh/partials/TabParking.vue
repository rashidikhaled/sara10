<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section class="row wrap">
        <div class="col-12 section-title">پارکینگ ها:</div>
        <safa-datagrid
          class="col-12"
          style="height: 12rem"
          helper="baseParking"
          :m="m"
          :data-items="value.Base_Parking"
        />
      </q-card-section>

      <q-card-section class="col-12">
        <div class="col-12 section-title">نحوه تامین پارکینگ:</div>
        <safa-datagrid
          class="col-12"
          style="height: 12rem"
          helper="baseSupplyParking"
          :m="m"
          :data-items="value.Base_SupplyParking"
        />
      </q-card-section>
    </q-card>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          type="number"
          label="تعداد واحد پارکینگ مورد نیاز:"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          type="number"
          label="تعداد واحد پارکينگ تامين شده :"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          type="number"
          label="کسری وصول شده پارکينگ :"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingGet"
        />
      </q-card-section>
    </q-card>

  </section>
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
