<template>
  <fit>
    <safa-group
      label-width="105px"
      :m="m"
    >

      <!-- row 1 -->
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

      <!-- row 2 -->
      <safa-combo
        label="نوع مالکیت"
        ci-name="CI_OwnerType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_OwnerType"
      />
      <safa-combo
        label="نوع حصار"
        ci-name="CI_IncloseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_IncloseType"
      />
      <safa-custom-text
        label="مساحت گلخانه"
        v-model="value.Base_HouseInfo.GlasshouseArea"
        type="decimal"
        label-width="105px"
        :m="m"
      />

      <!-- row 3 -->
      <safa-combo
        label="نوع ملک"
        ci-name="CI_HouseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_HouseType"
      />
      <safa-combo
        label="نوع استخر"
        ci-name="CI_PoolType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_PoolType"
      />
      <safa-text
        label="تعداد چاه"
        v-model="value.Base_HouseInfo.DeepShaftCount"
          type="number"
      />

      <!-- row 4 -->
      <safa-combo
        label="موقعیت زمین"
        ci-name="CI_GeoStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_GeoStatus"
      />
      <safa-custom-text
        label="مساحت استخر"
        v-model="value.Base_HouseInfo.PoolArea"
        type="decimal"
        label-width="105px"
        :m="m"
      />
      <safa-combo
        label="نوع چاه"
        ci-name="CI_ShaftType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_ShaftType"
      />

      <!-- row 5 -->
      <safa-combo
        label="مرحله ساختمانی"
        ci-name="CI_BuildingStep"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingStep"
      />
      <safa-text
        label="حجم استخر"
        v-model="value.Base_HouseInfo.PoolCubature"
          type="number"
      />
      <safa-text
        label="حق عبور"
        v-model="value.Base_HouseInfo.MamarArea"
          type="number"
      />

      <!-- row 5 -->
      <safa-combo
        label="وضعیت خاص"
        ci-name="CI_SpecialStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_SpecialStatus"
      />

    </safa-group>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class=" col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="baseOtherEquipment"
              :m="m"
              v-model="value.Base_OtherEquipment"
              title="سایر امکانات"
              :selectable="false"
              :emptyRowLimit="1"
              fit
              height="100%"
              max-height="100%"
            />
          </fit>
        </div>

        <div
          class=" col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="baseInstallation"
              :m="m"
              v-model="value.Base_Installation"
              title="تاسیسات"
              :selectable="false"
              :emptyRowLimit="1"
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
