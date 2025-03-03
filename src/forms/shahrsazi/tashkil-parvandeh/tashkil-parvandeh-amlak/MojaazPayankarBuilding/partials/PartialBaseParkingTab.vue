<template>
  <fit>
    <safa-splitter
      horizontal
      v-model="splitterModel"
      style="min-height:250px"
    >
      <template #before>
        <fit>
          <safa-datatable
            title="پارکینگ ها"
            helper="baseParking"
            v-model="value.Base_Parking"
            height="100%"
            max-height="100%"
            :bordered="false"
            fit
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-datatable
            title="نحوه تامین پارکینگ"
            helper="baseSupplyParking"
            v-model="value.Base_SupplyParking"
            class="fit q-mb-sm"
            height="100%"
            max-height="100%"
            :bordered="false"
          />
        </fit>
      </template>
    </safa-splitter>

    <div class="row q-col-gutter-md q-my-sm">
      <safa-text
        class="col-12 col-sm-4 col-md-3 q-ml-sm"
        type="number"
        label="تعداد واحد پارکینگ مورد نیاز:"
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingNeedCount"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        type="number"
        label="تعداد واحد پارکينگ تامين شده :"
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingSupplyCount"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        type="number"
        label="کسری وصول شده پارکينگ :"
        :m="m"
        v-model="value.Base_BuildingInfo.ParkingGet"
      />
    </div>
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseParkingTab',
  data: function () {
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
