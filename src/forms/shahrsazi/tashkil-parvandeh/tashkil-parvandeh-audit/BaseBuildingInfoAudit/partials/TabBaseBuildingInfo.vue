<template>
  <fit>
      <safa-group
        :m="m"
      label-width="120px"
      >
        <safa-text
          label="مجموع كل زير بنا"
          :m="m"
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          type="number"
        />
        <safa-text
          label="تراکم مجاز در پروانه ساختمانی"
          :m="m"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          type="number"
        />
        <safa-custom-text
          label="مساحت ايست رمپ"
          :m="m"
          v-model="value.Base_BuildingInfo.RampArea"
          type="decimal"
          label-width="120px"

        />
        <safa-custom-text
          label="مساحت نورگير"
          :m="m"
          v-model="value.Base_BuildingInfo.LightfastArea"
          type="decimal"
          label-width="120px"
        />
        <safa-text
          label="سطح اشغال"
          :m="m"
          v-model="value.Base_BuildingInfo.BusyArea"
          type="number"
        />
        <safa-text
          label="ارتفاع تا كف معبر بالا"
          :m="m"
          v-model="value.Base_BuildingInfo.UpperHeight"
          type="number"
        />
        <safa-custom-text
          label="مساحت نما"
          :m="m"
          v-model="value.Base_CommonEstate.ViewArea"
          type="decimal"
          label-width="120px"
        />
        <safa-combo
          label="استقرار بنا"
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
        />
        <safa-text
          label="ارتفاع تا كف معبر پايين"
          :m="m"
          v-model="value.Base_BuildingInfo.DownerHeight"
          type="number"
        />
        <safa-combo
          label="نوع نما"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_ViewCode"
        />
        <safa-combo
          label="مرحله ساختمانی"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
        />
        <safa-text
          label="مجموع ارتفاع کل"
          :m="m"
          v-model="value.Base_BuildingInfo.Height"
          type="number"
        />
        <safa-combo
          label="نوع سقف"
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_RoofType"
        />
        <safa-text
          label="عرض دهنه تجاری"
          :m="m"
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          type="number"
        />
        <safa-text
          label="ارتفاع جان پناه"
          :m="m"
          v-model="value.Base_BuildingInfo.Defilade"
          type="number"
        />
        <safa-combo
          label="الگوی ساخت"
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
        />
        <safa-text
          label="عمق حريم تجاری"
          :m="m"
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          type="number"
        />
        <safa-text
          label="ارتفاع کرسی"
          :m="m"
          v-model="value.Base_BuildingInfo.HeightKorsi"
          type="number"
        />
        <safa-datepicker
          label="تاریخ اثر"
          :m="m"
          v-model="value.Base_BuildingInfo.ActDate"
        />
      </safa-group>
  <safa-splitter
      v-model="verticalSplitterModel"
      vertical
      class="fit "
      margin="0"
    >
      <template v-slot:before>
        <fit className="q-pt-sm">
            <safa-datatable
              title="مشخصات ديوارها"
              helper="baseWall"
              :m="m"
              v-model="value.Base_Wall"
           fit
            height="100%"
            max-height="100%"
            />
    </fit>
      </template>
      <template v-slot:after>
        <fit className="q-pt-sm">
            <safa-datatable
              title="تاسیسات"
              helper="baseInstallation"
              :m="m"
              v-model="value.Base_Installation"
              fit
            height="100%"
            max-height="100%"
            />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabBaseBuildingInfo',
  data () {
    return {
      verticalSplitterModel: 50
    }
  },

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
