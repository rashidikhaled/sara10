<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">

        <safa-text
          class="col-12 col-md-4 col-sm"
          label="پلاک آبی"
          m="r"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          label-width="50px"
        />
        <safa-text
          class="col-12 col-md-4 col-sm"
          label="واحد"
          :m="m"
          label-width="50px"
          v-model="value.Base_CommonEstate.Vahed"
          cdcName="Vahed"
        />
        <safa-text
          class="col-12 col-md-4 col-sm "
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          label-width="50px"
        />
        <safa-text
          class="col-12"
          label="آدرس"
          m="r"
          v-model="value.Base_AddressInfo.MainAddress"
          cdcName="MainAddress"
          label-width="50px"
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
            <!-- <expantion-section
              default-opened
              v-model="expansionState"
              title="مالکین"
            ></expantion-section> -->
            <safa-datatable
              title="مالکین سرقفلی"
              helper=baseOwner
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_Owner"
              cdcName="Base_Owner"
              :allowCopy="true"
              :CopyWithCount="true"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="کد پستی"
              helper="baseAddressPostCode"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_AddressPostCode"
              cdcName="Base_AddressPostCode"
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
              helper="basePreCodeInfo"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_PreCodeInfo"
              cdcName="Base_PreCodeInfo"
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
