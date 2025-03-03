<template>
  <section>
    <div class="row q-col-gutter-md">
      <!-- row 1 -->
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="مجموع كل زير بنا "
        :m="m"
        v-model="value.Base_BuildingInfo.InfrastructureArea"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="تراکم مجاز در پروانه ساختمانی"
        :m="m"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
      />
      <safa-custom-text
        type="decimal"
        class="col-12 col-sm-4 col-md-3"
        label="مساحت ايست رمپ "
        :m="m"
        v-model="value.Base_BuildingInfo.RampArea"
      />
      <!-- row 2 -->
      <safa-custom-text
        type="decimal"
        class="col-12 col-sm-4 col-md-3"
        label="مساحت نورگير "
        :m="m"
        v-model="value.Base_BuildingInfo.LightfastArea"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="سطح اشغال "
        :m="m"
        v-model="value.Base_BuildingInfo.BusyArea"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="ارتفاع تا كف معبر بالا"
        :m="m"
        v-model="value.Base_BuildingInfo.UpperHeight"
      />
      <!-- row 3 -->
      <safa-custom-text
        type="decimal"
        class="col-12 col-sm-4 col-md-3"
        label="مساحت نما "
        :m="m"
        v-model="value.Base_CommonEstate.ViewArea"
      />
      <safa-combo
        class="col-12 col-sm-4 col-md-3"
        label="استقرار بنا "
        ci-name="CI_BuildingPosition"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_BuildingInfo.CI_BuildingPosition"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="ارتفاع تا كف معبر پايين"
        :m="m"
        v-model="value.Base_BuildingInfo.DownerHeight"
      />
      <!-- row 4 -->
      <safa-combo
        class="col-12 col-sm-4 col-md-3"
        label="نوع نما "
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_CommonEstate.CI_ViewCode"
      />
      <safa-combo
        class="col-12 col-sm-4 col-md-3"
        label="مرحله ساختمانی"
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_CommonEstate.CI_BuildingStep"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="مجموع ارتفاع کل"
        :m="m"
        v-model="value.Base_BuildingInfo.Height"
      />
      <!-- row 5 -->
      <safa-combo
        class="col-12 col-sm-4 col-md-3"
        label="نوع سقف "
        ci-name="CI_RoofType"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_BuildingInfo.CI_RoofType"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="عرض دهنه تجاری "
        :m="m"
        v-model="value.Base_CommonEstate.CommercialGapWidth"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="ارتفاع جان پناه "
        :m="m"
        v-model="value.Base_BuildingInfo.Defilade"
      />
      <!-- row 6 -->
      <safa-combo
        class="col-12 col-sm-4 col-md-3"
        label="الگوی ساخت "
        ci-name="CI_CreateDesign"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_BuildingInfo.CI_CreateDesign"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="عمق حريم تجاری "
        :m="m"
        v-model="value.Base_BuildingInfo.CommercialGapDepth"
      />
      <safa-text
        class="col-12 col-sm-4 col-md-3"
        label="ارتفاع کرسی "
        :m="m"
        v-model="value.Base_BuildingInfo.HeightKorsi"
      />
      <!-- row 7 -->
      <safa-datepicker
        class="col-12 col-sm-4 col-md-3"
        label="تاریخ اثر "
        :m="m"
        v-model="value.Base_BuildingInfo.ActDate"
      />
      <safa-custom-text
        type="decimal"
        class="col-12 col-sm-4 col-md-3"
        label="مساحت سهم العرصه چندساختمانی"
        :m="m"
        v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
      />
    </div>
    <safa-datatable
      helper="baseWall"
      title="مشخصات ديوارها"
      :m="m"
      :data-items="value.Base_Wall"
      class="q-mt-lg"
      :margin="null"
    />
    <safa-datatable
      helper="baseDoor"
      title="مشخصات درها"
      :m="m"
      :data-items="value.Base_Door"
      class="q-my-lg"
      :margin="null"
    />
    <safa-datatable
      helper="baseInstallation"
      title="تاسیسات"
      :m="m"
      :data-items="value.Base_Installation"
    />
  </section>
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
