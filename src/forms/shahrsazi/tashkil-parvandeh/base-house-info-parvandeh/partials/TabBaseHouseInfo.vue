<template>
  <fit>
    <safa-group
      label-width="80px"
      :m="m"
      :size="{
        md: 3,
        lg: 3,
        sm: 2,
        xs: 1,
      }"
    >
      <safa-combo
        label="وضعیت ملک"
        ci-name="CI_HouseStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_HouseStatus"
        cdcName="CI_HouseStatus"
        label-width="80px"
        :m="m"
      />
      <safa-combo
        label="محدوده"
        ci-name="CI_BoundCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_BoundCode"
        cdcName="CI_BoundCode"
        label-width="80px"
        :m="m"
      />
      <safa-combo
        label="نوع گلخانه"
        ci-name="CI_GlasshouseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_GlasshouseType"
        cdcName="CI_GlasshouseType"
        label-width="80px"
        :m="m"
      />

      <!-- row 2 -->
      <safa-combo
        label="نوع مالکیت"
        ci-name="CI_OwnerType"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_OwnerType"
        cdcName="CI_OwnerType"
        label-width="80px"
        :m="m"
      />
      <safa-combo
        label="نوع حصار"
        ci-name="CI_IncloseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_IncloseType"
        cdcName="CI_IncloseType"
        label-width="80px"
        :m="m"
      />
      <safa-custom-text
        label="مساحت گلخانه"
        v-model="value.Base_HouseInfo.GlasshouseArea"
        cdcName="GlasshouseArea"
        type="decimal"
        label-width="80px"
        :m="m"
      />
      <safa-combo
        label="نوع ملک"
        ci-name="CI_HouseType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_HouseType"
        cdcName="CI_HouseType"
        label-width="80px"
        :m="m"
      />
      <safa-combo
        label="نوع استخر"
        ci-name="CI_PoolType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_PoolType"
        cdcName="CI_PoolType"
        label-width="80px"
        :m="m"
      />
      <safa-text
        label="تعداد چاه"
        v-model="value.Base_HouseInfo.DeepShaftCount"
        cdcName="DeepShaftCount"
        type="number"
        label-width="80px"
        :m="m"
      />

      <!-- row 4 -->
      <safa-combo
        label="موقعیت زمین"
        ci-name="CI_GeoStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_GeoStatus"
        cdcName="CI_GeoStatus"
        label-width="80px"
        :m="m"
      />
      <safa-custom-text
        label="مساحت استخر"
        v-model="value.Base_HouseInfo.PoolArea"
        cdcName="PoolArea"
        type="decimal"
        label-width="80px"
        :m="m"
      />
      <safa-combo
        label="نوع چاه"
        ci-name="CI_ShaftType"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_ShaftType"
        cdcName="CI_ShaftType"
        label-width="80px"
        :m="m"
      />

      <!-- row 5 -->
      <safa-combo
        label="مرحله ساختمانی"
        ci-name="CI_BuildingStep"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingStep"
        cdcName="CI_BuildingStep"
        label-width="80px"
        :m="m"
      />
      <safa-text
        label="حجم استخر"
        v-model="value.Base_HouseInfo.PoolCubature"
        cdcName="PoolCubature"
        type="number"
        label-width="80px"
        :m="m"
      />
      <safa-text
        label="حق عبور"
        v-model="value.Base_HouseInfo.MamarArea"
        cdcName="MamarArea"
        type="number"
        label-width="80px"
        :m="m"
      />
      <safa-combo
        label="وضعیت خاص"
        ci-name="CI_SpecialStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_SpecialStatus"
        cdcName="CI_SpecialStatus"
        label-width="80px"
        :m="m"
      />
      <safa-datepicker
        label="تاریخ اثر"
        v-model="value.Base_HouseInfo.ActDate"
        cdcName="ActDate"
        label-width="80px"
        :m="m"
      />
      <safa-text
        label="کد کاداستر"
        v-model="value.Base_HouseInfo.CadastreCode"
        cdcName="CadastreCode"
        label-width="80px"
        :m="m"
      />
    </safa-group>
    <safa-splitter
      v-model="verticalSplitterModel"
      cdcName="verticalSplitterModel"
      vertical
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            :margin="null"
            helper="baseDoor"
            :m="m"
            v-model="value.Base_Door"
            cdcName="Base_Door"
            title="مشخصات درها"
            height="100%"
            max-height="100%"
            class="fit"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="baseWall"
            :m="m"
            v-model="value.Base_Wall"
            cdcName="Base_Wall"
            title="مشخصات دیوارها"
            height="100%"
            max-height="100%"
            class="fit"
            :margin="null"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabBaseHouseInfo",

  props: {
    m: String,
    saraDomainName: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      verticalSplitterModel: 50
    }
  }
}
</script>
