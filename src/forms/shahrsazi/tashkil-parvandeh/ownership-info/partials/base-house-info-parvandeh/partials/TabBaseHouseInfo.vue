<template>
  <fit>
    <safa-group
      label-width="95px"
      :m="m"
      :size="{
        md: 4,
        lg:4,
        sm: 2,
        xs: 1
}"
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

      <!-- row 2 -->
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
      <safa-custom-text
        type="decimal"
        label="مساحت گلخانه"
        v-model="value.Base_HouseInfo.GlasshouseArea"
        label-width="95px"
        :m="m"
      />
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
      type="decimal"
      label="مساحت استخر"
      v-model="value.Base_HouseInfo.PoolArea"
      label-width="95px"
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
      <safa-combo
        label="وضعیت خاص"
        ci-name="CI_SpecialStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_SpecialStatus"
      />
      <safa-datepicker
        label="تاریخ اثر"
        v-model="value.Base_HouseInfo.ActDate"
      />
      <safa-text
        label="کد کاداستر"
        v-model="value.Base_HouseInfo.CadastreCode"
      />
    </safa-group>
    <safa-splitter
      v-model="verticalSplitterModel"
      vertical
      class="fit"
      margin="0"
    >

      <template v-slot:before>
        <fit >
          <safa-datatable
            :margin="null"
            helper="baseDoor"
            :m="m"
            v-model="value.Base_Door"
            title="مشخصات درها"
            height="100%"
            max-height="100%"
            class="fit"
          />
        </fit>

      </template>
      <template v-slot:after>
        <fit >
          <safa-datatable
            helper="baseWall"
            :m="m"
            v-model="value.Base_Wall"
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
  name: 'TabBaseHouseInfo',

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
