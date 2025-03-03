<template>
  <div class="full-height">
    <!-- row 1 -->
    <safa-group
      label-width="140px"
      :m="m"

    >
          <!-- :size="{lg: 5,
        md: 4,
        sm: 6,
        xs: 1}" -->
      <safa-text
        label="مجموع كل زير بنا"
        v-model="value.Base_BuildingInfo.InfrastructureArea"
      />
      <safa-text
        label="تراکم مجاز در پروانه ساختمانی"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
      />
      <safa-custom-text
        label-width="140px"
        type="decimal"
        label="مساحت ايست رمپ"
        v-model="value.Base_BuildingInfo.RampArea"
        :m="m"
      />

      <!-- row 2 -->
      <safa-custom-text
        label-width="140px"
        type="decimal"
        label="مساحت نورگير"
        v-model="value.Base_BuildingInfo.LightfastArea"
        :m="m"
      />
      <safa-text
        label="سطح اشغال"
        v-model="value.Base_BuildingInfo.BusyArea"
      />
      <safa-text
        label="ارتفاع تا كف معبر بالا"
        v-model="value.Base_BuildingInfo.UpperHeight"
      />

      <!-- row 3 -->
      <safa-custom-text
        label-width="140px"
        type="decimal"
        label="مساحت نما"
        v-model="value.Base_CommonEstate.ViewArea"
        :m="m"
      />
      <safa-combo
        label="استقرار بنا"
        ci-name="CI_BuildingPosition"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_BuildingPosition"
        :label-width="$q.screen.gt.xs ? '140px':'auto'"
      />
      <safa-text
        label="ارتفاع تا كف معبر پايين"
        v-model="value.Base_BuildingInfo.DownerHeight"
      />

      <!-- row 4 -->
      <safa-combo
        label="نوع نما"
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_ViewCode"
        :label-width="$q.screen.gt.xs ? '140px':'auto'"
      />
      <safa-combo
        label="مرحله ساختمانی"
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingStep"
        :label-width="$q.screen.gt.xs ? '140px':'auto'"
      />
      <safa-text
        label="مجموع ارتفاع کل"
        v-model="value.Base_BuildingInfo.Height"
      />

      <!-- row 5 -->
      <safa-combo
        label="نوع سقف"
        ci-name="CI_RoofType"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_RoofType"
        :label-width="$q.screen.gt.xs ? '140px':'auto'"
      />
      <safa-text
        label="عرض دهنه تجاری"
        v-model="value.Base_CommonEstate.CommercialGapWidth"
      />
      <safa-text
        label="ارتفاع جان پناه"
        v-model="value.Base_BuildingInfo.Defilade"
      />

      <!-- row 6 -->
      <safa-combo
        label="الگوی ساخت"
        ci-name="CI_CreateDesign"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_CreateDesign"
        :label-width="$q.screen.gt.xs ? '140px':'auto'"
      />
      <safa-text
        label="عمق حريم تجاری"
        v-model="value.Base_BuildingInfo.CommercialGapDepth"
      />
      <safa-text
        label="ارتفاع کرسی"
        v-model="value.Base_BuildingInfo.HeightKorsi"
      />

      <!-- row 7 -->
      <safa-datepicker
        label="تاریخ اثر"
        v-model="value.Base_BuildingInfo.ActDate"
      />
      <safa-custom-text
        type="decimal"
        label-width="140px"
        label="مساحت سهم العرصه چندساختمانی"
        v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
        :m="m"
      />
    </safa-group>

    <safa-datatable
      helper="baseWall"
      title="مشخصات ديوارها "
      :m="m"
      v-model="value.Base_Wall"
      height="180px"
      max-height="180px"
      class="q-mb-sm"
    />
    <q-separator />
    <safa-splitter
      v-model="splitterModel"
      class="fit"
      horizontal
      style="min-height:150px"
    >
      <template #before>
        <!-- <fit> -->
          <safa-datatable
            helper="baseDoor"
            title="مشخصات درها"
            :m="m"
            v-model="value.Base_Door"
            max-height="100%"
            height="100%"
            fit
          />
        <!-- </fit> -->
      </template>
      <template #after>
        <!-- <fit> -->
          <safa-datatable
            helper="baseInstallation"
            title="تاسیسات"
            :m="m"
            v-model="value.Base_Installation"
            max-height="100%"
            height="100%"
            fit
          />
        <!-- </fit> -->
      </template>
    </safa-splitter>
  </div>
</template>

<script>
export default {
  name: 'PartialBaseBuildingInfoTab',
  data: function () {
    return {
      splitterModel: 50
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
