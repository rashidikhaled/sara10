<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-combo
          v-model="value.Base_CommonEstate.CI_HouseUser"
          :m="m"
          ci-name="CI_HouseUser"
          class="col-12 col-md-3 col-sm-6"
          domain-name="CI_SaraM1"
          label="بهره بردار"
          label-width="90px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Populations"
          :m="m"
          class="col-12 col-md-3 col-sm-6"
          label="جمعیت"
          label-width="90px"
          type="number"
        />

        <safa-text
          v-model="value.Base_ApartmentInfo.CommercialDoorCount"
          :m="m"
          class="col-12 col-md-3 col-sm-6"
          label="تعداد درب تجاری"
          label-width="90px"
          type="number"
        />
        <safa-text
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          :m="m"
          class="col-12 col-md-3 col-sm-6"
          label="عرض دهنه تجاری"
          label-width="90px"
          type="number"
        />
      </div>
    </internal-section>
    <safa-splitter
      v-model="horizontalSplitter"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            class="fit"
            margin="0"
            vertical
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_SupplyParking"
                  :m="m"
                  :paginate="false"
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
                  v-model="value.Base_Installation"
                  :m="m"
                  :paginate="false"
                  fit
                  height="100%"
                  helper="baseInstallation"
                  max-height="100%"
                  title="تأسیسات"
                />
              </fit>
            </template>
          </safa-splitter>
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

    <div class="q-mt-sm">
      <div class="row q-col-gutter-md">
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingNeedCount"
          :label-width="$q.screen.lt.md ? '145px' : 'auto' "
          :m="m"
          class="col-12 col-sm-6 col-md"
          label="تعداد واحد پارکینگ مورد نیاز"
          type="number"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingSupplyCount"
          :label-width="$q.screen.lt.md ? '145px' : 'auto' "
          :m="m"
          class="col-12 col-sm-6 col-md"
          label="تعداد واحد پارکينگ تامين شده "
          type="number"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.ParkingGet"
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
      horizontalSplitter: 50,
      verticalSplitter: 50
    }
  }
}
</script>
