<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          v-model="value.Base_AddressInfo.MainAddress"
          class="col-12"
          label="آدرس:"
          m="r"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_CommonEstate.Plack"
          class="col-12 col-sm-6 col-md-4"
          label="پلاک آبی:"
          m="r"
        />
        <safa-text
          v-model="value.Base_CommonEstate.BlockNo"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="بلوک:"
        />
        <safa-text
          v-model="value.Base_ApartmentInfo.EntranceDoorNo"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="شماره درب ورودی:"
        />

        <!-- row 3 -->
        <safa-text
          v-model="value.Base_CommonEstate.FloorDone"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="طبقه وقوع:"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Vahed"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="واحد:"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Telephone"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تلفن:"
        />

        <!-- row 4 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_SideCode"
          :m="m"
          ci-name="CI_SideCode"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="جهت وقوع:"
        />
        <safa-combo
          v-model="value.Base_ApartmentInfo.CI_VergeType"
          :m="m"
          ci-name="CI_VergeType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="حق مرغوبیت:"
        />
        <safa-combo
          v-model="value.Base_ApartmentInfo.CI_Criterion"
          :m="m"
          ci-name="CI_SideCode"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="ضابطه محل:"
        />

        <!-- row 5 -->
        <safa-combo
          v-model="value.Base_ApartmentInfo.CI_QuotaDuty"
          :m="m"
          ci-name="CI_QuotaDuty"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="سهم خدمات:"
        />

      </q-card-section>
    </q-card>

    <q-separator class="col-12 q-my-sm" inset/>

    <q-card class="col-12 col-sm-6 col-md-4" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">کد پستی:</div>
        <safa-datagrid
          v-model="value.Base_AddressPostCode"
          :m="m"
          class="col-12"
          helper="baseAddressPostCode"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12 col-sm-6 col-md-4" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">شماره پرونده:</div>
        <safa-datagrid
          v-model="value.Base_File"
          :m="m"
          class="col-12"
          helper="baseFile"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12 col-sm-6 col-md-4" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">کد قدیم:</div>
        <safa-datagrid
          v-model="value.Base_PreCodeInfo"
          :m="m"
          class="col-12"
          helper="basePreCodeInfoParvandeh"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
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
