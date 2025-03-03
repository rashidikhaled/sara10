<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          v-model="value.Base_AddressInfo.MainAddress"
          class="col-12"
          label="آدرس"
          labelWidth="90px"
          m="r"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Plack"
          class="col-12 col-sm-4 col-md-3"
          label="پلاک آبی"
          labelWidth="90px"
          :m="m"
        />
        <safa-text
          v-model="value.Base_CommonEstate.BlockNo"
          m="r"
          class="col-12 col-sm-4 col-md-3"
          label="بلوک"
          labelWidth="90px"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.EntranceDoorNo"
          m="r"
          class="col-12 col-sm-4 col-md-3"
          label="شماره درب ورودی"
          labelWidth="90px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.FloorDone"
          :m="m"
          class="col-12 col-sm-4 col-md-3"
          label="طبقه وقوع"
          labelWidth="90px"
          type="number"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Vahed"
          :m="m"
          class="col-12 col-sm-4 col-md-3"
          label="واحد"
          labelWidth="90px"
          type="number"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Telephone"
          :m="m"
          class="col-12 col-sm-4 col-md-3"
          label="تلفن"
          labelWidth="90px"
          type="number"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_SideCode"
          :m="m"
          ci-name="CI_SideCode"
          class="col-12 col-sm-4 col-md-3"
          domain-name="CI_SaraM1"
          label="جهت وقوع"
          labelWidth="90px"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_AddressPostCode"
              :m="m"
              fit
              height="100%"
              helper="baseAddressPostCode"
              max-height="100%"
              min-height="150px"
              title="کد پستی"
            />
          </fit>
        </div>
        <div
          class="col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_File"
              m="r"
              fit
              height="100%"
              helper="baseّFileNumber"
              max-height="100%"
              min-height="150px"
              title="شماره پرونده"
            />
          </fit>
        </div>
        <div
          class="col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_PreCodeInfo"
              m="r"
              fit
              height="100%"
              helper="preCodeInfo"
              max-height="100%"
              min-height="150px"
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
  name: 'TabBaseApartment',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
