<template>
  <fit>
    <internal-section>
      <safa-group
        label-width="90px"
        :m="m"
        margin="0"
        :size="{
          md: 4,
          lg: 4,
          sm: 2,
          xs: 1,
        }"
      >
        <safa-combo
          label="وضعیت ملک"
          ci-name="CI_HouseStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_HouseStatus"
          label-width="90px"
          :m="m"
        />
        <safa-combo
          label="محدوده"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_BoundCode"
          label-width="90px"
          :m="m"
        />
        <safa-combo
          label="نوع گلخانه"
          ci-name="CI_GlasshouseType"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
          label-width="90px"
          :m="m"
        />

        <!-- row 2 -->
        <safa-combo
          label="نوع مالکیت"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_OwnerType"
          label-width="90px"
          :m="m"
        />
        <safa-combo
          label="نوع حصار"
          ci-name="CI_IncloseType"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_IncloseType"
          label-width="90px"
          :m="m"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت گلخانه"
          v-model="value.Base_HouseInfo.GlasshouseArea"
          label-width="90px"
          :m="m"
        />

        <!-- row 3 -->
        <safa-combo
          label="نوع ملک"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_HouseType"
          label-width="90px"
          :m="m"
        />
        <safa-combo
          label="نوع استخر"
          ci-name="CI_PoolType"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_PoolType"
          label-width="90px"
          :m="m"
        />
        <safa-text
          label="تعداد چاه"
          v-model="value.Base_HouseInfo.DeepShaftCount"
          type="number"
          label-width="90px"
          :m="m"
        />

        <!-- row 4 -->
        <safa-combo
          label="موقعیت زمین"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_GeoStatus"
          label-width="90px"
          :m="m"
        />
        <safa-custom-text
          label-width="90px"
          type="decimal"
          label="مساحت استخر"
          v-model="value.Base_HouseInfo.PoolArea"
          :m="m"
        />
        <safa-combo
          label="نوع چاه"
          ci-name="CI_ShaftType"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_ShaftType"
          label-width="90px"
          :m="m"
        />

        <!-- row 5 -->
        <safa-combo
          label="مرحله ساختمانی"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          label-width="90px"
          :m="m"
        />
        <safa-text
          label="حجم استخر"
          v-model="value.Base_HouseInfo.PoolCubature"
          type="number"
          label-width="90px"
          :m="m"
        />
        <safa-text
          label="حق عبور"
          v-model="value.Base_HouseInfo.MamarArea"
          type="number"
          label-width="90px"
          :m="m"
        />

        <!-- row 5 -->
        <safa-combo
          label="وضعیت خاص"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          label-width="90px"
          :m="m"
        />
        <safa-datepicker
          label="تاریخ اثر"
          v-model="value.Base_HouseInfo.ActDate"
          label-width="90px"
          :m="m"
        />
        <safa-text
          label="کد کاداستر"
          v-model="value.Base_HouseInfo.CadastreCode"
          type="number"
          label-width="90px"
          :m="m"
        />
      </safa-group>
    </internal-section>
    <fit>
      <safa-datatable
        helper="otherEquipmentSpecifications"
        title="سایر امکانات"
        :m="m"
        v-model="value.Base_OtherEquipment"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
        paginate
      />
    </fit>
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
      verticalSplitter: 50
    }
  }
}
</script>
