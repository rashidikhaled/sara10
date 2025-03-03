<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-lg">
        <safa-text
          class="col-12"
          label="آدرس"
          m="r"
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          label-width="60px"
        />
        <safa-text
          class="col-12 col-md-4"
          label="پلاک آبی"
          m="r"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          label-width="60px"
        />
        <safa-text
          class="col-12 col-md-4"
          label="واحد"
          :m="m"
          v-model="value.Base_CommonEstate.Vahed"
          cdcName="Vahed"
          label-width="60px"
          type="number"
        />
        <safa-text
          class="col-12 col-md-4"
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          label-width="60px"
        />

      </div>
    </internal-section>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <div class="fit q-pb-sm">
          <div class="row q-col-gutter-x-sm full-height">
            <div class="col-6">
              <fit>
                <safa-datatable
                  title="کد پستی"
                  helper="baseAddressPostCode"
                  :m="m"
                  v-model="value.Base_AddressPostCode"
                  cdcName="Base_AddressPostCode"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                />
              </fit>
            </div>
            <div class="col-6">
              <fit>
                <safa-datatable
                  title="کد قدیم"
                  helper="basePreCodeInfo"
                  :m="m"
                  v-model="value.Base_PreCodeInfo"
                  cdcName="Base_PreCodeInfo"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                />
              </fit>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <fit className="q-pt-sm">
          <safa-datatable
            title="مالکین سرقفلی"
            helper=shahrsazi.baseOwner
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabAddressAndOwner',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      horizontalSplitter: 50
    }
  }
}
</script>
