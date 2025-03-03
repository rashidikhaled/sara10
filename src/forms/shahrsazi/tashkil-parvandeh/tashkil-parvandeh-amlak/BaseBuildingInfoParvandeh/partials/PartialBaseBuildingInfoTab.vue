<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="مجموع كل زير بنا"
          :m="m"
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          label-width="100px"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="تراکم مجاز در پروانه ساختمانی"
          :m="m"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          label-width="100px"
          type="number"
        />
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت ايست رمپ"
          :m="m"
          v-model="value.Base_BuildingInfo.RampArea"
          label-width="100px"
          type="decimal"
        />

        <!-- row 2 -->
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت نورگير"
          :m="m"
          v-model="value.Base_BuildingInfo.LightfastArea"
          label-width="100px"
          type="decimal"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="سطح اشغال"
          :m="m"
          v-model="value.Base_BuildingInfo.BusyArea"
          label-width="100px"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع تا كف معبر بالا"
          :m="m"
          v-model="value.Base_BuildingInfo.UpperHeight"
          label-width="100px"
          type="number"
        />

        <!-- row 3 -->
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت نما"
          :m="m"
          v-model="value.Base_CommonEstate.ViewArea"
          label-width="100px"
          type="decimal"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="استقرار بنا"
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع تا كف معبر پايين"
          :m="m"
          v-model="value.Base_BuildingInfo.DownerHeight"
          label-width="100px"
          type="number"
        />

        <!-- row 3 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع نما"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_ViewCode"
          label-width="100px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="مرحله ساختمانی"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="مجموع ارتفاع کل"
          :m="m"
          v-model="value.Base_BuildingInfo.Height"
          label-width="100px"
          type="number"
        />

        <!-- row 5 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="نوع سقف"
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_RoofType"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="عرض دهنه تجاری"
          :m="m"
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          label-width="100px"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع جان پناه"
          :m="m"
          v-model="value.Base_BuildingInfo.Defilade"
          label-width="100px"
          type="number"
        />

        <!-- row 6 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="الگوی ساخت"
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          label-width="100px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="عمق حريم تجاری"
          :m="m"
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          label-width="100px"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع کرسی"
          :m="m"
          v-model="value.Base_BuildingInfo.HeightKorsi"
          label-width="100px"
          type="number"
        />

        <!-- row 7 -->
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ اثر"
          :m="m"
          v-model="value.Base_BuildingInfo.ActDate"
          label-width="100px"
        />
        <safa-custom-text
          class="col-12 col-sm-6 col-md-3"
          label="مساحت سهم العرصه چندساختمانی"
          m="r"
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
          label-width="100px"
          type="decimal"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="مشخصات ديوارها"
              helper="baseWall"
              :m="m"
              v-model="value.Base_Wall"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="مشخصات درها"
              helper="baseDoor"
              :m="m"
              v-model="value.Base_Door"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-4 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="تاسیسات"
              helper="baseInstallation"
              :m="m"
              v-model="value.Base_Installation"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
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
