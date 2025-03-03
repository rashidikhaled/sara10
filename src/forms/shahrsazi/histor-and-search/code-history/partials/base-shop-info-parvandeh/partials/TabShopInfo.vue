<template>
  <section class="row wrap">
    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">

        <!-- row 1 -->
        <safa-text
          v-model="value.Base_ShopInfo.TotalArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مجموع كل زير بنا :"
        />
        <safa-datepicker
          v-model="value.Base_ShopInfo.CreateUnitDate"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تاریخ تاسیس واحد تجاری:"
        />
        <safa-combo
          v-model="value.Base_ShopInfo.CI_JobStateStatus"
          :m="m"
          ci-name="CI_JobStateStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="محل استقرار:"
        />

        <!-- row 2 -->
        <safa-text
          v-model="value.Base_ShopInfo.ToftImpart"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت سهم العرصه :"
        />
        <safa-combo
          v-model="value.Base_ShopInfo.CI_TradingStatus"
          :m="m"
          ci-name="CI_TradingStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="موقعيت تجاري :"
        />
        <safa-text
          v-model="value.Base_ShopInfo.DarbandCount"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="تعداد دربند:"
        />

        <!-- row 3 -->
        <safa-text
          v-model="value.Base_ShopInfo.FreeSpaceNoTradingArea"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="مساحت  فضای باز تجاري :"
        />
        <safa-combo
          v-model="value.Base_ShopInfo.CI_GeoStatus"
          :m="m"
          ci-name="CI_GeoStatus"
          class="col-12 col-sm-6 col-md-4"
          domain-name="CI_SaraM1"
          label="موقعيت زمين :"
        />
        <safa-text
          v-model="value.Base_ShopInfo.Hight"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="ارتفاع مفيد :"
        />

        <!-- row 3 -->
        <safa-text
          v-model="value.Base_ShopInfo.ValBlockRowNo"
          :m="m"
          class="col-12 col-sm-6 col-md-4"
          label="کد معبر/ردیف ارزشی :"
        />

      </q-card-section>
    </q-card>

    <q-separator class="q-my-md" inset/>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <q-card-section class="col-12">
          <div class="section-title">تاسیسات:</div>
          <safa-datagrid
            v-model="value.Base_Installation"
            :m="m"
            class="col-12"
            helper="baseInstallation"
            style="height: 15rem"
          />
        </q-card-section>
        <q-card-section class="col-12">
          <div class="section-title">سایر امکانات:</div>
          <safa-datagrid
            v-model="value.Base_OtherEquipment"
            :m="m"
            class="col-12"
            helper="AGbaseOtherEquipment"
            style="height: 15rem"
          />
        </q-card-section>

      </q-card-section>
    </q-card>
  </section>
</template>

<script>
export default {
  name: 'TabShopInfo',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
