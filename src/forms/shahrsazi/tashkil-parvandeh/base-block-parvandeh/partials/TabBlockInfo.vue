<template>
  <fit>
    <FormRow class="q-pa-sm">
      <FormControl>
        <safa-text
          label="شماره بلوک در دفترچه تقسیمات ارزش ها"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.GlobalBlockNo"
          cdcName="GlobalBlockNo"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کاربری"
          label-width="120px"
          ci-name="CI_UsingGroup"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BlockInfo.CI_UsingGroup"
          cdcName="CI_UsingGroup"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد ساختمان"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.BuildingCount"
          cdcName="BuildingCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل مشهور"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.FamousRegion"
          cdcName="FamousRegion"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کد محدوده"
          label-width="120px"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BlockInfo.CI_BoundCode"
          cdcName="CI_BoundCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد آپارتمان"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.ApartmentCount"
          cdcName="ApartmentCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام بازار"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.BazarName"
          cdcName="BazarName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد معبر"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.PathCount"
          cdcName="PathCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد کسب و پیشه"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.NoResidentialApartmentCount"
          cdcName="NoResidentialApartmentCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تراکم"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.DensityPlan"
          cdcName="DensityPlan"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد ملک"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.HouseCount"
          cdcName="HouseCount"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="شکل بلوک"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.IsShapeBlock"
          cdcName="IsShapeBlock"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اثر"
          label-width="120px"
          :m="m"
          v-model="value.Base_BlockInfo.ActDate"
          cdcName="ActDate"
        />
      </FormControl>
    </FormRow>
    <safa-datatable
      title="اطلاعات معابر"
      helper="baseBlockPath"
      :m="m"
      v-model="value.Base_BlockPath"
      cdcName="Base_BlockPath"
      height="100%"
      min-height="200px"
      max-height="100%"
      fit
      class="q-my-sm"
    />
    <safa-datatable
      title="ثوابت معابر"
      helper="baseBlockPathConstant"
      :m="m"
      v-model="value.Base_BlockPathConstant"
      cdcName="Base_BlockPathConstant"
      height="100%"
      min-height="200px"
      max-height="100%"
      fit
    />
  </fit>
</template>

<script>
export default {
  name: "TabBlockInfo",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
