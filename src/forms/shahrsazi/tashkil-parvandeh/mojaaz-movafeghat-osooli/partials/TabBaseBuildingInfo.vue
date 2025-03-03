<template>
  <fit>
    <internal-section>
      <safa-group
        label-width="130px"
        :m="m"
        margin="0"
        :size="{
        md: 4,
        lg:4,
        sm: 2,
        xs: 1
}"
      >

        <!-- row 1 -->
        <safa-text
          label="مجموع كل زير بنا "
          v-model="value.Base_BuildingInfo.InfrastructureArea"
        />
        <safa-text
          label="تراکم مجاز در پروانه ساختمانی"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت ايست رمپ "
          v-model="value.Base_BuildingInfo.RampArea"
          label-width="130px"
          :m="m"
        />

        <!-- row 2 -->
        <safa-custom-text
          type="decimal"
          label="مساحت نورگير "
          v-model="value.Base_BuildingInfo.LightfastArea"
          label-width="130px"
          :m="m"
        />
        <safa-text
          label="سطح اشغال "
          v-model="value.Base_BuildingInfo.BusyArea"
        />
        <safa-text
          label="ارتفاع تا كف معبر بالا "
          v-model="value.Base_BuildingInfo.UpperHeight"
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
          label="استقرار بنا "
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
        />
        <safa-text
          label="ارتفاع تا كف معبر پايين "
          v-model="value.Base_BuildingInfo.DownerHeight"
        />

        <!-- row 4 -->
        <safa-combo
          label="نوع نما "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_ViewCode"
        />
        <safa-combo
          label="مرحله ساختمانی "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
        />
        <safa-text
          label="مجموع ارتفاع کل "
          v-model="value.Base_BuildingInfo.Height"
        />

        <!-- row 5 -->
        <safa-combo
          label="نوع سقف "
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_RoofType"
        />
        <safa-text
          label="عرض دهنه تجاری "
          v-model="value.Base_CommonEstate.CommercialGapWidth"
        />
        <safa-text
          label="ارتفاع جان پناه "
          v-model="value.Base_BuildingInfo.Defilade"
        />

        <!-- row 6 -->
        <safa-combo
          label="الگوی ساخت "
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
        />
        <safa-text
          label="عمق حريم تجاری "
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
        />
        <safa-text
          label="ارتفاع کرسی "
          v-model="value.Base_BuildingInfo.HeightKorsi"
        />

        <!-- row 7 -->
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
    </internal-section>
    <safa-splitter
      v-model="verticalSplitter"
      vertical
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
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
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="سایر امکانات"
            helper="baseOtherEquipment"
            :m="m"
            v-model="value.Base_OtherEquipment"
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

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      verticalSplitter: 50
    }
  }
}
</script>
