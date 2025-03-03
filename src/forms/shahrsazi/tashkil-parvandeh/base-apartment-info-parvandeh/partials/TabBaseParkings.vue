<template>
  <fit>
    <safa-group
      label-width="100px"
      :m="m"
    >
      <safa-combo
        label="بهره بردار"
        ci-name="CI_HouseUser"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_HouseUser"
        cdcName="CI_HouseUser"
      />
      <safa-text
        label="جمعیت"
        v-model="value.Base_CommonEstate.Populations"
        cdcName="Populations"
      />
      <safa-text
        label="تعداد درب تجاری"
        v-model="value.Base_ApartmentInfo.CommercialDoorCount"
        cdcName="CommercialDoorCount"
      />
      <safa-text
        label="عرض دهنه تجاری"
        v-model="value.Base_CommonEstate.CommercialGapWidth"
        cdcName="CommercialGapWidth"
      />
    </safa-group>

    <div class="fit">
      <safa-splitter
        v-model="splitterModel"
        horizontal
        class="fit"
        margin="0"
      >

        <template v-slot:before>
          <safa-splitter
            v-model="verticalSplitterModel"
            vertical
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="منبع تامین پارکینگ"
                  helper="baseSupplyParking"
                  :m="m"
                  v-model="value.Base_SupplyParking"
                  cdcName="Base_SupplyParking"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  helper="baseInstallation"
                  :m="m"
                  v-model="value.Base_Installation"
                  cdcName="Base_Installation"
                  title="تأسیسات"
                  fit
                  height="100%"
                  max-height="100%"
                  :paginate="false"
                />
              </fit>
            </template>
          </safa-splitter>
        </template>
        <template v-slot:after>
          <fit >
            <safa-datatable
              title="پارکینگ ها"
              helper="baseParking"
              :m="m"
              v-model="value.Base_Parking"
              cdcName="Base_Parking"
              fit
              height="100%"
              max-height="100%"
            />
          </fit>
        </template>
      </safa-splitter>
    </div>
    <div class="q-mt-sm">
      <safa-group
        label-width="170px"
        :m="m"
      >

        <!-- row 1 -->
        <safa-text
          label="تعداد واحد پارکینگ مورد نیاز"
          v-model="value.Base_ApartmentInfo.ParkingNeedCount"
          cdcName="ParkingNeedCount"
          label-width="170px"
        />
        <safa-text
          label="تعداد واحد پارکینگ تامین شده"
          v-model="value.Base_ApartmentInfo.ParkingSupplyCount"
          cdcName="ParkingSupplyCount"
          label-width="170px"
        />
        <safa-text
          label="کسری وصول شده پارکينگ "
          v-model="value.Base_ApartmentInfo.ParkingGet"
          cdcName="ParkingGet"
          label-width="170px"
        />
      </safa-group>
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
      splitterModel: 50,
      verticalSplitterModel: 50
    }
  }
}
</script>
