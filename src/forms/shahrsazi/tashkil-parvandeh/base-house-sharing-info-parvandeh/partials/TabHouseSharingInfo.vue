<template>
  <fit>
    <safa-group label-width="130px" :m="m">
      <safa-text
        label="مجموع كل زير بنا "
        v-model="value.Base_BuildingInfo.InfrastructureArea"
        cdcName="InfrastructureArea"
        type="number"
      />
      <safa-combo
        label="الگوی ساخت "
        ci-name="CI_CreateDesign"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_CreateDesign"
        cdcName="CI_CreateDesign"
        label-width="130px"
        :m="m"
      />
      <safa-text
        label="تراکم مجاز در پروانه ساختمانی"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        cdcName="AllowableDensityLicence"
        type="number"
      />

      <!-- row 2 -->
      <safa-custom-text
        label="مساحت نورگير "
        v-model="value.Base_BuildingInfo.LightfastArea"
        cdcName="LightfastArea"
        type="decimal"
        label-width="130px"
        :m="m"
      />
      <safa-combo
        label="وضعیت استحکام بنا"
        ci-name="CI_StableStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_StableStatus"
        cdcName="CI_StableStatus"
        label-width="130px"
        :m="m"
      />
      <safa-text
        label="قدمت ساخت از"
        v-model="value.Base_BuildingInfo.CreateYearFrom"
        cdcName="CreateYearFrom"
        type="number"
      />

      <!-- row 3 -->
      <safa-custom-text
        label="مساحت نما "
        v-model="value.Base_CommonEstate.ViewArea"
        cdcName="ViewArea"
        type="decimal"
        label-width="130px"
        :m="m"
      />
      <safa-combo
        label="وضعیت استحکام بنا"
        ci-name="CI_HistoricalStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
        cdcName="CI_HistoricalStatus"
        label-width="130px"
        :m="m"
      />
      <safa-text
        label="قدمت ساخت تا"
        v-model="value.Base_BuildingInfo.CreateYearTo"
        cdcName="CreateYearTo"
        type="number"
      />

      <!-- row 4 -->
      <safa-combo
        label="نوع نما "
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_ViewCode"
        cdcName="CI_ViewCode"
        label-width="130px"
        :m="m"
      />
      <safa-combo
        label="استقرار بنا"
        ci-name="CI_BuildingPosition"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingPosition"
        cdcName="CI_BuildingPosition"
        label-width="130px"
        :m="m"
      />
      <safa-text
        label="ارتفاع تا کف معبر بالا"
        v-model="value.Base_BuildingInfo.UpperHeight"
        cdcName="UpperHeight"
        type="number"
      />

      <!-- row 5 -->
      <safa-combo
        label="نوع سقف "
        ci-name="CI_RoofType"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_RoofType"
        cdcName="CI_RoofType"
        label-width="130px"
        :m="m"
      />
      <safa-text
        label="سطح اشغال "
        v-model="value.Base_BuildingInfo.BusyArea"
        cdcName="BusyArea"
        type="number"
      />
      <safa-text
        label="ارتفاع تا کف معبر پایین"
        v-model="value.Base_BuildingInfo.DownerHeight"
        cdcName="DownerHeight"
        type="number"
      />

      <!-- row 6 -->
      <safa-custom-text
        label="مساحت ايست رمپ "
        v-model="value.Base_BuildingInfo.RampArea"
        cdcName="RampArea"
        type="decimal"
        label-width="130px"
        :m="m"
      />
      <safa-text
        label="مجموع ارتفاع کل "
        v-model="value.Base_BuildingInfo.Height"
        cdcName="Height"
        type="number"
      />
      <safa-text
        label="عرض دهنه تجاری "
        v-model="value.Base_CommonEstate.CommercialGapWidth"
        cdcName="CommercialGapWidth"
        type="number"
      />

      <!-- row 7 -->
      <safa-text
        label="ارتفاع جان پناه "
        v-model="value.Base_BuildingInfo.Defilade"
        cdcName="Defilade"
        type="number"
      />
      <safa-text
        label="عمق حريم تجاری "
        v-model="value.Base_BuildingInfo.CommercialGapDepth"
        cdcName="CommercialGapDepth"
        type="number"
      />
      <safa-text
        label="ارتفاع کرسی "
        v-model="value.Base_BuildingInfo.HeightKorsi"
        cdcName="HeightKorsi"
        type="number"
      />

      <!-- row 8 -->
      <safa-datepicker
        label="تاریخ اثر "
        v-model="value.Base_BuildingInfo.ActDate"
        cdcName="ActDate"
      />
      <safa-custom-text
        label="مساحت سهم العرصه چندساختمانی"
        v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
        cdcName="MultiBuildingToftImpartArea"
        type="decimal"
        label-width="130px"
        :m="m"
      />
    </safa-group>
    <fit>
      <safa-datatable
        helper="baseSubscription"
        :m="m"
        v-model="value.Base_SubScription"
        cdcName="Base_SubScription"
        title="اشتراکات"
        :selectable="false"
        :emptyRowLimit="1"
        fit
        height="100%"
        max-height="100%"
      />
    </fit>
  </fit>
</template>

<script>
export default {
  name: "TabHouseSharingInfo",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
