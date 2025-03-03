<template>
  <fit>
    <safa-group
      label-width="120px"
      :size="{lg:4,md:4,sm:3 }"
      :m="m"
    >
      <safa-text
        label="مجموع كل زير بنا"
        v-model="value.Base_BuildingInfo.InfrastructureArea"
      />
      <safa-combo
        label="الگوی ساخت"
        ci-name="CI_CreateDesign"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_CreateDesign"
      />
      <safa-text
        label="تراكم مجاز در پروانه ساختمانی"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
      />
      <safa-text
        label="مساحت نورگیر"
        v-model="value.Base_BuildingInfo.LightfastArea"
      />
      <safa-combo
        label="وضعيت استحكام بنا"
        ci-name="CI_StableStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_StableStatus"
      />
      <safa-text
        label="قدمت ساختمان از"
        v-model="value.Base_BuildingInfo.CreateYearFrom"
      />

      <safa-text
        label="قدمت ساختمان تا"
        v-model="value.Base_BuildingInfo.CreateYearTo"
      />
      <safa-text
        label="مساحت نما"
        v-model="value.Base_CommonEstate.ViewArea"
      />
      <safa-combo
        label="وضعيت تاريخي بنا"
        ci-name="CI_HistoricalStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
      />
      <safa-combo
        label="نوع نما"
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_ViewCode"
      />
      <safa-combo
        label="استقرار بنا"
        ci-name="CI_BuildingPosition"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_BuildingPosition"
      />
      <safa-text
        label="ارتفاع تا کف معبر بالا"
        v-model="value.Base_BuildingInfo.UpperHeight"
      />
      <safa-text
        label="ارتفاع تا کف معبر پایین"
        v-model="value.Base_BuildingInfo.DownerHeight"
      />
      <safa-combo
        label="نوع سقف"
        ci-name="CI_RoofType"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_RoofType"
      />
      <safa-text
        label="سطح اشغال"
        type="number"
        v-model="value.Base_BuildingInfo.BusyArea"
      />
    </safa-group>
    <fit>
      <safa-datatable
        helper="baseSupplyParking"
        :m="m"
        height="100%"
        max-height="100%"
        title="نحوه تامین پارکینگ"
        v-model="value.Base_SupplyParking"
        fit
      />
    </fit>
  </fit>
</template>

<script>
export default {
  name: 'PartialDeviceInfoTab',
  data () {
    return {
      splitterValue: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
