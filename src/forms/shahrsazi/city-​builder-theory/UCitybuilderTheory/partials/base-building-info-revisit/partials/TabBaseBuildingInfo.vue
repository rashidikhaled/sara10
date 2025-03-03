<template>
  <fit>
    <internal-section>
      <safa-group :m="m" label-width="130px" margin="0">
        <safa-custom-text
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          cdcName="InfrastructureArea"
          label="مجموع كل زير بنا "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          cdcName="AllowableDensityLicence"
          label="تراکم مجاز در پروانه ساختمانی"
          type="number"
        />
        <safa-custom-text
          v-model="value.Base_BuildingInfo.RampArea"
          cdcName="RampArea"
          :m="m"
          label="مساحت ايست رمپ "
          label-width="130px"
          type="decimal"
        />
        <safa-custom-text
          v-model="value.Base_BuildingInfo.LightfastArea"
          cdcName="LightfastArea"
          :m="m"
          label="مساحت نورگير "
          label-width="130px"
          type="decimal"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.BusyArea"
          cdcName="BusyArea"
          label="سطح اشغال "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.UpperHeight"
          cdcName="UpperHeight"
          label="ارتفاع تا كف معبر بالا "
          type="number"
        />
        <safa-custom-text
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          :m="m"
          label="مساحت نما "
          label-width="130px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          cdcName="CI_BuildingPosition"
          :m="m"
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          label="استقرار بنا "
          label-width="130px"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.DownerHeight"
          cdcName="DownerHeight"
          label="ارتفاع تا كف معبر پايين "
          type="number"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          :m="m"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          label="نوع نما "
          label-width="130px"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          cdcName="CI_BuildingStep"
          :m="m"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          label="مرحله ساختمانی "
          label-width="130px"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.Height"
          cdcName="Height"
          label="مجموع ارتفاع کل "
          type="number"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_RoofType"
          cdcName="CI_RoofType"
          :m="m"
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          label="نوع سقف "
          label-width="130px"
        />
        <safa-text
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          cdcName="CommercialGapWidth"
          label="عرض دهنه تجاری "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.Defilade"
          cdcName="Defilade"
          label="ارتفاع جان پناه "
          type="number"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          cdcName="CI_CreateDesign"
          :m="m"
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          label="الگوی ساخت "
          label-width="130px"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          cdcName="CommercialGapDepth"
          label="عمق حريم تجاری "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.HeightKorsi"
          cdcName="HeightKorsi"
          label="ارتفاع کرسی "
          type="number"
        />
        <safa-datepicker
          v-model="value.Base_BuildingInfo.ActDate"
          cdcName="ActDate"
          label="تاریخ اثر "
        />
        <safa-custom-text
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
          cdcName="MultiBuildingToftImpartArea"
          :m="m"
          label="مساحت سهم العرصه چندساختمانی"
          label-width="130px"
          type="decimal"
        />
        <safa-combo
          :m="m"
          ci-name="CI_VergeType"
          domain-name="CI_SaraM1"
          label="حق مرغوبیت "
          label-width="130px"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_Criterion"
          cdcName="CI_Criterion"
          :m="m"
          ci-name="CI_Criterion"
          domain-name="CI_SaraM1"
          label="ضابطه محل "
          label-width="130px"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_QuotaDuty"
          cdcName="CI_QuotaDuty"
          :m="m"
          ci-name="CI_QuotaDuty"
          domain-name="CI_SaraM1"
          label="سهم خدمات "
          label-width="130px"
        />
      </safa-group>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <safa-datatable
            v-model="value.Base_Wall"
            cdcName="Base_Wall"
            :m="m"
            fit
            height="100%"
            helper="baseWall"
            max-height="100%"
            title="مشخصات ديوارها"
          />
        </div>
        <div
          class="col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <safa-datatable
            v-model="value.Base_Door"
            cdcName="Base_Door"
            :m="m"
            fit
            height="100%"
            helper="baseDoor"
            max-height="100%"
            title="مشخصات درها"
          />
        </div>
        <div
          class="col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height: 150px"
        >
          <safa-datatable
            v-model="value.Base_Installation"
            cdcName="Base_Installation"
            :m="m"
            fit
            height="100%"
            helper="baseInstallation"
            max-height="100%"
            title="تاسیسات"
          />
        </div>
      </div>
    </div>
  </fit>
</template>
<script>
export default {
  name: 'PartialBaseBuildingInfoTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
