<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">

        <safa-text
          v-model="value.Base_CommonEstate.Plack"
          class="col-12 col-sm-6 col-md-3"
          label="پلاک آبی"
          label-width="70px"
          m="r"
          type="number"
        />
        <safa-text
          v-model="value.Base_CommonEstate.BlockNo"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="بلوک"
          label-width="70px"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.EntranceDoorNo"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="شماره درب ورودی"
          label-width="70px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.FloorDone"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="طبقه وقوع"
          label-width="70px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Vahed"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="واحد"
          label-width="70px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Telephone"
          :m="m"
          class="col-12 col-sm-6 col-md-3"
          label="تلفن"
          label-width="70px"
          type="number"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_SideCode"
          :m="m"
          ci-name="CI_SideCode"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="جهت وقوع"
          label-width="70px"
        />
        <safa-combo
          v-model="value.Base_ApartmentInfo.CI_VergeType"
          :m="m"
          ci-name="CI_VergeType"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="حق مرغوبیت"
          label-width="70px"
        />
        <safa-combo
          v-model="value.Base_ApartmentInfo.CI_Criterion"
          :m="m"
          ci-name="CI_SideCode"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="ضابطه محل"
          label-width="70px"
        />
        <safa-combo
          v-model="value.Base_ApartmentInfo.CI_QuotaDuty"
          :m="m"
          ci-name="CI_QuotaDuty"
          class="col-12 col-sm-6 col-md-3"
          domain-name="CI_SaraM1"
          label="سهم خدمات"
          label-width="70px"
        />
        <safa-text
          v-model="value.Base_AddressInfo.MainAddress"
          class="col-12 col-sm-6 col-md-6"
          label="آدرس"
          label-width="70px"
          m="r"
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
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_File"
              :m="m"
              :paginate="false"
              fit
              height="100%"
              helper="baseFile"
              max-height="100%"
              min-height="150px"
              title="شماره پرونده"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_PreCodeInfo"
              :m="m"
              fit
              height="100%"
              helper="basePreCodeInfo"
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
