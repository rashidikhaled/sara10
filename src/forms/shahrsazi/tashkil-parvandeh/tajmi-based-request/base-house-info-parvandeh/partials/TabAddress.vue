<template>
  <fit>
    <internal-section>
      <div class="fit">
        <div class="row  q-col-gutter-x-md q-col-gutter-y-sm">

          <safa-text
            class="col-lg col-md-3 col-sm-6 col-xs-6"
            label="پلاک آبی"
            type="number"
            :m="m"
            v-model="value.Base_CommonEstate.Plack"
            cdcName="Plack"
            label-width="100px"
          />
          <safa-text
            class="col-lg col-md-3 col-sm-6 col-xs-6"
            label="تلفن"
            type="number"
            :m="m"
            v-model="value.Base_CommonEstate.Telephone"
            cdcName="Telephone"
            label-width="100px"
            :rules="[x=> x.length<11 || 'تعداد کاراکترهای وارد شده مجاز نمی باشد.']"
          />
          <safa-custom-text
            class="col-lg col-md-3 col-sm-6 col-xs-6"
            label="مساحت وضع موجود"
            v-model="value.Base_HouseInfo.CurrentArea"
            cdcName="CurrentArea"
            label-width="100px"
            :m="m"
          />
          <safa-custom-text
            class="col-lg col-md-3 col-sm-6 col-xs-6"
            label="مساحت پس از رعایت بر اصلاحی"
            v-model="value.Base_HouseInfo.AreaAfterEdit"
            cdcName="AreaAfterEdit"
            label-width="100px"
            :m="m"
          />
          <safa-custom-text
            class="col-lg col-md-3 col-sm-6 col-xs-6"
            label="مساحت باقیمانده"
            v-model="value.Base_HouseInfo.RemainArea"
            cdcName="RemainArea"
            label-width="100px"
            :m="m"
          />
          <safa-text
            class="col-12"
            label="آدرس"
            :m="m"
            v-model="value.Base_AddressInfo.MainAddress"
            cdcName="MainAddress"
            label-width="100px"
          />
        </div>
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              fit
              helper="baseAddressPostCode"
              :m="m"
              v-model="value.Base_AddressPostCode"
              cdcName="Base_AddressPostCode"
              title="کد پستی"
              height="100%"
              max-height="100%"
              margin="0"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              fit
              helper="baseFile"
              :m="m"
              v-model="value.Base_File"
              cdcName="Base_File"
              title="شماره شناسایی پرونده"
              height="100%"
              max-height="100%"
              margin="0"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              fit
              helper="basePreCodeInfo"
              :m="m"
              v-model="value.Base_PreCodeInfo"
              cdcName="Base_PreCodeInfo"
              title="کد قدیم"
              height="100%"
              max-height="100%"
              margin="0"
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
  }
}
</script>
