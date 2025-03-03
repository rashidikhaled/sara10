<template>
  <fit>
    <!-- <internal-section> -->
    <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
      <safa-text
        v-model="value.Base_AddressInfo.MainAddress"
        cdcName="MainAddress"
        class="col-12"
        label="آدرس"
        label-width="70px"
        m="r"
      />
      <safa-text
        v-model="value.Base_CommonEstate.Plack"
        cdcName="Plack"
        class="col-12 col-md-4"
        label="پلاک آبی"
        label-width="70px"
        m="r"
      />
      <safa-text
        v-model="value.Base_CommonEstate.Vahed"
        cdcName="Vahed"
        :m="m"
        class="col-12 col-md-4"
        label="واحد"
        label-width="70px"
        type="number"
      />
      <safa-text
        v-model="value.Base_CommonEstate.Telephone"
        cdcName="Telephone"
        :m="m"
        class="col-12 col-md-4"
        label="تلفن"
        label-width="70px"
        type="number"
      />
    </div>
    <!-- </internal-section> -->
    <div class="row full-height q-my-sm">
      <div class="col-12" style="min-height: 150px">
        <fit>
          <safa-datatable
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :m="m"
            fit
            height="100%"
            helper="shahrsazi.baseOwner"
            max-height="100%"
            title="مالکین سرقفلی"
          />
        </fit>
      </div>
    </div>
    <safa-splitter
      v-model="splitterValue"
      class="fit"
      margin="0"
      style="min-height: 180px"
      vertical
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            v-model="value.Base_AddressPostCode"
            cdcName="Base_AddressPostCode"
            :m="m"
            fit
            height="100%"
            helper="baseAddressPostCode"
            max-height="100%"
            title="کد پستی"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_PreCodeInfo"
            cdcName="Base_PreCodeInfo"
            :m="m"
            fit
            height="100%"
            helper="basePreCodeInfo"
            max-height="100%"
            title="کد قدیم"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabAddressAndOwner',
  data () {
    return {
      splitterValue: 50
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
