<template>
  <fit>
    <internal-section>
      <div class="row col-12 q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="بهره بردار"
          ci-name="CI_HouseUser"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_HouseUser"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="جمعیت"
          :m="m"
          v-model="value.Base_CommonEstate.Populations"
          label-width="70px"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="تعداد درب تجاری"
          :m="m"
          v-model="value.Base_ApartmentInfo.CommercialDoorCount"
          label-width="90px"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="عرض دهنه تجاری"
          :m="m"
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          label-width="90px"
          type="number"
        />
      </div>
    </internal-section>

    <safa-splitter
      v-model="bigVerticalSplitter"
      vertical
      class="fit"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="تاسیسات"
            fit
            height="100%"
            max-height="100%"
            helper="baseInstallation"
            :m="m"
            v-model="value.Base_Installation"
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
                title="منبع تامین پارکینگ"
                fit
                height="100%"
                max-height="100%"
                helper="baseSupplyParking"
                :m="m"
                v-model="value.Base_SupplyParking"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                title="پارکینگ ها"
                fit
                height="100%"
                max-height="100%"
                helper="baseParking"
                :m="m"
                v-model="value.Base_Parking"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
    <div class="q-mt-sm">
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12 col-sm-6  col-md-4"
          label="تعداد واحد پارکینگ مورد نیاز"
          :m="m"
          v-model="value.Base_ApartmentInfo.ParkingNeedCount"
          label-width="145px"
        />
        <safa-text
          class="col-12 col-sm-6  col-md-4"
          label="تعداد واحد پارکینگ تامین شده"
          :m="m"
          v-model="value.Base_ApartmentInfo.ParkingSupplyCount"
          label-width="145px"
        />
        <safa-text
          class="col-12 col-sm-6  col-md-4"
          label="کسری وصول شده پارکينگ "
          :m="m"
          v-model="value.Base_ApartmentInfo.ParkingGet"
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
