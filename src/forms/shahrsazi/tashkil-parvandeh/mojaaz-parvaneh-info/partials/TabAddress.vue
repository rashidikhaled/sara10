<template>
  <fit>

    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12"
          label="آدرس"
          :m="m"
          v-model="Base_AddressInfo.MainAddress"
          label-width="70px"
        />

        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="پلاک آبی"
          type="number"
          :m="m"
          v-model="Base_CommonEstate.Plack"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="تلفن"
          type="number"
          :m="m"
          v-model="Base_CommonEstate.Telephone"
          label-width="70px"
        />

        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت وضع موجود"
          :m="m"
          v-model="Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          label-width="110px"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت پس از رعایت بر اصلاحی"
          :m="m"
          v-model="Base_HouseInfo.AreaAfterEdit"
          dcName="AreaAfterEdit"
          label-width="160px"
          type="number"
        />
      </div>
    </internal-section>

    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              helper="baseAddressPostCode"
              title="کد پستی"
              :m="m"
              v-model="value.Base_AddressPostCode"
              fit
              height="100%"
              max-height="100%"
              paginate
            />
          </fit>
        </div>
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              helper="baseSubscription"
              :m="m"
              v-model="value.Base_SubScription"
              title="اشتراكات"
              class="col-12 col-md-6"
              fit
              height="100%"
              max-height="100%"
              paginate
            />
          </fit>
        </div>
      </div>

      <!-- <safa-datatable
        class="col-12 col-md-4"
        height="250px"
        helper="baseFile"
        title="شماره شناسایی پرونده"
        :m="m"
        :data-items="value.Base_File"
      />

      <safa-datatable
        class="col-12 col-md-4"
        height="250px"
        helper="basePreCodeInfo"
        title="کد قدیم"
        :m="m"
        v-model="value.Base_PreCodeInfo"
      /> -->
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabAddress',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    Base_AddressInfo () {
      return this.value.Base_AddressInfo || {}
    },
    Base_CommonEstate () {
      return this.value.Base_CommonEstate || {}
    },
    Base_HouseInfo () {
      return this.value.Base_HouseInfo || {}
    }
  }
}
</script>
