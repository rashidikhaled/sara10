<template>
  <fit>
    <safa-group label-width="105px" :m="m">
      <!-- row 1 -->
      <safa-combo
        label="وضعیت ملک"
        ci-name="CI_HouseStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_HouseStatus"
        cdcName="CI_HouseStatus"
        label-width="105px"
        :m="m"
      />
      <safa-combo
        label="محدوده"
        ci-name="CI_BoundCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_BoundCode"
        cdcName="CI_BoundCode"
        label-width="105px"
        :m="m"
      />
      <safa-combo
        label="نوع گلخانه"
        ci-name="CI_GlasshouseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_GlasshouseType"
        cdcName="CI_GlasshouseType"
        label-width="105px"
        :m="m"
      />

      <!-- row 2 -->
      <safa-combo
        label="نوع مالکیت"
        ci-name="CI_OwnerType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_OwnerType"
        cdcName="CI_OwnerType"
        label-width="105px"
        :m="m"
      />
      <safa-combo
        label="نوع حصار"
        ci-name="CI_IncloseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_IncloseType"
        cdcName="CI_IncloseType"
        label-width="105px"
        :m="m"
      />
      <safa-text
        label="مساحت گلخانه"
        v-model="value.Base_HouseInfo.GlasshouseArea"
        cdcName="GlasshouseArea"
        type="number"
      />

      <!-- row 3 -->
      <safa-combo
        label="نوع ملک"
        ci-name="CI_HouseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_HouseType"
        cdcName="CI_HouseType"
        label-width="105px"
        :m="m"
      />
      <safa-combo
        label="نوع استخر"
        ci-name="CI_PoolType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_PoolType"
        cdcName="CI_PoolType"
        label-width="105px"
        :m="m"
      />
      <safa-text
        label="تعداد چاه"
        v-model="value.Base_HouseInfo.DeepShaftCount"
        cdcName="DeepShaftCount"
        type="number"
      />

      <!-- row 4 -->
      <safa-combo
        label="موقعیت زمین"
        ci-name="CI_GeoStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_GeoStatus"
        cdcName="CI_GeoStatus"
        label-width="105px"
        :m="m"
      />
      <safa-text
        label="مساحت استخر"
        v-model="value.Base_HouseInfo.PoolArea"
        cdcName="PoolArea"
        type="number"
      />
      <safa-combo
        label="نوع چاه"
        ci-name="CI_ShaftType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_ShaftType"
        cdcName="CI_ShaftType"
        label-width="105px"
        :m="m"
      />

      <!-- row 5 -->
      <safa-combo
        label="مرحله ساختمانی"
        ci-name="CI_BuildingStep"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingStep"
        cdcName="CI_BuildingStep"
        label-width="105px"
        :m="m"
      />
      <safa-text
        label="حجم استخر"
        v-model="value.Base_HouseInfo.PoolCubature"
        cdcName="PoolCubature"
        type="number"
      />
      <safa-text
        label="حق عبور"
        v-model="value.Base_HouseInfo.MamarArea"
        cdcName="MamarArea"
        type="number"
      />

      <!-- row 5 -->
      <safa-combo
        label="وضعیت خاص"
        ci-name="CI_SpecialStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_SpecialStatus"
        cdcName="CI_SpecialStatus"
        label-width="105px"
        :m="m"
      />
    </safa-group>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-datatable
              helper="baseOtherEquipment"
              :m="m"
              v-model="value.Base_OtherEquipment"
              cdcName="Base_OtherEquipment"
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
          class="col-md-6 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-datatable
              helper="baseInstallation"
              :m="m"
              v-model="value.Base_Installation"
              cdcName="Base_Installation"
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
  name: "TabBaseHouse",

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
