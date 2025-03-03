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
          v-model="value.Base_HouseInfo_Config.DocArea"
          cdcName="DocArea"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت وضع موجود"
          m="r"
          label-width="130px"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت پس از رعایت بر اصلاحی"
          v-model="value.Base_HouseInfo_Config.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          label-width="170px"
          :m="m"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت باقیمانده"
          v-model="value.Base_HouseInfo_Config.RemainArea"
          cdcName="RemainArea"
          label-width="130px"
          :m="m"
        />
        <safa-text
          label="میزان در مسیر"
          v-model="value.Sh_BaroKaf.PathValue"
          cdcName="PathValue"
          label-width="130px"
        />
      </safa-group>
    </internal-section>
    <text-template
      label="نظرات برو کف"
      formKey="1bf8a012-c7d9-4ed0-8493-4762488da875"
      v-model="value.Sh_BaroKaf.BarKafComments"
      cdcName="BarKafComments"
      :m="m"
      :form-key="formKey"
      label-width="130px"
      class="fit"
      margin="0"
    />

  </fit>
</template>
<script>
export default {
  name: 'TabPlans',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    },
    formKey: String
  },
  data: function () {
    return {}
  }
}
</script>
