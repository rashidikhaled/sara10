<template>
  <fit>
    <safa-group
      :size="{
        md: 4,
        lg: 5,
        sm: 2,
        xs: 1
}"
      label-width="125px"
      :m="m"
      margin="0"
    >
      <safa-text
        label="مجموع كل زير بنا "
        v-model="value.Base_ShopInfo.TotalArea"
        type="number"
      />
      <safa-datepicker
        label="تاریخ تاسیس واحد تجاری"
        v-model="value.Base_ShopInfo.CreateUnitDate"
      />
      <safa-combo
        label="محل استقرار"
        ci-name="CI_JobStateStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_ShopInfo.CI_JobStateStatus"
      />
      <safa-custom-text
        type="decimal"
        label-width="125px"
        label="مساحت سهم العرصه "
        v-model="value.Base_ShopInfo.ToftImpart"
        :m="m"
      />
      <safa-combo
        label="موقعيت تجاري "
        ci-name="CI_TradingStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_ShopInfo.CI_TradingStatus"
      />
      <safa-text
        label="تعداد دربند"
        v-model="value.Base_ShopInfo.DarbandCount"
        type="number"
      />
      <safa-custom-text
        label-width="125px"
        type="decimal"
        label="مساحت  فضای باز تجاري "
        v-model="value.Base_ShopInfo.FreeSpaceNoTradingArea"
        :m="m"
      />
      <safa-combo
        label="موقعيت زمين "
        ci-name="CI_GeoStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_ShopInfo.CI_GeoStatus"
      />
      <safa-text
        label="ارتفاع مفيد "
        v-model="value.Base_ShopInfo.Hight"
        type="number"
      />
      <safa-text
        label="کد معبر/ردیف ارزشی "
        v-model="value.Base_ShopInfo.ValBlockRowNo"
        type="number"
      />

    </safa-group>
    <div class="fit q-mt-sm">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              helper="baseInstallation"
              title="تاسیسات"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_Installation"
            />
          </fit>
        </div>
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              helper="baseOtherEquipment"
              title="سایر امکانات"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :m="m"
              v-model="value.Base_OtherEquipment"
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
