<template>
  <fit>
    <safa-group
      :size="{
        md: 4,
        lg: 4,
        sm: 2,
        xs: 1,
      }"
    >
      <safa-text
        label="مجموع كل زير بنا "
        v-model="value.Base_BuildingInfo.InfrastructureArea"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-combo
        label="استقرار بنا "
        ci-name="CI_BuildingPosition"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_BuildingPosition"
        :m="m"
        label-width="130px"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت ايست رمپ "
        v-model="value.Base_BuildingInfo.RampArea"
        label-width="130px"
        :m="m"
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
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingStep"
        :m="m"
        label-width="130px"
      />
      <safa-combo
        label="وضعیت تاریخی بنا"
        ci-name="CI_HistoricalStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_HistoricalStatus"
        :m="m"
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
        :m="m"
        label-width="130px"
      />
      <safa-combo
        label="وضعیت استحکام بنا"
        ci-name="CI_StableStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_StableStatus"
        :m="m"
        label-width="130px"
      />
      <safa-combo
        label="نوع نما "
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_ViewCode"
        :m="m"
        label-width="130px"
      />
      <safa-datepicker
        label="تاریخ پایان عملیات ساختمانی "
        v-model="value.Base_BuildingInfo.EndDate"
        :m="m"
        label-width="130px"
      />
      <safa-combo
        label="بهره بردار"
        ci-name="CI_HouseUser"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_HouseUser"
        :m="m"
        label-width="130px"
      />
      <safa-combo
        label="نوع سقف "
        ci-name="CI_RoofType"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_RoofType"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="قدمت ساخت از"
        v-model="value.Base_BuildingInfo.CreateYearFrom"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="ارتفاع تا كف معبر بالا "
        v-model="value.Base_BuildingInfo.UpperHeight"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="تراکم مجاز در پروانه ساختمانی"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="قدمت ساخت تا"
        v-model="value.Base_BuildingInfo.CreateYearTo"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="ارتفاع تا كف معبر پايين "
        v-model="value.Base_BuildingInfo.DownerHeight"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="سطح اشغال "
        v-model="value.Base_BuildingInfo.BusyArea"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="عرض دهنه تجاری "
        v-model="value.Base_CommonEstate.CommercialGapWidth"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="مجموع ارتفاع کل "
        v-model="value.Base_BuildingInfo.Height"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-combo
        label="الگوی ساخت "
        ci-name="CI_CreateDesign"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_CreateDesign"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="عمق حريم تجاری "
        v-model="value.Base_BuildingInfo.CommercialGapDepth"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-text
        label="ارتفاع جان پناه "
        v-model="value.Base_BuildingInfo.Defilade"
        type="number"
        :m="m"
        label-width="130px"
      />
      <safa-combo
        label="وضعیت خاص"
        ci-name="CI_SpecialStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_HouseInfo.CI_SpecialStatus"
        :m="m"
        label-width="130px"
      />
    </safa-group>
    <safa-splitter v-model="verticalSplitter" vertical class="fit" margin="0">
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
            min-height="150px"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="baseOtherEquipment"
            title="سایر امکانات"
            :m="m"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            v-model="value.Base_OtherEquipment"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabBaseBuildingInfo",

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
