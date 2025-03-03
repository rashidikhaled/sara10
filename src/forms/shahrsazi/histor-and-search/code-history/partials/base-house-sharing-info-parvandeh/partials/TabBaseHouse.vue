<template>
  <section class="row wrap">
    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="وضعیت ملک"
          ci-name="CI_HouseStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_HouseStatus"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="محدوده"
          ci-name="CI_BoundCode"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_BoundCode"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="نوع گلخانه"
          ci-name="CI_GlasshouseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
        />

        <!-- row 2 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="نوع مالکیت"
          ci-name="CI_OwnerType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_OwnerType"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="نوع حصار"
          ci-name="CI_IncloseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_IncloseType"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت گلخانه"
          :m="m"
          v-model="value.Base_HouseInfo.CI_IncloseType"
        />

        <!-- row 3 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="نوع ملک"
          ci-name="CI_HouseType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_HouseType"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="نوع استخر"
          ci-name="CI_PoolType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_PoolType"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="تعداد چاه"
          :m="m"
          v-model="value.Base_HouseInfo.DeepShaftCount"
        />

        <!-- row 4 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="موقعیت زمین"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_GeoStatus"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="مساحت استخر"
          :m="m"
          v-model="value.Base_HouseInfo.PoolArea"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="نوع چاه"
          ci-name="CI_ShaftType"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_ShaftType"
        />

        <!-- row 5 -->
        <safa-combo
          class="col-12 col-sm-6 col-md-4"
          label="مرحله ساختمانی"
          ci-name="CI_BuildingStep"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_CommonEstate.CI_BuildingStep"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="حجم استخر"
          :m="m"
          v-model="value.Base_HouseInfo.PoolCubature"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="حق عبور"
          :m="m"
          v-model="value.Base_HouseInfo.MamarArea"
        />

        <!-- row 5 -->
        <safa-text
          class="col-12 col-sm-6 col-md-4"
          label="وضعیت خاص"
          ci-name="CI_SpecialStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
        />
        <!--        <safa-datepicker-->
        <!--          class="col-12 col-sm-6 col-md-4"-->
        <!--          label="تاریخ اثر"-->
        <!--          :m="m"-->
        <!--          v-model="value.Base_HouseInfo.ActDate"-->
        <!--        />-->
        <!--        <safa-text-->
        <!--          class="col-12 col-sm-6 col-md-4"-->
        <!--          label="کد کاداستر"-->
        <!--          :m="m"-->
        <!--          v-model="value.Base_HouseInfo.CadastreCode"-->
        <!--        />-->

      </q-card-section>
    </q-card>
    <q-separator inset class="q-mb-md"/>

    <q-card flat class="col-12">
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12 col-md-6">
          <div class="col-12 section-title">سایر امکانات:</div>
          <safa-datagrid
            class="col-12"
            helper="AGbaseOtherEquipment"
            style="height: 20rem"
            :m="m"
            v-model="value.Base_OtherEquipment"
          />
        </q-card-section>
        <q-card-section class="col-12 col-md-6">
          <div class="col-12 section-title">تاسیسات:</div>
          <safa-datagrid
            class="col-12 "
            helper="baseInstallation"
            style="height: 20rem"
            :m="m"
            v-model="value.Base_Installation"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabBaseHouse',

  props: {
    m: String,
    saraDomainName: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
