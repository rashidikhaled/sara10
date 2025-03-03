<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section>
        <div class="section-title">آدرس</div>
      </q-card-section>
      <q-separator inset class="q-mb-md"/>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          class="col-12"
          label="آدرس:"
          :m="m"
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
        />

        <!-- row 2 -->
        <safa-text
          class="col-12 col-md-6"
          label="پلاک آبی:"
          :m="m"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
        />
        <safa-text
          class="col-12 col-md-6"
          label="تلفن:"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
        />

      </q-card-section>
    </q-card>
    <q-separator inset class="q-mb-md"/>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت وضع موجود:"
          :m="m"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت پس از رعایت بر اصلاحی:"
          :m="m"
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت باقیمانده:"
          :m="m"
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
        />
      </q-card-section>
    </q-card>

    <q-separator inset class="q-mb-md"/>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12 col-sm-6 col-md-4">
          <div class="col-12 section-title">کد پستی:</div>
          <safa-datagrid
            class="col-12"
            helper="baseAddressPostCode"
            style="height: 20rem"
            :m="m"
            v-model="value.Base_AddressPostCode"
            cdcName="Base_AddressPostCode"
          />
        </q-card-section>
        <q-card-section class="col-12 col-sm-6 col-md-4">
          <div class="col-12 section-title">شماره شناسایی پرونده:</div>
          <safa-datagrid
            class="col-12"
            helper="baseFile"
            style="height: 20rem"
            :m="m"
            v-model="value.Base_File"
            cdcName="Base_File"
          />
        </q-card-section>
        <q-card-section class="col-12 col-sm-6 col-md-4">
          <div class="col-12 section-title">کد قدیم:</div>
          <safa-datagrid
            class="col-12"
            helper="basePreCodeInfo"
            style="height: 20rem"
            :m="m"
            v-model="value.Base_PreCodeInfo"
            cdcName="Base_PreCodeInfo"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

  </section>
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
