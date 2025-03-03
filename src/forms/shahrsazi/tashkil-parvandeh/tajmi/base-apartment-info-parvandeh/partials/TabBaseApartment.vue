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
          class="col-12 col-sm-6"
          label="پلاک آبی"
          m="r"
          v-model="value.Base_CommonEstate.Plack"
          label-width="85px"
        />
        <safa-text
          class="col-12 col-sm-6"
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          label-width="85px"
        />
      </div>
    </internal-section>
    <internal-section >
      <safa-group
        label-width="90px"
        :m="m"
        margin="0"
      >
        <safa-text
          label="بلوک"
          v-model="value.Base_CommonEstate.BlockNo"
        />
        <safa-text
          label="شماره درب ورودی"
          v-model="value.Base_ApartmentInfo.EntranceDoorNo"
        />
        <safa-text
          label="طبقه وقوع"
          v-model="value.Base_CommonEstate.FloorDone"
        />
        <safa-text
          label="واحد"
          v-model="value.Base_CommonEstate.Vahed"
        />
        <safa-combo
          label="جهت وقوع"
          ci-name="CI_SideCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_SideCode"
        />
        <safa-combo
          label="حق مرغوبیت"
          ci-name="CI_VergeType"
          domain-name="CI_SaraM1"
          v-model="value.Base_ApartmentInfo.CI_VergeType"
        />
        <safa-combo
          label="ضابطه محل"
          ci-name="CI_Criterion"
          domain-name="CI_SaraM1"
          v-model="value.Base_ApartmentInfo.CI_Criterion"
        />
        <safa-combo
          label="سهم خدمات"
          ci-name="CI_QuotaDuty"
          domain-name="CI_SaraM1"
          v-model="value.Base_ApartmentInfo.CI_QuotaDuty"
        />

      </safa-group>
    </internal-section>
    <div class=" fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              helper="baseAddressPostCode"
              :m="m"
              v-model="value.Base_AddressPostCode"
              title="کد پستی"
              :paginate="false"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
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

          <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              helper="basePreCodeInfoParvandeh"
              :m="m"
              v-model="value.Base_PreCodeInfo"
              title="کد قدیم"
              :paginate="false"
              fit
              height="100%"
              max-height="100%"

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
