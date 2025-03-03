<template>
  <fit>
    <safa-group>
      <safa-text
        m="r"
        label="شماره واحد"
        v-model="results.Sh_ApartmentEarlySold.UnitNo"
        label-width="110px"
      />
      <safa-text
        m="r"
        label="شماره طبقه"
        v-model="results.Sh_ApartmentEarlySold.FloorNo"
        label-width="110px"
      />
      <safa-combo
        m="r"
        label="کاربری اصلی"
        ciName="CI_UsingGroup"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_UsingGroup"
        label-width="110px"
      />
      <safa-combo
        m="r"
        label="کاربری فرعی"
        ciName="CI_UsingType"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_UsingType"
        label-width="110px"
      />
      <safa-custom-text
        type="decimal"
        m="r"
        label="مساحت کاربری"
        v-model="results.Sh_ApartmentEarlySold.UsingArea"
        label-width="110px"
      />
      <safa-combo
        label="نوع سقف"
        m="r"
        ciName="CI_RoofType"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_RoofType"
        label-width="110px"
      />
      <safa-combo
        m="r"
        label="نوع ساختمان"
        ciName="CI_BuildingKind"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_BuildingKind"
        label-width="110px"
      />
      <safa-combo
        m="r"
        label="نوع سازه"
        ciName="CI_SazehType"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_SazehType"
        label-width="110px"
      />
    </safa-group>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: {
    results: Object
  }
}
</script>
