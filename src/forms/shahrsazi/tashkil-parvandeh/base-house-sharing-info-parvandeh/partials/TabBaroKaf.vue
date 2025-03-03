<template>
  <fit>
    <internal-section>
      <safa-group
        :size="{
        md: 3,
        lg: 3,
        sm: 2,
        xs: 1
}"
        :m="m"
        margin="0"
      >
        <safa-custom-text
          type="decimal"
          label="مساحت طبق سند"
          m="r"
          label-width="130px"
          v-model="value.Base_HouseInfo.DocArea"
          cdcName="DocArea"
        />
        <!-- این مقادیر بعد از جلسه ای که قرار است اقای خوش ایین بگذار کند جایگزین میشود -->
          <!-- "value.Base_BuildingInfo.DocArea" -->
        <safa-custom-text
          type="decimal"
          label="مساحت وضع موجود"
          m="r"
          label-width="130px"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
        />
        <!-- این مقادیر بعد از جلسه ای که قرار است اقای خوش ایین بگذار کند جایگزین میشود -->
          <!-- "value.Base_BuildingInfo.CurrentArea" -->
        <safa-custom-text
          type="decimal"
          label="مساحت پس از رعایت بر اصلاحی"
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          label-width="170px"
          m="r"
        />
        <!-- این مقادیر بعد از جلسه ای که قرار است اقای خوش ایین بگذار کند جایگزین میشود -->
          <!-- "value.Base_BuildingInfo.AreaAfterEdit" -->
        <safa-custom-text
          type="decimal"
          label="مساحت باقیمانده"
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          label-width="130px"
          m="r"
        />
        <!-- این مقادیر بعد از جلسه ای که قرار است اقای خوش ایین بگذار کند جایگزین میشود -->
          <!-- "value.Base_BuildingInfo.RemainArea" -->
        <safa-text
          label="میزان در مسیر"
          v-model="value.Sh_BaroKaf.PathValue"
          cdcName="PathValue"
          m="r"
          label-width="130px"
        />
      </safa-group>
    </internal-section>
    <text-template
      label="نظرات برو کف"
      v-model="value.Sh_BaroKaf.BarKafComments"
      cdcName="BarKafComments"
      m="r"
      label-width="130px"
      class="fit"
      margin="0"
    />
  </fit>
</template>
<script>
export default {
  name: 'TabBaroKaff',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data: function () {
    return {
    }
  }
}
</script>
