<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        margin="0"
        label-width="80px"
      >
        <safa-combo
          label="وضعیت ملک"
          ci-name="CI_HouseStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_HouseStatus"
        />
        <safa-combo
          label="محدوده"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_BoundCode"
        />
        <safa-combo
          label="نوع گلخانه"
          ci-name="CI_GlasshouseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
        />

        <!-- row 2 -->
        <safa-combo
          label="نوع مالکیت"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_OwnerType"
        />
        <safa-combo
          label="نوع حصار"
          ci-name="CI_IncloseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_IncloseType"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت گلخانه"
          label-width="80px"
          :m="m"
          v-model="value.Base_HouseInfo.CI_IncloseType"
        />

        <!-- row 3 -->
        <safa-combo
          label="نوع ملک"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_HouseType"
        />
        <safa-combo
          label="نوع استخر"
          ci-name="CI_PoolType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_PoolType"
        />
        <safa-text
          label="تعداد چاه"
          :m="m"
          v-model="value.Base_HouseInfo.DeepShaftCount"
        />

        <!-- row 4 -->
        <safa-combo
          label="موقعیت زمین"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_GeoStatus"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت استخر"
          label-width="80px"
          :m="m"
          v-model="value.Base_HouseInfo.PoolArea"
        />
        <safa-text
          label="نوع چاه"
          ci-name="CI_ShaftType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_ShaftType"
        />

        <!-- row 5 -->
        <safa-combo
          label="مرحله ساختمانی"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
        />
        <safa-text
          label="حجم استخر"
          :m="m"
          v-model="value.Base_HouseInfo.PoolCubature"
        />
        <safa-text
          label="حق عبور"
          :m="m"
          v-model="value.Base_HouseInfo.MamarArea"
        />

        <!-- row 5 -->
        <safa-text
          label="وضعیت خاص"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
        />
      </safa-group>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-md full-height">
        <div class="col-12 col-md-6">
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
        <div class="col-12 col-md-6">
          <fit>
            <safa-datatable
              title="تاسیسات"
              helper="baseInstallation"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_Installation"
              class="col-12 col-md-6"
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
      type: Object
    }
  }
}
</script>
