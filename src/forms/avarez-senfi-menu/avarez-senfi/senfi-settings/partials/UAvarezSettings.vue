<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-text
        label="سال شروع محاسبه"
        v-model="value.startcalcYear"
        cdcName="startcalcYear"
        :m="m"
        label-width="92px"
        class="col-12"
        :maxlength="4"

      />
    </div>
    <div class="row q-mb-sm">
      <safa-datepicker
        label="مهلت پرداخت"
        :m="m"
        v-model="value.paymentDate"
        cdcName="paymentDate"
        label-width="92px"
        class="col-12"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-text
        label="تعداد روز"
        v-model="value.noOfDay"
        cdcName="noOfDay"
        label-width="92px"
        :m="m"
        class="col-12"
        :maxlength="10"

      />
    </div>
    <div class="row q-mb-sm">
      <safa-text
        type="money"
        label="حداقل قیمت"
        v-model="value.minPrice"
        cdcName="minPrice"
        :m="m"
        label-width="92px"
        class="col-12"
         :maxlength="25"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-combo
        label="دسته اطلاعاتی"
        sourceType="local"
        :options="infoGroupOptions"
        v-model="selectedCategoryInfo"
        v-if="isShowBaseInfoGroupCombo"
        label-width="92px"
        :m="m"
        class="col-12"
      />
    </div>
    <!-- <div style="margin-right: 92px"> -->
    <div class="row q-mb-sm">
      <safa-checkbox
        :m="m"
        label="مهلت پرداخت به صورت تعداد روز"
        v-model="value.ChktotalPrice"
        cdcName="ChktotalPrice"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="قطعیت در هنگام محاسبات"
        :m="m"
        v-model="value.ChkisSure"
        cdcName="ChkisSure"
      />
    </div>
    <!-- <br /> -->
    <div class="row q-mb-sm">
      <safa-checkbox
        label="ابطال فیش ها هنگام صدور فیش"
        :m="m"
        v-model="value.ChkrevokeFiche"
        cdcName="ChkrevokeFiche"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        label="تنظیم سال تسویه در تایید فیش سالیانه"
        :m="m"
        v-model="value.ChkyearForConfirmedYearlyFiche"
        cdcName="ChkyearForConfirmedYearlyFiche"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="value.ChkyearForConfirmedAllFiche"
        cdcName="ChkyearForConfirmedAllFiche"
        label="تنظیم سال تسویه در تایید فیش جمعی"
        :m="m"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="value.ChkyearForConfirmedinstallmentFiche"
        cdcName="ChkyearForConfirmedinstallmentFiche"
        label="تنظیم سال تسویه در تایید فیش تقسیط"
        :m="m"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="value.ChkrevokeFicheWhenConfirm"
        cdcName="ChkrevokeFicheWhenConfirm"
        label="ابطال فیش ها هنگام تایید فیش"
        :m="m"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="value.ChkrightOfOpening"
        cdcName="ChkrightOfOpening"
        label="حق افتتاحیه در صنفی"
        :m="m"
      />
    </div>

    <!-- <div class="col-12">
        <safa-checkbox
          v-model="calculatingBasedOnRevisit"
          color="primary"
          label="محاسبه بر اساس بازدید"
          :m="m"
        ></safa-checkbox>
      </div> -->

    <!-- <div class="col-12"> -->
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="value.ChkotherAccountOfSenfi"
        cdcName="ChkotherAccountOfSenfi"
        label="کمبو حساب های متفرقه صنفی"
        :m="m"
      />
    </div>
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="value.ChkshowErrorOfFinancialSys"
        cdcName="ChkshowErrorOfFinancialSys"
        label="نمایش خطای سیستم مالی"
        :m="m"
      />
    </div>
    <div class="row">
      <safa-checkbox
        v-model="value.ChkrevokeConfirmedfiche"
        cdcName="ChkrevokeConfirmedfiche"
        label="ابطال فیش های تایید شده بانک"
        :m="m"
      />
    </div>
    <!-- </div> -->
  </fit>
</template>

<script>
export default {
  name: 'check-uncorfirmation-fishes',
  title: 'بررسی فیش های تایید نشده از فایل بانکی',
  data () {
    return {
      selectedCategoryInfo: '',
      infoGroup: [
        {
          ID: '0',
          Title: 'اطلاعات پرونده'
        },
        {
          ID: '100',
          Title: 'نوسازی'
        }
      ]
      // SenfiSettingAvarez: {
      //   startcalcYear: 1380,
      //   minPrice: 0,
      //   ChktotalPrice: true,
      //   noOfDay: "",
      //   paymentDate: "",
      //   ChkisSure: false,
      //   ChkrevokeFiche: false,
      //   ChkyearForConfirmedYearlyFiche: false,
      //   ChkyearForConfirmedAllFiche: false,
      //   ChkyearForConfirmedinstallmentFiche: false,
      //   ChkrevokeFicheWhenConfirm: false,
      //   ChkrightOfOpening: false,
      //   ChkcalculatingBasedOnRevisit: false,
      //   ChkotherAccountOfSenfi: false,
      //   ChkshowErrorOfFinancialSys: false,
      //   ChkrevokeConfirmedfiche: false
      // }
    }
  },
  computed: {
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').isShowBaseInfoGroupCombo
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').infoGroupOptions
    }
  },
  props: {
    value: Object,
    m: String,
    formKey: String,
    name: String,
    title: String
  },
  mounted () {
  },
  methods: {}
}
</script>
