<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">

        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="پلاک آبی"
          type="number"
          m="r"
          v-model="value.Base_CommonEstate.Plack"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="بلوک"
          :m="m"
          v-model="value.Base_CommonEstate.BlockNo"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="شماره درب ورودی"
          :m="m"
          v-model="value.Base_ApartmentInfo.EntranceDoorNo"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="طبقه وقوع"
          :m="m"
          v-model="value.Base_CommonEstate.FloorDone"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="واحد"
          :m="m"
          v-model="value.Base_CommonEstate.Vahed"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          label-width="70px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="جهت وقوع"
          ci-name="CI_SideCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_SideCode"
          label-width="70px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="حق مرغوبیت"
          ci-name="CI_VergeType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_ApartmentInfo.CI_VergeType"
          label-width="70px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="ضابطه محل"
          ci-name="CI_SideCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_ApartmentInfo.CI_Criterion"
          label-width="70px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="سهم خدمات"
          ci-name="CI_QuotaDuty"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_ApartmentInfo.CI_QuotaDuty"
          label-width="70px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-6"
          label="آدرس"
          m="r"
          v-model="value.Base_AddressInfo.MainAddress"
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
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              helper="baseFile"
              :m="m"
              v-model="value.Base_File"
              title="شماره پرونده"
              :paginate="false"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
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
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              helper="basePreCodeInfo"
              :m="m"
              v-model="value.Base_PreCodeInfo"
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
