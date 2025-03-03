<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-md">
        <safa-text
          class="col-12"
          label="آدرس"
          m="r"
          v-model="value.Base_AddressInfo.MainAddress"
          label-width="85px"
        />
        <safa-text
          class="col-12 col-md-4"
          label="پلاک آبی"
          m="r"
          v-model="value.Base_CommonEstate.Plack"
          label-width="85px"
        />
        <safa-text
          class="col-12 col-md-4"
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
        />
        <safa-custom-text
          class="col-12 col-md-4"
          label="مساحت وضع موجود"
          :m="m"
          v-model="value.Base_HouseInfo.CurrentArea"
          label-width="110px"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-md full-height">
        <div class="col-12 col-sm-6 col-md-4">
          <fit>
            <safa-datatable
              title="کد پستی"
              helper="baseAddressPostCode"
              :m="m"
              v-model="value.Base_AddressPostCode"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <fit>
            <safa-datatable
              title="پلاک ثبتی"
              helper="baseRegisterPlack"
              :m="m"
              v-model="value.Base_RegisterPlack"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
        <div class="col-12 col-sm-6 col-md-4">
          <fit>
            <safa-datatable
              title="کد قدیم"
              helper="basePreCodeInfo"
              :m="m"
              v-model="value.Base_PreCodeInfo"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabAddressAndRegisterPlaque',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
