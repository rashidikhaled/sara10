<template>
  <fit>
    <FormRow class="q-mb-sm">
      <form-control>
        <safa-text
          label="مجموع كل زير بنا "
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          cdcName="InfrastructureArea"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ارتفاع کرسی "
          v-model="value.Base_BuildingInfo.HeightKorsi"
          cdcName="HeightKorsi"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ اثر "
          v-model="value.Base_BuildingInfo.ActDate"
          cdcName="ActDate"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          label-width="120px"
          :m="m"
          type="decimal"
          label="مساحت نورگير "
          v-model="value.Base_BuildingInfo.LightfastArea"
          cdcName="LightfastArea"
        />
      </form-control>
      <form-control>
        <safa-text
          label="سطح اشغال "
          v-model="value.Base_BuildingInfo.BusyArea"
          cdcName="BusyArea"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ارتفاع تا كف معبر بالا "
          v-model="value.Base_BuildingInfo.UpperHeight"
          cdcName="UpperHeight"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ارتفاع تا كف معبر پایین "
          v-model="value.Base_BuildingInfo.DownerHeight"
          cdcName="DownerHeight"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          label="مساحت نما "
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
          type="decimal"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="استقرار بنا "
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          cdcName="CI_BuildingPosition"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="عمق حريم تجاری "
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          cdcName="CommercialGapDepth"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="نوع نما "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="مرحله ساختمانی"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          cdcName="CI_BuildingStep"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="مجموع ارتفاع کل "
          v-model="value.Base_BuildingInfo.Height"
          cdcName="Height"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="نوع سقف "
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_RoofType"
          cdcName="CI_RoofType"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="عرض دهنه تجاری "
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          cdcName="CommercialGapWidth"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ارتفاع جان پناه "
          v-model="value.Base_BuildingInfo.Defilade"
          cdcName="Defilade"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="الگوی ساخت "
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          cdcName="CI_CreateDesign"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-text
          label="تراکم مجاز در پروانه ساختمانی"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          cdcName="AllowableDensityLicence"
          type="number"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          label="مساحت ايست رمپ "
          v-model="value.Base_BuildingInfo.RampArea"
          cdcName="RampArea"
          type="decimal"
          label-width="120px"
          :m="m"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          label="مساحت سهم العرصه چندساختمانی"
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
          cdcName="MultiBuildingToftImpartArea"
          type="decimal"
          label-width="120px"
          :m="m"
        />
      </form-control>
    </FormRow>

    <safa-splitter v-model="sp1" class="fit" veritcal>
      <template v-slot:before>
        <safa-splitter v-model="sp2" class="fit" horizontal>
          <template v-slot:before>
            <fit>
              <safa-datatable
                helper="baseWall"
                title="مشخصات ديوارها"
                :m="m"
                v-model="value.Base_Wall"
                cdcName="Base_Wall"
                height="100%"
                max-height="100%"
                min-height="150px"
                margin="0"
                class="fit"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-datatable
                helper="baseDoor"
                title="مشخصات درها"
                :m="m"
                v-model="value.Base_Door"
                cdcName="Base_Door"
                height="100%"
                max-height="100%"
                min-height="150px"
                margin="0"
                class="fit"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            helper="baseInstallation"
            title="تاسیسات"
            :m="m"
            height="100%"
            max-height="100%"
            min-height="150px"
            margin="0"
            class="fit"
            v-model="value.Base_Installation"
            cdcName="Base_Installation"
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
      sp1: 70,
      sp2: 50
    }
  }
}
</script>
