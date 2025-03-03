<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
          title="مهندسین"
            helper="baseControllerInfo"
            :m="m"
            v-model="value.Base_ControllerInfo"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            :horizontal="$q.screen.lt.lg"
            class="fit"
            margin="0"
            :min-height="$q.screen.lt.lg ? '500px' : '200px' "
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="منبع تامین پارکینگ"
                  helper="baseSupplyParking"
                  :m="m"
                  v-model="value.Base_SupplyParking"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit >
                <safa-datatable
                  title="پارکینگ ها"
                  helper="baseParking"
                  :m="m"
                  v-model="value.Base_Parking"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
    <div class="q-mt-sm">
      <div class="row q-col-gutter-md">
        <safa-text
          class="col-12 col-sm col-md-4"
          label="تعداد واحد پارکینگ مورد نیاز"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
        />
        <safa-text
          class="col-12 col-sm col-md-4"
          label="تعداد واحد پارکینگ تامین شده"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
        />
        <safa-text
          class="col-12 col-sm col-md-4"
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
  name: 'TabBaseParkings',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      verticalSplitter: 50,
      horizontalSplitter: 50
    }
  }
}
</script>
