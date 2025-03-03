<template>
  <fit>
    <internal-section>
      <div class="fit">
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text class="col-lg col-md-3 col-sm-6 col-xs-6" label="پلاک آبی" type="number" :m="m"
              v-model="Base_CommonEstate.Plack" label-width="110px" />
          </FormControl>
          <FormControl>
            <safa-text class="col-lg col-md-3 col-sm-6 col-xs-6" label="تلفن" type="number" :m="m"
              v-model="Base_CommonEstate.Telephone" label-width="110px"
              :rules="[x => x.length < 11 || 'تعداد کاراکترهای وارد شده مجاز نمی باشد.']" />
          </FormControl>
          <FormControl>
            <safa-text
             class="col-lg col-md-3 col-sm-6 col-xs-6"
             type="deciaml"
             label="مساحت وضع موجود"
             :m="m"
             v-model="Base_HouseInfo.CurrentArea"
             label-width="110px"
            />
          </FormControl>
          <FormControl>
            <safa-text class="col-12 col-sm-6" label="آدرس" :m="m" v-model="Base_AddressInfo.MainAddress"
            label-width="110px" />
          </FormControl>
        </FormRow>
      </div>
    </internal-section>
    <safa-splitter v-model="splitterModel" class="fit" margin="0">
      <template v-slot:before>
        <fit>
          <safa-datatable helper="baseAddressPostCode" title="کد پستی" :m="m" v-model="value.Base_AddressPostCode" fit
            max-height="100%" height="100%" minHeight="100%" />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable helper="basePreCodeInfo" title="کد قدیم" :m="m" v-model="value.Base_PreCodeInfo" fit
            max-height="100%" height="100%" minHeight="100%" />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  name: 'TabAddress',
  data () {
    return {
      splitterModel: 50
    }
  },
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
