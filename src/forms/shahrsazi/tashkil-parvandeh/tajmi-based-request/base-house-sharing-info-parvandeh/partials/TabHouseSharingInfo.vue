<template>
  <fit>
    <safa-group
      label-width="130px"
      :m="m"
    >
      <safa-text
        label="مجموع كل زير بنا "
        v-model="value.Base_BuildingInfo.InfrastructureArea"
        type="number"
      />
      <safa-combo
        label="الگوی ساخت "
        ci-name="CI_CreateDesign"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_CreateDesign"
      />
      <safa-text
        label="تراکم مجاز در پروانه ساختمانی"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        type="number"
      />

      <!-- row 2 -->
      <safa-custom-text
        type="decimal"
        label="مساحت نورگير "
        v-model="value.Base_BuildingInfo.LightfastArea"
        label-width="130px"
        :m="m"
      />
      <safa-combo
        label="وضعیت استحکام بنا"
        ci-name="CI_StableStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_StableStatus"
      />
      <safa-text
        label="قدمت ساخت از"
        v-model="value.Base_BuildingInfo.CreateYearFrom"
        type="number"
      />

      <!-- row 3 -->
      <safa-custom-text
        type="decimal"
        label="مساحت نما "
        v-model="value.Base_CommonEstate.ViewArea"
        label-width="130px"
        :m="m"
      />
      <safa-combo
        label="وضعیت استحکام بنا"
        ci-name="CI_HistoricalStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
      />
      <safa-text
        label="قدمت ساخت تا"
        v-model="value.Base_BuildingInfo.CreateYearTo"
        type="number"
        label-width="130px"
      />

      <!-- row 4 -->
      <safa-combo
        label="نوع نما "
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_ViewCode"
      />
      <safa-combo
        label="استقرار بنا"
        ci-name="CI_BuildingPosition"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingPosition"
      />
      <safa-text
        label="ارتفاع تا کف معبر بالا"
        v-model="value.Base_BuildingInfo.UpperHeight"
        type="number"
      />

      <!-- row 5 -->
      <safa-combo
        label="نوع سقف "
        ci-name="CI_RoofType"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_RoofType"
      />
      <safa-text
        label="سطح اشغال "
        v-model="value.Base_BuildingInfo.BusyArea"
        type="number"
      />
      <safa-text
        label="ارتفاع تا کف معبر پایین"
        v-model="value.Base_BuildingInfo.DownerHeight"
        type="number"
      />

      <!-- row 6 -->
      <safa-custom-text
        type="decimal"
        label="مساحت ايست رمپ "
        v-model="value.Base_BuildingInfo.RampArea"
        label-width="130px"
        :m="m"
      />
      <safa-text
        label="مجموع ارتفاع کل "
        v-model="value.Base_BuildingInfo.Height"
        type="number"
      />
      <safa-text
        label="عرض دهنه تجاری "
        v-model="value.Base_CommonEstate.CommercialGapWidth"
        type="number"
      />

      <!-- row 7 -->
      <safa-text
        label="ارتفاع جان پناه "
        v-model="value.Base_BuildingInfo.Defilade"
        type="number"
      />
      <safa-text
        label="عمق حريم تجاری "
        v-model="value.Base_BuildingInfo.CommercialGapDepth"
        type="number"
      />
      <safa-text
        label="ارتفاع کرسی "
        v-model="value.Base_BuildingInfo.HeightKorsi"
        type="number"
      />

      <!-- row 8 -->
      <safa-datepicker
        label="تاریخ اثر "
        v-model="value.Base_BuildingInfo.ActDate"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت سهم العرصه چندساختمانی"
        v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
        label-width="130px"
        :m="m"
      />
    </safa-group>
    <fit>
      <safa-datatable
        helper="baseSubscription"
        :m="m"
        v-model="value.Base_SubScription"
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
  name: 'TabHouseSharingInfo',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
