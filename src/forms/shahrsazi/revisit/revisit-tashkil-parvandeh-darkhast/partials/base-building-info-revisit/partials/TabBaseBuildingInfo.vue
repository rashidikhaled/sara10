<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        label-width="130px"
        margin="0"
      >
        <safa-text
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          label="مجموع كل زير بنا "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          label="تراکم مجاز در پروانه ساختمانی"
          type="number"
        />
        <safa-custom-text
          v-model="value.Base_BuildingInfo.RampArea"
          :m="m"
          label="مساحت ايست رمپ "
          label-width="130px"
          type="decimal"
        />

        <!-- row 2 -->
        <safa-custom-text
          v-model="value.Base_BuildingInfo.LightfastArea"
          :m="m"
          label="مساحت نورگير "
          label-width="130px"
          type="decimal"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.BusyArea"
          label="سطح اشغال "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.UpperHeight"
          label="ارتفاع تا كف معبر بالا "
          type="number"
        />
        <safa-custom-text
          v-model="value.Base_CommonEstate.ViewArea"
          label="مساحت نما "
          label-width="130px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          label="استقرار بنا "
        />
        <safa-text
          v-model="value.Base_BuildingInfo.DownerHeight"
          label="ارتفاع تا كف معبر پايين "
          type="number"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_ViewCode"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          label="نوع نما "
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          label="مرحله ساختمانی "
        />
        <safa-text
          v-model="value.Base_BuildingInfo.Height"
          label="مجموع ارتفاع کل "
          type="number"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_RoofType"
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          label="نوع سقف "
        />
        <safa-text
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          label="عرض دهنه تجاری "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.Defilade"
          label="ارتفاع جان پناه "
          type="number"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          label="الگوی ساخت "
        />
        <safa-text
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          label="عمق حريم تجاری "
          type="number"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.HeightKorsi"
          label="ارتفاع کرسی "
          type="number"
        />
        <safa-datepicker
          v-model="value.Base_BuildingInfo.ActDate"
          label="تاریخ اثر "
        />
        <safa-custom-text
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
          :m="m"
          label="مساحت سهم العرصه چندساختمانی"
          label-width="130px"
          type="decimal"
        />
        <safa-combo
          ci-name="CI_VergeType"
          domain-name="CI_SaraM1"
          label="حق مرغوبیت "
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_Criterion"
          ci-name="CI_Criterion"
          domain-name="CI_SaraM1"
          label="ضابطه محل "
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_QuotaDuty"
          ci-name="CI_QuotaDuty"
          domain-name="CI_SaraM1"
          label="سهم خدمات "
        />
      </safa-group>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-md-4 col-sm-12 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <safa-datatable
            v-model="value.Base_Wall"
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
          style="min-height:150px"
        >
          <safa-datatable
            v-model="value.Base_Door"
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
          style="min-height:150px"
        >
          <safa-datatable
            v-model="value.Base_Installation"
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
