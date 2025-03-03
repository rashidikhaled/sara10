<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          v-model="value.Base_BuildingInfo.InfrastructureArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مجموع كل زير بنا :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تراکم مجاز در پروانه ساختمانی:"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.RampArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت ايست رمپ :"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_BuildingInfo.LightfastArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت نورگير :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.BusyArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="سطح اشغال :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.UpperHeight"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع تا كف معبر بالا :"
        />

        <!-- row 3 -->
        <safa-text
          v-model="value.Base_CommonEstate.ViewArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت نما :"
        />
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_BuildingPosition"
          :m="m"
          ci-name="CI_BuildingPosition"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="استقرار بنا :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.DownerHeight"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع تا كف معبر پايين :"
        />

        <!-- row 4 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_ViewCode"
          :m="m"
          ci-name="CI_ViewCode"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع نما :"
        />
        <safa-combo
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          :m="m"
          ci-name="CI_ViewCode"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="مرحله ساختمانی :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.Height"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مجموع ارتفاع کل :"
        />

        <!-- row 5 -->
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_RoofType"
          :m="m"
          ci-name="CI_RoofType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع سقف :"
        />
        <safa-text
          v-model="value.Base_CommonEstate.CommercialGapWidth"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="عرض دهنه تجاری :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.Defilade"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع جان پناه :"
        />

        <!-- row 6 -->
        <safa-combo
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
          :m="m"
          ci-name="CI_CreateDesign"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="الگوی ساخت :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="عمق حريم تجاری :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.HeightKorsi"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع کرسی :"
        />

        <!-- row 7 -->
        <safa-datepicker
          v-model="value.Base_BuildingInfo.ActDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ اثر :"
        />
        <safa-text
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت سهم العرصه چندساختمانی:"
        />

      </q-card-section>
    </q-card>

    <q-separator class="q-my-md" inset/>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12">
          <div class="section-title">مشخصات ديوارها :</div>
          <safa-datagrid
            v-model="value.Base_Wall"
            :m="m"
            class="col-12"
            helper="baseWall"
            style="height: 15rem"
          />
        </q-card-section>
        <q-card-section class="col-12">
          <div class="section-title">مشخصات درها:</div>
          <safa-datagrid
            :m="m"
            :v-model="value.Base_Door"
            class="col-12"
            helper="baseDoor"
            style="height: 15rem"
          />
        </q-card-section>
        <q-card-section class="col-12">
          <div class="section-title">تاسیسات :</div>
          <safa-datagrid
            v-model="value.Base_Installation"
            :m="m"
            class="col-12"
            helper="baseInstallation"
            style="height: 15rem"
          />
        </q-card-section>

      </q-card-section>
    </q-card>
  </section>
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
