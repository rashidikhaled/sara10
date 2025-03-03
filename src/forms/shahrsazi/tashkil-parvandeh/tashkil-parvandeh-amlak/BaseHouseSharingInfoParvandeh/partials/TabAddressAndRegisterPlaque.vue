<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm ">

        <safa-text
          class="col-12  col-sm-6 col-md-3"
          label="پلاک آبی"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          label-width="70px"
        />

        <safa-custom-text
          class="col-12  col-sm-6 col-md-3"
          label="مساحت وضع موجود"
          :m="m"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          label-width="70px"
        />
        <safa-custom-text
          class="col-12  col-sm-6 col-md-3"
          label="مساحت پس از رعایت بر اصلاحی"
          :m="m"
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          label-width="70px"
        />
        <safa-custom-text
          class="col-12  col-sm-6 col-md-3"
          label="مساحت باقیمانده"
          :m="m"
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          label-width="70px"
        />
        <safa-text
          class="col-12  col-sm-6 col-md-3"
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-md-9 col-sm-12"
          label="آدرس"
          :m="m"
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          label-width="70px"
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
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              helper="baseAddressPostCode"
              :m="m"
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
              title="پلاک ثبتی"
              helper="baseRegisterPlack"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_RegisterPlack"
              cdcName="Base_RegisterPlack"
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
