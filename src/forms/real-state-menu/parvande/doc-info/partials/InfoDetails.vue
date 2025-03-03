<template>
  <fit>
    <FormRow>
      <FormControl>
        <safa-text
          label="نام مالک قبلی و آدرس"
          label-width="110px"
          v-model="value.OldOwnerNameAddress"
          cdcName="OldOwnerNameAddress"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک آبی"
          label-width="110px"
          v-model="value.Plack"
          cdcName="Plack"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد پستی"
          label-width="110px"
          v-model="value.PostCode"
          cdcName="PostCode"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کاربری زمان توافق"
          ciName="CI_UsingGroup"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_UsingGroup"
          cdcName="CI_UsingGroup"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت فعلی"
          ciName="CI_HouseStatus"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_HouseStatus"
          cdcName="CI_HouseStatus"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کاربری قابل پاسخگویی در شهرسازی"
          ciName="CI_UsingGroup"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_UsingGroup2"
          cdcName="CI_UsingGroup2"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع مالکیت"
          ciName="CI_OwnerType"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_OwnerType"
          cdcName="CI_OwnerType"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت مالکیت"
          ciName="CI_OwnerStatus"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_OwnerStatus"
          cdcName="CI_OwnerStatus"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اتمام اجاره"
          label-width="110px"
          clearable
          v-model="value.EndRentDate"
          cdcName="EndRentDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نحوه دریافت"
          ciName="CI_GettingKind"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_GettingKind"
          cdcName="CI_GettingKind"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره ابلاغ صلح نامه "
          label-width="110px"
          v-model="value.ContractBuyNoCommunicated"
          cdcName="ContractBuyNoCommunicated"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ابلاغ صلح نامه"
          label-width="110px"
          clearable
          v-model="value.ContractBuyDateCommunicated"
          cdcName="ContractBuyDateCommunicated"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره صلح نامه "
          label-width="110px"
          v-model="value.ContractBuyNo"
          cdcName="ContractBuyNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صلح نامه "
          label-width="110px"
          clearable
          v-model="value.ContractBuyDate"
          cdcName="ContractBuyDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع طرح"
          ciName="CI_PlanType"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_PlanType"
          cdcName="CI_PlanType"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="کاربری طرح"
          ciName="CI_PlanUsingType"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_PlanUsingType"
          cdcName="CI_PlanUsingType"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="استفاده مجاز"
          ciName="CI_PlanUsingMojaz"
          domainName="Estate"
          label-width="110px"
          v-model="value.CI_PlanUsingMojaz"
          cdcName="CI_PlanUsingMojaz"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت عرصه "
          label-width="110px"
          v-model="value.CurrentArea"
          cdcName="CurrentArea"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت اعیان "
          label-width="110px"
          v-model="value.BuildArea"
          cdcName="BuildArea"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت عرصه در‌‌مسیر پروژه  "
          label-width="110px"
          v-model="value.PathValue"
          cdcName="PathValue"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت باقی مانده "
          label-width="110px"
          v-model="value.RemainArea"
          cdcName="RemainArea"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-my-sm">
      <FormControl class="flex items-center">
        <safa-checkbox
          label="باقی مانده متعلق به شهرداری می باشد؟"
          label-width="110px"
          v-model="value.RemainingAreaBelongingMunicipality"
          cdcName="RemainingAreaBelongingMunicipality"
          :m="m"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          label="آیا ملک در سامانه SDI  نمایش داده شود ؟"
          label-width="110px"
          v-model="value.IsShowSDI"
          cdcName="IsShowSDI"
          :m="m"
        />
      </FormControl>
    </FormRow>
    <text-template
      label="توضیحات"
      label-width="110px"
      v-model="value.Description1"
      cdcName="Description1"
      :m="m"
      class="fit"
      :rows="1"
    />
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {}
  }
}
</script>
