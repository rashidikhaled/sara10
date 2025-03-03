<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        :size="{
        md: 4,
        lg:4,
        sm: 2,
        xs: 1
}"
        label-width="130px"
        margin="0"
      >
        <safa-text
          v-model="value.Base_ShopInfo.TotalArea"
          label="مجموع كل زير بنا"
          type="number"
        />
        <safa-datepicker
          v-model="value.Base_ShopInfo.CreateUnitDate"
          label="تاریخ تاسیس واحد تجاری"
        />
        <safa-combo
          v-model="value.Base_ShopInfo.CI_JobStateStatus"
          ci-name="CI_JobStateStatus"
          domain-name="CI_SaraM1"
          label="استقرار بنا"
        />

        <safa-custom-text
          v-model="value.Base_ShopInfo.ToftImpart"
          :m="m"
          label="مساحت سهم العرصه"
          label-width="130px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_ShopInfo.CI_TradingStatus"
          ci-name="CI_TradingStatus"
          domain-name="CI_SaraM1"
          label="موقعيت تجاري"
        />
        <safa-text
          v-model="value.Base_ShopInfo.DarbandCount"
          label="تعداد دربند"
          type="number"
        />
        <safa-custom-text
          v-model="value.Base_ShopInfo.FreeSpaceNoTradingArea"
          :m="m"
          label="مساحت  فضای باز تجاري"
          label-width="130px"
          type="decimal"
        />
        <safa-combo
          v-model="value.Base_ShopInfo.CI_GeoStatus"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          label="موقعيت زمين"
        />
        <safa-text
          v-model="value.Base_ShopInfo.Hight"
          label="ارتفاع مفيد"
          type="number"
        />
        <safa-text
          v-model="value.Base_ShopInfo.ValBlockRowNo"
          label="کد معبر/ردیف ارزشی"
        />
      </safa-group>
    </internal-section>
    <div class="fit">
      <div class="row q-col-gutter-x-sm full-height">
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              v-model="value.Base_Installation"
              :m="m"
              class="col-12"
              fit
              height="100%"
              helper="baseInstallation"
              max-height="100%"
              title="تاسیسات"
            />
          </fit>
        </div>
        <div class="col-12 col-md-6 q-mb-sm q-mb-md-none" style="min-height:150px">
          <fit>
            <safa-datatable
              v-model="value.Base_OtherEquipment"
              :m="m"
              class="col-12"
              fit
              height="100%"
              helper="baseOtherEquipment"
              max-height="100%"
              title="سایر امکانات"
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
