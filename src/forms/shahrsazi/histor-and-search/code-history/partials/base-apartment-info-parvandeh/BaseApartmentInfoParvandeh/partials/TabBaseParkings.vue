<template>
  <fit>
    <internal-section>
      <div class="row col-12 q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-combo
          v-model="value.Base_CommonEstate.CI_HouseUser"
          :m="m"
          ci-name="CI_HouseUser"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="بهره بردار"
          label-width="70px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Populations"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="جمعیت"
          label-width="70px"
          type="number"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.CommercialDoorCount"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="تعداد درب تجاری"
          label-width="90px"
          type="number"
        />
        <safa-text
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="عرض دهنه تجاری"
          label-width="90px"
          type="number"
        />
      </div>
    </internal-section>

    <safa-splitter
      v-model="bigVerticalSplitter"
      class="fit"
      vertical
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_Installation"
            :m="m"
            fit
            height="100%"
            helper="baseInstallation"
            max-height="100%"
            title="تاسیسات"
          />
        </fit>
      </template>
      <template v-slot:after>
        <safa-splitter
          v-model="verticalSplitter"
          :horizontal="$q.screen.lt.lg"
          class="fit"
          margin="0"
          min-height="400px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                v-model="value.Base_SupplyParking"
                :m="m"
                fit
                height="100%"
                helper="baseSupplyParking"
                max-height="100%"
                title="منبع تامین پارکینگ"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                v-model="value.Base_Parking"
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
      </template>
    </safa-splitter>
    <div class="q-mt-sm">
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingNeedCount"
          :m="m"
          class="col-12 col-sm-6  col-md-4"
          label="تعداد واحد پارکینگ مورد نیاز"
          label-width="145px"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingSupplyCount"
          :m="m"
          class="col-12 col-sm-6  col-md-4"
          label="تعداد واحد پارکینگ تامین شده"
          label-width="145px"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingGet"
          :m="m"
          class="col-12 col-sm-6  col-md-4"
          label="کسری وصول شده پارکينگ "
          label-width="145px"
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
      bigVerticalSplitter: 33
    }
  }
}
</script>
