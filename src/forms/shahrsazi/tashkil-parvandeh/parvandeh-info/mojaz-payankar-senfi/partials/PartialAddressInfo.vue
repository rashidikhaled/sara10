<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-sm">
        <safa-text
          class="col-12"
          label="آدرس"
          type="text"
          v-model="value.Base_AddressInfo.MainAddress"
          m="r"
          label-width="50px"
        />

        <safa-text
          label="پلاک آبی"
          v-model="value.Base_CommonEstate.Plack"
          m="r"
          label-width="50px"
          class="col-6"
        />
        <safa-text
          label="تلفن"
          type="number"
          v-model="value.Base_CommonEstate.Telephone"
          :m="m"
          label-width="50px"
          class="col-6"
        />
        </div>
    </internal-section>

    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="baseAddressPostCode"
              title="کد پستی"
              :m="m"
              fit
              height="100%"
              max-height="100%"
              v-model="value.Base_AddressPostCode"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="baseSubscriptionAndBranches"
              :m="m"
              title="امتیازات"
              fit
              height="100%"
              max-height="100%"
              v-model="value.Base_SubScription"
            />

          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="SharingInfrastructureSenfi"
              title="مساحت زیربنای مشترکات"
              :m="m"
              fit
              height="100%"
              max-height="100%"
              v-model="value.Base_SharingInfrastructure"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'PartialAddressInfo',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
