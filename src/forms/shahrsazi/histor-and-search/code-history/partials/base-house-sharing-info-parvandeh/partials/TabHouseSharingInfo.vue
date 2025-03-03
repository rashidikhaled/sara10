<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مجموع كل زير بنا :"
          :m="m"
          v-model="value.Base_BuildingInfo.InfrastructureArea"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="الگوی ساخت :"
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="تراکم مجاز در پروانه ساختمانی:"
          :m="m"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        />

        <!-- row 2 -->
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت نورگير :"
          :m="m"
          v-model="value.Base_BuildingInfo.LightfastArea"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="وضعیت استحکام بنا:"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-4"
          label="قدمت ساخت از:"
          :m="m"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
        />

        <!-- row 3 -->
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت نما :"
          :m="m"
          v-model="value.Base_CommonEstate.ViewArea"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="وضعیت استحکام بنا:"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-4"
          label="قدمت ساخت تا:"
          :m="m"
          v-model="value.Base_BuildingInfo.CreateYearTo"
        />

        <!-- row 4 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="نوع نما :"
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_ViewCode"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="استقرار بنا:"
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_BuildingPosition"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع تا کف معبر بالا:"
          :m="m"
          v-model="value.Base_BuildingInfo.UpperHeight"
        />

        <!-- row 5 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="نوع سقف :"
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_BuildingInfo.CI_RoofType"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="سطح اشغال :"
          :m="m"
          v-model="value.Base_BuildingInfo.BusyArea"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع تا کف معبر پایین:"
          :m="m"
          v-model="value.Base_BuildingInfo.DownerHeight"
        />

        <!-- row 6 -->
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت ايست رمپ :"
          :m="m"
          v-model="value.Base_BuildingInfo.RampArea"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مجموع ارتفاع کل :"
          :m="m"
          v-model="value.Base_BuildingInfo.Height"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="عرض دهنه تجاری :"
          :m="m"
          v-model="value.Base_CommonEstate.CommercialGapWidth"
        />

        <!-- row 7 -->
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع جان پناه :"
          :m="m"
          v-model="value.Base_BuildingInfo.Defilade"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="عمق حريم تجاری :"
          :m="m"
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع کرسی :"
          :m="m"
          v-model="value.Base_BuildingInfo.HeightKorsi"
        />

        <!-- row 8 -->
        <safa-datepicker
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ اثر :"
          :m="m"
          v-model="value.Base_BuildingInfo.ActDate"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت سهم العرصه چندساختمانی:"
          :m="m"
          v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
        />

      </q-card-section>
    </q-card>

    <q-separator inset class="q-my-md"/>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12">
          <div class="section-title">اشتراکات:</div>
          <safa-datagrid
            class="col-12"
            helper="baseSubscription"
            style="height: 20rem"
            :m="m"
            v-model="value.Base_SubScription"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabHouseSharingInfo',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
