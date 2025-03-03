<template>
  <fit>
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      vertical
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseParking"
            :m="m"
            v-model="value.Base_Parking"
            title="پارکینگ ها"
            :emptyRowLimit="1"
            :selectable="false"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="baseSupplyParking"
            :m="m"
            v-model="value.Base_SupplyParking"
            title="نحوه تامین پارکینگ"
            :emptyRowLimit="1"
            :selectable="false"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
          />
        </fit>
      </template>
    </safa-splitter>
    <div class="q-mt-sm">
      <div class="row q-col-gutter-sm">
        <safa-text
          class="col-lg  col-md-3 col-sm-4 col-xs-12"
          type="number"
          label="تعداد واحد پارکینگ مورد نیاز"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          label-width="auto"
        />
        <safa-text
          class="col-lg  col-md-3 col-sm-4 col-xs-12"
          type="number"
          label="تعداد واحد پارکينگ تامين شده "
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          label-width="auto"
        />
        <safa-text
          class="col-lg col-md-3 col-sm-4 col-xs-12"
          type="number"
          label="کسری وصول شده پارکينگ "
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingGet"
          label-width="auto"
        />
      </div>
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
  },
  data () {
    return {
      gridSplitter: 50
    }
  }
}
</script>
