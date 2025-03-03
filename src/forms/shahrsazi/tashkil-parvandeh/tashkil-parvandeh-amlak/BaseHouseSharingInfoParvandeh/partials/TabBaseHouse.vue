<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعیت ملک"
          ci-name="CI_HouseStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_HouseStatus"
        label-width="80px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="محدوده"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_BoundCode"
        label-width="80px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع گلخانه"
          ci-name="CI_GlasshouseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
        label-width="80px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع مالکیت"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_OwnerType"
        label-width="80px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع حصار"
          ci-name="CI_IncloseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_IncloseType"
        label-width="80px"
        />
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت گلخانه"
          :m="m"
          v-model="value.Base_HouseInfo.GlasshouseArea"
          label-width="80px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع ملک"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_HouseType"
        label-width="80px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع استخر"
          ci-name="CI_PoolType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_PoolType"
        label-width="80px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="تعداد چاه"
          :m="m"
          v-model="value.Base_HouseInfo.DeepShaftCount"
        label-width="80px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="موقعیت زمین"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_GeoStatus"
        label-width="80px"
        />
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت استخر"
          :m="m"
          v-model="value.Base_HouseInfo.PoolArea"
          label-width="80px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="نوع چاه"
          ci-name="CI_ShaftType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_ShaftType"
        label-width="80px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="مرحله ساختمانی"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          label-width="80px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="حجم استخر"
          :m="m"
          v-model="value.Base_HouseInfo.PoolCubature"
        label-width="80px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="حق عبور"
          :m="m"
          v-model="value.Base_HouseInfo.MamarArea"
        label-width="80px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="وضعیت خاص"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          label-width="80px"
        />

      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="سایر امکانات"
              helper="baseOtherEquipment"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_OtherEquipment"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="تاسیسات"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              helper="baseInstallation"
              :m="m"
              v-model="value.Base_Installation"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseHouse',

  props: {
    m: String,
    saraDomainName: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
