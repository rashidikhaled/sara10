<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره بلوک در دفترچه تقسیمات ارزش ها "
          :m="m"
          v-model="value.Base_BlockInfo.GlobalBlockNo"
          cdcName="GlobalBlockNo"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کاربری"
          ci-name="CI_UsingGroup"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BlockInfo.CI_UsingGroup"
          cdcName="CI_UsingGroup"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد ساختمان "
          :m="m"
          v-model="value.Base_BlockInfo.BuildingCount"
          cdcName="BuildingCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل مشهور "
          :m="m"
          v-model="value.Base_BlockInfo.FamousRegion"
          cdcName="FamousRegion"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کد محدوده "
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BlockInfo.CI_BoundCode"
          cdcName="CI_BoundCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد آپارتمان "
          :m="m"
          v-model="value.Base_BlockInfo.ApartmentCount"
          cdcName="ApartmentCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام بازار "
          :m="m"
          v-model="value.Base_BlockInfo.BazarName"
          cdcName="BazarName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد معبر "
          :m="m"
          v-model="value.Base_BlockInfo.PathCount"
          cdcName="PathCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد کسب و پیشه "
          :m="m"
          v-model="value.Base_BlockInfo.NoResidentialApartmentCount"
          cdcName="NoResidentialApartmentCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تراکم "
          :m="m"
          v-model="value.Base_BlockInfo.DensityPlan"
          cdcName="DensityPlan"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد ملک "
          :m="m"
          v-model="value.Base_BlockInfo.HouseCount"
          cdcName="HouseCount"
        />
      </FormControl>
      <FormControl>
        <safa-checkbox
          label="شکل بلوک "
          :m="m"
          v-model="value.Base_BlockInfo.IsShapeBlock"
          cdcName="IsShapeBlock"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اثر"
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
      class="q-mb-lg"
      fit
      minHeight="150px"
    />
    <safa-datatable
      title="ثوابت معابر"
      helper="baseBlockPathConstant"
      :m="m"
      v-model="value.Base_BlockPathConstant"
      cdcName="Base_BlockPathConstant"
      minHeight="150px"
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
