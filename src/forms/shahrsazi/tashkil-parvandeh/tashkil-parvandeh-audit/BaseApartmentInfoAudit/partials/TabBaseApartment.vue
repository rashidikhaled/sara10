<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-md">
        <safa-text
          class="col-12"
          label="آدرس"
          m="r"
          v-model="value.Base_AddressInfo.MainAddress"
          label-width="80px"
        />
        <safa-text
          class="col-12 col-sm-6"
          label="پلاک آبی"
          m="r"
          v-model="value.Base_CommonEstate.Plack"
          label-width="80px"
        />
        <safa-text
          class="col-12 col-sm-6"
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          label-width="80px"
        />
      </div>
    </internal-section>
    <internal-section>
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
          type="number"
        />
        <safa-text
          label="واحد"
          v-model="value.Base_CommonEstate.Vahed"
          type="number"
        />
        <safa-combo
          label="جهت وقوع"
          ci-name="CI_SideCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_SideCode"
        />
      </safa-group>
    </internal-section>
    <safa-splitter
      v-model="splitterModel"
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="کد پستی"
            helper="baseAddressPostCode"
            :m="m"
            v-model="value.Base_AddressPostCode"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="کد قدیم"
            helper="basePreCodeInfo"
            v-model="value.Base_PreCodeInfo.PreCode"
            :m="m"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseApartment',
  data () {
    return {
      splitterModel: 50
    }
  },

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
