<template>
  <fit>
    <safa-group
      label-width="80px"
      :size="{lg:4,md:4,sm:3 }"
      :m="m"
    >
      <safa-combo
        label="وضعیت ملک"
        ci-name="CI_HouseStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_HouseStatus"
      />
      <safa-combo
        label="محدوده"
        ci-name="CI_BoundCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_BoundCode"
      />
      <safa-combo
        label="نوع گلخانه"
        ci-name="CI_GlasshouseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_GlasshouseType"
      />
      <safa-combo
        label="نوع مالکیت"
        ci-name="CI_OwnerType"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_OwnerType"
      />
      <safa-combo
        label="نوع حصار"
        ci-name="CI_IncloseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_IncloseType"
      />
      <safa-text
        label="مساحت گلخانه"
        v-model="value.Base_HouseInfo.GlasshouseArea"
      />

      <safa-combo
        label="نوع ملک"
        ci-name="CI_HouseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_HouseType"
      />
      <safa-text
        label="جمعیت"
        type="number"
        v-model="value.Base_CommonEstate.Populations"
      />
      <safa-text
        label="تعداد چاه"
        type="number"
        v-model="value.Base_HouseInfo.DeepShaftCount"
      />
      <safa-combo
        label="موقعیت زمین"
        ci-name="CI_GeoStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_GeoStatus"
      />
      <safa-combo
        label="نوع استخر"
        ci-name="CI_PoolType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_PoolType"
      />
      <safa-combo
        label="نوع چاه"
        ci-name="CI_ShaftType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_ShaftType"
      />
      <safa-combo
        label="مرحله ساختمانی"
        ci-name="CI_BuildingStep"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingStep"
      />
      <safa-text
        label="مساحت استخر"
        type="number"
        v-model="value.Base_HouseInfo.PoolArea"
      />

      <safa-text
        label="حق ممر"
        type="number"
        v-model="value.Base_HouseInfo.MamarArea"
      />
      <safa-combo
        label="وضعیت خاص"
        ci-name="CI_SpecialStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_SpecialStatus"
      />
      <safa-text
        label="حجم استخر"
        type="number"
        v-model="value.Base_HouseInfo.PoolCubature"
      />
    </safa-group>
    <safa-splitter
      v-model="splitterValue"
      class="fit"
      vertical
      margin="0"
      style="min-height:300px"
    >
      <template #before>
        <fit>
          <safa-datatable
            helper="baseOtherEquipment"
            :m="m"
            height="100%"
            max-height="100%"
            title="سایر امکانات"
            v-model="value.Base_OtherEquipment"
            fit
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-datatable
            helper="baseInstallation"
            :m="m"
            v-model="value.Base_Installation"
            height="100%"
            max-height="100%"
            title="تاسیسات"
            fit
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'PartialTechnicalInfoTab',
  data () {
    return {
      splitterValue: 50
    }
  },
  // computed: {
  //   Base_ShopInfo () {
  //     return this.value.Base_ShopInfo || {}
  //   }
  // },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
