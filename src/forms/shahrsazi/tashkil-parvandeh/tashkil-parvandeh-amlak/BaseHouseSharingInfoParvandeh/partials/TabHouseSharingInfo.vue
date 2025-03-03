<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="مجموع كل زير بنا "
          :m="m"
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="الگوی ساخت "
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          label-width="100px"
        />
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت نورگير "
          :m="m"
          v-model="value.Base_BuildingInfo.LightfastArea"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعیت استحکام بنا"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          label-width="100px"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="قدمت ساخت از"
          :m="m"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          label-width="100px"
        />
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت نما "
          :m="m"
          v-model="value.Base_CommonEstate.ViewArea"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="وضعیت استحکام بنا"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          label-width="100px"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="قدمت ساخت تا"
          :m="m"
          v-model="value.Base_BuildingInfo.CreateYearTo"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع نما "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="استقرار بنا"
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_BuildingPosition"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع تا کف معبر بالا"
          :m="m"
          v-model="value.Base_BuildingInfo.UpperHeight"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع سقف "
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_RoofType"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="سطح اشغال "
          :m="m"
          v-model="value.Base_BuildingInfo.BusyArea"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع جان پناه "
          :m="m"
          v-model="value.Base_BuildingInfo.Defilade"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="تراکم مجاز در پروانه ساختمانی"
          :m="m"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          label-width="100px"
        />
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت ايست رمپ "
          :m="m"
          v-model="value.Base_BuildingInfo.RampArea"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="مجموع ارتفاع کل "
          :m="m"
          v-model="value.Base_BuildingInfo.Height"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="عرض دهنه تجاری "
          :m="m"
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع تا کف معبر پایین"
          :m="m"
          v-model="value.Base_BuildingInfo.DownerHeight"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="عمق حريم تجاری "
          :m="m"
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع کرسی "
          :m="m"
          v-model="value.Base_BuildingInfo.HeightKorsi"
          label-width="100px"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ اثر "
          :m="m"
          v-model="value.Base_BuildingInfo.ActDate"
          label-width="100px"
        />
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت سهم العرصه چندساختمانی"
          :m="m"
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
          label-width="100px"
        />
      </div>
    </internal-section>
    <safa-datatable
      title="اشتراکات"
      helper="baseSubscription"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      :m="m"
      v-model="value.Base_SubScription"
    />
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
