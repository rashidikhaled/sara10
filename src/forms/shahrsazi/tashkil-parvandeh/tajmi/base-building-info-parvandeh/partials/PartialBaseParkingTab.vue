<template>
  <section>
    <safa-datatable
      class="col-12"
      title="پارکینگ ها"
      helper="baseParking"
      :data-items="value.Base_Parking"
    />

    <safa-datatable
      class="col-12"
      title="نحوه تامین پارکینگ"
      helper="baseSupplyParking"
      :data-items="value.Base_SupplyParking"
    />

    <div class="row q-col-gutter-lg">
      <safa-text
        class="col-12 col-sm-6 col-md-4"
        type="number"
        label="تعداد واحد پارکینگ مورد نیاز"
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingNeedCount"
      />
      <safa-text
        class="col-12 col-sm-6 col-md-4"
        type="number"
        label="تعداد واحد پارکينگ تامين شده "
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingSupplyCount"
      />
      <safa-text
        class="col-12 col-sm-6 col-md-4"
        type="number"
        label="کسری وصول شده پارکينگ "
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingGet"
      />
    </div>

  </section>
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
