<template>
  <fit>
    <internal-section>
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
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          label-width="50px"
        />
      </div>
    </internal-section>
    <safa-splitter horizontal style="min-height:200px">
      <template v-slot:before>
        <safa-splitter
          v-model="splitterValue"
          class="fit"
          margin="0"
          style="min-height:150px"
        >
          <template v-slot:before>
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
          </template>
          <template v-slot:after>
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
          </template>
        </safa-splitter>
      </template>
      <q-separator/>
      <template v-slot:after>
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
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabAddressAndOwner',
  data () {
    return {
      splitterValue: 70
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
