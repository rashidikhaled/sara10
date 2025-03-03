<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          :m="m"
          class="col-12 col-sm-12 col-md-12"
          label="آدرس"
          labelWidth="90px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          :m="m"
          class="col-12 col-sm-6 col-md-4 col-lg"
          label="پلاک آبی"
          labelWidth="90px"
          type="number"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          :labelWidth="$q.screen.lt.lg ? '90px' : 'auto'"
          :m="m"
          class="col-12 col-sm-6 col-md-4 col-lg"
          label="تلفن"
          type="number"
        />

        <safa-custom-text
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          :labelWidth="$q.screen.lt.lg ? '90px' : 'auto'"
          :m="m"
          class="col-12 col-sm-6 col-md-4 col-lg"
          label="مساحت وضع موجود"
          type="decimal"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          :labelWidth="$q.screen.lt.lg ? '90px' : 'auto'"
          :m="m"
          class="col-12 col-sm-6 col-md-4 col-lg"
          label="مساحت پس از رعایت بر اصلاحی"
          type="decimal"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          :labelWidth="$q.screen.lt.lg ? '90px' : 'auto'"
          :m="m"
          class="col-12 col-sm-6 col-md-4 col-lg"
          label="مساحت باقیمانده"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
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
        </div>
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              v-model="value.Base_RegisterPlack"
              cdcName="Base_RegisterPlack"
              :m="m"
              fit
              height="100%"
              helper="registerPlack"
              max-height="100%"
              title="پلاک ثبتی"
            />
          </fit>
        </div>
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
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
      type: Object,
      default: () => ({})
    }
  }
}
</script>
