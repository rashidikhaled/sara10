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
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3 "
          label="مساحت وضع موجود"
          :m="m"
          v-model="Base_HouseInfo.CurrentArea"
          :label-width="$q.screen.gt.md ? 'auto' : '70px'"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3 "
          label="مساحت پس از رعایت بر اصلاحی"
          :m="m"
          v-model="Base_HouseInfo.AreaAfterEdit"
          type="number"
          :label-width="$q.screen.gt.md ? 'auto' : '70px'"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-sm-6 q-mb-sm q-mb-md-none" style="min-height:200px">
          <fit>
            <safa-datatable
              helper="baseAddressPostCode"
              title="کد پستی"
              :m="m"
              v-model="value.Base_AddressPostCode"
              fit
              height="100%"
              max-height="100%"
            />
          </fit>
        </div>
        <div class="col-12 col-sm-6 q-mb-sm q-mb-md-none" style="min-height:200px">
          <fit>
            <safa-datatable
              helper="baseSubscription"
              :m="m"
              v-model="value.Base_SubScription"
              title="اشتراكات"
              class="col-12 col-sm-6 col-md-3"
              fit
              height="100%"
              max-height="100%"
            />
          </fit>
        </div>
      </div>
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
