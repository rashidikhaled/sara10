<template>
  <fit>
    <safa-splitter
      v-model="verticalSplitter"
      :horizontal="$q.screen.lt.lg"
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg? '400px' : '200px' "
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            title="پارکینگ ها"
            helper="baseParking"
            :m="m"
            v-model="value.Base_Parking"
            :bordered="false"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            title="نحوه تامین پارکینگ"
            helper="baseSupplyParking"
            :m="m"
            v-model="value.Base_SupplyParking"
            :bordered="false"
          />
        </fit>
      </template>
    </safa-splitter>
    <div class="q-mt-sm">
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12 col-sm col-md-4"
          type="number"
          label="تعداد واحد پارکینگ مورد نیاز"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
        />
        <safa-text
          class="col-12 col-sm col-md-4"
          type="number"
          label="تعداد واحد پارکينگ تامين شده "
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
        />
        <safa-text
          class="col-12 col-sm col-md-4"
          type="number"
          label="کسری وصول شده پارکينگ "
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingGet"
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
      verticalSplitter: 50
    }
  }
}
</script>
