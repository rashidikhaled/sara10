<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      :min-height="$q.screen.lt.md ? '500px' : '150px'"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="firstVerticalSplitter"
            :horizontal="$q.screen.lt.md"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
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
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_Parking"
                  cdcName="Base_Parking"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseParking"
                  max-height="100%"
                  title="پارکینگ ها"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="secondVerticalSplitter"
            :horizontal="$q.screen.lt.md"
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_ParkingLackInPlan"
                  cdcName="Base_ParkingLackInPlan"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseParkingLackInPlan"
                  max-height="100%"
                  title="سری پارکینگ مطابق پلان جانمایی"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  v-model="value.Base_ParkingLackInParkingGroup"
                  cdcName="Base_ParkingLackInParkingGroup"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseParkingLackInParkingGroup"
                  max-height="100%"
                  title="کسری پارکینگ مطابق نظریه هیئت پارکینگ"
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
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          cdcName="ParkingNeedCount"
          :label-width="$q.screen.lt.md ? '145px' : 'auto' "
          :m="m"
          class="col-12 col-sm-6 col-md"
          label="تعداد واحد پارکینگ مورد نیاز"
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          cdcName="ParkingSupplyCount"
          :label-width="$q.screen.lt.md ? '145px' : 'auto' "
          :m="m"
          class="col-12 col-sm-6 col-md"
          label="تعداد واحد پارکينگ تامين شده "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.ParkingGet"
          cdcName="ParkingGet"
          :label-width="$q.screen.lt.md ? '145px' : 'auto' "
          :m="m"
          class="col-12 col-sm-12 col-md"
          label="کسری وصول شده پارکينگ "
          type="number"
        />
      </div>
    </div>

  </fit>
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
