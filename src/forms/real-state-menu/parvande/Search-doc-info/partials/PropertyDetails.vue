<template>
  <fit>
    <form-row>
      <form-control>
        <safa-text
          label="نام مالک قبلی و آدرس"
          label-width="110px"
          v-model="value.OldOwnerNameAddress"
          cdcName="OldOwnerNameAddress"
        />
      </form-control>
      <form-control>
        <safa-text
          label="پلاک آبی"
          label-width="110px"
          v-model="value.Plack"
          cdcName="Plack"
        />
      </form-control>
      <form-control>
        <safa-text
          label="کد پستی"
          label-width="110px"
          v-model="value.PostCode"
          cdcName="PostCode"
        />
      </form-control>
    </form-row>
    <internal-section title="کاربری">
      <form-row class="q-mt-sm">
        <form-control>
          <safa-combo
            label="کاربری زمان توافق"
            ciName="CI_UsingGroup"
            domainName="Estate"
            label-width="110px"
            v-model="value.CI_UsingGroup"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="وضعیت فعلی"
            ciName="CI_HouseStatus"
            domainName="Estate"
            label-width="110px"
            v-model="value.CI_HouseStatus"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="کاربری قابل پاسخگویی در شهرسازی"
            ciName="CI_UsingGroup2"
            domainName="Estate"
            label-width="110px"
            v-model="value.CI_UsingGroup2"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="نوع مالکیت"
            ciName="CI_OwnerType"
            domainName="Estate"
            label-width="110px"
            v-model="value.CI_OwnerType"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="وضعیت مالکیت"
            ciName="CI_OwnerStatus"
            domainName="Estate"
            label-width="110px"
            v-model="value.CI_OwnerStatus"
          />
        </form-control>
         <form-control>
          <safa-datepicker
            label="تاریخ اتمام اجاره از:"
            label-width="110px"
            clearable
            v-model="value.EndRentDateFrom"
            cdcName="EndRentDateFrom"
          />
        </form-control>
         <form-control>
          <safa-datepicker
            label="تاریخ اتمام اجاره تا:"
            label-width="110px"
            clearable
            v-model="value.EndRentDateTo"
            cdcName="EndRentDateTo"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="نحوه دریافت"
            ciName="CI_GettingKind"
            domainName="Estate"
            label-width="110px"
            v-model="value.CI_GettingKind"
          />
        </form-control>
      </form-row>
    </internal-section>
    <internal-section title="صلح نامه ">
      <form-row class="q-mt-sm">
        <form-control>
          <safa-text
            label="شماره ابلاغ صلح نامه "
            label-width="110px"
            v-model="value.ContractBuyNoCommunicated"
            cdcName="ContractBuyNoCommunicated"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ ابلاغ صلح نامه از:"
            label-width="110px"
            clearable
            v-model="value.ContractBuyDateCommunicatedFrom"
            cdcName="ContractBuyDateCommunicated"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="110px"
            clearable
            v-model="value.ContractBuyDateCommunicatedTo"
            cdcName="ContractBuyDateCommunicatedFromTo"
          />
        </form-control>
      </form-row>

      <form-row class="q-mt-sm">
        <form-control>
          <safa-text
            label="شماره صلح نامه "
            label-width="110px"
            v-model="value.ContractBuyNo"
            cdcName="ContractBuyNo"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ صلح نامه از:"
            label-width="110px"
            clearable
            v-model="value.ContractBuyDateFrom"
            cdcName="ContractBuyDate"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="110px"
            clearable
            v-model="value.ContractBuyDateTo"
            cdcName="txtContractBuyDateTo"
          />
        </form-control>
      </form-row>
    </internal-section>
    <internal-section title="مساحت">
      <form-row class="q-mt-sm">
        <form-control>
          <safa-text
            label="مساحت عرصه از: "
            label-width="110px"
            v-model="value.CurrentAreaFrom"
            cdcName="CurrentAreaFrom"
          />
        </form-control>
        <form-control>
          <safa-text
            label="تا:"
            label-width="110px"
            clearable
            v-model="value.CurrentAreaTo"
            cdcName="CurrentAreaTo"

          />
        </form-control>
        <form-control>
          <safa-text
            label="مساحت اعیان از: "
            label-width="110px"
            v-model="value.BuildAreaFrom"
            cdcName="BuildAreaFrom"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="110px"
            clearable
            v-model="value.BuildAreaTo"
            cdcName="BuildAreaTo"
          />
        </form-control>
      </form-row>
      <form-row class="q-my-sm">
        <form-control>
          <safa-text
            label="مساحت عرصه در‌‌مسیر پروژه از "
            label-width="110px"
            v-model="value.PathValueFrom"
            cdcName="PathValueFrom"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تا:"
            label-width="110px"
            clearable
            v-model="value.PathValueTo"
            cdcName="PathValueTo"
          />
        </form-control>
        <form-control>
          <safa-text
            label="مساحت باقی مانده از: "
            label-width="110px"
            v-model="value.RemainAreaFrom"
            cdcName="RemainAreaFrom"
          />
        </form-control>
        <form-control>
          <safa-text
            label="تا:"
            label-width="110px"
            v-model="value.RemainAreaTo"
            cdcName="RemainAreaTo"
          />
        </form-control>
      </form-row>
    </internal-section>

  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    value: Object
  },
  data () {
    return {
      name: "PropertyDetails"
    }
  }
}
</script>
