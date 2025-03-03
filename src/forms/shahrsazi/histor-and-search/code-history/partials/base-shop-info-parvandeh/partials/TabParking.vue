<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

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
          <div class="section-title">دهانه:</div>
          <safa-datagrid
            v-model="value.Base_Gap"
            :m="m"
            class="col-12"
            helper="baseGap"
            style="height: 12rem"
          />
        </q-card-section>

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
