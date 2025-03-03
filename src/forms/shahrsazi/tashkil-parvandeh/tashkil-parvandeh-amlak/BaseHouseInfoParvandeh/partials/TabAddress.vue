<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="پلاک آبی"
          m="r"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          label-width="95px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="تلفن"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          :rules="[ val => val.length <= 10 || ('شماره تلفن وارد شده درست نیست')]"
          label-width="50px"
          m="r"
          type="number"
        />
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت وضع موجود"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          label-width="105px"
          :m="m"
        />
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت پس از رعایت بر اصلاحی"
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          label-width="110px"
          m="r"
        />
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت باقیمانده"
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          label-width="95px"
          :m="m"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-9"
          label="آدرس"
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          label-width="50px"
          :m="m"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="کد پستی"
              helper=baseAddressPostCode
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :margin="false"
              v-model="value.Base_AddressPostCode"
              cdcName="Base_AddressPostCode"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="شماره شناسایی پرونده"
              helper="baseFile"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              :margin="false"
              v-model="value.Base_File"
              cdcName="Base_File"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="کد قدیم"
              helper="basePreCodeInfo"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              :margin="false"
              v-model="value.Base_PreCodeInfo"
              cdcName="Base_PreCodeInfo"
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

  data () {
    return {}
  }
}
</script>
