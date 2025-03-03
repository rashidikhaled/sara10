<template>
  <fit>
    <safa-group
      label-width="105px"
      :m="m"
    >
      <safa-text
        label="مجموع كل زير بنا "
        v-model="value.Base_BuildingInfo.InfrastructureArea"
        type="number"
      />
      <safa-text
        label="ارتفاع کرسی "
        v-model="value.Base_BuildingInfo.HeightKorsi"
        type="number"
      />
      <safa-datepicker
        label="تاریخ اثر "
        v-model="value.Base_BuildingInfo.ActDate"
      />
      <safa-custom-text
        label-width="105px"
        type="decimal"
        label="مساحت نورگير "
        v-model="value.Base_BuildingInfo.LightfastArea"
        :m="m"
      />
      <safa-text
        label="سطح اشغال "
        v-model="value.Base_BuildingInfo.BusyArea"
        type="number"
      />
      <safa-text
        label="ارتفاع تا كف معبر بالا "
        v-model="value.Base_BuildingInfo.UpperHeight"
        type="number"
      />
      <safa-custom-text
        label-width="105px"
        type="decimal"
        label="مساحت نما "
        v-model="value.Base_CommonEstate.ViewArea"
        :m="m"
      />
      <safa-combo
        label="استقرار بنا "
        ci-name="CI_BuildingPosition"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_BuildingPosition"
      />
      <safa-text
        label="عمق حريم تجاری "
        v-model="value.Base_BuildingInfo.CommercialGapDepth"
        type="number"
      />
      <safa-combo
        label="نوع نما "
        ci-name="CI_ViewCode"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_ViewCode"
      />
      <safa-combo
        label="مرحله ساختمانی"
        ci-name="CI_BuildingStep"
        domain-name="CI_SaraM1"
        v-model="value.Base_CommonEstate.CI_BuildingStep"
      />
      <safa-text
        label="مجموع ارتفاع کل "
        v-model="value.Base_BuildingInfo.Height"
        type="number"
      />
      <safa-combo
        label="نوع سقف "
        ci-name="CI_RoofType"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_RoofType"
      />
      <safa-text
        label="عرض دهنه تجاری "
        v-model="value.Base_CommonEstate.CommercialGapWidth"
        type="number"
      />
      <safa-text
        label="ارتفاع جان پناه "
        v-model="value.Base_BuildingInfo.Defilade"
        type="number"
      />
      <safa-combo
        label="الگوی ساخت "
        ci-name="CI_CreateDesign"
        domain-name="CI_SaraM1"
        v-model="value.Base_BuildingInfo.CI_CreateDesign"
      />
      <safa-text
        label="تراکم مجاز در پروانه ساختمانی"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        type="number"
      />
      <safa-custom-text
        label-width="105px"
        type="decimal"
        label="مساحت ايست رمپ "
        v-model="value.Base_BuildingInfo.RampArea"
        :m="m"
      />
      <safa-custom-text
        label-width="105px"
        type="decimal"
        label="مساحت سهم العرصه چندساختمانی"
        v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
        :m="m"
      />
    </safa-group>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="baseWall"
              title="مشخصات ديوارها"
              :m="m"
              v-model="value.Base_Wall"
              height="100%"
              max-height="100%"
              min-height="150px"
              margin="0"
              class="fit"
            />
          </fit>
        </div>
        <!-- <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
          <fit>
            <safa-datatable
              helper="baseDoor"
              title="مشخصات درها"
              :m="m"
              v-model="value.Base_Door"
              height="100%"
              max-height="100%"
              min-height="150px"
              margin="0"
              class="fit"
            />
          </fit>

        </div> -->
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height:150px"
        >
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
            />
          </fit>

        </div>
      </div>
    </div>
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
  }
}
</script>
