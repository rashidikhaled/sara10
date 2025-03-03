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
        <safa-text
          label="مجموع كل زير بنا "
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          type="number"
        />
        <safa-combo
          label="استقرار بنا "
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
        />
        <safa-custom-text
          label-width="130px"
          label="مساحت ايست رمپ "
          v-model="value.Base_BuildingInfo.RampArea"
          type="decimal"
          :m="m"
        />

        <!-- row 2 -->
        <safa-custom-text
          label-width="130px"
          label="مساحت نورگير "
          v-model="value.Base_BuildingInfo.LightfastArea"
          type="decimal"
          :m="m"
        />
        <safa-combo
          label="مرحله ساختمانی "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
        />
        <safa-combo
          label="وضعیت تاریخی بنا"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_HistoricalStatus"
        />

        <safa-custom-text
          label-width="130px"
          label="مساحت نما "
          v-model="value.Base_CommonEstate.ViewArea"
          type="decimal"
          :m="m"
        />
        <safa-datepicker
          label="تاریخ شروع عملیات ساختمانی "
          v-model="value.Base_BuildingInfo.StartDate"
        />
        <safa-combo
          label="وضعیت استحکام بنا"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_StableStatus"
        />
        <safa-combo
          label="نوع نما "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_ViewCode"
        />
        <safa-datepicker
          label="تاریخ پایان عملیات ساختمانی "
          v-model="value.Base_BuildingInfo.EndDate"
        />
        <safa-combo
          label="بهره بردار"
          ci-name="CI_HouseUser"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_HouseUser"
        />
        <safa-combo
          label="نوع سقف "
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_RoofType"
        />
        <safa-text
          label="قدمت ساخت از"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
          type="number"
        />
        <safa-text
          label="ارتفاع تا كف معبر بالا "
          v-model="value.Base_BuildingInfo.UpperHeight"
          type="number"
        />
        <safa-text
          label="تراکم مجاز در پروانه ساختمانی"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          type="number"
        />
        <safa-text
          label="قدمت ساخت تا"
          v-model="value.Base_BuildingInfo.CreateYearTo"
          type="number"
        />
        <safa-text
          label="ارتفاع تا كف معبر پايين "
          v-model="value.Base_BuildingInfo.DownerHeight"
          type="number"
        />
        <safa-text
          label="سطح اشغال "
          v-model="value.Base_BuildingInfo.BusyArea"
          type="number"
        />
        <safa-text
          label="عرض دهنه تجاری "
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          type="number"
        />
        <safa-text
          label="مجموع ارتفاع کل "
          v-model="value.Base_BuildingInfo.Height"
          type="number"
        />
        <safa-combo
          label="الگوی ساخت "
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
        />
        <safa-text
          label="عمق حريم تجاری "
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          type="number"
        />
        <safa-text
          label="ارتفاع جان پناه "
          v-model="value.Base_BuildingInfo.Defilade"
          type="number"
        />
        <safa-combo
          label="وضعیت خاص"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
        />

      </safa-group>
    </internal-section>
    <safa-splitter
      v-model="verticalSplitter"
      :horizontal="$q.screen.lt.lg"
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.lg ? '400px' : '200px'"
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
