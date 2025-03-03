<template>
  <section class="row">

    <div class="col-12 box">
      <div class="row q-col-gutter-md">
        <!-- row 1 -->
        <safa-text
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          :m="m"
          class="col-12"
          label="آدرس:"
          label-shrink
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          :m="m"
          class="col-12 col-md-6"
          label="پلاک آبی:"
          label-shrink
        />
        <safa-text
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          :m="m"
          class="col-12 col-md-6"
          label="تلفن:"
          label-shrink
        />
      </div>
    </div>

    <div class="col-12 box q-mt-md">
      <div class="row q-col-gutter-md">
        <!-- row 1 -->
        <safa-text
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت وضع موجود:"
          label-shrink
        />
        <safa-text
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت پس از رعایت بر اصلاحی:"
          label-shrink
        />
        <safa-text
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت باقیمانده:"
          label-shrink
        />
      </div>
    </div>
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12 col-sm-6 col-md-4">
          <div class="col-12 section-title">کد پستی:</div>
          <safa-datagrid
            v-model="value.Base_AddressPostCode"
            cdcName="Base_AddressPostCode"
            :m="m"
            class="col-12"
            helper="baseAddressPostCode"
            style="height: 15rem"
          />
        </q-card-section>
        <q-card-section class="col-12 col-sm-6 col-md-4">
          <div class="col-12 section-title">شماره شناسایی پرونده:</div>
          <safa-datagrid
            v-model="value.Base_File"
            cdcName="Base_File"
            :m="m"
            class="col-12"
            helper="baseFile"
            style="height: 15rem"
          />
        </q-card-section>
        <q-card-section class="col-12 col-sm-6 col-md-4">
          <div class="col-12 section-title">کد قدیم:</div>
          <safa-datagrid
            v-model="value.Base_PreCodeInfo"
            cdcName="Base_PreCodeInfo"
            :m="m"
            class="col-12"
            helper="basePreCodeInfo"
            style="height: 15rem"
          />
        </q-card-section>

      </q-card-section>
    </q-card>

  </section>
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
