<template>
  <fit>
    <div class="row q-col-gutter-sm ">

      <safa-text
        label="جمعیت"
        class="col-12 col-md-3 col-sm-4"
        v-model="value.Base_CommonEstate.Populations"
        label-width="70px"
        :m="m"
      />

      <safa-combo
        label="بهره بردار"
        ci-name="CI_HouseUser"
        domain-name="CI_SaraM1"
        class="col-12 col-md-3 col-sm-4"
        v-model="value.Base_CommonEstate.CI_HouseUser"
        label-width="70px"
        :m="m"
      />

      <safa-text
        label="تعداد درب تجاری"
        type="number"
        class="col-12 col-md-3 col-sm-4"
        v-model="value.Base_ApartmentInfo.CommercialDoorCount"
        label-width="70px"
        :m="m"
      />
      <safa-text
        label="عرض دهنه تجاری"
        type="number"
        class="col-12 col-md-3 col-sm-4"
        v-model="value.Base_CommonEstate.CommercialGapWidth"
        label-width="70px"
        :m="m"
      />
    </div>
    <safa-splitter
      v-model="splitterValue"
      class="fit q-mt-sm "
      horizontal
      margin="0"
      style="min-height:200px"
    >
      <template #before>
        <safa-splitter
          v-model="splitterValue"
          class="fit"
          vertical
          margin="0"
        >
          <template #before>
            <fit>
              <safa-datatable
                helper="baseOtherEquipment"
                :m="m"
                v-model="value.Base_OtherEquipment"
                height="100%"
                max-height="100%"
                title="سایر امکانات"
                fit
              />
            </fit>
          </template>
          <template #after>
            <fit>
              <safa-datatable
                helper="baseShahrsaziArchiveHouse"
                :m="m"
                v-model="value.Base_ShahrsaziArchive"
                height="100%"
                max-height="100%"
                title="سوابق شهرسازی"
                fit
              />
            </fit>
          </template>
        </safa-splitter>
      </template>

      <template #after>
        <safa-splitter
          v-model="splitterValue"
          class="fit"
          vertical
          margin="0"
        >
          <template #before>
            <fit>
              <safa-datatable
                helper="baseInstallation"
                :m="m"
                v-model="value.Base_Installation"
                height="100%"
                max-height="100%"
                title="تاسیسات"
                fit
              />
            </fit>
          </template>
          <template #after>
            <fit>
              <safa-datatable
                helper="CertificateOfContraryPark"
                :m="m"
                v-model="value.Base_SupplyParking"
                height="100%"
                max-height="100%"
                title="منبع پارکینگ"
                fit
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseOtherEquipmentTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      splitterValue: 50
    }
  }
}
</script>
