<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseStatus"
          :m="m"
          ci-name="CI_HouseStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="وضعیت ملک"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_BoundCode"
          :m="m"
          ci-name="CI_BoundCode"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="محدوده"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GlasshouseType"
          :m="m"
          ci-name="CI_GlasshouseType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع گلخانه"
        />

        <!-- row 2 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_OwnerType"
          :m="m"
          ci-name="CI_OwnerType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع مالکیت"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_IncloseType"
          :m="m"
          ci-name="CI_IncloseType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع حصار"
        />
        <safa-text
          v-model="value.Base_HouseInfo.CI_IncloseType"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت گلخانه"
        />

        <!-- row 3 -->
        <safa-combo
          v-model="value.Base_HouseInfo.CI_HouseType"
          :m="m"
          ci-name="CI_HouseType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع ملک"
        />
        <safa-combo
          v-model="value.Base_HouseInfo.CI_PoolType"
          :m="m"
          ci-name="CI_PoolType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع استخر"
        />
        <safa-text
          v-model="value.Base_HouseInfo.DeepShaftCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد چاه"
        />

        <!-- row 4 -->
        <safa-combo
          v-model="value.Base_HouseInfo.CI_GeoStatus"
          :m="m"
          ci-name="CI_GeoStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="موقعیت زمین"
        />
        <safa-text
          v-model="value.Base_HouseInfo.PoolArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت استخر"
        />
        <safa-text
          v-model="value.Base_HouseInfo.CI_ShaftType"
          :m="m"
          ci-name="CI_ShaftType"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="نوع چاه"
        />

        <!-- row 5 -->
        <safa-combo
          v-model="value.Base_CommonEstate.CI_BuildingStep"
          :m="m"
          ci-name="CI_BuildingStep"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="مرحله ساختمانی"
        />
        <safa-text
          v-model="value.Base_HouseInfo.PoolCubature"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="حجم استخر"
        />
        <safa-text
          v-model="value.Base_HouseInfo.MamarArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="حق عبور"
        />

        <!-- row 5 -->
        <safa-text
          v-model="value.Base_HouseInfo.CI_SpecialStatus"
          :m="m"
          ci-name="CI_SpecialStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="وضعیت خاص"
        />
        <safa-datepicker
          v-model="value.Base_HouseInfo.ActDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ اثر"
        />
        <safa-text
          v-model="value.Base_HouseInfo.CadastreCode"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="کد کاداستر"
        />

      </q-card-section>
    </q-card>
    <q-separator class="q-mb-md" inset/>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12">
          <div class="col-12 section-title">مشخصات درها:</div>
          <safa-datagrid
            v-model="value.Base_Door"
            :m="m"
            class="col-12 "
            helper="baseDoor"
            style="height: 15rem"
          />
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12 ">
          <div class="col-12 section-title">مشخصات دیوارها:</div>
          <safa-datagrid
            v-model="value.Base_Wall"
            :m="m"
            class="col-12 "
            helper="baseWall"
            style="height: 15rem"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
  </section>
</template>

<script>
export default {
  name: 'TabBaseHouseInfo',

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
