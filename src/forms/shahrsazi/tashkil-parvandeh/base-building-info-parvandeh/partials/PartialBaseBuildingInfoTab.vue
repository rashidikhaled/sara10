<template>
  <fit>
    <FormRow class="q-mb-sm">
      <form-control>
        <safa-text
          label="مجموع كل زير بنا "
          :m="m"
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          cdcName="InfrastructureArea"
        />
      </form-control>
      <form-control>
        <safa-text
          label="تراکم مجاز در پروانه ساختمانی"
          :m="m"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          cdcName="AllowableDensityLicence"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          type="decimal"
          label="مساحت ايست رمپ "
          :m="m"
          v-model="value.Base_BuildingInfo.RampArea"
          cdcName="RampArea"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          type="decimal"
          label="مساحت نورگير "
          :m="m"
          v-model="value.Base_BuildingInfo.LightfastArea"
          cdcName="LightfastArea"
        /> </form-control
      ><form-control>
        <safa-text
          label="سطح اشغال "
          :m="m"
          v-model="value.Base_BuildingInfo.BusyArea"
          cdcName="BusyArea"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ارتفاع تا كف معبر بالا"
          :m="m"
          v-model="value.Base_BuildingInfo.UpperHeight"
          cdcName="UpperHeight"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          type="decimal"
          label="مساحت نما "
          :m="m"
          v-model="value.Base_CommonEstate.ViewArea"
          cdcName="ViewArea"
        /> </form-control
      ><form-control>
        <safa-combo
          label="استقرار بنا "
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          cdcName="CI_BuildingPosition"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ارتفاع تا كف معبر پايين"
          :m="m"
          v-model="value.Base_BuildingInfo.DownerHeight"
          cdcName="DownerHeight"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="نوع نما "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          cdcName="CI_ViewCode"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="مرحله ساختمانی"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          cdcName="CI_BuildingStep"
        /> </form-control
      ><form-control>
        <safa-text
          label="مجموع ارتفاع کل"
          :m="m"
          v-model="value.Base_BuildingInfo.Height"
          cdcName="Height"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="نوع سقف "
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_RoofType"
          cdcName="CI_RoofType"
        />
      </form-control>
      <form-control>
        <safa-text
          label="عرض دهنه تجاری "
          :m="m"
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          cdcName="CommercialGapWidth"
        /> </form-control
      ><form-control>
        <safa-text
          label="ارتفاع جان پناه "
          :m="m"
          v-model="value.Base_BuildingInfo.Defilade"
          cdcName="Defilade"
        />
      </form-control>
      <form-control>
        <safa-combo
          label="الگوی ساخت "
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          cdcName="CI_CreateDesign"
        />
      </form-control>
      <form-control>
        <safa-text
          label="عمق حريم تجاری "
          :m="m"
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          cdcName="CommercialGapDepth"
        />
      </form-control>
      <form-control>
        <safa-text
          label="ارتفاع کرسی "
          :m="m"
          v-model="value.Base_BuildingInfo.HeightKorsi"
          cdcName="HeightKorsi"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ اثر "
          :m="m"
          v-model="value.Base_BuildingInfo.ActDate"
          cdcName="ActDate"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          type="decimal"
          label="مساحت سهم العرصه چندساختمانی"
          :m="m"
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
          cdcName="MultiBuildingToftImpartArea"
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
  name: "PartialBaseBuildingInfoTab",

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
