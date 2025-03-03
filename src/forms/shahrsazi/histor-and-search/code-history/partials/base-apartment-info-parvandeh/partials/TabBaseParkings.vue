<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_HouseUser"
          :m="m"
          ci-name="CI_HouseUser"
          class="col-12 col-sm-6"
          domain-name="CI_SaraM1"
          label="بهره بردار:"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Populations"
          :m="m"
          class="col-12 col-sm-6"
          label="جمعیت:"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_ApartmentInfo.CommercialDoorCount"
          :m="m"
          class="col-12 col-sm-6"
          label="تعداد درب تجاری:"
        />
        <safa-text
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          :m="m"
          class="col-12 col-sm-6"
          label="عرض دهنه تجاری:"
        />

      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">منبع تامین پارکینگ:</div>
        <safa-datagrid
          v-model="value.Base_SupplyParking"
          :m="m"
          class="col-12"
          helper="baseSupplyParking"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">پارکینگ ها:</div>
        <safa-datagrid
          v-model="value.Base_Parking"
          :m="m"
          class="col-12"
          helper="baseParking"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingNeedCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد واحد پارکینگ مورد نیاز:"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingSupplyCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد واحد پارکینگ تامین شده:"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingGet"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="کسری وصول شده پارکينگ :"
        />

      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabBaseParkings',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
