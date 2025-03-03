<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="مجموع كل زير بنا "
          label-width="90px"
          v-model="value.Base_ShopInfo.TotalArea"
          cdcName="TotalArea"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تاسیس واحد تجاری"
          label-width="90px"
          v-model="value.Base_ShopInfo.CreateUnitDate"
          cdcName="CreateUnitDate"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="محل استقرار"
          label-width="90px"
          ci-name="CI_JobStateStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_ShopInfo.CI_JobStateStatus"
          cdcName="CI_JobStateStatus"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت سهم العرصه "
          label-width="90px"
          v-model="value.Base_ShopInfo.ToftImpart"
          cdcName="ToftImpart"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="موقعيت تجاري "
          label-width="90px"
          ci-name="CI_TradingStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_ShopInfo.CI_TradingStatus"
          cdcName="CI_TradingStatus"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد دربند"
          label-width="90px"
          v-model="value.Base_ShopInfo.DarbandCount"
          cdcName="DarbandCount"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-custom-text
          label="مساحت  فضای باز تجاري "
          label-width="90px"
          v-model="value.Base_ShopInfo.FreeSpaceNoTradingArea"
          cdcName="FreeSpaceNoTradingArea"
          type="decimal"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="موقعيت زمين "
          label-width="90px"
          ci-name="CI_GeoStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_ShopInfo.CI_GeoStatus"
          cdcName="CI_GeoStatus"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ارتفاع مفيد "
          label-width="90px"
          v-model="value.Base_ShopInfo.Hight"
          cdcName="Hight"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد معبر/ردیف ارزشی "
          label-width="90px"
          v-model="value.Base_ShopInfo.ValBlockRowNo"
          cdcName="ValBlockRowNo"
          type="number"
        />
      </FormControl>
    </FormRow>
    <safa-splitter v-model="sp" vertical fit>
      <template v-slot:before>
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
            cdcName="Base_Installation"
          />
        </fit>
      </template>
      <template v-slot:after>
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
            cdcName="Base_OtherEquipment"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabShopInfo",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      sp: 50
    }
  }
}
</script>
