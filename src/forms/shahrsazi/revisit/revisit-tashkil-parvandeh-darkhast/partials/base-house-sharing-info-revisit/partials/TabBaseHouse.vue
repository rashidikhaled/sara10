<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        label-width="90px"
        margin="0"
      >
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseStatus"
          ci-name="CI_HouseStatus"
          domain-name="CI_SaraM1"
          label="وضعیت ملک"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_BoundCode"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          label="محدوده"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
          ci-name="CI_GlasshouseType"
          domain-name="CI_SaraM1"
          label="نوع گلخانه"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_OwnerType"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          label="نوع مالکیت"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_IncloseType"
          ci-name="CI_IncloseType"
          domain-name="CI_SaraM1"
          label="نوع حصار"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.GlasshouseArea"
          :m="m"
          label="مساحت گلخانه"
          label-width="90px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseType"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          label="نوع ملک"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_PoolType"
          ci-name="CI_PoolType"
          domain-name="CI_SaraM1"
          label="نوع استخر"
        />
        <safa-text
          v-model="value.Base_HouseInfo.DeepShaftCount"
          label="تعداد چاه"
          type="number"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GeoStatus"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          label="موقعیت زمین"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.PoolArea"
          :m="m"
          label="مساحت استخر"
          label-width="90px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_ShaftType"
          ci-name="CI_ShaftType"
          domain-name="CI_SaraM1"
          label="نوع چاه"
        />

        <safa-combo
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          label="مرحله ساختمانی"
        />
        <safa-text
          v-model="value.Base_HouseInfo.PoolCubature"
          label="حجم استخر"
          type="number"
        />
        <safa-text
          v-model="value.Base_HouseInfo.MamarArea"
          label="حق عبور"
          type="number"
        />

        <safa-combo
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          label="وضعیت خاص"
        />

      </safa-group>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              v-model="value.Base_OtherEquipment"
              :m="m"
              fit
              height="100%"
              helper="baseOtherEquipment"
              max-height="100%"
              title="سایر امکانات"
            />
          </fit>
        </div>
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              v-model="value.Base_Installation"
              :m="m"
              fit
              height="100%"
              helper="baseInstallation"
              max-height="100%"
              title="تاسیسات "
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
