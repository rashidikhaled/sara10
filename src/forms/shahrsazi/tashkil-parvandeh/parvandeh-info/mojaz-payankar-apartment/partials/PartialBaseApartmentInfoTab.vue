<template>
  <fit>
    <internal-section>
      <safa-group
        label-width="70px"

        :size="{lg:4,md:4,sm:3 }"
      >
        <safa-text
          class="col-12"
          label="آدرس"
          type="text"
          v-model="value.Base_AddressInfo.MainAddress"
          m="r"
          label-width="70px"
        />

        <safa-text
          label="پلاک آبی"
          v-model="value.Base_CommonEstate.Plack"
          m="r"
          label-width="70px"
        />
        <safa-text
          label="بلوک"
          v-model="value.Base_CommonEstate.BlockNo"
          :m="m"
          label-width="70px"
        />

        <safa-text
          label="شماره درب ورودی"
          v-model="value.Base_ApartmentInfo.EntranceDoorNo"
          :m="m"
          label-width="70px"
        />

        <safa-text
          label="طبقه وقوع"
          type="number"
          v-model="value.Base_CommonEstate.FloorDone"
          :m="m"
          label-width="70px"
        />

        <safa-text
          label="واحد"
          type="number"
          v-model="value.Base_CommonEstate.Vahed"
          :m="m"
          label-width="70px"
        />

        <safa-text
          label="تلفن"
          v-model="value.Base_CommonEstate.Telephone"
          :m="m"
          label-width="70px"
        />

        <safa-combo
          label="جهت وقوع"
          ci-name="CI_SideCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_SideCode"
          :m="m"
          label-width="70px"
        />

        <safa-combo
          label="وضعیت خاص"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          :m="m"
          label-width="70px"
        />
      </safa-group>
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
              title="امتیازات وانشعابات"
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
              helper="SharingInfrastructure"
              title="زیربنای مشترکات"
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
  name: 'PartialBaseApartmentInfoTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      Base_SubScription: []
    }
  },
  computed: {
    Base_AddressInfo () {
      return this.value.Base_AddressInfo || {}
    },
    Base_CommonEstate () {
      return this.value.Base_CommonEstate || {}
    },
    Base_HouseInfo () {
      return this.value.Base_HouseInfo || {}
    }
  }
}
</script>
