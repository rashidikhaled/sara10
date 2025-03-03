<template>
  <fit>
    <safa-group
      label-width="120px"
      :size="{lg:3,md:3,sm:3 }"
      :m="m"
    >
      <safa-combo
        label="موقعیت زمین"
        ci-name="CI_GeoStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_ShopInfo.CI_GeoStatus"
      />

      <safa-text
        label="مساحت فضای باز تجاری"
        v-model="value.Base_ShopInfo.FreeSpaceNoTradingArea"
      />
      <safa-datepicker
        label="تاریخ تاسیس واحد تجاری"
        v-model="value.Base_ShopInfo.CreateUnitDate"
      />
      <safa-combo
        label="محل استقرار"
        ci-name="CI_TradingStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_ShopInfo.CI_TradingStatus"
      />
      <safa-text
        label="مساحت سهم العرصه"
        type="number"
        v-model="value.Base_ShopInfo.ToftImpart"
      />

      <safa-text
        label="تعداد دربند"
        type="number"
        v-model="value.Base_ShopInfo.DarbandCount"
      />
      <safa-combo
        label="موقعیت تجاری"
        ci-name="CI_JobStateStatus"
        domain-name="CI_SaraM1"
        v-model="value.Base_ShopInfo.CI_JobStateStatus"
      />
      <safa-text
        label="مجموع کل زیربنا"
        type="number"
        v-model="value.Base_ShopInfo.TotalArea"
      />

      <safa-text
        label="ارتفاع مفید"
        type="number"
        v-model="value.Base_ShopInfo.Hight"
      />
    </safa-group>
    <safa-splitter
      v-model="splitterValue"
      class="fit"
      vertical
      margin="0"
      style="min-height:300px"
    >
      <template #before>
        <fit>
          <safa-datatable
            helper="baseOtherEquipment"
            :m="m"
            height="100%"
            max-height="100%"
            title="سایر امکانات"
            v-model="value.Base_OtherEquipment"
            fit
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-datatable
            helper="baseInstallation"
            :m="m"
            v-model="value.Base_Installation"
            height="100%"
            max-height="100%"
            title="تاسیسات"
            fit
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'PartialSpecificationsTab',
  data () {
    return {
      splitterValue: 50
    }
  },
  // computed: {
  //   Base_ShopInfo () {
  //     return this.value.Base_ShopInfo || {}
  //   }
  // },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
