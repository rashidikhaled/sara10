<template>
  <section class="row">
    <div class="col-12 q-mb-md">
      <div class="row q-col-gutter-md q-pa-md q-mt-sm bordered">

        <!-- row 1 -->
        <safa-text
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          class="col-12"
          label="آدرس:"
          m="r"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          class="col-12 col-md-4"
          label="پلاک آبی:"
          m="r"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Vahed"
          cdcName="Vahed"
          :m="m"
          class="col-12 col-md-4"
          label="واحد:"
        />
        <safa-text
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          :m="m"
          class="col-12 col-md-4"
          label="تلفن:"
        />

      </div>
    </div>

    <div class="col-12 section-title">مالکین سرقفلی:</div>
    <safa-datagrid
      v-model="value.Base_Owner"
      cdcName="Base_Owner"
      :m="m"
      class="col-12 q-mb-md"
      helper="baseOwnerJob"
      style="height: 15rem"
    />

    <div class="col-12 section-title">کد پستی:</div>
    <safa-datagrid
      v-model="value.Base_AddressPostCode"
      cdcName="Base_AddressPostCode"
      :m="m"
      class="col-12 q-mb-md"
      helper="baseAddressPostCode"
      style="height: 15rem"
    />

    <div class="col-12 section-title q-mt-md">کد قدیم:</div>
    <safa-datagrid
      v-model="value.Base_PreCodeInfo"
      cdcName="Base_PreCodeInfo"
      :m="m"
      class="col-12"
      helper="basePreCodeInfo"
      style="height: 15rem"
    />

  </section>
</template>

<script>
export default {
  name: 'TabAddressAndOwner',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
