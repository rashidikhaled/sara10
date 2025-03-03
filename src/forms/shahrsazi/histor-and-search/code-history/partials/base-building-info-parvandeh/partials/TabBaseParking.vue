<template>
  <section class="row wrap">
    <q-card flat>
      <q-card-section class="col-12">
        <div class="section-title">پارکینگ ها:</div>
        <safa-datagrid
          v-model="value.Base_Parking"
          :m="m"
          class="col-12"
          helper="baseParking"
          style="height: 12rem"
        />
      </q-card-section>

      <q-card-section class="col-12">
        <div class="section-title">نحوه تامین پارکینگ:</div>
        <safa-datagrid
          v-model="value.Base_SupplyParking"
          :m="m"
          class="col-12"
          helper="baseSupplyParking"
          style="height: 12rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد واحد پارکینگ مورد نیاز:"
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد واحد پارکينگ تامين شده :"
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingGet"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="کسری وصول شده پارکينگ :"
          type="number"
        />
      </q-card-section>
    </q-card>

  </section>
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
  }
}
</script>
