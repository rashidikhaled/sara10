<template>
  <fit>
    <internal-section>
      <safa-group
        margin="0"
        :m="m"
        label-width="130px"
        :size="{
        md: 4,
        lg:4,
        sm: 2,
        xs: 1
}"
      >
        <safa-text
          label="مجموع كل زير بنا "
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          type="number"
          label-width="130px"
        />
        <safa-combo
          label="استقرار بنا "
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          label-width="130px"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت ايست رمپ "
          v-model="value.Base_BuildingInfo.RampArea"
          :m="m"
          label-width="130px"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت نورگير "
          v-model="value.Base_BuildingInfo.LightfastArea"
          :m="m"
          label-width="130px"
        />
        <safa-combo
          label="مرحله ساختمانی "
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          label-width="130px"
        />
        <safa-combo
          label="وضعیت تاریخی بنا"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
          label-width="130px"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت نما "
          v-model="value.Base_CommonEstate.ViewArea"
          :m="m"
          label-width="130px"
        />
        <safa-datepicker
          label="تاریخ شروع عملیات ساختمانی "
          v-model="value.Base_BuildingInfo.StartDate"
          label-width="130px"
        />
        <safa-combo
          label="وضعیت استحکام بنا"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
          label-width="130px"
        />
        <safa-combo
          label="نوع نما "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          label-width="130px"
        />
        <safa-datepicker
          label="تاریخ پایان عملیات ساختمانی "
          v-model="value.Base_BuildingInfo.EndDate"
          label-width="130px"
        />
        <safa-combo
          label="بهره بردار"
          ci-name="CI_HouseUser"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_HouseUser"
          label-width="130px"
        />
        <safa-combo
          label="نوع سقف "
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_RoofType"
          label-width="130px"
        />
        <safa-text
          label="قدمت ساخت از"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          type="number"
          label-width="130px"
        />
        <safa-text
          label="ارتفاع تا كف معبر بالا "
          v-model="value.Base_BuildingInfo.UpperHeight"
          type="number"
          label-width="130px"
        />
        <safa-text
          label="تراکم مجاز در پروانه ساختمانی"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          type="number"
          label-width="130px"
        />
        <safa-text
          label="قدمت ساخت تا"
          v-model="value.Base_BuildingInfo.CreateYearTo"
          type="number"
          label-width="130px"
        />
        <safa-text
          label="ارتفاع تا كف معبر پايين "
          v-model="value.Base_BuildingInfo.DownerHeight"
          type="number"
          label-width="130px"
        />
        <safa-text
          label="سطح اشغال "
          v-model="value.Base_BuildingInfo.BusyArea"
          type="number"
          label-width="130px"
        />
        <safa-text
          label="عرض دهنه تجاری "
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          type="number"
          label-width="130px"
        />
        <safa-text
          label="مجموع ارتفاع کل "
          v-model="value.Base_BuildingInfo.Height"
          type="number"
          label-width="130px"
        />
        <safa-combo
          label="الگوی ساخت "
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          label-width="130px"
        />
        <safa-text
          label="عمق حريم تجاری "
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          type="number"
          label-width="130px"
        />
        <safa-text
          label="ارتفاع جان پناه "
          v-model="value.Base_BuildingInfo.Defilade"
          type="number"
          label-width="130px"
        />
        <!-- </div> -->
      </safa-group>
    </internal-section>
    <safa-splitter
      v-model="verticalSplitter"
      vertical
      class="fit"
      style=" min-height:300px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseInstallation"
            title="تاسیسات "
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
            :m="m"
            fit
            height="100%"
            max-height="100%"
            v-model="value.Base_OtherEquipment"
            helper="otherEquipmentSpecifications"
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
