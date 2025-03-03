<template>
  <fit>
    <internal-section >
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12"
          label="آدرس"
          m="r"
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          label-width="50px"
        />
        <safa-text
          class="col-12 col-md-4"
          label="پلاک آبی"
          m="r"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          label-width="50px"
        />
        <safa-text
          class="col-12 col-md-4"
          label="واحد"
          :m="m"
          v-model="value.Base_CommonEstate.Vahed"
          cdcName="Vahed"
          label-width="50px"
        />
        <safa-text
          class="col-12 col-md-4"
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          label-width="50px"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
          <safa-datatable
            helper="baseOwnerJob"
            title="مالکین سرقفلی"
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            fit
            height="100%"
            max-height="100%"
            :allowCopy="true"
            :copyWithCount="true"
          />
          </fit>
        </div>
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
          <safa-datatable
            helper="baseAddressPostCode"
            title="کد پستی"
            :m="m"
            v-model="value.Base_AddressPostCode"
            cdcName="Base_AddressPostCode"
            fit
            height="100%"
            max-height="100%"
          />
          </fit>
        </div>
        <div class="col-12 col-md-4 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
          <safa-datatable
            helper="basePreCodeInfo"
            title="کد قدیم"
            :m="m"
            v-model="value.Base_PreCodeInfo"
            cdcName="Base_PreCodeInfo"
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
