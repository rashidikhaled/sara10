<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-sm">
        <safa-text
          class="col-12"
          label="آدرس"
          type="text"
          v-model="value.Base_AddressInfo.MainAddress"
          m="r"
          label-width="50px"
        />
        <safa-text
          label="پلاک آبی"
          v-model="value.Base_CommonEstate.Plack"
          m="r"
          label-width="50px"
          class="col-12 col-md-4 col-lg-3 col-sm-3"
        />
        <safa-text
          label="تلفن"
          type="number"
          v-model="value.Base_CommonEstate.Telephone"
          :m="m"
          class="col-12 col-md-4 col-lg-3 col-sm-3"
        />
        <safa-text
          class="col-12 col-md-4 col-lg-3 col-sm-3"
          label="مساحت وضع موجود"
          v-model="value.Base_HouseInfo.CurrentArea"
          :m="m"
        />

        <safa-text
          label="مساحت پس از رعایت بر اصلاحی"
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          class="col-12 col-md-4 col-lg-3 col-sm-3"
          :m="m"
        />
      </div>
    </internal-section>
    <safa-splitter
      v-model="splitterValue"
      fit
      vertical
      style="min-height:200px"
    >
      <template #before>
        <fit>
          <safa-datatable
            helper="baseAddressPostCode"
            title="کد پستی"
            :m="m"
            fit
            height="100%"
            max-height="100%"
            v-model="value.Base_AddressPostCode"
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-datatable
            helper="baseSubscriptionAndBranches"
            :m="m"
            v-model="value.Base_SubScription"
            height="100%"
            max-height="100%"
            title="اشتراکات"
            fit
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'PartialAddressInfo',

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
