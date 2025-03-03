<template>
  <section>
    <div class="row q-col-gutter-lg">

      <!-- row 1 -->
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="شماره بلوک در دفترچه تقسیمات ارزش ها :"
        :m="m"
        v-model="value.Base_BlockInfo.GlobalBlockNo"
      />
      <safa-combo
        class="col-12 col-sm-4  col-md-3"
        label="کاربری:"
        ci-name="CI_UsingGroup"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_BlockInfo.CI_UsingGroup"
      />
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="تعداد ساختمان :"
        :m="m"
        v-model="value.Base_BlockInfo.BuildingCount"
      />

      <!-- row 2 -->
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="محل مشهور :"
        :m="m"
        v-model="value.Base_BlockInfo.FamousRegion"
      />
      <safa-combo
        class="col-12 col-sm-4  col-md-3"
        label="کد محدوده :"
        ci-name="CI_BoundCode"
        domain-name="CI_SaraM1"
        :m="m"
        v-model="value.Base_BlockInfo.CI_BoundCode"
      />
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="تعداد آپارتمان :"
        :m="m"
        v-model="value.Base_BlockInfo.ApartmentCount"
      />

      <!-- row 3 -->
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="نام بازار :"
        :m="m"
        v-model="value.Base_BlockInfo.BazarName"
      />
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="تعداد معبر :"
        :m="m"
        v-model="value.Base_BlockInfo.PathCount"
      />
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="تعداد کسب و پیشه :"
        :m="m"
        v-model="value.Base_BlockInfo.NoResidentialApartmentCount"
      />

      <!-- row 4 -->
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="تراکم :"
        :m="m"
        v-model="value.Base_BlockInfo.DensityPlan"
      />
      <safa-text
        class="col-12 col-sm-4  col-md-3"
        label="تعداد ملک :"
        :m="m"
        v-model="value.Base_BlockInfo.HouseCount"
      />
      <safa-checkbox
        class="col-12 col-sm-4  col-md-3"
        label="شکل بلوک :"
        :m="m"
        v-model="value.Base_BlockInfo.IsShapeBlock"
      />

      <!-- row 5 -->
      <safa-datepicker
        class="col-12 col-sm-4  col-md-3"
        label="تاریخ اثر:"
        :m="m"
        v-model="value.Base_BlockInfo.ActDate"
      />
    </div>

    <safa-datatable
      title="اطلاعات معابر"
      helper="baseBlockPath"
      :m="m"
      v-model="value.Base_BlockPath"
      class="q-my-lg"
      :margin="null"
    />

    <safa-datatable
      title="ثوابت معابر"
      helper="baseBlockPathConstant"
      :m="m"
      v-model="value.Base_BlockPathConstant"
    />
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
