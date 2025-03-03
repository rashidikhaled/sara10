<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          v-model="value.Base_BlockInfo.GlobalBlockNo"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="شماره بلوک در دفترچه تقسیمات ارزش ها :"
        />
        <safa-combo
          v-model="value.Base_BlockInfo.CI_UsingGroup"
          :m="m"
          ci-name="CI_UsingGroup"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="کاربری:"
        />
        <safa-text
          v-model="value.Base_BlockInfo.BuildingCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد ساختمان :"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_BlockInfo.FamousRegion"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="محل مشهور :"
        />
        <safa-combo
          v-model="value.Base_BlockInfo.CI_BoundCode"
          :m="m"
          ci-name="CI_BoundCode"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="کد محدوده :"
        />
        <safa-text
          v-model="value.Base_BlockInfo.ApartmentCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد آپارتمان :"
        />

        <!-- row 3 -->
        <safa-text
          v-model="value.Base_BlockInfo.BazarName"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="نام بازار :"
        />
        <safa-text
          v-model="value.Base_BlockInfo.PathCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد معبر :"
        />
        <safa-text
          v-model="value.Base_BlockInfo.NoResidentialApartmentCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد کسب و پیشه :"
        />

        <!-- row 4 -->
        <safa-text
          v-model="value.Base_BlockInfo.DensityPlan"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تراکم :"
        />
        <safa-text
          v-model="value.Base_BlockInfo.HouseCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد ملک :"
        />
        <safa-checkbox
          v-model="value.Base_BlockInfo.IsShapeBlock"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="شکل بلوک :"
        />

        <!-- row 5 -->
        <safa-datepicker
          v-model="value.Base_BlockInfo.ActDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ اثر:"
        />
      </q-card-section>
    </q-card>

    <q-separator class="col-12 q-my-sm" inset/>

    <q-card class="col-12 col-sm-6" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">اطلاعات معابر:</div>
        <safa-datagrid
          v-model="value.Base_BlockPath"
          :m="m"
          class="col-12"
          helper="baseBlockPath"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

    <q-card class="col-12 col-sm-6" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12 section-title">ثوابت معابر:</div>
        <safa-datagrid
          v-model="value.Base_BlockPathConstant"
          :m="m"
          class="col-12"
          helper="baseBlockPathConstant"
          style="height: 15rem"
        />
      </q-card-section>
    </q-card>

  </section>
</template>

<script>
export default {
  name: 'TabBlockInfo',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
