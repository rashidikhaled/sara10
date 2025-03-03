<template>
  <fit>
    <form-row class="q-my-sm">
      <form-control>
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          cdcName="ParkingNeedCount"
          :label-width="$q.screen.lt.md ? '145px' : 'auto'"
          :m="m"
          class="col-12 col-sm-6 col-md"
          label="تعداد واحد پارکینگ مورد نیاز"
          type="number"
        />
      </form-control>
      <form-control>
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          cdcName="ParkingSupplyCount"
          :label-width="$q.screen.lt.md ? '145px' : 'auto'"
          :m="m"
          class="col-12 col-sm-6 col-md"
          label="تعداد واحد پارکينگ تامين شده "
          type="number"
        />
      </form-control>
      <form-control>
        <safa-text
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          cdcName="AllowableDensityLicence"
          label="تراکم مجاز در پروانه ساختمانی"
          type="number"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          v-model="value.Base_BuildingInfo.BusyArea"
          cdcName="BusyArea"
          label="سطح اشغال "
          type="number"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="کسری وصول شده پارکینگ"
          v-model="value.Base_BuildingInfo.ParkingGet"
          :m="m"
        />
      </form-control>
    </form-row>

    <safa-datatable
      v-model="value.Base_SupplyParking"
      cdcName="Base_SupplyParking"
      :m="m"
      fit
      height="100%"
      helper="baseSupplyParking"
      max-height="100%"
      title="نحوه تامین پارکینگ"
    />

    <safa-datatable
      v-model="value.Base_Parking"
      cdcName="Base_Parking"
      :m="m"
      fit
      height="100%"
      helper="baseParkingCity"
      max-height="100%"
      title="پارکینگ ها"
    />
  </fit>
</template>

<script>
export default {
  name: "PartialBaseParkingTab",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      horizontalSplitter: 50,
      firstVerticalSplitter: 50,
      secondVerticalSplitter: 50
    }
  }
}
</script>
