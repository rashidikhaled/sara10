<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        :size="{
          md: 3,
          lg: 3,
          sm: 2,
          xs: 1,
        }"
        label-width="80px"
        margin="0"
      >
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseStatus"
          cdcName="CI_HouseStatus"
          :m="m=== 'e' ? (isMamoorBazdid===false? 'e' :'r') :'r'"
          ci-name="CI_HouseStatus"
          domain-name="CI_SaraM1"
          label="وضعیت ملک"
          label-width="80px"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_BoundCode"
          cdcName="CI_BoundCode"
          :m="m"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          label="محدوده"
          label-width="80px"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
          cdcName="CI_GlasshouseType"
          :m="m"
          ci-name="CI_GlasshouseType"
          domain-name="CI_SaraM1"
          label="نوع گلخانه"
          label-width="80px"
        />

        <!-- row 2 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_OwnerType"
          cdcName="CI_OwnerType"
          :m="m"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          label="نوع مالکیت"
          label-width="80px"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_IncloseType"
          cdcName="CI_IncloseType"
          :m="m"
          ci-name="CI_IncloseType"
          domain-name="CI_SaraM1"
          label="نوع حصار"
          label-width="80px"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.GlasshouseArea"
          cdcName="GlasshouseArea"
          :m="m"
          label="مساحت گلخانه"
          label-width="80px"
          labelWidth="80px"
          type="decimal"
        />

        <!-- row 3 -->
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseType"
          cdcName="CI_HouseType"
          :m="m"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          label="نوع ملک"
          label-width="80px"
        />
        <!-- <safa-text
          label="جمعیت"
          v-model="value.Base_CommonEstate.Populations"
          cdcName="Populations"
          :m="m"
          label-width="80px"
        /> -->
        <safa-combo
          v-model="value.Base_HouseInfo.CI_PoolType"
          cdcName="CI_PoolType"
          :m="m"
          ci-name="CI_PoolType"
          domain-name="CI_SaraM1"
          label="نوع استخر"
          label-width="80px"
        />
        <safa-text
          v-model="value.Base_HouseInfo.DeepShaftCount"
          cdcName="DeepShaftCount"
          :m="m"
          label="تعداد چاه"
          label-width="80px"
        />

        <!-- row 4 -->
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GeoStatus"
          cdcName="CI_GeoStatus"
          :m="m"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          label="موقعیت زمین"
          label-width="80px"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.PoolArea"
          cdcName="PoolArea"
          :m="m"
          label="مساحت استخر"
          label-width="80px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_ShaftType"
          cdcName="CI_ShaftType"
          :m="m"
          ci-name="CI_ShaftType"
          domain-name="CI_SaraM1"
          label="نوع چاه"
          label-width="80px"
        />

        <!-- row 5 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          cdcName="CI_BuildingStep"
          :m="m"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          label="مرحله ساختمانی"
          label-width="80px"
        />
        <safa-custom-text
          v-model="value.Base_HouseInfo.PoolCubature"
          cdcName="PoolCubature"
          :m="m"
          label="حجم استخر"
          labelWidth="80px"
          type="decimal"
        />
        <safa-text
          v-model="value.Base_HouseInfo.MamarArea"
          cdcName="MamarArea"
          :m="m"
          label="حق عبور"
          label-width="80px"
        />

        <!-- row 5 -->
        <safa-combo
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          cdcName="CI_SpecialStatus"
          :m="m"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          label="وضعیت خاص"
          label-width="80px"
        />
        <safa-datepicker
          v-model="value.Base_HouseInfo.ActDate"
          cdcName="ActDate"
          :m="m"
          label="تاریخ اثر"
          label-width="80px"
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
              v-model="value.Base_Door"
              cdcName="Base_Door"
              :m="m"
              fit
              height="100%"
              helper="baseDoor"
              max-height="100%"
              title="مشخصات درها"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <fit>
            <safa-datatable
              v-model="value.Base_Wall"
              cdcName="Base_Wall"
              :m="m"
              fit
              height="100%"
              helper="baseWall"
              max-height="100%"
              title="مشخصات دیوارها"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseHouseInfo',

  props: {
    m: String,
    saraDomainName: String,
    isMamoorBazdid: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
