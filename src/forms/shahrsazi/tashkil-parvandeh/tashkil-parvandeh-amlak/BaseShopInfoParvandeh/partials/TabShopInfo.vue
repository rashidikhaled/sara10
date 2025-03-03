<template>
  <fit>
    <internal-section>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="مجموع كل زير بنا "
          :m="m"
          v-model="value.Base_ShopInfo.TotalArea"
          label-width="130px"
          type="number"
        />
        <safa-datepicker
          class="col-12 col-sm-6 col-md-3"
          label="تاریخ تاسیس واحد تجاری"
          :m="m"
          v-model="value.Base_ShopInfo.CreateUnitDate"
          label-width="130px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="استقرار بنا "
          ci-name="CI_JobStateStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_ShopInfo.CI_JobStateStatus"
          label-width="130px"
        />
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت سهم العرصه "
          :m="m"
          v-model="value.Base_ShopInfo.ToftImpart"
          label-width="130px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="موقعيت تجاري "
          ci-name="CI_TradingStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_ShopInfo.CI_TradingStatus"
          label-width="130px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="تعداد دربند"
          :m="m"
          v-model="value.Base_ShopInfo.DarbandCount"
          label-width="130px"
          type="number"
        />
        <safa-custom-text
          type="decimal"
          class="col-12 col-sm-6 col-md-3"
          label="مساحت  فضای باز تجاري "
          :m="m"
          v-model="value.Base_ShopInfo.FreeSpaceNoTradingArea"
          label-width="130px"
        />
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          label="موقعيت زمين "
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          :m="m"
          v-model="value.Base_ShopInfo.CI_GeoStatus"
          label-width="130px"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="ارتفاع مفيد "
          :m="m"
          v-model="value.Base_ShopInfo.Hight"
          label-width="130px"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="کد معبر/ردیف ارزشی "
          :m="m"
          v-model="value.Base_ShopInfo.ValBlockRowNo"
          label-width="130px"
          type="number"
        />
      </div>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="تاسیسات"
              helper="baseInstallation"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              v-model="value.Base_Installation"
              :m="m"
            />
          </fit>
        </div>
        <div
          class="col-12 col-md-6 q-mb-sm q-mb-md-none"
          style="min-height: 150px;"
        >
          <fit>
            <safa-datatable
              title="سایر امکانات"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              helper="baseOtherEquipment"
              v-model="value.Base_OtherEquipment"
              :m="m"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
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
