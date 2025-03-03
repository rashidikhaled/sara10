<template>
  <fit>
    <internal-section>
      <safa-group :m="m" label-width="90px" margin="0">
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseStatus"
          cdcName="CI_HouseStatus"
          :m="m"
          ci-name="CI_HouseStatus"
          domain-name="CI_SaraM1"
          label="وضعیت ملک"
          label-width="90px"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_BoundCode"
          cdcName="CI_BoundCode"
          :m="m"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          label="محدوده"
          label-width="90px"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
          cdcName="CI_GlasshouseType"
          :m="m"
          ci-name="CI_GlasshouseType"
          domain-name="CI_SaraM1"
          label="نوع گلخانه"
          label-width="90px"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_OwnerType"
          cdcName="CI_OwnerType"
          :m="m"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          label="نوع مالکیت"
          label-width="90px"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_IncloseType"
          cdcName="CI_IncloseType"
          :m="m"
          ci-name="CI_IncloseType"
          domain-name="CI_SaraM1"
          label="نوع حصار"
          label-width="90px"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.GlasshouseArea"
          cdcName="GlasshouseArea"
          :m="m"
          label="مساحت گلخانه"
          label-width="90px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseType"
          cdcName="CI_HouseType"
          :m="m"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          label="نوع ملک"
          label-width="90px"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_PoolType"
          cdcName="CI_PoolType"
          :m="m"
          ci-name="CI_PoolType"
          domain-name="CI_SaraM1"
          label="نوع استخر"
          label-width="90px"
        />
        <safa-text
          v-model="value.Base_HouseInfo.DeepShaftCount"
          cdcName="DeepShaftCount"
          label="تعداد چاه"
          type="number"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GeoStatus"
          cdcName="CI_GeoStatus"
          :m="m"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          label="موقعیت زمین"
          label-width="90px"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.PoolArea"
          cdcName="PoolArea"
          :m="m"
          label="مساحت استخر"
          label-width="90px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_ShaftType"
          cdcName="CI_ShaftType"
          :m="m"
          ci-name="CI_ShaftType"
          domain-name="CI_SaraM1"
          label="نوع چاه"
          label-width="90px"
        />

        <safa-combo
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          cdcName="CI_BuildingStep"
          :m="m"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          label="مرحله ساختمانی"
          label-width="90px"
        />
        <safa-text
          v-model="value.Base_HouseInfo.PoolCubature"
          cdcName="PoolCubature"
          label="حجم استخر"
          type="number"
        />
        <safa-text
          v-model="value.Base_HouseInfo.MamarArea"
          cdcName="MamarArea"
          label="حق عبور"
          type="number"
        />

        <safa-combo
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          cdcName="CI_SpecialStatus"
          :m="m"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          label="وضعیت خاص"
          label-width="90px"
        />
      </safa-group>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_OtherEquipment"
              cdcName="Base_OtherEquipment"
              :m="m"
              fit
              height="100%"
              helper="baseOtherEquipment"
              max-height="100%"
              title="سایر امکانات"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_Installation"
              cdcName="Base_Installation"
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
